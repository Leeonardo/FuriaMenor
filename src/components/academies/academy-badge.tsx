import React from "react";

interface AcademyBadgeProps {
  slug: string;
  size?: number;
  className?: string;
  logoUrl?: string;
}

export function AcademyBadge({ slug, size = 64, className = "", logoUrl }: AcademyBadgeProps) {
  const s = size;
  const viewBox = "0 0 100 100";

  // Si tiene logo personalizado o es La Paz Futsal
  if (slug === "la-paz-futsal" || logoUrl) {
    const src = logoUrl || "/images/academies/la-paz-futsal.png";
    return (
      <div
        style={{ width: s, height: s }}
        className={`relative inline-flex items-center justify-center overflow-hidden rounded-full shadow-lg transition-transform ${className}`}
      >
        <img
          src={src}
          alt={`Escudo ${slug}`}
          width={s}
          height={s}
          className="h-full w-full object-contain rounded-full drop-shadow-md"
        />
      </div>
    );
  }

  switch (slug) {
    // 1. DVO Paraíso: Escudo Rojo Escarlata con León Dorado
    case "dvo-paraiso":
      return (
        <svg width={s} height={s} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="paraiso-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ef4444" />
              <stop offset="1" stopColor="#991b1b" />
            </linearGradient>
            <linearGradient id="gold-accent" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f59e0b" />
              <stop offset="0.5" stopColor="#fef08a" />
              <stop offset="1" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <path d="M50 4L90 18V50C90 74 50 96 50 96C50 96 10 74 10 50V18L50 4Z" fill="url(#paraiso-bg)" stroke="url(#gold-accent)" strokeWidth="4" />
          <path d="M50 12L82 23V48C82 68 50 86 50 86C50 86 18 68 18 48V23L50 12Z" fill="#171717" fillOpacity="0.3" stroke="url(#gold-accent)" strokeWidth="1.5" />
          {/* Corona y León estilizado */}
          <path d="M38 32L44 38L50 30L56 38L62 32L60 44H40L38 32Z" fill="url(#gold-accent)" />
          <circle cx="50" cy="58" r="14" fill="url(#gold-accent)" fillOpacity="0.2" stroke="url(#gold-accent)" strokeWidth="2" />
          <path d="M44 58H56M50 52V64" stroke="url(#gold-accent)" strokeWidth="2.5" strokeLinecap="round" />
          <text x="50" y="78" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">DVO PARAÍSO</text>
        </svg>
      );

    // 2. Fénix FS: Fuego Naranja & Carmesí con Ave Fénix
    case "fenix-fs":
      return (
        <svg width={s} height={s} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="fenix-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ea580c" />
              <stop offset="1" stopColor="#9a3412" />
            </linearGradient>
            <linearGradient id="fire-glow" x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fde047" />
              <stop offset="0.6" stopColor="#ea580c" />
              <stop offset="1" stopColor="#be123c" />
            </linearGradient>
          </defs>
          <path d="M50 4L88 18V48C88 72 50 96 50 96C50 96 12 72 12 48V18L50 4Z" fill="url(#fenix-bg)" stroke="#fde047" strokeWidth="3.5" />
          {/* Alas de Fénix */}
          <path d="M50 28C42 38 24 40 22 56C30 54 36 50 42 44C38 52 34 60 40 68C44 62 48 54 50 46C52 54 56 62 60 68C66 60 62 52 58 44C64 50 70 54 78 56C76 40 58 38 50 28Z" fill="url(#fire-glow)" />
          <circle cx="50" cy="38" r="3" fill="#ffffff" />
          <text x="50" y="82" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900" fontFamily="sans-serif" letterSpacing="1.5">FÉNIX FS</text>
        </svg>
      );

    // 3. Fratelsa Sport: Escudo Azul Real y Rayas Amarillas con Estrella
    case "fratelsa-sport":
      return (
        <svg width={s} height={s} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="fratelsa-blue" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563eb" />
              <stop offset="1" stopColor="#1e3a8a" />
            </linearGradient>
          </defs>
          <path d="M50 4L90 16V50C90 74 50 96 50 96C50 96 10 74 10 50V16L50 4Z" fill="url(#fratelsa-blue)" stroke="#facc15" strokeWidth="4" />
          {/* Rayas amarillas verticales */}
          <path d="M35 15V80C39 83 45 87 50 90C55 87 61 83 65 80V15H35Z" fill="#1e3a8a" />
          <rect x="42" y="14" width="6" height="73" fill="#facc15" />
          <rect x="52" y="14" width="6" height="73" fill="#facc15" />
          {/* Estrella de campeones */}
          <polygon points="50,26 53,35 62,35 55,41 57,50 50,44 43,50 45,41 38,35 47,35" fill="#facc15" stroke="#ffffff" strokeWidth="0.8" />
          <text x="50" y="68" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">FRATELSA</text>
        </svg>
      );

    // 4. Futsaconexion: Verde Esmeralda y Conexión Digital
    case "futsaconexion":
      return (
        <svg width={s} height={s} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="futsa-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#059669" />
              <stop offset="1" stopColor="#065f46" />
            </linearGradient>
          </defs>
          <path d="M50 4L88 18V50C88 74 50 96 50 96C50 96 12 74 12 50V18L50 4Z" fill="url(#futsa-grad)" stroke="#38bdf8" strokeWidth="3.5" />
          {/* Nodos de conexión */}
          <circle cx="50" cy="36" r="6" fill="#38bdf8" />
          <circle cx="32" cy="56" r="5" fill="#38bdf8" />
          <circle cx="68" cy="56" r="5" fill="#38bdf8" />
          <circle cx="50" cy="68" r="4" fill="#ffffff" />
          <line x1="50" y1="36" x2="32" y2="56" stroke="#ffffff" strokeWidth="2.5" />
          <line x1="50" y1="36" x2="68" y2="56" stroke="#ffffff" strokeWidth="2.5" />
          <line x1="32" y1="56" x2="50" y2="68" stroke="#ffffff" strokeWidth="2" />
          <line x1="68" y1="56" x2="50" y2="68" stroke="#ffffff" strokeWidth="2" />
          <text x="50" y="84" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">FUTSACONEXION</text>
        </svg>
      );

    // 5. Union Libertador: Púrpura y Oro con Antorcha Olímpica
    case "union-libertador":
      return (
        <svg width={s} height={s} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="union-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7c3aed" />
              <stop offset="1" stopColor="#4c1d95" />
            </linearGradient>
          </defs>
          <path d="M50 4L90 16V50C90 74 50 96 50 96C50 96 10 74 10 50V16L50 4Z" fill="url(#union-grad)" stroke="#f59e0b" strokeWidth="4" />
          {/* Antorcha / Llama */}
          <path d="M46 62H54L56 46H44L46 62Z" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
          <path d="M50 26C45 32 44 38 47 44C50 42 52 40 54 44C57 38 55 32 50 26Z" fill="#ef4444" />
          <circle cx="50" cy="38" r="3" fill="#fde047" />
          <text x="50" y="78" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.8">UNIÓN LIBERTADOR</text>
        </svg>
      );

    // 6. Tetsu Futsal: Azul Titanio con Líneas Geométricas de Hierro
    case "tetsu-futsal":
      return (
        <svg width={s} height={s} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="tetsu-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0284c7" />
              <stop offset="1" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <path d="M50 4L90 20V50C90 74 50 96 50 96C50 96 10 74 10 50V20L50 4Z" fill="url(#tetsu-grad)" stroke="#94a3b8" strokeWidth="3.5" />
          {/* Ideograma Tetsu / Armadura geométrica */}
          <polygon points="50,22 74,40 50,58 26,40" fill="none" stroke="#38bdf8" strokeWidth="3" />
          <polygon points="50,30 66,42 50,54 34,42" fill="#38bdf8" fillOpacity="0.3" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="50" cy="42" r="5" fill="#ffffff" />
          <text x="50" y="78" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900" fontFamily="sans-serif" letterSpacing="2">TETSU</text>
        </svg>
      );

    // 7. Black Bulls: Negro Carbón y Rojo Furia con Cuernos de Toro
    case "black-bulls":
      return (
        <svg width={s} height={s} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="bull-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#262626" />
              <stop offset="1" stopColor="#0a0a0a" />
            </linearGradient>
          </defs>
          <path d="M50 4L90 18V50C90 74 50 96 50 96C50 96 10 74 10 50V18L50 4Z" fill="url(#bull-grad)" stroke="#dc2626" strokeWidth="4" />
          {/* Cuernos de Toro */}
          <path d="M26 30C32 30 38 38 42 46C38 44 32 44 26 30Z" fill="#dc2626" stroke="#ffffff" strokeWidth="0.8" />
          <path d="M74 30C68 30 62 38 58 46C62 44 68 44 74 30Z" fill="#dc2626" stroke="#ffffff" strokeWidth="0.8" />
          <ellipse cx="50" cy="52" rx="16" ry="12" fill="#171717" stroke="#dc2626" strokeWidth="2" />
          <circle cx="43" cy="50" r="2.5" fill="#ef4444" />
          <circle cx="57" cy="50" r="2.5" fill="#ef4444" />
          <text x="50" y="78" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">BLACK BULLS</text>
        </svg>
      );

    // 8. Espartanos Cutira: Casco Espartano y Carmesí
    case "espartanos-cutira":
      return (
        <svg width={s} height={s} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="spartan-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#991b1b" />
              <stop offset="1" stopColor="#450a0a" />
            </linearGradient>
          </defs>
          <path d="M50 4L90 18V50C90 74 50 96 50 96C50 96 10 74 10 50V18L50 4Z" fill="url(#spartan-grad)" stroke="#d97706" strokeWidth="4" />
          {/* Casco Espartano */}
          <path d="M50 20C40 20 32 30 32 46C32 58 40 68 50 68C60 68 68 58 68 46C68 30 60 20 50 20Z" fill="#d97706" />
          <path d="M50 26V58M40 38H60" stroke="#450a0a" strokeWidth="4" strokeLinecap="round" />
          <path d="M38 46L34 60M62 46L66 60" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
          <text x="50" y="80" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">ESPARTANOS</text>
        </svg>
      );

    // 9. Academia Winners: Alas de Victoria en Verde Azulado y Naranja
    case "academia-winners":
      return (
        <svg width={s} height={s} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="winners-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0d9488" />
              <stop offset="1" stopColor="#115e59" />
            </linearGradient>
          </defs>
          <path d="M50 4L90 18V50C90 74 50 96 50 96C50 96 10 74 10 50V18L50 4Z" fill="url(#winners-grad)" stroke="#f97316" strokeWidth="3.5" />
          {/* W de Winners estilizada */}
          <path d="M30 34L40 62L50 44L60 62L70 34" stroke="#f97316" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="50" cy="30" r="4" fill="#ffffff" />
          <text x="50" y="80" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="1.2">WINNERS</text>
        </svg>
      );

    // Por defecto: Escudo Furia Menor Genérico
    default:
      return (
        <svg width={s} height={s} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M50 4L90 18V50C90 74 50 96 50 96C50 96 10 74 10 50V18L50 4Z" fill="#1e1e1e" stroke="#dc2626" strokeWidth="3.5" />
          <circle cx="50" cy="46" r="18" fill="#dc2626" fillOpacity="0.2" stroke="#dc2626" strokeWidth="2" />
          <text x="50" y="52" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="900" fontFamily="sans-serif">FM</text>
          <text x="50" y="80" textAnchor="middle" fill="#dc2626" fontSize="7" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">ACADEMIA</text>
        </svg>
      );
  }
}
