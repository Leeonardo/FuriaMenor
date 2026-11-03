import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const { password, role } = body;
    const adminPassword = process.env.ADMIN_PASSWORD || "123456";

    // Permitir acceso con contraseña de admin o selección de rol demo
    if (password === adminPassword || role) {
      const activeRole = role || "admin_general";
      const response = NextResponse.json({ success: true, role: activeRole });

      response.cookies.set("admin_auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      response.cookies.set("user_role", activeRole, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    return NextResponse.json({ success: false, message: "Contraseña incorrecta" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error en el servidor" }, { status: 500 });
  }
}
