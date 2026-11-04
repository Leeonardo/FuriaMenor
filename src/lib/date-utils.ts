/**
 * Utilidades para formateo de fechas estándar en Venezuela (Día/Mes/Año)
 */

/**
 * Convierte cualquier fecha ISO (YYYY-MM-DD) al formato venezolano estándar (DD/MM/YYYY).
 * Ejemplo: "2026-11-07" -> "07/11/2026"
 */
export function formatDateVE(dateStr?: string | null): string {
  if (!dateStr) return "";
  if (dateStr.includes("/")) return dateStr;
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const [y, m, d] = parts;
    return `${d.padStart(2, "0")}/${m.padStart(2, "0")}/${y}`;
  }
  return dateStr;
}

/**
 * Formato largo para encabezados de jornada en Venezuela:
 * Ejemplo: "Sábado 07/11/2026 · (7 de Noviembre)"
 */
export function formatFullDateVE(dateStr?: string | null): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts.map(Number);
  const dateObj = new Date(year, month - 1, day);
  const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const dayName = dayNames[dateObj.getDay()] || "";
  const dd = String(day).padStart(2, "0");
  const mm = String(month).padStart(2, "0");
  const monthName = monthNames[month - 1] || "";

  return `${dayName} ${dd}/${mm}/${year} · (${day} de ${monthName})`;
}

/**
 * Formato exacto de cartelera/planilla venezolana:
 * Ejemplo: "SÁBADO 07-11-2026" o "JUEVES 05-11-2026"
 */
export function formatJornadaBadgeVE(dateStr?: string | null): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts.map(Number);
  const dateObj = new Date(year, month - 1, day);
  const dayNames = ["DOMINGO", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];
  const dayName = dayNames[dateObj.getDay()] || "";
  const dd = String(day).padStart(2, "0");
  const mm = String(month).padStart(2, "0");

  return `${dayName} ${dd}-${mm}-${year}`;
}
