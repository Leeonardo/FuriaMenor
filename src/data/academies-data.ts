export type Municipality = "Libertador" | "Chacao" | "Baruta" | "Sucre" | "El Hatillo";

import { OFFICIAL_CLUBS_DATA } from "./official-clubs-data";

export type SportDiscipline = "Fútbol Sala" | "Fútbol Campo" | "Fútbol 7";

export type EntityType = "academia" | "club" | "ambos";

export type AcademyCategory =
  | "Sub-6"
  | "Sub-8"
  | "Sub-10"
  | "Sub-12"
  | "Sub-14"
  | "Sub-16"
  | "Sub-18"
  | "Sub-20";

export interface AcademyPlayer {
  dorsal: number;
  name: string;
  position: "Portero" | "Cierre" | "Ala" | "Pívot" | "Defensa" | "Medio" | "Delantero";
  ci: string;
  birthYear: number;
  goals?: number;
}

export interface CategoryRoster {
  coach: string;
  assistant: string;
  captain?: string;
  players: AcademyPlayer[];
}

export interface AcademyVenue {
  name: string;
  sector: string;
  address: string;
  surface: "Tabloncillo" | "Césped Sintético" | "Cemento Pulido";
  schedule: string;
  googleMapsUrl?: string;
}

export interface AcademyPerformance {
  activeTournament: string;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  averagePosition: string;
  winRate: string;
  achievements: string[];
}

export interface AcademyGalleryItem {
  id: string;
  caption: string;
  category: string;
  colorBg: string;
  aspect: "landscape" | "portrait";
}

export interface Academy {
  id: string;
  slug: string;
  name: string;
  officialName: string;
  shortName: string;
  entityType?: EntityType;
  foundationYear: number;
  founder?: string;
  motto: string;
  bio: string;
  municipality: Municipality;
  zoneDetail: string;
  disciplines: SportDiscipline[];
  categories: AcademyCategory[];
  colors: {
    primary: string;
    secondary: string;
    tertiary?: string;
    textHex: string;
    names: string[];
  };
  socials: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
    email?: string;
    website?: string;
  };
  contact: {
    coordinator: string;
    phone: string;
    officeHours: string;
  };
  venues: AcademyVenue[];
  performance: AcademyPerformance;
  rosters: Partial<Record<AcademyCategory, CategoryRoster>>;
  gallery: AcademyGalleryItem[];
  logoUrl?: string;
  rating?: {
    score: number;
    reviewsCount: number;
    source: string;
  };
  googleMapsUrl?: string;
}

export const CARACAS_MUNICIPALITIES: Municipality[] = [
  "Libertador",
  "Chacao",
  "Baruta",
  "Sucre",
  "El Hatillo",
];

export const SPORT_DISCIPLINES: SportDiscipline[] = [
  "Fútbol Sala",
  "Fútbol 7",
  "Fútbol Campo",
];

export const ACADEMY_CATEGORIES: AcademyCategory[] = [
  "Sub-6",
  "Sub-8",
  "Sub-10",
  "Sub-12",
  "Sub-14",
  "Sub-16",
  "Sub-18",
  "Sub-20",
];

export const academiesData: Academy[] = [
  // 1. DVO Paraíso
  {
    id: "acad-01",
    slug: "dvo-paraiso",
    entityType: "ambos",
    name: "DVO Paraíso",
    officialName: "Deportivo Paraíso Futsal Club",
    shortName: "DVO Paraíso",
    foundationYear: 2014,
    motto: "Disciplina, Pasión y Cantera Caraqueña",
    bio: "Academia referente en el suroeste de Caracas con más de 12 años forjando talentos de alto rendimiento para el fútbol sala menor y selecciones distritales.",
    municipality: "Libertador",
    zoneDetail: "El Paraíso · Av. Páez",
    disciplines: ["Fútbol Sala", "Fútbol 7"],
    categories: ["Sub-6", "Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#dc2626", // Rojo Furia
      secondary: "#fbbf24", // Dorado
      textHex: "#ffffff",
      names: ["Rojo Escarlata", "Oro Olímpico"],
    },
    socials: {
      instagram: "@dvoparaisofc",
      facebook: "dvoparaisofutsal",
      whatsapp: "+58 412 555 0101",
      email: "coordinacion@dvoparaiso.com",
    },
    contact: {
      coordinator: "Prof. Marcos Zambrano",
      phone: "+58 (412) 555-0101",
      officeHours: "Lunes a Viernes: 2:00 PM - 7:30 PM",
    },
    venues: [
      {
        name: "Cancha Gimnasio Libertador del 23 de Enero",
        sector: "23 de Enero",
        address: "Av. Principal del 23 de Enero, Caracas",
        surface: "Tabloncillo",
        schedule: "Martes y Jueves: 3:00 PM - 7:00 PM",
      },
      {
        name: "Polideportivo Parque El Paraíso",
        sector: "El Paraíso",
        address: "Av. José Antonio Páez, frente al Pedagógico",
        surface: "Cemento Pulido",
        schedule: "Sábados: 8:00 AM - 1:00 PM",
      },
    ],
    performance: {
      activeTournament: "Torneo Daeris · Temporada 2026",
      matchesPlayed: 18,
      wins: 13,
      draws: 3,
      losses: 2,
      goalsFor: 64,
      goalsAgainst: 22,
      averagePosition: "2° Lugar General",
      winRate: "72%",
      achievements: [
        "Campeón Torneo Apertura Sub-12 Daeris 2025",
        "Subcampeón Liga Menor Distrital Sub-14 2024",
        "Premio Fair Play Categoría Sub-10 2025",
      ],
    },
    rosters: {
      "Sub-12": {
        coach: "DT. Carlos Méndez",
        assistant: "AT. Robert Silva",
        captain: "Santiago Gómez (#10)",
        players: [
          { dorsal: 1, name: "Diego Albornoz", position: "Portero", ci: "V-34.110.401", birthYear: 2014 },
          { dorsal: 2, name: "Sebastián Rivas", position: "Cierre", ci: "V-34.110.402", birthYear: 2014 },
          { dorsal: 3, name: "Gabriel Mendoza", position: "Cierre", ci: "V-34.110.403", birthYear: 2014 },
          { dorsal: 7, name: "Andrés Velásquez", position: "Ala", ci: "V-34.110.404", birthYear: 2014, goals: 7 },
          { dorsal: 8, name: "Mateo Chacón", position: "Ala", ci: "V-34.110.405", birthYear: 2014, goals: 5 },
          { dorsal: 10, name: "Santiago Gómez", position: "Pívot", ci: "V-34.110.406", birthYear: 2014, goals: 11 },
          { dorsal: 11, name: "Lucas Padrón", position: "Ala", ci: "V-34.110.407", birthYear: 2014, goals: 4 },
          { dorsal: 12, name: "Alejandro Ruiz", position: "Portero", ci: "V-34.110.408", birthYear: 2014 },
        ],
      },
      "Sub-10": {
        coach: "DT. Fernando Quintero",
        assistant: "AT. Marcos Ruiz",
        captain: "Matías Rojas (#9)",
        players: [
          { dorsal: 1, name: "Daniel Briceño", position: "Portero", ci: "V-35.210.101", birthYear: 2016 },
          { dorsal: 4, name: "Samuel Ortiz", position: "Cierre", ci: "V-35.210.102", birthYear: 2016 },
          { dorsal: 8, name: "Joaquín Lugo", position: "Ala", ci: "V-35.210.103", birthYear: 2016, goals: 6 },
          { dorsal: 9, name: "Matías Rojas", position: "Pívot", ci: "V-35.210.104", birthYear: 2016, goals: 9 },
          { dorsal: 10, name: "Enmanuel Paz", position: "Ala", ci: "V-35.210.105", birthYear: 2016, goals: 4 },
        ],
      },
      "Sub-14": {
        coach: "DT. Marcos Zambrano",
        assistant: "AT. Elio Cardozo",
        captain: "Leonardo Herrera (#5)",
        players: [
          { dorsal: 1, name: "Brayan Toro", position: "Portero", ci: "V-32.901.801", birthYear: 2012 },
          { dorsal: 5, name: "Leonardo Herrera", position: "Cierre", ci: "V-32.901.802", birthYear: 2012, goals: 3 },
          { dorsal: 7, name: "Kevin Paredes", position: "Ala", ci: "V-32.901.803", birthYear: 2012, goals: 8 },
          { dorsal: 9, name: "Yonder Escalona", position: "Pívot", ci: "V-32.901.804", birthYear: 2012, goals: 12 },
        ],
      },
    },
    gallery: [
      { id: "g1", caption: "Plantel Sub-12 celebrando el pase a Semifinales en el Gimnasio Libertador", category: "Sub-12", colorBg: "from-red-950 to-neutral-900", aspect: "landscape" },
      { id: "g2", caption: "Entrenamiento táctico de repliegue y transición defensiva", category: "Cantera", colorBg: "from-neutral-900 to-red-950", aspect: "portrait" },
      { id: "g3", caption: "Semillero Sub-8 en jornada de iniciación formativa", category: "Sub-8", colorBg: "from-amber-950 to-neutral-900", aspect: "landscape" },
      { id: "g4", caption: "Entrega de trofeo al arquero menos goleado de la división", category: "Premios", colorBg: "from-neutral-900 to-neutral-950", aspect: "landscape" },
    ],
  },

  // 2. Fénix FS
  {
    id: "acad-02",
    slug: "fenix-fs",
    entityType: "academia",
    name: "Fénix FS",
    officialName: "Fénix Futsal Academia",
    shortName: "Fénix FS",
    foundationYear: 2018,
    motto: "Resurgir, Luchar y Triunfar",
    bio: "Club formador caracterizado por su estilo dinámico, velocidad de juego y alta intensidad en canchas de La Candelaria y San Agustín.",
    municipality: "Libertador",
    zoneDetail: "San Agustín · La Candelaria",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16"],
    colors: {
      primary: "#ea580c", // Naranja Fénix
      secondary: "#e11d48", // Carmesí
      textHex: "#ffffff",
      names: ["Naranja Fuego", "Rojo Rubí"],
    },
    socials: {
      instagram: "@fenixfutsal_ccs",
      whatsapp: "+58 424 112 3344",
      email: "contacto@fenixfs.com.ve",
    },
    contact: {
      coordinator: "Lic. Javier Oropeza",
      phone: "+58 (424) 112-3344",
      officeHours: "Lunes a Jueves: 3:00 PM - 8:00 PM",
    },
    venues: [
      {
        name: "Cancha Municipal Parque Carabobo",
        sector: "La Candelaria",
        address: "Av. Universidad, Parque Carabobo",
        surface: "Cemento Pulido",
        schedule: "Lunes y Miércoles: 4:00 PM - 8:00 PM",
      },
      {
        name: "Complejo Deportivo San Agustín del Norte",
        sector: "San Agustín",
        address: "Final Av. Leonardo da Vinci",
        surface: "Tabloncillo",
        schedule: "Viernes: 3:30 PM - 7:30 PM",
      },
    ],
    performance: {
      activeTournament: "Torneo Daeris · 1ra División",
      matchesPlayed: 16,
      wins: 11,
      draws: 2,
      losses: 3,
      goalsFor: 52,
      goalsAgainst: 26,
      averagePosition: "3° Lugar General",
      winRate: "68%",
      achievements: [
        "Subcampeón Copa Élite Parque Carabobo 2025",
        "Goleador del Torneo Sub-14 2025",
      ],
    },
    rosters: {
      "Sub-12": {
        coach: "DT. Javier Oropeza",
        assistant: "AT. Nelson Blanco",
        captain: "Ángel Romero (#7)",
        players: [
          { dorsal: 1, name: "Moisés Castillo", position: "Portero", ci: "V-34.809.111", birthYear: 2014 },
          { dorsal: 3, name: "Darwin Peña", position: "Cierre", ci: "V-34.809.112", birthYear: 2014 },
          { dorsal: 7, name: "Ángel Romero", position: "Ala", ci: "V-34.809.113", birthYear: 2014, goals: 9 },
          { dorsal: 10, name: "Kendry Salazar", position: "Pívot", ci: "V-34.809.114", birthYear: 2014, goals: 8 },
        ],
      },
    },
    gallery: [
      { id: "g1", caption: "Calentamiento previo al clásico ante DVO Paraíso", category: "Jornada", colorBg: "from-orange-950 to-neutral-900", aspect: "landscape" },
      { id: "g2", caption: "Charla técnica del profesor Oropeza en el entretiempo", category: "Vestuario", colorBg: "from-neutral-900 to-orange-950", aspect: "portrait" },
    ],
  },

  // 3. Fratelsa Sport
  {
    id: "acad-03",
    slug: "fratelsa-sport",
    entityType: "ambos",
    name: "Fratelsa Sport",
    officialName: "Asociación Civil Fratelsa Sport Club",
    shortName: "Fratelsa",
    foundationYear: 2011,
    motto: "Formación de Excelencia y Valores Ciudadanos",
    bio: "Una de las instituciones formativas de mayor envergadura en el este de Caracas, con planteles multidisciplinarios en futsal, fútbol 7 y fútbol campo federado.",
    municipality: "Chacao",
    zoneDetail: "Chacao · Sebucán · Altamira",
    disciplines: ["Fútbol Sala", "Fútbol 7", "Fútbol Campo"],
    categories: ["Sub-6", "Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18", "Sub-20"],
    colors: {
      primary: "#2563eb", // Azul Real
      secondary: "#facc15", // Amarillo Canario
      textHex: "#ffffff",
      names: ["Azul Real", "Amarillo Canario"],
    },
    socials: {
      instagram: "@fratelsasport",
      facebook: "fratelsasportoficial",
      whatsapp: "+58 414 200 8899",
      website: "https://fratelsasport.com",
    },
    contact: {
      coordinator: "Prof. Gerardo Benítez",
      phone: "+58 (414) 200-8899",
      officeHours: "Lunes a Viernes: 1:30 PM - 7:00 PM",
    },
    venues: [
      {
        name: "Complejo Deportivo Sebucán",
        sector: "Sebucán",
        address: "Av. Principal de Sebucán con Av. Los Chorros",
        surface: "Césped Sintético",
        schedule: "Lunes a Jueves: 3:00 PM - 7:00 PM",
      },
      {
        name: "Canchas Bello Campo Chacao",
        sector: "Chacao",
        address: "Calle Los Ángeles, Bello Campo",
        surface: "Tabloncillo",
        schedule: "Viernes y Sábados: 8:00 AM - 12:00 PM",
      },
    ],
    performance: {
      activeTournament: "Torneo Daeris · Liga Élite Infantil",
      matchesPlayed: 20,
      wins: 15,
      draws: 3,
      losses: 2,
      goalsFor: 78,
      goalsAgainst: 18,
      averagePosition: "1° Lugar General",
      winRate: "75%",
      achievements: [
        "Campeón Torneo Daeris Infantil Sub-10 2025",
        "Campeón Torneo Daeris Infantil Sub-12 2025",
        "Valla Menos Vencida de Caracas Sub-12 2025",
      ],
    },
    rosters: {
      "Sub-12": {
        coach: "DT. Gerardo Benítez",
        assistant: "AT. Alejandro Moros",
        captain: "Mathías Silva (#8)",
        players: [
          { dorsal: 1, name: "Juan Pablo Cárdenas", position: "Portero", ci: "V-34.500.201", birthYear: 2014 },
          { dorsal: 2, name: "César Infante", position: "Cierre", ci: "V-34.500.202", birthYear: 2014 },
          { dorsal: 8, name: "Mathías Silva", position: "Ala", ci: "V-34.500.203", birthYear: 2014, goals: 10 },
          { dorsal: 10, name: "Ignacio Vegas", position: "Pívot", ci: "V-34.500.204", birthYear: 2014, goals: 13 },
        ],
      },
      "Sub-8": {
        coach: "DT. Valentina Suárez",
        assistant: "AT. Carlos Bello",
        players: [
          { dorsal: 1, name: "Lucas Mora", position: "Portero", ci: "V-36.100.901", birthYear: 2018 },
          { dorsal: 7, name: "Thiago Benítez", position: "Ala", ci: "V-36.100.902", birthYear: 2018, goals: 8 },
        ],
      },
    },
    gallery: [
      { id: "g1", caption: "Ceremonia de premiación campeones Sub-10 en Sebucán", category: "Campeones", colorBg: "from-blue-950 to-neutral-900", aspect: "landscape" },
      { id: "g2", caption: "Postales del entrenamiento vespertino categoría Sub-16", category: "Entrenamientos", colorBg: "from-neutral-900 to-blue-950", aspect: "portrait" },
    ],
  },

  // 4. Futsaconexion
  {
    id: "acad-04",
    slug: "futsaconexion",
    entityType: "academia",
    name: "Futsaconexion",
    officialName: "Club Social y Deportivo Futsaconexion",
    shortName: "Futconexión",
    foundationYear: 2019,
    motto: "Conectando Juventud, Deporte y Futuro",
    bio: "Proyecto de impacto social y deportivo que conecta niños y jóvenes del oeste caraqueño a través de la competencia sana y el fútbol sala formativo.",
    municipality: "Libertador",
    zoneDetail: "La Vega · Montalbán",
    disciplines: ["Fútbol Sala", "Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#059669", // Verde Esmeralda
      secondary: "#0284c7", // Azul Cielo
      textHex: "#ffffff",
      names: ["Verde Esperanza", "Azul Eléctrico"],
    },
    socials: {
      instagram: "@futsaconexion_ccs",
      whatsapp: "+58 412 889 1234",
      email: "contacto@futsaconexion.com",
    },
    contact: {
      coordinator: "Prof. Franklin Colmenares",
      phone: "+58 (412) 889-1234",
      officeHours: "Martes a Sábado: 2:00 PM - 6:30 PM",
    },
    venues: [
      {
        name: "Cancha Deportiva La Vega",
        sector: "La Vega",
        address: "Sector Los Cangilones, Cancha Central",
        surface: "Cemento Pulido",
        schedule: "Martes y Jueves: 3:00 PM - 6:30 PM",
      },
      {
        name: "Gimnasio Cubierto Montalbán",
        sector: "Montalbán",
        address: "Av. Teherán, diagonal a la UCAB",
        surface: "Tabloncillo",
        schedule: "Sábados: 9:00 AM - 1:00 PM",
      },
    ],
    performance: {
      activeTournament: "Torneo Daeris · 1ra División",
      matchesPlayed: 15,
      wins: 9,
      draws: 3,
      losses: 3,
      goalsFor: 44,
      goalsAgainst: 24,
      averagePosition: "4° Lugar General",
      winRate: "60%",
      achievements: [
        "Campeón Copa Navidad La Vega 2024",
        "Clasificados a Liguilla Final Torneo Daeris 2026",
      ],
    },
    rosters: {
      "Sub-12": {
        coach: "DT. Franklin Colmenares",
        assistant: "AT. Yorman Torres",
        captain: "Jonathan Lugo (#10)",
        players: [
          { dorsal: 1, name: "Jesús Palacios", position: "Portero", ci: "V-34.700.101", birthYear: 2014 },
          { dorsal: 5, name: "Yonder Bello", position: "Cierre", ci: "V-34.700.102", birthYear: 2014 },
          { dorsal: 10, name: "Jonathan Lugo", position: "Ala", ci: "V-34.700.103", birthYear: 2014, goals: 7 },
        ],
      },
    },
    gallery: [
      { id: "g1", caption: "Jornada dominical en las canchas de Montalbán", category: "Torneo", colorBg: "from-emerald-950 to-neutral-900", aspect: "landscape" },
    ],
  },

  // 5. Union Libertador
  {
    id: "acad-05",
    slug: "union-libertador",
    entityType: "ambos",
    name: "Union Libertador",
    officialName: "Club Unión Libertador Futsal",
    shortName: "Unión Lib",
    foundationYear: 2008,
    motto: "Tradición, Cantera y Orgullo del 23",
    bio: "Decano del fútbol sala comunitario con sede histórica en el 23 de Enero. Ha impulsado a más de una veintena de atletas a ligas profesionales nacionales.",
    municipality: "Libertador",
    zoneDetail: "23 de Enero · Caño Amarillo",
    disciplines: ["Fútbol Sala", "Fútbol 7"],
    categories: ["Sub-6", "Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18", "Sub-20"],
    colors: {
      primary: "#7c3aed", // Púrpura Imperial
      secondary: "#f59e0b", // Ámbar
      textHex: "#ffffff",
      names: ["Púrpura Libertador", "Oro Caraqueño"],
    },
    socials: {
      instagram: "@unionlibertadorfs",
      facebook: "unionlibertadorfutsal",
      whatsapp: "+58 416 333 4455",
    },
    contact: {
      coordinator: "Prof. Argenis Montero",
      phone: "+58 (416) 333-4455",
      officeHours: "Lunes a Viernes: 2:00 PM - 7:00 PM",
    },
    venues: [
      {
        name: "Cancha Gimnasio Libertador del 23 de Enero",
        sector: "23 de Enero",
        address: "Av. Principal del 23 de Enero, Caracas",
        surface: "Tabloncillo",
        schedule: "Lunes a Viernes: 3:00 PM - 8:00 PM",
      },
    ],
    performance: {
      activeTournament: "Torneo Daeris · 1ra División",
      matchesPlayed: 19,
      wins: 12,
      draws: 4,
      losses: 3,
      goalsFor: 58,
      goalsAgainst: 28,
      averagePosition: "3° Lugar General",
      winRate: "63%",
      achievements: [
        "Tricampeón Municipal Futsal Menor (2022, 2023, 2024)",
        "Mejor Escuela Formativa del Municipio Libertador 2024",
      ],
    },
    rosters: {
      "Sub-12": {
        coach: "DT. Argenis Montero",
        assistant: "AT. Wilmer Castro",
        captain: "Gabriel Pacheco (#4)",
        players: [
          { dorsal: 1, name: "Keiber Gómez", position: "Portero", ci: "V-34.333.101", birthYear: 2014 },
          { dorsal: 4, name: "Gabriel Pacheco", position: "Cierre", ci: "V-34.333.102", birthYear: 2014, goals: 3 },
          { dorsal: 9, name: "Luis Carmona", position: "Pívot", ci: "V-34.333.103", birthYear: 2014, goals: 11 },
        ],
      },
    },
    gallery: [
      { id: "g1", caption: "Fiesta de la afición en las gradas del 23 de Enero", category: "Gradas", colorBg: "from-purple-950 to-neutral-900", aspect: "landscape" },
    ],
  },

  // 6. Tetsu Futsal
  {
    id: "acad-06",
    slug: "tetsu-futsal",
    entityType: "academia",
    name: "Tetsu Futsal",
    officialName: "Club Deportivo Tetsu Futsal",
    shortName: "Tetsu",
    foundationYear: 2020,
    motto: "Voluntad de Hierro y Puntería Implacable",
    bio: "Academia especializada en técnica individual y sistemas tácticos modernos de fútbol sala con base en el eje este de la Gran Caracas.",
    municipality: "Sucre",
    zoneDetail: "La California · Petare · Los Ruices",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-10", "Sub-12", "Sub-14", "Sub-16"],
    colors: {
      primary: "#0284c7", // Azul Petróleo
      secondary: "#64748b", // Gris Titanio
      textHex: "#ffffff",
      names: ["Azul Titanio", "Plata Deportivo"],
    },
    socials: {
      instagram: "@tetsufutsal",
      whatsapp: "+58 424 990 0101",
      email: "tetsu@deportivocaracas.com",
    },
    contact: {
      coordinator: "Prof. Kenjiro Takahashi",
      phone: "+58 (424) 990-0101",
      officeHours: "Martes a Jueves: 3:00 PM - 7:00 PM",
    },
    venues: [
      {
        name: "Polideportivo La California Norte",
        sector: "La California",
        address: "Av. Sanz con Av. Francisco de Miranda",
        surface: "Tabloncillo",
        schedule: "Martes y Jueves: 4:00 PM - 7:30 PM",
      },
    ],
    performance: {
      activeTournament: "Torneo Daeris · 2da División",
      matchesPlayed: 14,
      wins: 9,
      draws: 2,
      losses: 3,
      goalsFor: 41,
      goalsAgainst: 21,
      averagePosition: "2° Lugar Ascenso",
      winRate: "64%",
      achievements: [
        "Líder de Goleo en Fase Regular Torneo Daeris 2da Div",
      ],
    },
    rosters: {
      "Sub-12": {
        coach: "DT. Kenjiro Takahashi",
        assistant: "AT. Daniel Alviarez",
        captain: "Manuel Rojas (#10)",
        players: [
          { dorsal: 1, name: "Reinaldo Silva", position: "Portero", ci: "V-34.990.101", birthYear: 2014 },
          { dorsal: 10, name: "Manuel Rojas", position: "Pívot", ci: "V-34.990.102", birthYear: 2014, goals: 9 },
        ],
      },
    },
    gallery: [
      { id: "g1", caption: "Sesión de disparo a puerta y jugadas preparadas en táctica fija", category: "Táctica", colorBg: "from-sky-950 to-neutral-900", aspect: "landscape" },
    ],
  },

  // 7. Black Bulls
  {
    id: "acad-07",
    slug: "black-bulls",
    entityType: "academia",
    name: "Black Bulls",
    officialName: "Black Bulls Academy Club",
    shortName: "Black Bulls",
    foundationYear: 2017,
    motto: "Fuerza, Carácter y Victoria",
    bio: "Club de alto despliegue físico y formación táctica con sedes en Las Mercedes y Santa Fe, enfocado en el desarrollo competitivo integral.",
    municipality: "Baruta",
    zoneDetail: "Santa Fe · Las Mercedes",
    disciplines: ["Fútbol 7", "Fútbol Sala"],
    categories: ["Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#171717", // Negro Carbón
      secondary: "#dc2626", // Rojo Furia
      textHex: "#ffffff",
      names: ["Negro Onix", "Rojo Sangre"],
    },
    socials: {
      instagram: "@blackbulls_ccs",
      whatsapp: "+58 414 777 2211",
    },
    contact: {
      coordinator: "Prof. Ricardo Falconi",
      phone: "+58 (414) 777-2211",
      officeHours: "Lunes a Viernes: 2:00 PM - 6:30 PM",
    },
    venues: [
      {
        name: "Canchas Polideportivo Santa Fe",
        sector: "Santa Fe Norte",
        address: "Av. José María Vargas, Santa Fe",
        surface: "Césped Sintético",
        schedule: "Lunes a Jueves: 3:30 PM - 7:30 PM",
      },
    ],
    performance: {
      activeTournament: "Torneo Daeris · 2da División",
      matchesPlayed: 14,
      wins: 8,
      draws: 2,
      losses: 4,
      goalsFor: 39,
      goalsAgainst: 26,
      averagePosition: "4° Lugar",
      winRate: "57%",
      achievements: [
        "Subcampeón Torneo Baruta Futsal Cup 2024",
      ],
    },
    rosters: {
      "Sub-12": {
        coach: "DT. Ricardo Falconi",
        assistant: "AT. Gustavo Vielma",
        players: [
          { dorsal: 1, name: "Christian Bravo", position: "Portero", ci: "V-34.660.101", birthYear: 2014 },
          { dorsal: 9, name: "Mauricio Bello", position: "Pívot", ci: "V-34.660.102", birthYear: 2014, goals: 7 },
        ],
      },
    },
    gallery: [
      { id: "g1", caption: "Cuadrangular de preparación en Santa Fe", category: "Amistoso", colorBg: "from-neutral-900 to-red-950", aspect: "landscape" },
    ],
  },

  // 8. Espartanos Cutira
  {
    id: "acad-08",
    slug: "espartanos-cutira",
    entityType: "academia",
    name: "Espartanos Cutira",
    officialName: "Club Deportivo Espartanos de Cutira",
    shortName: "Espartanos",
    foundationYear: 2016,
    motto: "Corazón Guerrero en Cada Partido",
    bio: "Auténtica cantera popular en el sector Cutira de Catia. Cantera prolífica en la detección de talentos rápidos y con gran dominio del balón pie a pie.",
    municipality: "Libertador",
    zoneDetail: "Catia · Cutira · Sucre",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16"],
    colors: {
      primary: "#b91c1c", // Carmesí Espartano
      secondary: "#78716c", // Bronce
      textHex: "#ffffff",
      names: ["Carmesí Espartano", "Bronce Antiguo"],
    },
    socials: {
      instagram: "@espartanos_cutira",
      whatsapp: "+58 412 444 8822",
    },
    contact: {
      coordinator: "Prof. Héctor Guédez",
      phone: "+58 (412) 444-8822",
      officeHours: "Lunes a Viernes: 3:00 PM - 7:30 PM",
    },
    venues: [
      {
        name: "Cancha Techada de Cutira",
        sector: "Cutira, Catia",
        address: "Av. Sucre, sector Cutira",
        surface: "Cemento Pulido",
        schedule: "Lunes a Viernes: 3:30 PM - 7:30 PM",
      },
    ],
    performance: {
      activeTournament: "Torneo Daeris · 1ra División",
      matchesPlayed: 15,
      wins: 10,
      draws: 2,
      losses: 3,
      goalsFor: 49,
      goalsAgainst: 25,
      averagePosition: "3° Lugar",
      winRate: "66%",
      achievements: [
        "Campeón Copa Ciudad de Catia 2024",
      ],
    },
    rosters: {
      "Sub-12": {
        coach: "DT. Héctor Guédez",
        assistant: "AT. Jean Carlos Rivas",
        players: [
          { dorsal: 1, name: "Yonder Medina", position: "Portero", ci: "V-34.444.101", birthYear: 2014 },
          { dorsal: 10, name: "Brayan Escalona", position: "Ala", ci: "V-34.444.102", birthYear: 2014, goals: 10 },
        ],
      },
    },
    gallery: [
      { id: "g1", caption: "Celebración en la cancha de Cutira tras triunfo en la última fecha", category: "Victoria", colorBg: "from-red-950 to-neutral-900", aspect: "landscape" },
    ],
  },

  // 9. Academia Winners
  {
    id: "acad-09",
    slug: "academia-winners",
    entityType: "academia",
    name: "Academia Winners",
    officialName: "Winners Soccer Academy El Hatillo",
    shortName: "Winners",
    foundationYear: 2019,
    motto: "Metodología, Formación y Triunfo",
    bio: "Metodología de entrenamiento europeo aplicada al fútbol menor caraqueño. Instalaciones de césped sintético y preparación integral de arqueros y jugadores de campo.",
    municipality: "El Hatillo",
    zoneDetail: "La Boyera · Los Naranjos",
    disciplines: ["Fútbol Campo", "Fútbol 7", "Fútbol Sala"],
    categories: ["Sub-6", "Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#0d9488", // Verde Azulado
      secondary: "#f97316", // Naranja Eléctrico
      textHex: "#ffffff",
      names: ["Verde Azulado", "Naranja Eléctrico"],
    },
    socials: {
      instagram: "@winnersacademy_ccs",
      whatsapp: "+58 414 330 9988",
      email: "info@winnersacademy.com",
    },
    contact: {
      coordinator: "Prof. Stephanie De Sousa",
      phone: "+58 (414) 330-9988",
      officeHours: "Lunes a Viernes: 2:00 PM - 7:00 PM",
    },
    venues: [
      {
        name: "Complejo Deportivo La Boyera",
        sector: "La Boyera",
        address: "Av. Intercomunal La Boyera, El Hatillo",
        surface: "Césped Sintético",
        schedule: "Lunes a Jueves: 3:00 PM - 7:00 PM",
      },
    ],
    performance: {
      activeTournament: "Torneo Daeris · Liga Desarrollo",
      matchesPlayed: 14,
      wins: 8,
      draws: 3,
      losses: 3,
      goalsFor: 42,
      goalsAgainst: 22,
      averagePosition: "3° Lugar General",
      winRate: "57%",
      achievements: [
        "Campeón Festival de Escuelas del Hatillo 2025",
      ],
    },
    rosters: {
      "Sub-12": {
        coach: "DT. Stephanie De Sousa",
        assistant: "AT. Luis Da Silva",
        players: [
          { dorsal: 1, name: "Felipe Da Silva", position: "Portero", ci: "V-34.220.101", birthYear: 2014 },
          { dorsal: 7, name: "Joao Dos Santos", position: "Ala", ci: "V-34.220.102", birthYear: 2014, goals: 8 },
        ],
      },
    },
    gallery: [
      { id: "g1", caption: "Clínica deportiva con profesores internacionales en La Boyera", category: "Clínicas", colorBg: "from-teal-950 to-neutral-900", aspect: "landscape" },
    ],
  },
  // 10. La Paz Futsal (Cancha de Futsal La Paz)
  {
    id: "acad-10",
    slug: "la-paz-futsal",
    entityType: "ambos",
    name: "La Paz Futsal",
    officialName: "Club Deportivo & Cancha de Futsal La Paz",
    shortName: "La Paz FS",
    foundationYear: 2017,
    founder: "Karing Hunbg",
    motto: "Pasión, garra y formación deportiva comunitaria",
    bio: "Emblemático club deportivo y centro neurálgico del fútbol sala menor en Caracas, fundado por Karing Hunbg y bajo la coordinación general de Eudis Toro. Con sede en la Cancha de Futsal La Paz, es hogar de torneos comunales y federados de alto nivel, formando atletas desde la categoría Sub-8 hasta Sub-18 con valores de disciplina y compañerismo.",
    municipality: "Libertador",
    zoneDetail: "Sector La Paz · F3J3+88X Caracas 1020",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    logoUrl: "/images/academies/la-paz-futsal.png",
    rating: {
      score: 4.0,
      reviewsCount: 10,
      source: "Google Maps",
    },
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=F3J3%2B88X%2C+Caracas+1020%2C+Distrito+Capital",
    colors: {
      primary: "#3e7a3a", // Verde Césped Oficial del Escudo
      secondary: "#1a1f4b", // Azul Marino
      tertiary: "#ffffff", // Blanco
      textHex: "#ffffff",
      names: ["Verde Cancha", "Azul Marino", "Blanco"],
    },
    socials: {
      instagram: "@lapaz_futsal",
      facebook: "canchafutsallapaz",
      whatsapp: "+58 414-2345678",
      email: "lapazfutsal.caracas@gmail.com",
    },
    contact: {
      coordinator: "Eudis Toro",
      phone: "+58 414-2345678",
      officeHours: "Lunes a Sábado: 8:00 AM - 9:00 PM",
    },
    venues: [
      {
        name: "Cancha de Futsal LA PAZ",
        sector: "Sector La Paz, El Paraíso / La Vega",
        address: "F3J3+88X, Caracas 1020, Distrito Capital",
        surface: "Césped Sintético",
        schedule: "Lunes a Viernes 2:30 PM - 8:30 PM | Sábados 8:30 AM - 3:00 PM",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=F3J3%2B88X%2C+Caracas+1020%2C+Distrito+Capital",
      },
    ],
    performance: {
      activeTournament: "Torneo Daeris 1era División Sub-12 (Grupo A)",
      matchesPlayed: 4,
      wins: 2,
      draws: 0,
      losses: 2,
      goalsFor: 11,
      goalsAgainst: 5,
      averagePosition: "8° Lugar Grupo A (Clasificación a Cuartos)",
      winRate: "50%",
      achievements: [
        "Sede anfitriona oficial de jornadas del Torneo Daeris y torneos distritales",
        "Calificación comunitaria destacada de 4.0 estrellas en Google Maps",
        "Subcampeón Copa Amistad Futsal Infantil 2025",
      ],
    },
    rosters: {
      "Sub-8": {
        coach: "DT. Alejandro Márquez",
        assistant: "AT. Roberto Peña",
        captain: "Sebastián Blanco",
        players: [
          { dorsal: 1, name: "Lucas Gil", position: "Portero", ci: "V-37.100.201", birthYear: 2018 },
          { dorsal: 4, name: "Sebastián Blanco", position: "Cierre", ci: "V-37.100.202", birthYear: 2018, goals: 2 },
          { dorsal: 8, name: "Matías Salazar", position: "Ala", ci: "V-37.100.203", birthYear: 2018, goals: 3 },
          { dorsal: 10, name: "Thiago Padrón", position: "Ala", ci: "V-37.100.204", birthYear: 2018, goals: 5 },
          { dorsal: 9, name: "Diego Cárdenas", position: "Pívot", ci: "V-37.100.205", birthYear: 2018, goals: 4 },
        ],
      },
      "Sub-10": {
        coach: "DT. Carlos Morales",
        assistant: "AT. Jesús Castillo",
        captain: "Diego Colmenares",
        players: [
          { dorsal: 1, name: "Jhoan Valera", position: "Portero", ci: "V-35.880.110", birthYear: 2016 },
          { dorsal: 3, name: "Diego Colmenares", position: "Cierre", ci: "V-35.880.111", birthYear: 2016, goals: 1 },
          { dorsal: 7, name: "Samuel Uzcátegui", position: "Ala", ci: "V-35.880.112", birthYear: 2016, goals: 6 },
          { dorsal: 11, name: "Gabriel Rondón", position: "Ala", ci: "V-35.880.113", birthYear: 2016, goals: 4 },
          { dorsal: 9, name: "Enmanuel Prieto", position: "Pívot", ci: "V-35.880.114", birthYear: 2016, goals: 7 },
        ],
      },
      "Sub-12": {
        coach: "DT. Carlos Morales",
        assistant: "AT. Gabriel Navarro",
        captain: "Ángel Rivas",
        players: [
          { dorsal: 1, name: "Yonder Martínez", position: "Portero", ci: "V-34.190.201", birthYear: 2014 },
          { dorsal: 2, name: "Ángel Rivas", position: "Cierre", ci: "V-34.190.202", birthYear: 2014, goals: 2 },
          { dorsal: 7, name: "Kevin Suárez", position: "Ala", ci: "V-34.190.203", birthYear: 2014, goals: 4 },
          { dorsal: 10, name: "Moisés Chacón", position: "Ala", ci: "V-34.190.204", birthYear: 2014, goals: 3 },
          { dorsal: 9, name: "Jesús Da Silva", position: "Pívot", ci: "V-34.190.205", birthYear: 2014, goals: 2 },
          { dorsal: 12, name: "Alejandro Torrealba", position: "Portero", ci: "V-34.190.206", birthYear: 2014 },
          { dorsal: 5, name: "Santiago Pernía", position: "Cierre", ci: "V-34.190.207", birthYear: 2014 },
          { dorsal: 11, name: "Dilan Oropeza", position: "Ala", ci: "V-34.190.208", birthYear: 2014 },
        ],
      },
      "Sub-14": {
        coach: "DT. Reinaldo Vargas",
        assistant: "AT. Pedro Sutil",
        captain: "Maikol Hernández",
        players: [
          { dorsal: 1, name: "Brayan López", position: "Portero", ci: "V-32.900.301", birthYear: 2012 },
          { dorsal: 4, name: "Maikol Hernández", position: "Cierre", ci: "V-32.900.302", birthYear: 2012, goals: 1 },
          { dorsal: 8, name: "Erick Zambrano", position: "Ala", ci: "V-32.900.303", birthYear: 2012, goals: 5 },
          { dorsal: 10, name: "Juan Pablo Meza", position: "Ala", ci: "V-32.900.304", birthYear: 2012, goals: 3 },
          { dorsal: 9, name: "Aarón Quintero", position: "Pívot", ci: "V-32.900.305", birthYear: 2012, goals: 6 },
        ],
      },
      "Sub-16": {
        coach: "DT. Reinaldo Vargas",
        assistant: "AT. Marcos Ruiz",
        captain: "Santiago Mendoza",
        players: [
          { dorsal: 1, name: "César Villamizar", position: "Portero", ci: "V-31.420.501", birthYear: 2010 },
          { dorsal: 3, name: "Santiago Mendoza", position: "Cierre", ci: "V-31.420.502", birthYear: 2010, goals: 2 },
          { dorsal: 7, name: "Luisángel Torres", position: "Ala", ci: "V-31.420.503", birthYear: 2010, goals: 7 },
          { dorsal: 9, name: "Wilker Briceño", position: "Pívot", ci: "V-31.420.504", birthYear: 2010, goals: 8 },
        ],
      },
      "Sub-18": {
        coach: "DT. Nelson Betancourt",
        assistant: "AT. Marcos Ruiz",
        captain: "Brayan Contreras",
        players: [
          { dorsal: 1, name: "José Miguel Bravo", position: "Portero", ci: "V-30.150.801", birthYear: 2008 },
          { dorsal: 5, name: "Brayan Contreras", position: "Cierre", ci: "V-30.150.802", birthYear: 2008, goals: 3 },
          { dorsal: 10, name: "Enderson Figuera", position: "Ala", ci: "V-30.150.803", birthYear: 2008, goals: 9 },
          { dorsal: 9, name: "Kelvin Arismendi", position: "Pívot", ci: "V-30.150.804", birthYear: 2008, goals: 11 },
        ],
      },
    },
    gallery: [
      {
        id: "lp-g1",
        caption: "Cancha de Futsal La Paz: jornada deportiva de fin de semana con gradas colmadas",
        category: "Cancha Local",
        colorBg: "from-green-950 to-neutral-900",
        aspect: "landscape",
      },
      {
        id: "lp-g2",
        caption: "Entrenamiento vespertino de la plantilla Sub-12 preparando la fase eliminatoria",
        category: "Entrenamientos",
        colorBg: "from-emerald-950 to-neutral-900",
        aspect: "landscape",
      },
      {
        id: "lp-g3",
        caption: "Celebración y foto de equipo tras la victoria en jornada oficial",
        category: "Torneo Daeris",
        colorBg: "from-blue-950 to-neutral-900",
        aspect: "portrait",
      },
      {
        id: "lp-g4",
        caption: "Cuerpo técnico y semillero de iniciación en la cancha sintética",
        category: "Semillero",
        colorBg: "from-teal-950 to-neutral-900",
        aspect: "landscape",
      },
    ],
  },
  // La Ladera
  {
    id: "acad-11",
    slug: "la-ladera",
    entityType: "academia",
    name: "La Ladera",
    officialName: "La Ladera",
    shortName: "La Ladera",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Fuerza Vinotinto
  {
    id: "acad-12",
    slug: "fuerza-vinotinto",
    entityType: "academia",
    name: "Fuerza Vinotinto",
    officialName: "Fuerza Vinotinto",
    shortName: "Fuerza Vinotinto",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Guatire Futsal
  {
    id: "acad-13",
    slug: "guatire-futsal",
    entityType: "academia",
    name: "Guatire Futsal",
    officialName: "Guatire Futsal",
    shortName: "Guatire Futsal",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Sucre",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Real Esperanza
  {
    id: "acad-14",
    slug: "real-esperanza",
    entityType: "academia",
    name: "Real Esperanza",
    officialName: "Real Esperanza",
    shortName: "Real Esperanza",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Élite Caracas
  {
    id: "acad-15",
    slug: "elite-caracas",
    entityType: "academia",
    name: "Élite Caracas",
    officialName: "Élite Caracas",
    shortName: "Élite Caracas",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Hogar Canario
  {
    id: "acad-16",
    slug: "hogar-canario",
    entityType: "academia",
    name: "Hogar Canario",
    officialName: "Hogar Canario",
    shortName: "Hogar Canario",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // NC Sport
  {
    id: "acad-17",
    slug: "nc-sport",
    entityType: "ambos",
    name: "NC Sport",
    officialName: "NC Sport",
    shortName: "NC Sport",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Fusión Académica
  {
    id: "acad-18",
    slug: "fusion-academica",
    entityType: "academia",
    name: "Fusión Académica",
    officialName: "Fusión Académica",
    shortName: "Fusión Académica",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Alí Primera
  {
    id: "acad-19",
    slug: "ali-primera",
    entityType: "academia",
    name: "Alí Primera",
    officialName: "Alí Primera",
    shortName: "Alí Primera",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Inter de Caracas
  {
    id: "acad-20",
    slug: "inter-de-caracas",
    entityType: "academia",
    name: "Inter de Caracas",
    officialName: "Inter de Caracas",
    shortName: "Inter de Caracas",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Real Libertad
  {
    id: "acad-21",
    slug: "real-libertad",
    entityType: "academia",
    name: "Real Libertad",
    officialName: "Real Libertad",
    shortName: "Real Libertad",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Deportivo Mirador
  {
    id: "acad-22",
    slug: "dvo-mirador",
    entityType: "academia",
    name: "Deportivo Mirador",
    officialName: "Deportivo Mirador",
    shortName: "Deportivo Mirador",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Intocable
  {
    id: "acad-23",
    slug: "intocable",
    entityType: "academia",
    name: "Intocable",
    officialName: "Intocable",
    shortName: "Intocable",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Deportivo Manaure
  {
    id: "acad-24",
    slug: "dvo-manaure",
    entityType: "academia",
    name: "Deportivo Manaure",
    officialName: "Deportivo Manaure",
    shortName: "Deportivo Manaure",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Funvibra
  {
    id: "acad-25",
    slug: "funvibra",
    entityType: "academia",
    name: "Funvibra",
    officialName: "Funvibra",
    shortName: "Funvibra",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Ricardinho
  {
    id: "acad-26",
    slug: "ricardinho",
    entityType: "academia",
    name: "Ricardinho",
    officialName: "Ricardinho",
    shortName: "Ricardinho",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // FALG
  {
    id: "acad-27",
    slug: "falg",
    entityType: "academia",
    name: "FALG",
    officialName: "FALG",
    shortName: "FALG",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Gladiadores Caricuao
  {
    id: "acad-28",
    slug: "gladiadores-caricuao",
    entityType: "academia",
    name: "Gladiadores Caricuao",
    officialName: "Gladiadores Caricuao",
    shortName: "Gladiadores Caricuao",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Caricuao
  {
    id: "acad-29",
    slug: "caricuao",
    entityType: "academia",
    name: "Caricuao",
    officialName: "Caricuao",
    shortName: "Caricuao",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Felinos FS
  {
    id: "acad-30",
    slug: "felinos-fs",
    entityType: "academia",
    name: "Felinos FS",
    officialName: "Felinos FS",
    shortName: "Felinos FS",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Deportivo JC
  {
    id: "acad-31",
    slug: "dvo-jc",
    entityType: "academia",
    name: "Deportivo JC",
    officialName: "Deportivo JC",
    shortName: "Deportivo JC",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Foro Libertador
  {
    id: "acad-32",
    slug: "foro-libertador",
    entityType: "academia",
    name: "Foro Libertador",
    officialName: "Foro Libertador",
    shortName: "Foro Libertador",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Camatagua
  {
    id: "acad-33",
    slug: "camatagua",
    entityType: "academia",
    name: "Camatagua",
    officialName: "Camatagua",
    shortName: "Camatagua",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Deportivo Odín
  {
    id: "acad-34",
    slug: "dvo-odin",
    entityType: "academia",
    name: "Deportivo Odín",
    officialName: "Deportivo Odín",
    shortName: "Deportivo Odín",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Team Soublette
  {
    id: "acad-35",
    slug: "team-soublette",
    entityType: "academia",
    name: "Team Soublette",
    officialName: "Team Soublette",
    shortName: "Team Soublette",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Overcoming
  {
    id: "acad-36",
    slug: "overcoming",
    entityType: "ambos",
    name: "Overcoming",
    officialName: "Overcoming",
    shortName: "Overcoming",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol Sala"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Nacional
  {
    id: "acad-37",
    slug: "nacional-f7",
    entityType: "club",
    name: "Nacional",
    officialName: "Nacional",
    shortName: "Nacional",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Tuyeros FC
  {
    id: "acad-38",
    slug: "tuyeros-fc",
    entityType: "club",
    name: "Tuyeros FC",
    officialName: "Tuyeros FC",
    shortName: "Tuyeros FC",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Inversiones MA
  {
    id: "acad-39",
    slug: "inversiones-ma",
    entityType: "club",
    name: "Inversiones MA",
    officialName: "Inversiones MA",
    shortName: "Inversiones MA",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Los Expertos
  {
    id: "acad-40",
    slug: "los-expertos",
    entityType: "club",
    name: "Los Expertos",
    officialName: "Los Expertos",
    shortName: "Los Expertos",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Team 1408
  {
    id: "acad-41",
    slug: "team-1408",
    entityType: "club",
    name: "Team 1408",
    officialName: "Team 1408",
    shortName: "Team 1408",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Gladiadores del Este
  {
    id: "acad-42",
    slug: "gladiadores-del-este",
    entityType: "club",
    name: "Gladiadores del Este",
    officialName: "Gladiadores del Este",
    shortName: "Gladiadores del Este",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Sucre",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Montaña Alta
  {
    id: "acad-43",
    slug: "montana-alta",
    entityType: "club",
    name: "Montaña Alta",
    officialName: "Montaña Alta",
    shortName: "Montaña Alta",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Baruta",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Tiki Taka
  {
    id: "acad-44",
    slug: "tiki-taka",
    entityType: "club",
    name: "Tiki Taka",
    officialName: "Tiki Taka",
    shortName: "Tiki Taka",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Sporting TDC
  {
    id: "acad-45",
    slug: "sporting-tdc",
    entityType: "club",
    name: "Sporting TDC",
    officialName: "Sporting TDC",
    shortName: "Sporting TDC",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Kay Kings
  {
    id: "acad-46",
    slug: "kay-kings",
    entityType: "club",
    name: "Kay Kings",
    officialName: "Kay Kings",
    shortName: "Kay Kings",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Nuevo Día FC
  {
    id: "acad-47",
    slug: "nuevo-dia-fc",
    entityType: "club",
    name: "Nuevo Día FC",
    officialName: "Nuevo Día FC",
    shortName: "Nuevo Día FC",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Los Jardines FC
  {
    id: "acad-48",
    slug: "los-jardines-fc",
    entityType: "club",
    name: "Los Jardines FC",
    officialName: "Los Jardines FC",
    shortName: "Los Jardines FC",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Guerreros del Valle
  {
    id: "acad-49",
    slug: "guerreros-del-valle",
    entityType: "club",
    name: "Guerreros del Valle",
    officialName: "Guerreros del Valle",
    shortName: "Guerreros del Valle",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Operaciones FC
  {
    id: "acad-50",
    slug: "operaciones-fc",
    entityType: "club",
    name: "Operaciones FC",
    officialName: "Operaciones FC",
    shortName: "Operaciones FC",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // CNPB
  {
    id: "acad-51",
    slug: "cnpb",
    entityType: "club",
    name: "CNPB",
    officialName: "CNPB",
    shortName: "CNPB",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // RH
  {
    id: "acad-52",
    slug: "rh-f7",
    entityType: "club",
    name: "RH",
    officialName: "RH",
    shortName: "RH",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // S'World FC
  {
    id: "acad-53",
    slug: "sworld-fc",
    entityType: "club",
    name: "S'World FC",
    officialName: "S'World FC",
    shortName: "S'World FC",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Los Compadres
  {
    id: "acad-54",
    slug: "los-compadres",
    entityType: "club",
    name: "Los Compadres",
    officialName: "Los Compadres",
    shortName: "Los Compadres",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Real X
  {
    id: "acad-55",
    slug: "real-x",
    entityType: "club",
    name: "Real X",
    officialName: "Real X",
    shortName: "Real X",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Rali Stones
  {
    id: "acad-56",
    slug: "rali-stones",
    entityType: "club",
    name: "Rali Stones",
    officialName: "Rali Stones",
    shortName: "Rali Stones",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  // Independiente FC
  {
    id: "acad-57",
    slug: "independiente-fc",
    entityType: "club",
    name: "Independiente FC",
    officialName: "Independiente FC",
    shortName: "Independiente FC",
    foundationYear: 2020,
    founder: "Información por rellenar",
    motto: "Información por rellenar",
    bio: "Información por rellenar",
    municipality: "Libertador",
    zoneDetail: "Información por rellenar",
    disciplines: ["Fútbol 7"],
    categories: ["Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    colors: {
      primary: "#1e293b",
      secondary: "#0ea5e9",
      textHex: "#ffffff",
      names: ["Información por rellenar"],
    },
    socials: {
      instagram: "Información por rellenar",
      whatsapp: "Información por rellenar",
    },
    contact: {
      coordinator: "Información por rellenar",
      phone: "Información por rellenar",
      officeHours: "Información por rellenar",
    },
    venues: [
      {
        name: "Información por rellenar",
        sector: "Información por rellenar",
        address: "Información por rellenar",
        surface: "Cemento Pulido",
        schedule: "Información por rellenar",
      },
    ],
    performance: {
      activeTournament: "Torneo Oficial Furia Menor",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      averagePosition: "Información por rellenar",
      winRate: "0%",
      achievements: ["Información por rellenar"],
    },
    rosters: {},
    gallery: [],
  },
  ...OFFICIAL_CLUBS_DATA,
];

function stripAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function cleanTeamSearchKey(name: string): string {
  return stripAccents(name)
    .toLowerCase()
    .replace(/\s*\([a-z0-9]\)|\s*blanco|\s*amarillo|\s*negro|\s*verde/gi, "")
    .replace(/\b(deportivo|dvo|academia|club|futsal|fc|fs)\b/gi, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

const SPECIAL_TEAM_ALIASES: Record<string, string> = {
  "fenix-futsal": "fenix-fs",
  "fenix": "fenix-fs",
  "futconexion": "futsaconexion",
  "futconexion-a": "futsaconexion",
  "espartanos-futsal": "espartanos-cutira",
  "espartanos": "espartanos-cutira",
  "la-paz-futsal-verde": "la-paz-futsal",
  "dvo-odin": "dvo-odin",
  "deportivo-odin": "dvo-odin",
  "caricuao": "gladiadores-caricuao",
  "ricardinho-b": "ricardinho",
  "funvibra-a": "funvibra",
  "real-esperanza-a": "real-esperanza",
  "real-esperanza-b": "real-esperanza",
  "la-ladera-a": "la-ladera",
  "la-ladera-b": "la-ladera",
  "fratelsa-sport-blanco": "fratelsa-sport",
  "fratelsa-sport-amarillo": "fratelsa-sport",
  "fratelsa-sport-negro": "fratelsa-sport",
  "fusion-academica-a": "fusion-academica",
  "fusion-academica-b": "fusion-academica",

  // Torneo Institucional
  "bdv": "bdv",
  "banco-de-venezuela": "bdv",
  "ont": "ont",
  "oficina-nacional-del-tesoro": "ont",
  "pdvsa": "pdvsa",
  "cantv": "cantv",
  "bcv": "bcv",
  "banco-central-de-venezuela": "bcv",
  "cicpc-vehiculos": "cicpc-vehiculos",
  "cicpc": "cicpc-vehiculos",

  // Torneo Libre 1ra División
  "hrd": "hrd",
  "zona-norte": "zona-norte",
  "sorpresa-fs": "sorpresa-fs",
  "sorpresa": "sorpresa-fs",
  "ld-primium": "ld-primium",
  "los-simbolos": "los-simbolos",
  "mamera-fs": "mamera-fs",
  "mamera": "mamera-fs",
  "superstar": "superstar",

  // Torneo Master 50
  "la-paz-thimat": "la-paz-thimat",
  "bator": "bator",
  "ipsa-c": "ipsa-c",
  "marquina-domino": "marquina-domino",
  "los-amigos": "los-amigos",
  "breemen": "breemen",
  "la-cuadra-futsal": "la-cuadra-futsal",
  "la-cuadra": "la-cuadra-futsal",

  // Torneo Libre 2da División
  "k9-guerreros": "k9-guerreros",
  "sholo-futsal": "sholo-futsal",
  "sholo": "sholo-futsal",
  "tienda-forte": "tienda-forte",
  "jaen-futsal": "jaen-futsal",
  "deportivo-paracoto": "deportivo-paracoto",
  "paracoto": "deportivo-paracoto",
  "real-union": "real-union",
  "halcones-del-paraiso-fs": "halcones-del-paraiso-fs",
  "halcones-del-paraiso": "halcones-del-paraiso-fs",
  "dvo-tito": "dvo-tito",
  "deportivo-tito": "dvo-tito",
  "ebenezer-fsc": "ebenezer-fsc",
  "ebenezer": "ebenezer-fsc",
  "rivales-fs": "rivales-fs",
  "rh-sport-club": "rh-sport-club",
  "dvo-las-brisas": "dvo-las-brisas",
  "las-brisas": "dvo-las-brisas",
  "cartujo": "cartujo",
  "ovad-futsal": "ovad-futsal",
  "ovad": "ovad-futsal",
  "la-vega-fs": "la-vega-fs",
  "la-vega": "la-vega-fs",
  "getan": "getan",
  "overcoming-fs": "overcoming",
  "js-futsal": "js-futsal",
  "arcano-fc": "arcano-fc",
  "botafogo": "botafogo",
  "cordillera-andina-fc": "cordillera-andina-fc",
  "cordillera-andina": "cordillera-andina-fc",
  "atletico-nacional": "atletico-nacional",
  "nacional": "atletico-nacional",
  "las-torres": "las-torres",
  "pizzeria-12": "pizzeria-12",
  "jogo-bonito-fs": "jogo-bonito-fs",
  "jogo-bonito": "jogo-bonito-fs",
  "los-guaros": "los-guaros",

  // Torneo Infantil 1ra División & Variantes
  "cjru": "cjru",
  "club-cjru": "cjru",
  "club-palace": "club-palace",
  "palace": "club-palace",
  "hoyo-de-la-puerta-fsc": "hoyo-de-la-puerta",
  "hoyo-de-la-puerta": "hoyo-de-la-puerta",
  "nova-futsal": "nova-futsal",
  "nova": "nova-futsal",
  "sportu-futsal": "sportu-futsal",
  "sportu": "sportu-futsal",
  "dvo-mirador": "dvo-mirador",
  "deportivo-mirador": "dvo-mirador",
  "guerrero-del-valle": "guerreros-del-valle",
  "guerreros-del-valle": "guerreros-del-valle",
  "caricuao-fc": "gladiadores-caricuao",
  "la-paz-futsal-blanco": "la-paz-futsal",
  "la-ladera-(a)": "la-ladera",
  "la-ladera-(b)": "la-ladera",
  "fenix-sport": "fenix-fs",
  "rh-sport": "rh-sport-club",

  // Torneo Sub 20 1ra División
  "barnije": "barnije",
  "money-wayy": "money-wayy",
  "moneywayy": "money-wayy",
  "inter-plaza": "inter-plaza",
  "el-plan": "el-plan",
  "ragnarok": "ragnarok",

  // Torneo Infantil 2da División
  "black-bulls": "black-bulls",
  "electrofive": "electrofive",
  "ceftf": "ceftf",
  "academia-winners": "academia-winners",
  "winners": "academia-winners",
  "falg": "falg",
  "foro-libertador": "foro-libertador",
  "espartanos-futsal-curita": "espartanos-cutira",
  "espartano-futsal-cutira": "espartanos-cutira",
  "intocable-fc": "intocable",
  "dvo-paracoto-fc": "deportivo-paracoto",
  "deportivo-paracotos-fc": "deportivo-paracoto",
  "fuerza-vinotinto-(a)": "fuerza-vinotinto",
  "fuerza-vinotinto-b": "fuerza-vinotinto",
  "funvibra-b": "funvibra",
  "ricardinho-a": "ricardinho",
};

/**
 * Busca una academia por su ID, slug o nombre oficial con tolerancia a variantes
 */
export function getAcademyBySlug(slugOrId: string): Academy | undefined {
  if (!slugOrId) return undefined;
  const clean = slugOrId.toLowerCase().trim();
  const cleanSlug = clean.replace(/\s+/g, "-");

  // 1. Alias directo
  if (SPECIAL_TEAM_ALIASES[cleanSlug]) {
    const aliasSlug = SPECIAL_TEAM_ALIASES[cleanSlug];
    const foundByAlias = academiesData.find((a) => a.slug === aliasSlug || a.id === aliasSlug);
    if (foundByAlias) return foundByAlias;
  }

  // 2. Coincidencia exacta por slug o id
  const exact = academiesData.find(
    (a) =>
      a.slug === cleanSlug ||
      a.id === clean ||
      a.slug === clean ||
      a.name.toLowerCase() === clean
  );
  if (exact) return exact;

  // 3. Coincidencia normalizada sin tildes ni sufijos (A), (B), colores
  const searchKey = cleanTeamSearchKey(slugOrId);
  if (searchKey.length >= 3) {
    const normMatch = academiesData.find((a) => {
      const aKey = cleanTeamSearchKey(a.name);
      const aSlugKey = cleanTeamSearchKey(a.slug);
      return aKey === searchKey || aSlugKey === searchKey;
    });
    if (normMatch) return normMatch;
  }

  // 4. Búsqueda por subcadena
  return academiesData.find((a) => {
    const aClean = a.name.toLowerCase();
    return clean.includes(aClean) || aClean.includes(clean);
  });
}

/**
 * Acceso centralizado por ID único inmutable de club o academia.
 * Garantiza que cualquier actualización a nivel de club se refleje
 * en todas las tablas, fixtures y expedientes automáticamente.
 */
export function getClubOrAcademyById(id: string): Academy | undefined {
  if (!id) return undefined;
  const clean = id.trim().toLowerCase();
  return academiesData.find((a) => a.id.toLowerCase() === clean || a.slug.toLowerCase() === clean);
}

/**
 * Retorna todos los clubes que compiten en torneos libres, master o fútbol 7
 */
export function getAllClubs(): Academy[] {
  return academiesData.filter((a) => a.entityType === "club" || a.entityType === "ambos");
}

/**
 * Retorna todas las academias formativas (Sub-6 a Sub-20)
 */
export function getAllAcademias(): Academy[] {
  return academiesData.filter((a) => a.entityType === "academia" || a.entityType === "ambos");
}

/**
 * Filtra academias según los criterios de búsqueda interactiva
 */
export function filterAcademies(
  academies: Academy[],
  options: {
    query?: string;
    municipality?: Municipality | "all";
    discipline?: SportDiscipline | "all";
    category?: AcademyCategory | "all";
    entityType?: EntityType | "all";
  }
): Academy[] {
  const { query, municipality, discipline, category } = options;
  const cleanQuery = query?.toLowerCase().trim();

  return academies.filter((acad) => {
    // 0. Filtro Tipo de Entidad (Academia vs Club)
    if (options.entityType && options.entityType !== "all") {
      if (options.entityType === "academia" && acad.entityType !== "academia" && acad.entityType !== "ambos") {
        return false;
      }
      if (options.entityType === "club" && acad.entityType !== "club" && acad.entityType !== "ambos") {
        return false;
      }
    }
    // 1. Filtro Municipio
    if (municipality && municipality !== "all" && acad.municipality !== municipality) {
      return false;
    }

    // 2. Filtro Disciplina
    if (discipline && discipline !== "all" && !acad.disciplines.includes(discipline)) {
      return false;
    }

    // 3. Filtro Categoría
    if (category && category !== "all" && !acad.categories.includes(category)) {
      return false;
    }

    // 4. Búsqueda por texto (nombre, zona, sedes, coordinador o fundador)
    if (cleanQuery) {
      const matchName = acad.name.toLowerCase().includes(cleanQuery);
      const matchOfficial = acad.officialName.toLowerCase().includes(cleanQuery);
      const matchZone = acad.zoneDetail.toLowerCase().includes(cleanQuery);
      const matchCoordinator = acad.contact.coordinator.toLowerCase().includes(cleanQuery);
      const matchFounder = acad.founder ? acad.founder.toLowerCase().includes(cleanQuery) : false;
      const matchVenue = acad.venues.some((v) =>
        v.name.toLowerCase().includes(cleanQuery) || v.sector.toLowerCase().includes(cleanQuery)
      );
      if (!matchName && !matchOfficial && !matchZone && !matchVenue && !matchCoordinator && !matchFounder) {
        return false;
      }
    }

    return true;
  });
}
