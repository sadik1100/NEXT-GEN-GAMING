export type TournamentStatus = 'upcoming' | 'ongoing' | 'completed';

export interface Tournament {
  id: string;
  name: string;
  prizePool: string;
  entryFee: string;
  date: string;
  time: string;
  teamsJoined: number;
  maxTeams: number;
  status: TournamentStatus;
  format: 'Solo' | 'Duo' | 'Squad';
  imageUrl: string;
}

export interface SiteSettings {
  downloadLink: string;
  facebookLink: string;
  youtubeLink: string;
  whatsappLink: string;
}

export interface PlayerStats {
  id: string;
  name: string;
  kills: number;
  matchesPlayed: number;
  booyahs: number;
  rank: string;
  winRate: string;
}

export interface Team {
  id: string;
  name: string;
  leader: string;
  members: string[];
}