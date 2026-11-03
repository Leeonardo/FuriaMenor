export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Caracas" | "Torneos" | "Academias" | "Entrevistas" | "Galería" | "Nacional";
  coverImage?: string;
  author: string;
  publishedAt: string;
  featured?: boolean;
  tags: string[];
}

export const latestNews: NewsItem[] = [
  {
    id: "n1",
    slug: "torneo-daeris-arranca-con-mas-de-200-equipos",
    title: "Torneo Daeris arranca con más de 200 equipos en Caracas",
    excerpt:
      "El torneo que ya se ha convertido en una referencia del fútbol menor venezolano dio inicio este fin de semana en el Gimnasio Libertador del 23 de Enero con gran expectativa.",
    category: "Torneos",
    author: "Redacción Furia Menor",
    publishedAt: "2026-10-24T08:00:00Z",
    featured: true,
    tags: ["Torneo Daeris", "Caracas", "Sub-6 a Sub-18"],
  },
  {
    id: "n2",
    slug: "academias-caracas-formando-futuro",
    title: "Las academias de Caracas apuestan por la formación integral",
    excerpt:
      "Entrenadores destacan la importancia de combinar técnica, disciplina y valores para el desarrollo de los jóvenes futbolistas.",
    category: "Academias",
    author: "Redacción Furia Menor",
    publishedAt: "2026-10-23T14:30:00Z",
    tags: ["Academias", "Formación", "Valores"],
  },
  {
    id: "n3",
    slug: "jugador-de-la-semana-sub-12",
    title: "Jugador de la Semana: Un talento del Sub-12 brilla en la jornada",
    excerpt:
      "Destacado desempeño goleador que llamó la atención de entrenadores y aficionados en la segunda fecha del Torneo Daeris.",
    category: "Torneos",
    author: "Redacción Furia Menor",
    publishedAt: "2026-10-22T16:15:00Z",
    tags: ["Jugador de la Semana", "Sub-12", "Goleadores"],
  },
  {
    id: "n4",
    slug: "entrevista-dt-fenix-fs",
    title: "Entrevista: \"Formar personas antes que jugadores\"",
    excerpt:
      "Conversamos con el cuerpo técnico de Fénix FS sobre su filosofía, objetivos y visión para el fútbol menor caraqueño.",
    category: "Entrevistas",
    author: "Redacción Furia Menor",
    publishedAt: "2026-10-21T10:00:00Z",
    tags: ["Entrevista", "Fénix FS", "Filosofía"],
  },
  {
    id: "n5",
    slug: "galeria-jornada-inaugural",
    title: "Galería: Imágenes de la jornada inaugural del Torneo Daeris",
    excerpt:
      "Recopilamos las mejores postales de familias, jugadores y emociones que marcaron el inicio de la competencia.",
    category: "Galería",
    author: "Redacción Furia Menor",
    publishedAt: "2026-10-20T19:45:00Z",
    tags: ["Galería", "Fotos", "Jornada Inaugural"],
  },
  {
    id: "n6",
    slug: "futbol-menor-caracas-crece",
    title: "El fútbol menor de Caracas sigue en crecimiento",
    excerpt:
      "Cada temporada se suman nuevas academias y torneos, consolidando a la capital como semillero del fútbol venezolano.",
    category: "Caracas",
    author: "Redacción Furia Menor",
    publishedAt: "2026-10-19T12:00:00Z",
    tags: ["Caracas", "Crecimiento", "Fútbol Base"],
  },
];

export const quickNews = latestNews.slice(1, 5);
