import React from "react";

interface SubBadgeProps {
  className?: string;
  size?: number;
}

/**
 * 1. Insignia Torneo Institucional
 * Escudo clásico institucional azul marino y oro con columnas/laureles y balón.
 */
export function DaerisInstitucionalBadge({ className = "", size = 64 }: SubBadgeProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 140 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="instGold" x1="0" y1="0" x2="140" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
        <linearGradient id="instBlue" x1="70" y1="10" x2="70" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="60%" stopColor="#172554" />
          <stop offset="100%" stopColor="#0B132B" />
        </linearGradient>
      </defs>
      {/* Escudo exterior */}
      <path d="M70 8 L126 28 C126 88 104 130 70 152 C36 130 14 88 14 28 Z" fill="url(#instGold)" />
      {/* Escudo interior */}
      <path d="M70 14 L120 32 C120 84 100 124 70 144 C40 124 20 84 20 32 Z" fill="url(#instBlue)" />
      <path d="M70 20 L114 36 C114 80 96 118 70 136 C44 118 26 80 26 36 Z" stroke="url(#instGold)" strokeWidth="1.2" fill="none" opacity="0.6" />

      {/* Estrella superior */}
      <polygon points="70,24 71.5,27.5 75,27.5 72,29.5 73.5,33 70,31 66.5,33 68,29.5 65,27.5 68.5,27.5" fill="#FBBF24" />

      {/* Columnas institucionales y Balón */}
      <g transform="translate(70, 68)">
        <circle r="20" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
        <polygon points="0,-6 5.8,-1.8 3.6,5.3 -3.6,5.3 -5.8,-1.8" fill="#1E3A8A" />
        <line x1="0" y1="-6" x2="0" y2="-19" stroke="#B45309" strokeWidth="1.5" />
        <line x1="5.8" y1="-1.8" x2="18" y2="-6" stroke="#B45309" strokeWidth="1.5" />
        <line x1="3.6" y1="5.3" x2="12" y2="15" stroke="#B45309" strokeWidth="1.5" />
        <line x1="-3.6" y1="5.3" x2="-12" y2="15" stroke="#B45309" strokeWidth="1.5" />
        <line x1="-5.8" y1="-1.8" x2="-18" y2="-6" stroke="#B45309" strokeWidth="1.5" />
      </g>

      {/* Cinta inferior */}
      <path d="M22 110 Q70 118 118 110 L114 126 Q70 134 26 126 Z" fill="url(#instGold)" />
      <text x="70" y="122" textAnchor="middle" fill="#0F172A" fontWeight="900" fontSize="9" letterSpacing="1.2">
        INSTITUCIONAL
      </text>
      <text x="70" y="138" textAnchor="middle" fill="#FDE68A" fontWeight="700" fontSize="6.5" letterSpacing="1.5">
        TORNEO DAERIS
      </text>
    </svg>
  );
}

/**
 * 2. Insignia Fútbol 7 Institucional
 * Escudo verde esmeralda y blanco con gran "7" dinámico y balón.
 */
export function DaerisFutbol7Badge({ className = "", size = 64 }: SubBadgeProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 140 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="f7GreenBorder" x1="0" y1="0" x2="140" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="f7GreenBody" x1="70" y1="10" x2="70" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#065F46" />
          <stop offset="60%" stopColor="#047857" />
          <stop offset="100%" stopColor="#022C22" />
        </linearGradient>
      </defs>
      {/* Escudo exterior */}
      <path d="M70 8 L126 26 L118 100 L70 152 L22 100 L14 26 Z" fill="url(#f7GreenBorder)" />
      {/* Escudo interior */}
      <path d="M70 14 L120 30 L112 96 L70 144 L28 96 L20 30 Z" fill="url(#f7GreenBody)" />
      <path d="M70 20 L114 34 L106 92 L70 136 L34 92 L26 34 Z" stroke="#34D399" strokeWidth="1.2" fill="none" opacity="0.4" />

      {/* Número 7 estilizado */}
      <text x="56" y="80" fill="#FFFFFF" fontWeight="900" fontSize="42" fontFamily="sans-serif">
        7
      </text>

      {/* Balón satélite al lado del 7 */}
      <g transform="translate(94, 62)">
        <circle r="14" fill="#FFFFFF" stroke="#047857" strokeWidth="1.8" />
        <polygon points="0,-4 3.8,-1.2 2.4,3.5 -2.4,3.5 -3.8,-1.2" fill="#065F46" />
        <line x1="0" y1="-4" x2="0" y2="-13" stroke="#047857" strokeWidth="1.2" />
        <line x1="3.8" y1="-1.2" x2="12" y2="-4" stroke="#047857" strokeWidth="1.2" />
        <line x1="2.4" y1="3.5" x2="8" y2="10" stroke="#047857" strokeWidth="1.2" />
        <line x1="-2.4" y1="3.5" x2="-8" y2="10" stroke="#047857" strokeWidth="1.2" />
        <line x1="-3.8" y1="-1.2" x2="-12" y2="-4" stroke="#047857" strokeWidth="1.2" />
      </g>

      {/* Cinta FÚTBOL 7 */}
      <polygon points="20,110 120,110 114,126 26,126" fill="#10B981" stroke="#A7F3D0" strokeWidth="1" />
      <text x="70" y="122" textAnchor="middle" fill="#022C22" fontWeight="900" fontSize="9" letterSpacing="1.5">
        FÚTBOL 7 INST.
      </text>
      <text x="70" y="138" textAnchor="middle" fill="#6EE7B7" fontWeight="700" fontSize="6.5" letterSpacing="1.5">
        TORNEO DAERIS
      </text>
    </svg>
  );
}

/**
 * 3. Insignia Master 50
 * Escudo señorial oro viejo, burdeos y negro con corona y "50".
 */
export function DaerisMaster50Badge({ className = "", size = 64 }: SubBadgeProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 140 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="m50Gold" x1="0" y1="0" x2="140" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
        <linearGradient id="m50Dark" x1="70" y1="10" x2="70" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#450A0A" />
          <stop offset="60%" stopColor="#1C0505" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
      </defs>
      {/* Escudo exterior */}
      <path d="M70 8 L128 30 C128 92 106 132 70 152 C34 132 12 92 12 30 Z" fill="url(#m50Gold)" />
      {/* Escudo interior */}
      <path d="M70 14 L122 34 C122 86 102 124 70 144 C38 124 18 86 18 34 Z" fill="url(#m50Dark)" />

      {/* Corona clásica superior */}
      <path d="M54 36 L60 26 L70 32 L80 26 L86 36 Z" fill="url(#m50Gold)" />

      {/* Texto central "+50" o "M-50" */}
      <g transform="translate(70, 70)">
        <circle r="24" fill="#1C0505" stroke="url(#m50Gold)" strokeWidth="2" />
        <text x="0" y="8" textAnchor="middle" fill="#FDE68A" fontWeight="900" fontSize="20" fontFamily="sans-serif">
          +50
        </text>
      </g>

      {/* Laureles inferiores */}
      <path d="M38 88 C34 76 40 60 50 50" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
      <path d="M102 88 C106 76 100 60 90 50" stroke="#F59E0B" strokeWidth="1.5" fill="none" />

      {/* Cinta inferior */}
      <path d="M22 110 Q70 118 118 110 L114 126 Q70 134 26 126 Z" fill="url(#m50Gold)" />
      <text x="70" y="122" textAnchor="middle" fill="#1C0505" fontWeight="900" fontSize="10" letterSpacing="2">
        MASTER 50
      </text>
      <text x="70" y="138" textAnchor="middle" fill="#FDE68A" fontWeight="700" fontSize="6.5" letterSpacing="1.5">
        TORNEO DAERIS
      </text>
    </svg>
  );
}

/**
 * 4. Insignia Torneo Libre Parque Carabobo
 * Escudo urbano moderno púrpura y naranja con silueta/estrella y balón veloz.
 */
export function DaerisLibreParqueCaraboboBadge({ className = "", size = 64 }: SubBadgeProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 140 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="pcOrange" x1="0" y1="0" x2="140" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="50%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>
        <linearGradient id="pcPurple" x1="70" y1="10" x2="70" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#581C87" />
          <stop offset="60%" stopColor="#3B0764" />
          <stop offset="100%" stopColor="#1E0538" />
        </linearGradient>
      </defs>
      {/* Escudo exterior */}
      <path d="M70 8 L128 26 L120 102 L70 152 L20 102 L12 26 Z" fill="url(#pcOrange)" />
      {/* Escudo interior */}
      <path d="M70 14 L122 30 L114 96 L70 144 L26 96 L18 30 Z" fill="url(#pcPurple)" />

      {/* Ráfaga / Balón dinámico central */}
      <g transform="translate(70, 66)">
        {/* Llamas / alas detrás */}
        <path d="M-22 0 C-18 -16 0 -22 16 -12 C10 -6 18 4 6 12 C-8 20 -20 10 -22 0 Z" fill="#EA580C" opacity="0.7" />
        {/* Balón */}
        <circle r="18" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2" />
        <polygon points="0,-5 4.7,-1.5 3,4.2 -3,4.2 -4.7,-1.5" fill="#581C87" />
        <line x1="0" y1="-5" x2="0" y2="-17" stroke="#EA580C" strokeWidth="1.4" />
        <line x1="4.7" y1="-1.5" x2="15" y2="-5" stroke="#EA580C" strokeWidth="1.4" />
        <line x1="3" y1="4.2" x2="11" y2="13" stroke="#EA580C" strokeWidth="1.4" />
        <line x1="-3" y1="4.2" x2="-11" y2="13" stroke="#EA580C" strokeWidth="1.4" />
        <line x1="-4.7" y1="-1.5" x2="-15" y2="-5" stroke="#EA580C" strokeWidth="1.4" />
      </g>

      {/* Cinta inferior */}
      <polygon points="14,110 126,110 120,126 20,126" fill="url(#pcOrange)" />
      <text x="70" y="122" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="8" letterSpacing="0.8">
        PARQUE CARABOBO
      </text>
      <text x="70" y="138" textAnchor="middle" fill="#FED7AA" fontWeight="800" fontSize="7" letterSpacing="1.5">
        CATEGORÍA LIBRE
      </text>
    </svg>
  );
}

/**
 * 5. Insignia Torneo Infantil 1era División
 * Escudo carmesí y oro con gran estrella dorada y "1ERA DIV INFANTIL".
 */
export function DaerisInfantilPrimeraBadge({ className = "", size = 64 }: SubBadgeProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 140 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="p1Gold" x1="0" y1="0" x2="140" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="p1Crimson" x1="70" y1="10" x2="70" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#991B1B" />
          <stop offset="60%" stopColor="#7F1D1D" />
          <stop offset="100%" stopColor="#450A0A" />
        </linearGradient>
      </defs>
      {/* Escudo exterior */}
      <path d="M70 8 L126 28 C126 90 104 130 70 152 C36 130 14 90 14 28 Z" fill="url(#p1Gold)" />
      {/* Escudo interior */}
      <path d="M70 14 L120 32 C120 84 100 124 70 144 C40 124 20 84 20 32 Z" fill="url(#p1Crimson)" />

      {/* Estrella Élite de 1ra División */}
      <polygon points="70,22 72.5,29 80,29 74,33.5 76.5,40.5 70,36 63.5,40.5 66,33.5 60,29 67.5,29" fill="#FBBF24" stroke="#D97706" strokeWidth="0.8" />

      {/* Tipografía 1RA DIV y balón */}
      <g transform="translate(70, 72)">
        <circle r="22" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
        <text x="0" y="-2" textAnchor="middle" fill="#991B1B" fontWeight="900" fontSize="13" fontFamily="sans-serif">
          1RA
        </text>
        <text x="0" y="10" textAnchor="middle" fill="#450A0A" fontWeight="900" fontSize="8" letterSpacing="1">
          DIVISIÓN
        </text>
      </g>

      {/* Cinta inferior */}
      <path d="M22 110 Q70 118 118 110 L114 126 Q70 134 26 126 Z" fill="url(#p1Gold)" />
      <text x="70" y="122" textAnchor="middle" fill="#450A0A" fontWeight="900" fontSize="8.5" letterSpacing="1">
        INFANTIL 1RA DIV
      </text>
      <text x="70" y="138" textAnchor="middle" fill="#FDE68A" fontWeight="700" fontSize="6.5" letterSpacing="1.2">
        TORNEO DAERIS
      </text>
    </svg>
  );
}

/**
 * 6. Insignia Torneo Infantil 2da División
 * Escudo azul real y plata metálica con chevrons de ascenso deportivo y "2DA DIV INFANTIL".
 */
export function DaerisInfantilSegundaBadge({ className = "", size = 64 }: SubBadgeProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 140 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="p2Silver" x1="0" y1="0" x2="140" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="p2Blue" x1="70" y1="10" x2="70" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="60%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>
      </defs>
      {/* Escudo exterior */}
      <path d="M70 8 L126 28 C126 90 104 130 70 152 C36 130 14 90 14 28 Z" fill="url(#p2Silver)" />
      {/* Escudo interior */}
      <path d="M70 14 L120 32 C120 84 100 124 70 144 C40 124 20 84 20 32 Z" fill="url(#p2Blue)" />

      {/* Chevrons dobles de ascenso */}
      <path d="M58 34 L70 24 L82 34" stroke="#F8FAFC" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M62 40 L70 32 L78 40" stroke="#94A3B8" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Tipografía 2DA DIV y balón */}
      <g transform="translate(70, 72)">
        <circle r="22" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
        <text x="0" y="-2" textAnchor="middle" fill="#1D4ED8" fontWeight="900" fontSize="13" fontFamily="sans-serif">
          2DA
        </text>
        <text x="0" y="10" textAnchor="middle" fill="#1E40AF" fontWeight="900" fontSize="8" letterSpacing="1">
          DIVISIÓN
        </text>
      </g>

      {/* Cinta inferior */}
      <polygon points="18,110 122,110 116,126 24,126" fill="url(#p2Silver)" />
      <text x="70" y="122" textAnchor="middle" fill="#0F172A" fontWeight="900" fontSize="8.5" letterSpacing="1">
        INFANTIL 2DA DIV
      </text>
      <text x="70" y="138" textAnchor="middle" fill="#93C5FD" fontWeight="700" fontSize="6.5" letterSpacing="1.2">
        TORNEO DAERIS
      </text>
    </svg>
  );
}
