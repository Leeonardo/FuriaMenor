import React from "react";

interface BadgeProps {
  className?: string;
  size?: number;
}

/**
 * Insignia Oficial del Torneo Daeris
 * Escudo heráldico carmesí y dorado con corona de laureles y balón de futsal.
 */
export function DaerisBadge({ className = "", size = 72 }: BadgeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Gradiente exterior dorado */}
        <linearGradient id="daerisGold" x1="0" y1="0" x2="160" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="25%" stopColor="#D97706" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="75%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#FEF3C7" />
        </linearGradient>

        {/* Gradiente cuerpo carmesí */}
        <linearGradient id="daerisCrimson" x1="80" y1="10" x2="80" y2="170" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7F1D1D" />
          <stop offset="40%" stopColor="#991B1B" />
          <stop offset="80%" stopColor="#450A0A" />
          <stop offset="100%" stopColor="#1C0505" />
        </linearGradient>

        {/* Gradiente cinta */}
        <linearGradient id="daerisRibbon" x1="20" y1="120" x2="140" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B45309" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>

        {/* Sombra de relieve */}
        <filter id="daerisGlow" x="-10" y="-10" width="180" height="200" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#DC2626" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Forma del escudo exterior con resplandor */}
      <path
        d="M80 8 L146 32 C146 100 120 148 80 172 C40 148 14 100 14 32 Z"
        fill="url(#daerisGold)"
        filter="url(#daerisGlow)"
      />

      {/* Escudo interior carmesí */}
      <path
        d="M80 14 L140 36 C140 96 116 142 80 165 C44 142 20 96 20 36 Z"
        fill="url(#daerisCrimson)"
      />

      {/* Borde interior dorado fino */}
      <path
        d="M80 20 L134 40 C134 92 112 136 80 157 C48 136 26 92 26 40 Z"
        stroke="url(#daerisGold)"
        strokeWidth="1.5"
        strokeOpacity="0.6"
        fill="none"
      />

      {/* 3 Estrellas superiores */}
      <g fill="#FBBF24">
        {/* Estrella central */}
        <path d="M80 25 L82 30 L87 30 L83 33 L85 38 L80 35 L75 38 L77 33 L73 30 L78 30 Z" />
        {/* Estrella izquierda */}
        <path d="M64 29 L65.5 33 L70 33 L66.5 35.5 L68 39.5 L64 37 L60 39.5 L61.5 35.5 L58 33 L62.5 33 Z" transform="scale(0.85) translate(14, 4)" />
        {/* Estrella derecha */}
        <path d="M96 29 L97.5 33 L102 33 L98.5 35.5 L100 39.5 L96 37 L92 39.5 L93.5 35.5 L90 33 L94.5 33 Z" transform="scale(0.85) translate(22, 4)" />
      </g>

      {/* Balón de Futsal central estilizado */}
      <g transform="translate(80, 75)">
        {/* Círculo base balón */}
        <circle r="26" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />
        {/* Pentágono central de futsal */}
        <polygon
          points="0,-8 7.6,-2.5 4.7,7 -4.7,7 -7.6,-2.5"
          fill="#991B1B"
          stroke="#450A0A"
          strokeWidth="1.5"
        />
        {/* Líneas radiales de costura futsal */}
        <line x1="0" y1="-8" x2="0" y2="-25" stroke="#B45309" strokeWidth="2" />
        <line x1="7.6" y1="-2.5" x2="23" y2="-8" stroke="#B45309" strokeWidth="2" />
        <line x1="4.7" y1="7" x2="16" y2="19" stroke="#B45309" strokeWidth="2" />
        <line x1="-4.7" y1="7" x2="-16" y2="19" stroke="#B45309" strokeWidth="2" />
        <line x1="-7.6" y1="-2.5" x2="-23" y2="-8" stroke="#B45309" strokeWidth="2" />
        {/* Brillo en el balón */}
        <ellipse cx="-8" cy="-10" rx="6" ry="3" fill="#FFFFFF" opacity="0.4" transform="rotate(-30, -8, -10)" />
      </g>

      {/* Laureles laterales */}
      <g stroke="#FBBF24" strokeWidth="1.8" fill="none" opacity="0.85">
        {/* Izquierdo */}
        <path d="M42 90 C38 80 44 65 52 56" />
        <path d="M38 78 C32 74 34 68 40 70" fill="#FBBF24" />
        <path d="M42 66 C36 62 40 56 46 60" fill="#FBBF24" />
        {/* Derecho */}
        <path d="M118 90 C122 80 116 65 108 56" />
        <path d="M122 78 C128 74 126 68 120 70" fill="#FBBF24" />
        <path d="M118 66 C124 62 120 56 114 60" fill="#FBBF24" />
      </g>

      {/* Cinta / Banner inferior */}
      <g filter="url(#daerisGlow)">
        {/* Plegados laterales de la cinta */}
        <polygon points="18,128 32,118 32,138" fill="#78350F" />
        <polygon points="142,128 128,118 128,138" fill="#78350F" />

        {/* Cuerpo principal de la cinta */}
        <path
          d="M24 124 Q80 134 136 124 L132 144 Q80 154 28 144 Z"
          fill="url(#daerisRibbon)"
          stroke="#FEF3C7"
          strokeWidth="1"
        />

        {/* Texto DAERIS en la cinta */}
        <text
          x="80"
          y="138"
          textAnchor="middle"
          fill="#1C0505"
          fontWeight="900"
          fontSize="12"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="2.5"
        >
          DAERIS
        </text>
      </g>

      {/* Subtexto "FUTSAL MENOR" */}
      <text
        x="80"
        y="158"
        textAnchor="middle"
        fill="#FDE68A"
        fontWeight="700"
        fontSize="7"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="1.8"
      >
        FUTSAL MENOR
      </text>
    </svg>
  );
}

/**
 * Insignia Oficial del Torneo de Prueba
 * Escudo angular moderno en azul eléctrico, cian y plata metálica con copa y saeta.
 */
export function PruebaBadge({ className = "", size = 72 }: BadgeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Gradiente exterior platino / cian */}
        <linearGradient id="pruebaPlatinum" x1="0" y1="0" x2="160" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="30%" stopColor="#38BDF8" />
          <stop offset="70%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#BAE6FD" />
        </linearGradient>

        {/* Gradiente interior azul noche */}
        <linearGradient id="pruebaBlue" x1="80" y1="10" x2="80" y2="170" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0C4A6E" />
          <stop offset="40%" stopColor="#075985" />
          <stop offset="85%" stopColor="#082F49" />
          <stop offset="100%" stopColor="#031525" />
        </linearGradient>

        {/* Gradiente cinta cian eléctrico */}
        <linearGradient id="pruebaCyan" x1="20" y1="120" x2="140" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>

        {/* Resplandor cian */}
        <filter id="pruebaGlow" x="-10" y="-10" width="180" height="200" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0EA5E9" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Escudo exterior angular */}
      <path
        d="M80 8 L148 28 L136 108 L80 172 L24 108 L12 28 Z"
        fill="url(#pruebaPlatinum)"
        filter="url(#pruebaGlow)"
      />

      {/* Escudo interior azul cobalto */}
      <path
        d="M80 14 L142 32 L131 104 L80 164 L29 104 L18 32 Z"
        fill="url(#pruebaBlue)"
      />

      {/* Bisel angular interno */}
      <path
        d="M80 22 L134 38 L125 100 L80 156 L35 100 L26 38 Z"
        stroke="url(#pruebaPlatinum)"
        strokeWidth="1.5"
        strokeOpacity="0.5"
        fill="none"
      />

      {/* Banda diagonal atlética de fondo */}
      <path
        d="M40 35 L120 135 L105 145 L25 45 Z"
        fill="#0284C7"
        opacity="0.25"
      />

      {/* Corona de estrellas superior */}
      <g fill="#38BDF8">
        <polygon points="80,24 81.5,27.5 85,27.5 82,29.5 83.5,33 80,31 76.5,33 78,29.5 75,27.5 78.5,27.5" />
        <polygon points="62,28 63.2,30.8 66,30.8 63.6,32.4 64.8,35.2 62,33.6 59.2,35.2 60.4,32.4 58,30.8 60.8,30.8" />
        <polygon points="98,28 99.2,30.8 102,30.8 99.6,32.4 100.8,35.2 98,33.6 95.2,35.2 96.4,32.4 94,30.8 96.8,30.8" />
      </g>

      {/* Copa / Trofeo de Prueba central estilizado */}
      <g transform="translate(80, 72)">
        {/* Asas de la copa */}
        <path d="M-22 -8 C-28 -8 -28 10 -16 12" stroke="#38BDF8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M22 -8 C28 -8 28 10 16 12" stroke="#38BDF8" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Copa cáliz */}
        <path
          d="M-18 -14 L18 -14 C18 6 12 18 0 20 C-12 18 -18 6 -18 -14 Z"
          fill="#E0F2FE"
          stroke="#0284C7"
          strokeWidth="2"
        />

        {/* Tallo y base de la copa */}
        <path d="M-4 20 L4 20 L6 28 L-6 28 Z" fill="#38BDF8" />
        <path d="M-12 28 L12 28 L14 32 L-14 32 Z" fill="#0284C7" />

        {/* Balón que surge de la copa */}
        <circle cx="0" cy="-14" r="11" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
        <circle cx="0" cy="-14" r="3.5" fill="#0369A1" />
        <path d="M0 -25 L0 -17.5 M-11 -14 L-3.5 -14 M11 -14 L3.5 -14 M-7 -21 L-2.5 -16.5 M7 -21 L2.5 -16.5" stroke="#0284C7" strokeWidth="1.2" />

        {/* Rayo / Saeta cruzada moderna */}
        <polygon
          points="-2,-6 5,-6 1,2 7,2 -4,14 0,4 -5,4"
          fill="#38BDF8"
          stroke="#0C4A6E"
          strokeWidth="0.8"
        />
      </g>

      {/* Cinta inferior moderna */}
      <g filter="url(#pruebaGlow)">
        {/* Laterales de cinta */}
        <polygon points="14,126 28,118 28,138" fill="#0369A1" />
        <polygon points="146,126 132,118 132,138" fill="#0369A1" />

        {/* Placa central de la cinta */}
        <polygon
          points="22,122 138,122 132,144 28,144"
          fill="url(#pruebaCyan)"
          stroke="#E0F2FE"
          strokeWidth="1"
        />

        {/* Texto PRUEBA */}
        <text
          x="80"
          y="137"
          textAnchor="middle"
          fill="#031525"
          fontWeight="900"
          fontSize="11.5"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="3"
        >
          PRUEBA
        </text>
      </g>

      {/* Subtexto "TORNEO PILOTO" */}
      <text
        x="80"
        y="156"
        textAnchor="middle"
        fill="#38BDF8"
        fontWeight="700"
        fontSize="7"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="2"
      >
        FUTSAL MENOR
      </text>
    </svg>
  );
}
