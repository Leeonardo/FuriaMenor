import type {
  UserRole,
  AppUser,
  DBClub,
  DBCategory,
  DBPlayer,
  DBMatch,
  DBStandingsRow,
  AgeValidationResult,
  OfficialTournamentOption,
  PlayerTournamentRecord,
  PlayerMatchLog,
} from '@/types/auth-roles';

export type {
  UserRole,
  AppUser,
  DBClub,
  DBCategory,
  DBPlayer,
  DBMatch,
  DBStandingsRow,
  AgeValidationResult,
  OfficialTournamentOption,
  PlayerTournamentRecord,
  PlayerMatchLog,
};
import { academiesData } from '@/data/academies-data';
import { ALL_NOV_2026_FIXTURES } from '@/data/fixtures-noviembre-2026';

// ==============================================================================
// 0. LISTADO OFICIAL DE TORNEOS VIGENTES
// ==============================================================================
export const OFFICIAL_TOURNAMENTS: OfficialTournamentOption[] = [
  { id: 'infantil-1ra-division', name: 'Torneo Infantil 1era División', shortName: '1era Div Menor', division: '1era División', season: '2026' },
  { id: 'infantil-2da-division', name: 'Torneo Infantil 2da División', shortName: '2da Div Menor', division: '2da División', season: '2026' },
  { id: 'copa-elite-caracas', name: 'Copa Élite Futsal Caracas', shortName: 'Copa Élite', division: 'Élite Federada', season: '2026' },
  { id: 'torneo-institucional', name: 'Torneo Daeris Institucional', shortName: 'Institucional', division: 'Institucional', season: '2026' },
  { id: 'futbol-7-institucional', name: 'Fútbol 7 Institucional Daeris', shortName: 'Fut 7 Inst', division: 'Fútbol 7', season: '2026' },
  { id: 'torneo-libre-carabobo', name: 'Torneo Libre Parque Carabobo', shortName: 'Libre Carabobo', division: 'Libre', season: '2026' },
  { id: 'liga-distrital', name: 'Liga Distrital de Fútbol Base', shortName: 'Liga Distrital', division: 'Distrital', season: '2026' },
];

// ==============================================================================
// 1. USUARIOS DEMO PREDEFINIDOS PARA CADA ROL
// ==============================================================================
export const DEMO_USERS: Record<UserRole, AppUser> = {
  admin_general: {
    id: 'user-admin-01',
    email: 'admin@furiamenor.com',
    fullName: 'Carlos Quintana',
    role: 'admin_general',
    phone: '+58 412-9998877',
    cedula: 'V-15.420.300',
  },
  delegado: {
    id: 'user-delegado-01',
    email: 'eudis.toro@lapazfutsal.com',
    fullName: 'Eudis Toro',
    role: 'delegado',
    clubId: 'la-paz-futsal',
    clubName: 'La Paz Futsal',
    phone: '+58 414-2345678',
    cedula: 'V-18.750.410',
  },
  arbitro: {
    id: 'user-arbitro-01',
    email: 'arbitro.colina@colegioarbitros.com',
    fullName: 'Prof. José Colina',
    role: 'arbitro',
    phone: '+58 416-5554321',
    cedula: 'V-16.890.112',
  },
};

// ==============================================================================
// 2. CATEGORÍAS FORMATIVAS OFICIALES (TEMPORADA 2026)
// ==============================================================================
export const DB_CATEGORIES: DBCategory[] = [
  { id: 'cat-sub-6',  name: 'Sub-6',  discipline: 'Fútbol Sala', division: '1era División', minBirthYear: 2020, maxBirthYear: 2021, matchDurationMinutes: 30, registrationDeadline: '2026-11-20' },
  { id: 'cat-sub-8',  name: 'Sub-8',  discipline: 'Fútbol Sala', division: '1era División', minBirthYear: 2018, maxBirthYear: 2019, matchDurationMinutes: 35, registrationDeadline: '2026-11-15' },
  { id: 'cat-sub-10', name: 'Sub-10', discipline: 'Fútbol Sala', division: '1era División', minBirthYear: 2016, maxBirthYear: 2017, matchDurationMinutes: 40, registrationDeadline: '2026-10-31' },
  { id: 'cat-sub-12', name: 'Sub-12', discipline: 'Fútbol Sala', division: '1era División', minBirthYear: 2014, maxBirthYear: 2015, matchDurationMinutes: 40, registrationDeadline: '2026-10-25' },
  { id: 'cat-sub-14', name: 'Sub-14', discipline: 'Fútbol Sala', division: '1era División', minBirthYear: 2012, maxBirthYear: 2013, matchDurationMinutes: 45, registrationDeadline: '2026-11-30' },
  { id: 'cat-sub-16', name: 'Sub-16', discipline: 'Fútbol Sala', division: '1era División', minBirthYear: 2010, maxBirthYear: 2011, matchDurationMinutes: 50, registrationDeadline: '2026-10-20' },
  { id: 'cat-sub-18', name: 'Sub-18', discipline: 'Fútbol Sala', division: '1era División', minBirthYear: 2008, maxBirthYear: 2009, matchDurationMinutes: 50, registrationDeadline: '2026-11-25' },
  { id: 'cat-sub-20', name: 'Sub-20', discipline: 'Fútbol Sala', division: '1era División', minBirthYear: 2006, maxBirthYear: 2007, matchDurationMinutes: 50, registrationDeadline: '2026-11-30' },
  { id: 'cat-libre',  name: 'Libre',  discipline: 'Fútbol Sala', division: 'Libre Adultos', minBirthYear: 1980, maxBirthYear: 2008, matchDurationMinutes: 50, registrationDeadline: '2026-11-30' },
  { id: 'cat-master-40', name: 'Master 40', discipline: 'Fútbol Sala', division: 'Master +40', minBirthYear: 1960, maxBirthYear: 1986, matchDurationMinutes: 45, registrationDeadline: '2026-11-30' },
  { id: 'cat-master-50', name: 'Master 50', discipline: 'Fútbol Sala', division: 'Master +50', minBirthYear: 1950, maxBirthYear: 1976, matchDurationMinutes: 45, registrationDeadline: '2026-11-30' },
  { id: 'cat-institucional', name: 'Institucional', discipline: 'Fútbol 7', division: 'Fútbol 7', minBirthYear: 1970, maxBirthYear: 2008, matchDurationMinutes: 50, registrationDeadline: '2026-11-30' },
];

// ==============================================================================
// 3. CLUBES / ACADEMIAS CONVERTIDOS DE DATA REAL
// ==============================================================================
export const DB_CLUBS: DBClub[] = academiesData.map((a) => ({
  id: a.slug,
  slug: a.slug,
  name: a.name,
  officialName: a.officialName,
  municipality: a.municipality,
  zoneDetail: a.zoneDetail,
  disciplines: a.disciplines,
  logoUrl: a.logoUrl,
  coordinatorName: a.contact.coordinator,
  contactPhone: a.contact.phone,
  founderName: a.founder,
  motto: a.motto,
}));

// ==============================================================================
// 4. ATLETAS INICIALES (MOCK EXTRAÍDO DE LOS PLANTELES)
// ==============================================================================
export function getInitialPlayers(): DBPlayer[] {
  const players: DBPlayer[] = [];

  // Jugadores reales de La Paz Futsal
  const laPaz = academiesData.find((a) => a.slug === 'la-paz-futsal');
  if (laPaz && laPaz.rosters) {
    Object.entries(laPaz.rosters).forEach(([catName, roster]) => {
      const cat = DB_CATEGORIES.find((c) => c.name === catName);
      if (!cat) return;

      roster.players.forEach((p, idx) => {
        const assignedTournaments = idx % 2 === 0
          ? ['infantil-1ra-division', 'copa-elite-caracas']
          : ['infantil-1ra-division'];

        const tRecords: PlayerTournamentRecord[] = [
          {
            tournamentId: 'infantil-1ra-division',
            tournamentName: 'Torneo Infantil 1era División',
            categoryName: cat.name,
            enrolledAt: '2026-09-15',
            status: 'habilitado',
            matchesPlayed: 4,
            goals: p.goals || (idx === 0 ? 3 : 1),
            yellowCards: idx === 1 ? 1 : 0,
            redCards: 0,
            minutesPlayed: 140,
          },
        ];

        if (assignedTournaments.includes('copa-elite-caracas')) {
          tRecords.push({
            tournamentId: 'copa-elite-caracas',
            tournamentName: 'Copa Élite Futsal Caracas',
            categoryName: cat.name,
            enrolledAt: '2026-10-01',
            status: 'habilitado',
            matchesPlayed: 2,
            goals: Math.max(1, Math.floor((p.goals || 2) / 2)),
            yellowCards: 0,
            redCards: 0,
            minutesPlayed: 75,
          });
        }

        const mLogs: PlayerMatchLog[] = [
          {
            id: `log-lp-${cat.id}-${idx}-1`,
            matchId: 'match-hist-01',
            date: '2026-10-18',
            tournamentId: 'infantil-1ra-division',
            tournamentName: 'Torneo Infantil 1era División',
            rivalClubName: 'Fénix FS',
            result: '4 - 2 (Victoria)',
            minutes: 35,
            goals: p.goals && p.goals > 1 ? 1 : 0,
            yellowCards: 0,
            redCards: 0,
          },
          {
            id: `log-lp-${cat.id}-${idx}-2`,
            matchId: 'match-hist-02',
            date: '2026-10-25',
            tournamentId: 'infantil-1ra-division',
            tournamentName: 'Torneo Infantil 1era División',
            rivalClubName: 'DVO Paraíso',
            result: '3 - 3 (Empate)',
            minutes: 40,
            goals: 1,
            yellowCards: idx === 1 ? 1 : 0,
            redCards: 0,
          },
        ];

        if (assignedTournaments.includes('copa-elite-caracas')) {
          mLogs.push({
            id: `log-lp-${cat.id}-${idx}-3`,
            matchId: 'match-hist-03',
            date: '2026-11-01',
            tournamentId: 'copa-elite-caracas',
            tournamentName: 'Copa Élite Futsal Caracas',
            rivalClubName: 'Fratelsa Sport',
            result: '5 - 1 (Victoria)',
            minutes: 38,
            goals: 1,
            yellowCards: 0,
            redCards: 0,
          });
        }

        players.push({
          id: `player-lp-${cat.id}-${idx + 1}`,
          clubId: 'la-paz-futsal',
          clubName: 'La Paz Futsal',
          categoryId: cat.id,
          categoryName: cat.name,
          firstName: p.name.split(' ')[0] || p.name,
          lastName: p.name.split(' ').slice(1).join(' ') || 'Futsal',
          idType: 'V',
          idNumber: p.ci.replace(/\D/g, '') || `3419020${idx + 1}`,
          birthDate: `${p.birthYear}-04-15`,
          birthYear: p.birthYear,
          jerseyNumber: p.dorsal,
          position: p.position as any,
          carnetNumber: `FM-26-LP-${cat.name.replace('-', '')}-${p.dorsal}`,
          status: 'activo',
          enrolledTournaments: assignedTournaments,
          tournamentRecords: tRecords,
          matchLogs: mLogs,
          createdAt: new Date().toISOString(),
        });
      });
    });
  }

  // Jugadores reales de Dvo Paraíso
  const paraiso = academiesData.find((a) => a.slug === 'dvo-paraiso');
  if (paraiso && paraiso.rosters) {
    Object.entries(paraiso.rosters).forEach(([catName, roster]) => {
      const cat = DB_CATEGORIES.find((c) => c.name === catName);
      if (!cat) return;

      roster.players.forEach((p, idx) => {
        const assignedTournaments = ['infantil-1ra-division', 'torneo-institucional'];
        players.push({
          id: `player-dp-${cat.id}-${idx + 1}`,
          clubId: 'dvo-paraiso',
          clubName: 'DVO Paraíso',
          categoryId: cat.id,
          categoryName: cat.name,
          firstName: p.name.split(' ')[0] || p.name,
          lastName: p.name.split(' ').slice(1).join(' ') || 'Deportivo',
          idType: 'V',
          idNumber: p.ci.replace(/\D/g, '') || `3420010${idx + 1}`,
          birthDate: `${p.birthYear}-06-20`,
          birthYear: p.birthYear,
          jerseyNumber: p.dorsal,
          position: p.position as any,
          carnetNumber: `FM-26-DP-${cat.name.replace('-', '')}-${p.dorsal}`,
          status: 'activo',
          enrolledTournaments: assignedTournaments,
          tournamentRecords: [
            {
              tournamentId: 'infantil-1ra-division',
              tournamentName: 'Torneo Infantil 1era División',
              categoryName: cat.name,
              enrolledAt: '2026-09-15',
              status: 'habilitado',
              matchesPlayed: 4,
              goals: p.goals || 2,
              yellowCards: 0,
              redCards: 0,
              minutesPlayed: 150,
            },
            {
              tournamentId: 'torneo-institucional',
              tournamentName: 'Torneo Daeris Institucional',
              categoryName: cat.name,
              enrolledAt: '2026-10-01',
              status: 'habilitado',
              matchesPlayed: 2,
              goals: 1,
              yellowCards: 1,
              redCards: 0,
              minutesPlayed: 60,
            },
          ],
          matchLogs: [
            {
              id: `log-dp-${cat.id}-${idx}-1`,
              matchId: 'match-hist-dp-01',
              date: '2026-10-18',
              tournamentId: 'infantil-1ra-division',
              tournamentName: 'Torneo Infantil 1era División',
              rivalClubName: 'Fratelsa Sport',
              result: '3 - 1 (Victoria)',
              minutes: 40,
              goals: 1,
              yellowCards: 0,
              redCards: 0,
            },
            {
              id: `log-dp-${cat.id}-${idx}-2`,
              matchId: 'match-hist-dp-02',
              date: '2026-10-25',
              tournamentId: 'infantil-1ra-division',
              tournamentName: 'Torneo Infantil 1era División',
              rivalClubName: 'La Paz Futsal',
              result: '3 - 3 (Empate)',
              minutes: 40,
              goals: 1,
              yellowCards: 0,
              redCards: 0,
            },
          ],
          createdAt: new Date().toISOString(),
        });
      });
    });
  }

  return players;
}

// ==============================================================================
// 5. PARTIDOS INICIALES DEL CALENDARIO
// ==============================================================================
export function getInitialMatches(): DBMatch[] {
  const convertedFixtures: DBMatch[] = ALL_NOV_2026_FIXTURES.map((f) => ({
    id: f.id,
    tournamentName: f.tournamentName,
    categoryId: `cat-${f.category.toLowerCase().replace(/\s+/g, '-')}`,
    categoryName: f.category,
    homeClubId: f.homeTeam.toLowerCase().replace(/\s+/g, '-'),
    homeClubName: f.homeTeam,
    awayClubId: f.awayTeam.toLowerCase().replace(/\s+/g, '-'),
    awayClubName: f.awayTeam,
    matchDate: f.matchDate,
    matchTime: f.matchTime,
    venue: f.venue,
    jornada: f.jornada,
    refereeId: 'user-arbitro-01',
    refereeName: f.referees?.principal || 'Prof. José Colina',
    status: f.status === 'finished' ? 'finalizado' : f.status === 'live' ? 'en_vivo' : 'programado',
    homeScore: f.homeScore,
    awayScore: f.awayScore,
    sheetPhotoUrl: f.sheetPhotoUrl || undefined,
    scoresheetUrl: f.scoresheetUrl || undefined,
    refereeNotes: f.refereeNotes || undefined,
    updatedAt: new Date().toISOString(),
  }));

  return convertedFixtures;
}

// ==============================================================================
// 6. MOTOR DE AUTOMATIZACIÓN DE TABLA DE POSICIONES (STANDINGS)
// ==============================================================================
export function calculateStandingsForCategory(
  categoryId: string,
  matches: DBMatch[],
  clubs: DBClub[]
): DBStandingsRow[] {
  // 1. Filtrar partidos finalizados con marcador de la categoría
  const finishedMatches = matches.filter(
    (m) =>
      m.categoryId === categoryId &&
      m.status === 'finalizado' &&
      m.homeScore !== null &&
      m.awayScore !== null
  );

  // 2. Obtener los clubes que participan en esta categoría
  const involvedClubIds = new Set<string>();
  finishedMatches.forEach((m) => {
    involvedClubIds.add(m.homeClubId);
    involvedClubIds.add(m.awayClubId);
  });

  // Si no hay partidos aún, incluimos al menos los clubes base
  if (involvedClubIds.size === 0) {
    clubs.slice(0, 4).forEach((c) => involvedClubIds.add(c.id));
  }

  // 3. Acumular estadísticas
  const standingsMap = new Map<string, DBStandingsRow>();

  involvedClubIds.forEach((clubId) => {
    const club = clubs.find((c) => c.id === clubId);
    standingsMap.set(clubId, {
      id: `stand-${categoryId}-${clubId}`,
      categoryId,
      clubId,
      clubName: club?.name || clubId,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
      updatedAt: new Date().toISOString(),
    });
  });

  finishedMatches.forEach((m) => {
    const homeRow = standingsMap.get(m.homeClubId);
    const awayRow = standingsMap.get(m.awayClubId);
    if (!homeRow || !awayRow) return;

    const hs = m.homeScore!;
    const as = m.awayScore!;

    homeRow.played += 1;
    awayRow.played += 1;

    homeRow.goalsFor += hs;
    homeRow.goalsAgainst += as;
    awayRow.goalsFor += as;
    awayRow.goalsAgainst += hs;

    if (hs > as) {
      homeRow.won += 1;
      homeRow.points += 3;
      awayRow.lost += 1;
    } else if (as > hs) {
      awayRow.won += 1;
      awayRow.points += 3;
      homeRow.lost += 1;
    } else {
      homeRow.drawn += 1;
      homeRow.points += 1;
      awayRow.drawn += 1;
      awayRow.points += 1;
    }

    homeRow.goalDifference = homeRow.goalsFor - homeRow.goalsAgainst;
    awayRow.goalDifference = awayRow.goalsFor - awayRow.goalsAgainst;
  });

  // 4. Ordenar tabla de posiciones según reglamento Furia Menor:
  // 1° Puntos, 2° Gol Diferencia, 3° Goles a Favor
  return Array.from(standingsMap.values()).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });
}

// ==============================================================================
// 7. MOTOR DE VALIDACIÓN DE EDAD Y REGLAMENTO DE FICHAJES
// ==============================================================================
export function validatePlayerAge(birthDateStr: string, categoryId: string): AgeValidationResult {
  const category = DB_CATEGORIES.find((c) => c.id === categoryId);
  if (!category) {
    return {
      isValid: false,
      message: 'Categoría no encontrada.',
      playerBirthYear: 0,
      allowedMinYear: 0,
      allowedMaxYear: 0,
      categoryName: 'Desconocida',
    };
  }

  const birthDate = new Date(birthDateStr);
  if (isNaN(birthDate.getTime())) {
    return {
      isValid: false,
      message: 'Fecha de nacimiento inválida.',
      playerBirthYear: 0,
      allowedMinYear: category.minBirthYear,
      allowedMaxYear: category.maxBirthYear,
      categoryName: category.name,
    };
  }

  const birthYear = birthDate.getFullYear();

  // En categorías infantiles, minBirthYear es el año de mayor edad y maxBirthYear es el de menor
  const isValid = birthYear >= category.minBirthYear && birthYear <= category.maxBirthYear;

  let message = `Año ${birthYear} válido para categoría ${category.name} (${category.minBirthYear}-${category.maxBirthYear}).`;
  if (birthYear < category.minBirthYear) {
    message = `Rechazado: El atleta nació en ${birthYear} y excede la edad límite para ${category.name} (año mínimo admitido: ${category.minBirthYear}).`;
  } else if (birthYear > category.maxBirthYear) {
    message = `Rechazado: El atleta nació en ${birthYear} y es menor que el rango requerido para ${category.name} (año máximo admitido: ${category.maxBirthYear}).`;
  }

  return {
    isValid,
    message,
    playerBirthYear: birthYear,
    allowedMinYear: category.minBirthYear,
    allowedMaxYear: category.maxBirthYear,
    categoryName: category.name,
  };
}

// ==============================================================================
// 8. STORAGE CLIENT-SIDE & REACTIVE STORE
// ==============================================================================
const STORAGE_PREFIX = 'furia_menor_db_';

export function getStoredUserRole(): UserRole {
  if (typeof window === 'undefined') return 'admin_general';
  try {
    const role = localStorage.getItem(`${STORAGE_PREFIX}active_role`) as UserRole;
    return role && DEMO_USERS[role] ? role : 'admin_general';
  } catch {
    return 'admin_general';
  }
}

export function setStoredUserRole(role: UserRole): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}active_role`, role);
  } catch {}
}

export function getStoredPlayers(): DBPlayer[] {
  if (typeof window === 'undefined') return getInitialPlayers();
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}players`);
    return raw ? JSON.parse(raw) : getInitialPlayers();
  } catch {
    return getInitialPlayers();
  }
}

export function saveStoredPlayers(players: DBPlayer[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}players`, JSON.stringify(players));
  } catch {}
}

export function getStoredMatches(): DBMatch[] {
  if (typeof window === 'undefined') return getInitialMatches();
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}matches`);
    if (!raw) {
      const initial = getInitialMatches();
      localStorage.setItem(`${STORAGE_PREFIX}matches`, JSON.stringify(initial));
      return initial;
    }
    const parsed: DBMatch[] = JSON.parse(raw);
    const initial = getInitialMatches();
    if (parsed.length < initial.length) {
      const existingIds = new Set(parsed.map((m) => m.id));
      const missing = initial.filter((m) => !existingIds.has(m.id));
      const combined = [...parsed, ...missing];
      localStorage.setItem(`${STORAGE_PREFIX}matches`, JSON.stringify(combined));
      return combined;
    }
    return parsed;
  } catch {
    return getInitialMatches();
  }
}

export function saveStoredMatches(matches: DBMatch[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}matches`, JSON.stringify(matches));
  } catch {}
}

export function getStoredCategories(): DBCategory[] {
  if (typeof window === 'undefined') return DB_CATEGORIES;
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}categories`);
    return raw ? JSON.parse(raw) : DB_CATEGORIES;
  } catch {
    return DB_CATEGORIES;
  }
}

export function saveStoredCategories(categories: DBCategory[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}categories`, JSON.stringify(categories));
  } catch {}
}

// ==============================================================================
// 8.1 CONTROL DE TRANSPARENCIA Y ROSTERS DINÁMICOS CONGELADOS
// ==============================================================================
export interface RosterFrozenStatus {
  isFrozen: boolean;
  deadlineDate: Date;
  deadlineStr: string;
  deadlineFormatted: string;
  daysRemaining: number;
  categoryName: string;
}

export function isCategoryRosterFrozen(
  category: DBCategory | string,
  categoriesList?: DBCategory[]
): RosterFrozenStatus {
  const cat =
    typeof category === 'string'
      ? (categoriesList || DB_CATEGORIES).find((c) => c.id === category || c.name === category)
      : category;

  if (!cat || !cat.registrationDeadline) {
    return {
      isFrozen: false,
      deadlineDate: new Date('2026-12-31T23:59:59'),
      deadlineStr: '2026-12-31',
      deadlineFormatted: '31/12/2026',
      daysRemaining: 999,
      categoryName: typeof category === 'string' ? category : 'Categoría',
    };
  }

  // Fecha límite a final del día YYYY-MM-DD
  const deadlineDate = new Date(`${cat.registrationDeadline}T23:59:59`);
  // En nuestro contexto del sistema la fecha operativa es noviembre 2026
  const now = new Date();
  const isFrozen = now.getTime() > deadlineDate.getTime();
  const diffTime = deadlineDate.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Formato legible DD/MM/AAAA
  const parts = cat.registrationDeadline.split('-');
  const deadlineFormatted = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : cat.registrationDeadline;

  return {
    isFrozen,
    deadlineDate,
    deadlineStr: cat.registrationDeadline,
    deadlineFormatted,
    daysRemaining,
    categoryName: cat.name,
  };
}

export function canDelegateModifyPlayer(
  role: UserRole,
  categoryId: string,
  categoriesList?: DBCategory[]
): { allowed: boolean; reason?: string; isFrozen: boolean; deadlineFormatted: string } {
  const frozenStatus = isCategoryRosterFrozen(categoryId, categoriesList);

  if (role === 'admin_general') {
    // Admin nivel dios siempre tiene permisos de corrección
    return {
      allowed: true,
      isFrozen: frozenStatus.isFrozen,
      deadlineFormatted: frozenStatus.deadlineFormatted,
    };
  }

  if (role !== 'delegado') {
    return {
      allowed: false,
      reason: 'Permiso denegado: Solo delegados del club o administradores pueden gestionar atletas.',
      isFrozen: frozenStatus.isFrozen,
      deadlineFormatted: frozenStatus.deadlineFormatted,
    };
  }

  if (frozenStatus.isFrozen) {
    return {
      allowed: false,
      reason: `Roster Congelado: El período de fichajes para ${frozenStatus.categoryName} cerró oficialmente el ${frozenStatus.deadlineFormatted}. Por reglamento de Transparencia Total, no se permiten nuevas inscripciones, modificaciones ni desincorporaciones para delegados.`,
      isFrozen: true,
      deadlineFormatted: frozenStatus.deadlineFormatted,
    };
  }

  return {
    allowed: true,
    isFrozen: false,
    deadlineFormatted: frozenStatus.deadlineFormatted,
  };
}

// ==============================================================================
// 9. FILTRO HISTÓRICO Y CONTROL POR PERÍODOS / TORNEOS
// ==============================================================================
export function filterPlayerStats(
  player: DBPlayer,
  options: {
    tournamentId?: string; // 'all' o ID específico
    periodPreset?: 'all' | '30days' | '6months' | '2026' | 'custom';
    startDate?: string;
    endDate?: string;
  }
) {
  const { tournamentId = 'all', periodPreset = 'all', startDate, endDate } = options;
  const logs = player.matchLogs || [];

  const referenceDate = new Date('2026-11-03');
  let minDate: Date | null = null;
  let maxDate: Date | null = null;

  if (periodPreset === '30days') {
    minDate = new Date('2026-11-03');
    minDate.setDate(referenceDate.getDate() - 30);
  } else if (periodPreset === '6months') {
    minDate = new Date('2026-11-03');
    minDate.setMonth(referenceDate.getMonth() - 6);
  } else if (periodPreset === '2026') {
    minDate = new Date('2026-01-01');
    maxDate = new Date('2026-12-31');
  } else if (periodPreset === 'custom') {
    if (startDate) minDate = new Date(startDate);
    if (endDate) maxDate = new Date(endDate);
  }

  const filteredLogs = logs.filter((log) => {
    // Filtro por torneo
    if (tournamentId !== 'all' && log.tournamentId !== tournamentId) {
      return false;
    }

    // Filtro por fecha
    const logDate = new Date(log.date);
    if (minDate && logDate < minDate) return false;
    if (maxDate && logDate > maxDate) return false;

    return true;
  });

  const matchesPlayed = filteredLogs.length;
  const goals = filteredLogs.reduce((acc, curr) => acc + curr.goals, 0);
  const yellowCards = filteredLogs.reduce((acc, curr) => acc + curr.yellowCards, 0);
  const redCards = filteredLogs.reduce((acc, curr) => acc + curr.redCards, 0);
  const minutesPlayed = filteredLogs.reduce((acc, curr) => acc + curr.minutes, 0);
  const goalsPerMatch = matchesPlayed > 0 ? (goals / matchesPlayed).toFixed(2) : '0.00';

  return {
    filteredLogs,
    matchesPlayed,
    goals,
    yellowCards,
    redCards,
    minutesPlayed,
    goalsPerMatch,
  };
}
