export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Caracas" | "Torneos" | "Academias" | "Entrevistas" | "Galería" | "Nacional" | "Futsal";
  coverImage?: string;
  author: string;
  publishedAt: string;
  featured?: boolean;
  tags: string[];
  sport?: "futsal" | "futbol";
}

export const latestNews: NewsItem[] = [
  {
    id: "n1",
    slug: "torneo-daeris-futsal-arranca-con-mas-de-200-equipos",
    title: "Torneo Daeris de Futsal arranca con más de 200 equipos en Caracas",
    excerpt:
      "El torneo que ya se ha convertido en una referencia del futsal menor venezolano dio inicio este fin de semana en el Gimnasio Libertador del 23 de Enero. Furia Menor estuvo allí para contártelo.",
    category: "Futsal",
    author: "Redacción Furia Menor",
    publishedAt: "2026-10-24T08:00:00Z",
    featured: true,
    sport: "futsal",
    tags: ["Torneo Daeris", "Futsal", "Caracas", "Sub-6 a Sub-18"],
  },
  {
    id: "n2",
    slug: "academias-caracas-futsal-formacion-integral",
    title: "Las academias de futsal en Caracas apuestan por la formación integral",
    excerpt:
      "Entrenadores destacan la importancia de combinar técnica, disciplina y valores para el desarrollo de los jóvenes futsalistas caraqueños.",
    category: "Academias",
    author: "Redacción Furia Menor",
    publishedAt: "2026-10-23T14:30:00Z",
    sport: "futsal",
    tags: ["Academias", "Futsal", "Formación", "Valores"],
  },
  {
    id: "n3",
    slug: "jugador-de-la-semana-sub-12-futsal",
    title: "Jugador de la Semana: Un talento del Sub-12 brilla en la jornada de futsal",
    excerpt:
      "Destacado desempeño goleador que llamó la atención de entrenadores y aficionados en la segunda fecha del Torneo Daeris de Futsal.",
    category: "Futsal",
    author: "Redacción Furia Menor",
    publishedAt: "2026-10-22T16:15:00Z",
    sport: "futsal",
    tags: ["Jugador de la Semana", "Sub-12", "Futsal", "Goleadores"],
  },
  {
    id: "n4",
    slug: "entrevista-dt-fenix-fs-futsal",
    title: "Entrevista: \"Formar personas antes que jugadores\"",
    excerpt:
      "Conversamos con el cuerpo técnico de Fénix FS sobre su filosofía, objetivos y visión para el futsal menor caraqueño.",
    category: "Entrevistas",
    author: "Redacción Furia Menor",
    publishedAt: "2026-10-21T10:00:00Z",
    sport: "futsal",
    tags: ["Entrevista", "Fénix FS", "Futsal", "Filosofía"],
  },
  {
    id: "n5",
    slug: "galeria-jornada-inaugural-daeris-futsal",
    title: "Galería: Las mejores imágenes de la jornada inaugural del Torneo Daeris",
    excerpt:
      "Recopilamos las mejores postales de familias, jugadores y emociones que marcaron el inicio del Torneo Daeris de Futsal en Caracas.",
    category: "Galería",
    author: "Redacción Furia Menor",
    publishedAt: "2026-10-20T19:45:00Z",
    sport: "futsal",
    tags: ["Galería", "Fotos", "Daeris", "Jornada Inaugural"],
  },
  {
    id: "n6",
    slug: "futsal-menor-caracas-crece",
    title: "El futsal menor de Caracas sigue en crecimiento sostenido",
    excerpt:
      "Cada temporada se suman nuevas academias y torneos de futsal, consolidando a la capital como semillero del fútbol menor venezolano.",
    category: "Caracas",
    author: "Redacción Furia Menor",
    publishedAt: "2026-10-19T12:00:00Z",
    sport: "futsal",
    tags: ["Caracas", "Futsal", "Crecimiento", "Fútbol Base"],
  },
];

export const quickNews = latestNews.slice(1, 5);
export const featuredNews = latestNews.find((n) => n.featured) || latestNews[0];
