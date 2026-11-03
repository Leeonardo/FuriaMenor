export type UserRole = 'admin_general' | 'delegado' | 'arbitro';

export type CaracasMunicipality = 'Libertador' | 'Chacao' | 'Baruta' | 'Sucre' | 'El Hatillo';
export type SportDiscipline = 'Fútbol Campo' | 'Fútbol Sala' | 'Fútbol 7';
export type PlayerStatus = 'activo' | 'suspendido' | 'lesionado' | 'inactivo';
export type MatchStatus = 'programado' | 'en_vivo' | 'finalizado' | 'suspendido' | 'aplazado';

export interface AppUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  clubId?: string; // Solo si es delegado
  clubName?: string;
  phone?: string;
  cedula?: string;
}

export interface DBClub {
  id: string;
  slug: string;
  name: string;
  officialName: string;
  municipality: CaracasMunicipality;
  zoneDetail: string;
  disciplines: SportDiscipline[];
  logoUrl?: string;
  coordinatorName: string;
  contactPhone: string;
  founderName?: string;
  motto?: string;
}

export interface DBCategory {
  id: string;
  name: string; // 'Sub-6', 'Sub-8', 'Sub-10', 'Sub-12', 'Sub-14', 'Sub-16', 'Sub-18', 'Sub-20'
  discipline: SportDiscipline;
  division: string;
  minBirthYear: number; // Mayor edad permitida (ej. 2014 para Sub-12 en 2026)
  maxBirthYear: number; // Menor edad permitida (ej. 2015 para Sub-12 en 2026)
  matchDurationMinutes: number;
}

export interface DBPlayer {
  id: string;
  clubId: string;
  clubName: string;
  categoryId: string;
  categoryName: string;
  firstName: string;
  lastName: string;
  idType: 'V' | 'E' | 'P';
  idNumber: string;
  birthDate: string; // YYYY-MM-DD
  birthYear: number;
  jerseyNumber: number;
  position: 'Portero' | 'Cierre' | 'Ala' | 'Pívot' | 'Defensa' | 'Medio' | 'Delantero';
  photoUrl?: string;
  carnetNumber: string;
  status: PlayerStatus;
  createdAt: string;
}

export interface DBMatch {
  id: string;
  tournamentName: string;
  categoryId: string;
  categoryName: string;
  homeClubId: string;
  homeClubName: string;
  awayClubId: string;
  awayClubName: string;
  matchDate: string; // YYYY-MM-DD
  matchTime: string; // HH:MM
  venue: string;
  jornada: string;
  refereeId?: string;
  refereeName?: string;
  status: MatchStatus;
  homeScore: number | null;
  awayScore: number | null;
  sheetPhotoUrl?: string; // Foto de la planilla física firmada
  refereeNotes?: string;
  updatedAt: string;
}

export interface DBStandingsRow {
  id: string;
  categoryId: string;
  clubId: string;
  clubName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  updatedAt: string;
}

// Validación de fichaje por edad
export interface AgeValidationResult {
  isValid: boolean;
  message: string;
  playerBirthYear: number;
  allowedMinYear: number;
  allowedMaxYear: number;
  categoryName: string;
}
