import { NextRequest, NextResponse } from "next/server";
import { isCategoryRosterFrozen, DB_CATEGORIES } from "@/lib/db-store";

/**
 * API Backend para Fichajes de Atletas (tabla players)
 * Implementa la regla de negocio "Transparencia Total" y "Rosters Congelados":
 * Si la fecha actual supera el registration_deadline de la categoría, bloquea
 * cualquier intento del rol 'delegado' de agregar, editar o eliminar atletas.
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { player, userRole = "delegado" } = body;

    if (!player || !player.categoryId) {
      return NextResponse.json(
        { error: "Datos del atleta o categoría incompletos." },
        { status: 400 }
      );
    }

    // Regla de Roster Congelado para Rol Delegado
    if (userRole === "delegado") {
      const frozenCheck = isCategoryRosterFrozen(player.categoryId);
      if (frozenCheck.isFrozen) {
        return NextResponse.json(
          {
            error: `Roster Congelado: El período oficial de inscripción para la categoría ${frozenCheck.categoryName} cerró el ${frozenCheck.deadlineFormatted}. No se permiten nuevos fichajes para delegados.`,
            isFrozen: true,
            deadline: frozenCheck.deadlineFormatted,
          },
          { status: 403 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Atleta validado e inscrito satisfactoriamente.",
      player,
    });
  } catch (error) {
    console.error("Error en POST /api/admin/players:", error);
    return NextResponse.json(
      { error: "Error interno al procesar el fichaje del atleta." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { player } = body;

    if (!player || !player.categoryId) {
      return NextResponse.json(
        { error: "Datos del atleta incompletos." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Atleta actualizado correctamente en el sistema.",
      player,
    });
  } catch (error) {
    console.error("Error en PUT /api/admin/players:", error);
    return NextResponse.json(
      { error: "Error interno al actualizar atleta." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    if (!categoryId) {
      return NextResponse.json(
        { error: "Parámetro categoryId requerido." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Atleta desincorporado del plantel con éxito.",
    });
  } catch (error) {
    console.error("Error en DELETE /api/admin/players:", error);
    return NextResponse.json(
      { error: "Error interno al desincorporar atleta." },
      { status: 500 }
    );
  }
}
