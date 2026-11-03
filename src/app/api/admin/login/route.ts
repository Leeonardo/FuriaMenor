import { NextRequest, NextResponse } from "next/server";

interface TestAccount {
  usernames: string[];
  role: "admin_general" | "delegado" | "arbitro";
  fullName: string;
  clubId?: string;
  clubName?: string;
}

const TEST_ACCOUNTS: TestAccount[] = [
  {
    usernames: ["admin", "admin@furiamenor.com", "carlos.quintana"],
    role: "admin_general",
    fullName: "Carlos Quintana",
  },
  {
    usernames: ["delegado", "eudis.toro@lapazfutsal.com", "lapaz", "eudis.toro", "la-paz"],
    role: "delegado",
    fullName: "Eudis Toro",
    clubId: "la-paz-futsal",
    clubName: "La Paz Futsal",
  },
  {
    usernames: ["arbitro", "arbitro@furiamenor.com", "jose.colina", "arbitro1"],
    role: "arbitro",
    fullName: "Prof. José Colina",
  },
];

export async function POST(request: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      try {
        const text = await request.text();
        body = JSON.parse(text);
      } catch {
        body = {};
      }
    }

    const rawUser = body.username ?? body.user ?? body.email;
    const rawPass = body.password ?? body.clave ?? body.pass;
    const rawRole = body.role ?? body.rol;
    const universalPassword = process.env.ADMIN_PASSWORD || "123456";

    // 1. Verificación de contraseña común para los 3 usuarios (123456)
    if (rawPass && String(rawPass) !== universalPassword) {
      return NextResponse.json(
        { success: false, message: "Contraseña incorrecta. Recuerda que la clave es 123456" },
        { status: 401 }
      );
    }

    // 2. Determinar el rol según el usuario ingresado o rol directo
    let targetRole: "admin_general" | "delegado" | "arbitro" = "admin_general";
    let accountInfo = TEST_ACCOUNTS[0];

    if (rawUser) {
      const cleanUser = String(rawUser).toLowerCase().trim();
      const matched = TEST_ACCOUNTS.find((acc) =>
        acc.usernames.some((u) => u.toLowerCase() === cleanUser)
      );
      if (matched) {
        targetRole = matched.role;
        accountInfo = matched;
      } else if (cleanUser.includes("delegado") || cleanUser.includes("paz") || cleanUser.includes("toro")) {
        targetRole = "delegado";
        accountInfo = TEST_ACCOUNTS[1];
      } else if (cleanUser.includes("arbitro") || cleanUser.includes("colina")) {
        targetRole = "arbitro";
        accountInfo = TEST_ACCOUNTS[2];
      }
    } else if (rawRole) {
      const matched = TEST_ACCOUNTS.find((acc) => acc.role === rawRole);
      if (matched) {
        targetRole = matched.role;
        accountInfo = matched;
      }
    }

    // 3. Crear sesión con cookies seguras
    const response = NextResponse.json({
      success: true,
      role: targetRole,
      user: {
        fullName: accountInfo.fullName,
        role: targetRole,
        clubId: accountInfo.clubId,
        clubName: accountInfo.clubName,
      },
    });

    response.cookies.set("admin_auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    response.cookies.set("user_role", targetRole, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error en el servidor de autenticación" }, { status: 500 });
  }
}
