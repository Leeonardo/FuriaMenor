import { NextRequest, NextResponse } from "next/server";
import { INITIAL_SYSTEM_USERS } from "@/lib/db-store";

// Almacén en memoria de árbitros registrados por el admin
const systemArbitros = [
  ...INITIAL_SYSTEM_USERS.filter((u) => u.role === "arbitro"),
];

/**
 * GET /api/admin/arbitros
 * Lista los árbitros registrados en el sistema.
 * Protegido: Requiere sesión administrativa.
 */
export async function GET(request: NextRequest) {
  const authCookie = request.cookies.get("admin_auth");
  const roleCookie = request.cookies.get("user_role");

  if (authCookie?.value !== "true") {
    return NextResponse.json(
      { success: false, message: "No autorizado. Inicia sesión en el panel." },
      { status: 401 }
    );
  }

  // Permitir lectura a admin y árbitros
  return NextResponse.json({
    success: true,
    total: systemArbitros.length,
    arbitros: systemArbitros,
  });
}

/**
 * POST /api/admin/arbitros
 * REGLA 3: CREACIÓN EXCLUSIVA DE ÁRBITROS POR EL ADMIN
 * Protegido: Únicamente accesible si el usuario tiene rol 'admin_general'.
 */
export async function POST(request: NextRequest) {
  try {
    const authCookie = request.cookies.get("admin_auth");
    const roleCookie = request.cookies.get("user_role")?.value;

    // 1. Verificar autenticación
    if (authCookie?.value !== "true") {
      return NextResponse.json(
        {
          success: false,
          code: "UNAUTHORIZED",
          message: "No autenticado: Debes iniciar sesión con una cuenta autorizada.",
        },
        { status: 401 }
      );
    }

    // 2. Verificar rol de Administrador General (Regla 3)
    if (roleCookie !== "admin_general" && roleCookie !== "admin") {
      return NextResponse.json(
        {
          success: false,
          code: "FORBIDDEN_ADMIN_ONLY",
          message:
            "Acceso denegado: La creación y acreditación de usuarios con el rol de 'árbitro' está estrictamente reservada para el Administrador General.",
        },
        { status: 403 }
      );
    }

    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Cuerpo de solicitud inválido." },
        { status: 400 }
      );
    }

    const { fullName, email, phone, cedula, colegioArbitros } = body;

    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json(
        { success: false, message: "El nombre completo del árbitro es obligatorio." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Debes ingresar un correo electrónico institucional válido." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Comprobar duplicado de correo
    if (systemArbitros.some((a) => a.email.toLowerCase() === cleanEmail)) {
      return NextResponse.json(
        {
          success: false,
          code: "EMAIL_EXISTS",
          message: `El correo ${cleanEmail} ya se encuentra asignado a otro árbitro en el sistema.`,
        },
        { status: 409 }
      );
    }

    const newArbitro = {
      id: `user-arbitro-${Date.now()}`,
      email: cleanEmail,
      fullName: fullName.trim(),
      role: "arbitro" as const,
      phone: phone ? String(phone).trim() : "",
      cedula: cedula ? String(cedula).trim() : "",
      colegioArbitros: colegioArbitros
        ? String(colegioArbitros).trim()
        : "Colegio de Árbitros de Futsal del Distrito Capital",
      createdAt: new Date().toISOString(),
    };

    systemArbitros.push(newArbitro);

    return NextResponse.json(
      {
        success: true,
        message: `Árbitro oficial "${newArbitro.fullName}" creado y habilitado exitosamente en Furia Menor.`,
        arbitro: newArbitro,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error en POST /api/admin/arbitros:", error);
    return NextResponse.json(
      { success: false, message: "Error interno al crear el usuario árbitro." },
      { status: 500 }
    );
  }
}
