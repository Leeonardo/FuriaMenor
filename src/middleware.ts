import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authCookie = request.cookies.get("admin_auth");
  const roleCookie = request.cookies.get("user_role")?.value;

  // 1. REGLA 3: PROTECCIÓN DE ENDPOINT Y PANEL DE CREACIÓN DE ÁRBITROS
  // Permitir el acceso únicamente al usuario con rol de 'admin' / 'admin_general'
  if (path.startsWith("/api/admin/arbitros") && request.method === "POST") {
    if (authCookie?.value !== "true") {
      return NextResponse.json(
        {
          success: false,
          code: "UNAUTHORIZED",
          message: "No autorizado: Debes iniciar sesión como Administrador General.",
        },
        { status: 401 }
      );
    }

    if (roleCookie !== "admin_general" && roleCookie !== "admin") {
      return NextResponse.json(
        {
          success: false,
          code: "FORBIDDEN_ADMIN_ONLY",
          message:
            "Acceso denegado por Middleware: La creación de árbitros está estrictamente restringida al rol 'admin_general'.",
        },
        { status: 403 }
      );
    }
  }

  // 2. PROTECCIÓN DE VISTAS ADMINISTRATIVAS EN EL NAVEGADOR
  if (path.startsWith("/admin") && path !== "/admin/login") {
    if (authCookie?.value !== "true") {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", path);
      return NextResponse.redirect(loginUrl);
    }

    // Si intenta acceder a secciones exclusivas de arbitraje administrativo sin ser admin
    if (path.startsWith("/admin/arbitros") && roleCookie !== "admin_general" && roleCookie !== "admin") {
      const adminHomeUrl = new URL("/admin", request.url);
      adminHomeUrl.searchParams.set("error", "unauthorized_arbitros");
      return NextResponse.redirect(adminHomeUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/arbitros/:path*",
    "/api/admin/arbitros",
  ],
};
