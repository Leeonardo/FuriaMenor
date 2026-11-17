import { DBPlayer, DBMatch, ClubLeagueDebt, PlayerFinancialStatus, RepresentativeData } from "@/types/auth-roles";

/**
 * -----------------------------------------------------------------------------
 * UTILIDADES ADMINISTRATIVAS Y FINANCIERAS (PASO 3 - GESTOR EQUIPO Y GESTOR LIGA)
 * Implementación de cobranza por WhatsApp, control de mensualidades, torneos y
 * liquidación arbitral condicionada a carga de planilla física firmada.
 * -----------------------------------------------------------------------------
 */

/**
 * Genera el enlace directo a WhatsApp para cobrar mensualidad o torneo a un representante
 */
export function generateParentWhatsAppReminder(
  player: DBPlayer,
  clubName: string,
  options?: {
    customPhone?: string;
    customRepName?: string;
    customDebt?: number;
    customConcept?: string;
    bankDetails?: string;
  }
): string {
  const repName = options?.customRepName || player.representative?.name || "Representante";
  const rawPhone = options?.customPhone || player.representative?.phone || "04120000000";
  // Limpiar número para Venezuela (+58)
  let cleanPhone = rawPhone.replace(/\D/g, "");
  if (cleanPhone.startsWith("0")) {
    cleanPhone = "58" + cleanPhone.substring(1);
  } else if (!cleanPhone.startsWith("58")) {
    cleanPhone = "58" + cleanPhone;
  }

  const playerName = `${player.firstName} ${player.lastName}`;
  const fin = player.financials;
  const debtMonths = fin?.debtMonths || 1;
  const monthlyDebt = (fin?.monthlyFeeAmount || 20) * debtMonths;
  const tournamentDebt = fin?.tournamentFeeStatus === "moroso" ? (fin?.tournamentFeeAmount || 15) : 0;
  const totalDebt = options?.customDebt !== undefined ? options.customDebt : (monthlyDebt + tournamentDebt);

  let conceptText = "";
  if (monthlyDebt > 0 && tournamentDebt > 0) {
    conceptText = `mensualidad (${debtMonths} mes${debtMonths > 1 ? "es" : ""}) e inscripción de torneo federado`;
  } else if (monthlyDebt > 0) {
    conceptText = `mensualidad deportiva (${debtMonths} mes${debtMonths > 1 ? "es" : ""})`;
  } else if (tournamentDebt > 0) {
    conceptText = "cuota de inscripción del torneo federado Furia Menor";
  } else {
    conceptText = "concepto pendiente de academia";
  }

  if (options?.customConcept) {
    conceptText = options.customConcept;
  }

  const text = `⚽ *NOTIFICACIÓN DE COBRANZA - ${clubName.toUpperCase()}*\n\n` +
    `Estimado(a) *${repName}*,\n` +
    `Reciba un cordial saludo de parte de la directiva de *${clubName}*.\n\n` +
    `Le informamos que el atleta *${playerName}* (Categoría ${player.categoryName}) presenta un saldo pendiente de *$${totalDebt} USD* por concepto de: *${conceptText}*.\n\n` +
    `Agradecemos su valioso apoyo para mantener al día los compromisos y garantizar la continuidad deportiva y participación del atleta en los próximos encuentros oficiales.\n\n` +
    (options?.bankDetails ? `📌 *Datos de Pago Móvil / Cuenta:*\n${options.bankDetails}\n\n` : "") +
    `_Por favor envíenos el comprobante de pago por esta misma vía al realizar la transferencia o pago móvil. ¡Muchas gracias!_`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Genera el enlace de cobranza oficial de la Liga (Ronny / Furia Menor) a un delegado de club
 */
export function generateLeagueDelegateWhatsAppNotice(
  debtItem: ClubLeagueDebt,
  leagueName: string = "Liga Furia Menor"
): string {
  let cleanPhone = debtItem.delegatePhone.replace(/\D/g, "");
  if (cleanPhone.startsWith("0")) {
    cleanPhone = "58" + cleanPhone.substring(1);
  } else if (!cleanPhone.startsWith("58")) {
    cleanPhone = "58" + cleanPhone;
  }

  const total = debtItem.tournamentFeeDebt + debtItem.finesDebt;

  const text = `🏆 *AVISO DE SOLVENCIA Y COBRANZA OFICIAL - ${leagueName.toUpperCase()}*\n\n` +
    `Estimado Delegado *${debtItem.delegateName}* (*${debtItem.clubName}*),\n` +
    `Por medio de la presente, la Comisión de Finanzas y Competiciones le notifica el estado de cuenta oficial para la categoría *${debtItem.categoryName}* en el *${debtItem.tournamentName}*:\n\n` +
    `• Cuota de Torneo pendiente: *$${debtItem.tournamentFeeDebt} USD*\n` +
    `• Multas por Amonestaciones/Tarjetas: *$${debtItem.finesDebt} USD*\n` +
    `💰 *TOTAL PENDIENTE: $${total} USD*\n\n` +
    `⚠️ *Recordatorio Normativo:* Según el reglamento oficial, los equipos deben encontrarse solventes para tener derecho a alineación y disputa de la siguiente jornada.\n\n` +
    `Agradecemos coordinar la liquidación a la brevedad y enviar el comprobante correspondiente.\n\n` +
    `_Atentamente: Comisión de Competiciones y Arbitraje - ${leagueName}_`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Evalúa las condiciones para liquidar honorarios a árbitros y mesa técnica
 * Regla del Profesor Karin: "Los árbitros y la mesa no cobran a menos que carguen en el sistema
 * lo que se les pide: resultado e imagen de planilla física firmada".
 */
export function evaluateRefereePayout(match: DBMatch): {
  isEligible: boolean;
  refereeAmount: number;
  tableAmount: number;
  totalAmount: number;
  reason: string;
} {
  const refereeAmount = match.refereeFee || 15;
  const tableAmount = match.tableFee || 10;
  const totalAmount = refereeAmount + tableAmount;

  if (match.status !== "finalizado") {
    return {
      isEligible: false,
      refereeAmount,
      tableAmount,
      totalAmount,
      reason: "El partido aún no ha finalizado reglamentariamente.",
    };
  }

  const hasScore = match.homeScore !== null && match.awayScore !== null;
  const hasSheet = Boolean(match.sheetPhotoUrl || match.scoresheetUrl);

  if (!hasScore) {
    return {
      isEligible: false,
      refereeAmount,
      tableAmount,
      totalAmount,
      reason: "Falta cargar el marcador final verificado del encuentro.",
    };
  }

  if (!hasSheet) {
    return {
      isEligible: false,
      refereeAmount,
      tableAmount,
      totalAmount,
      reason: "BLOQUEO DE PAGO: Planilla física oficial firmada NO ha sido subida al sistema.",
    };
  }

  return {
    isEligible: true,
    refereeAmount,
    tableAmount,
    totalAmount,
    reason: "Planilla y resultado verificados. Aprobado para liquidación de honorarios.",
  };
}

/**
 * Datos demo para las deudas de clubes con la liga Furia Menor (para el Gestor Liga de Ronny)
 */
export const INITIAL_LEAGUE_DEBTS: ClubLeagueDebt[] = [
  {
    id: "debt-01",
    clubId: "acad-06",
    clubName: "Gladiadores Caricuao",
    delegateName: "Ender Blanco",
    delegatePhone: "0412-5551234",
    categoryName: "Sub-16 1ra",
    tournamentName: "Torneo Infantil 1era División",
    tournamentFeeDebt: 30,
    finesDebt: 6, // tarjetas
    status: "moroso",
    lastNoticeSentDate: "2026-11-10",
  },
  {
    id: "debt-02",
    clubId: "acad-14",
    clubName: "La Ladera",
    delegateName: "Carlos Rivas",
    delegatePhone: "0424-8889911",
    categoryName: "Sub-14 2da",
    tournamentName: "Torneo Infantil 2da División",
    tournamentFeeDebt: 25,
    finesDebt: 4,
    status: "moroso",
    lastNoticeSentDate: "2026-11-12",
  },
  {
    id: "debt-03",
    clubId: "acad-18",
    clubName: "Real Esperanza",
    delegateName: "Víctor Mora",
    delegatePhone: "0416-7773344",
    categoryName: "Sub-20 1ra",
    tournamentName: "Torneo Infantil 1era División",
    tournamentFeeDebt: 0,
    finesDebt: 0,
    status: "solvente",
  },
  {
    id: "debt-04",
    clubId: "club-palace",
    clubName: "Club Palace",
    delegateName: "Marcos Yánez",
    delegatePhone: "0414-2223311",
    categoryName: "Sub-18 1ra",
    tournamentName: "Torneo Infantil 1era División",
    tournamentFeeDebt: 40,
    finesDebt: 9,
    status: "moroso",
    lastNoticeSentDate: "2026-11-15",
  },
  {
    id: "debt-05",
    clubId: "acad-23",
    clubName: "Unión Libertador",
    delegateName: "José Alarcón",
    delegatePhone: "0412-3334455",
    categoryName: "Sub-10 2da",
    tournamentName: "Torneo Infantil 2da División",
    tournamentFeeDebt: 0,
    finesDebt: 3, // multas pendientes
    status: "moroso",
  },
  {
    id: "debt-06",
    clubId: "club-deportivo-paracoto",
    clubName: "Deportivo Paracoto",
    delegateName: "Reinaldo Hidalgo",
    delegatePhone: "0426-9990022",
    categoryName: "Sub-12 2da",
    tournamentName: "Torneo Infantil 2da División",
    tournamentFeeDebt: 20,
    finesDebt: 5,
    status: "moroso",
  },
];
