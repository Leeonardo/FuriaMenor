import { NextRequest, NextResponse } from "next/server";
import { DB_CLUBS, INITIAL_SYSTEM_USERS } from "@/lib/db-store";

// En entorno de ejecución de Next.js / Serverless
// Mantenemos un registro en memoria de delegados asignados por club
const activeDelegatesByClub = new Map<string, { id: string; name: string; email: string }>([
  ["la-paz-futsal", { id: "user-delegado-01", name: "Eudis Toro", email: "eudis.toro@lapazfutsal.com" }],
]);

const registeredEmails = new Set<string>([
  "admin@furiamenor.com",
  "eudis.toro@lapazfutsal.com",
  "arbitro.colina@colegioarbitros.com",
  "ramon.rondon@colegioarbitros.com",
]);

/**
 * GET /api/auth/register
 * Retorna el listado de clubes y su disponibilidad de delegado para autogestión.
 */
export async function GET() {
  const clubsStatus = DB_CLUBS.map((c) => {
    const existing = activeDelegatesByClub.get(c.id);
    return {
      id: c.id,
      slug: c.slug,
      name: c.name,
      officialName: c.officialName,
      municipality: c.municipality,
      hasDelegado: !!existing,
      delegadoName: existing ? existing.name : null,
    };
  });

  return NextResponse.json({
    success: true,
    totalClubs: clubsStatus.length,
    clubs: clubsStatus,
  });
}

/**
 * POST /api/auth/register
 * Registro público para Delegados de Club bajo reglas estrictas de negocio:
 * 1. Restricción de registro público: Siempre rol 'delegado'. Rechaza auto-asignación de 'admin' o 'arbitro'.
 * 2. Un solo delegado por club: Si el club ya tiene delegado, rechaza con HTTP 409 Conflict.
 */
export async function POST(request: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "El cuerpo de la solicitud no es un JSON válido." },
        { status: 400 }
      );
    }

    const {
      fullName,
      email,
      password,
      clubId,
      phone,
      cedula,
      role: requestedRole,
    } = body;

    // =========================================================================
    // REGLA 1: RESTRICCIÓN DE REGISTRO PÚBLICO (ROL DELEGADO)
    // =========================================================================
    // Bloquear por código cualquier intento de auto-asignarse el rol de 'admin' o 'arbitro'
    if (requestedRole) {
      const cleanRequested = String(requestedRole).toLowerCase().trim();
      if (
        cleanRequested !== "delegado" &&
        ["admin", "admin_general", "arbitro", "superadmin", "arbitro_general"].includes(
          cleanRequested
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            code: "FORBIDDEN_ROLE_ATTEMPT",
            message: `Violación de política de seguridad: No está permitido auto-asignarse el rol '${requestedRole}' desde el registro público. Todos los usuarios que se registran a través de la web se asignan automáticamente con el rol de 'delegado'. La creación de cuentas de árbitros o administradores es potestad exclusiva del Administrador General.`,
          },
          { status: 400 }
        );
      }
    }

    // Validar campos obligatorios
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json(
        { success: false, message: "El nombre completo del delegado es obligatorio." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Debes proporcionar un correo electrónico válido." },
        { status: 400 }
      );
    }

    if (!clubId || typeof clubId !== "string" || !clubId.trim()) {
      return NextResponse.json(
        { success: false, message: "Debes seleccionar el club o academia deportiva a representar." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanClubId = clubId.trim();

    // Validar existencia del club
    const club = DB_CLUBS.find((c) => c.id === cleanClubId || c.slug === cleanClubId);
    if (!club) {
      return NextResponse.json(
        { success: false, message: "El club seleccionado no existe en el registro federado de Furia Menor." },
        { status: 404 }
      );
    }

    // =========================================================================
    // REGLA 2: UN SOLO DELEGADO POR CLUB
    // =========================================================================
    // Si un usuario intenta registrarse y seleccionar un club que ya tiene un delegado asignado,
    // la API debe retornar un error claro impidiendo el registro duplicado.
    if (activeDelegatesByClub.has(club.id)) {
      const existingDelegado = activeDelegatesByClub.get(club.id)!;
      return NextResponse.json(
        {
          success: false,
          code: "CLUB_DELEGADO_ALREADY_EXISTS",
          message: `El club "${club.name}" ya cuenta con un delegado oficial registrado (${existingDelegado.name}). Cada club solo puede tener un único delegado autorizado en el portal. Si formas parte de la directiva de este club y necesitas restablecer tu acceso, comunícate con la Comisión de Furia Menor.`,
        },
        { status: 409 }
      );
    }

    // Verificar si el correo ya existe
    if (registeredEmails.has(cleanEmail)) {
      return NextResponse.json(
        {
          success: false,
          code: "EMAIL_ALREADY_IN_USE",
          message: "Este correo electrónico ya se encuentra registrado en el sistema.",
        },
        { status: 409 }
      );
    }

    // Rol forzado a 'delegado' sin excepciones
    const finalRole: "delegado" = "delegado";
    const newUserId = `user-delegado-${Date.now()}`;

    // Registrar en memoria del servidor
    activeDelegatesByClub.set(club.id, {
      id: newUserId,
      name: fullName.trim(),
      email: cleanEmail,
    });
    registeredEmails.add(cleanEmail);

    const newUser = {
      id: newUserId,
      fullName: fullName.trim(),
      email: cleanEmail,
      role: finalRole,
      clubId: club.id,
      clubName: club.name,
      phone: phone ? String(phone).trim() : "",
      cedula: cedula ? String(cedula).trim() : "",
      createdAt: new Date().toISOString(),
    };

    // Crear respuesta y setear cookies de sesión para inicio automático
    const response = NextResponse.json(
      {
        success: true,
        message: `¡Registro exitoso! Has sido acreditado como delegado oficial de ${club.name}.`,
        user: newUser,
      },
      { status: 201 }
    );

    response.cookies.set("admin_auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    response.cookies.set("user_role", "delegado", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    response.cookies.set("user_club_id", club.id, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    console.error("Error en /api/auth/register:", error);
    return NextResponse.json(
      { success: false, message: "Error interno al procesar el registro del delegado." },
      { status: 500 }
    );
  }
}
