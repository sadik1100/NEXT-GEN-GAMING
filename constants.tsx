import { Tournament, PlayerStats } from './services/types';

export const TOURNAMENTS: Tournament[] = [
  {
    id: '1',
    name: 'Bermuda Master League',
    prizePool: '৳5000',
    entryFee: '200',
    date: '2024-05-20',
    time: '18:00 BST',
    teamsJoined: 42,
    maxTeams: 48,
    status: 'upcoming',
    format: 'Squad',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1000' // High-action battle scene
  },
  {
    id: '2',
    name: 'Purgatory Showdown',
    prizePool: '৳250',
    entryFee: '৳100',
    date: '2024-05-18',
    time: '20:00 BST',
    teamsJoined: 12,
    maxTeams: 24,
    status: 'upcoming',
    format: 'Duo',
    imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=1000' // Urban combat zone
  },
  {
    id: '3',
    name: 'Elite Solo Clash',
    prizePool: '৳10,000',
    entryFee: '৳50',
    date: '2024-05-15',
    time: '14:00 BST',
    teamsJoined: 48,
    maxTeams: 48,
    status: 'ongoing',
    format: 'Solo',
    imageUrl: 'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?auto=format&fit=crop&q=80&w=1000' // Soldier/Warrior close-up
  }
];

export const TOP_PLAYERS: PlayerStats[] = [
  { id: 'p1', name: 'DeadlySlayer', kills: 450, matchesPlayed: 120, booyahs: 35, rank: 'Grandmaster', winRate: '29%' },
  { id: 'p2', name: 'NinjaPro_FF', kills: 380, matchesPlayed: 110, booyahs: 28, rank: 'Heroic', winRate: '25%' },
  { id: 'p3', name: 'BooyahKing', kills: 410, matchesPlayed: 130, booyahs: 22, rank: 'Heroic', winRate: '17%' },
  { id: 'p4', name: 'SilentSniper', kills: 320, matchesPlayed: 90, booyahs: 18, rank: 'Diamond', winRate: '20%' },
];