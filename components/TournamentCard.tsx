
import React from 'react';
import { Calendar, Clock, Users, Banknote, Layers } from 'lucide-react';
import { Tournament } from '../services/types';

interface TournamentCardProps {
  tournament: Tournament;
  onJoin: (id: string) => void;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament, onJoin }) => {
  const isFull = tournament.teamsJoined >= tournament.maxTeams;

  return (
    <div className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-orange-500/50 transition-all group flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={tournament.imageUrl} 
          alt={tournament.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
          <span className="text-xs font-bold text-orange-500 font-orbitron uppercase">{tournament.format}</span>
        </div>
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase ${
          tournament.status === 'ongoing' ? 'bg-red-500 animate-pulse' : 'bg-green-500'
        }`}>
          {tournament.status}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold font-orbitron mb-4 text-white group-hover:text-orange-500 transition-colors">
          {tournament.name}
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2 text-neutral-400">
            <Banknote size={16} className="text-orange-500" />
            <span>Pool: <span className="text-white font-semibold">{tournament.prizePool}</span></span>
          </div>
          <div className="flex items-center gap-2 text-neutral-400">
            <Layers size={16} className="text-orange-500" />
            <span>Entry: <span className="text-white font-semibold">{tournament.entryFee}</span></span>
          </div>
          <div className="flex items-center gap-2 text-neutral-400">
            <Calendar size={16} className="text-orange-500" />
            <span>{tournament.date}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-400">
            <Clock size={16} className="text-orange-500" />
            <span>{tournament.time}</span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1 text-xs text-neutral-400 uppercase font-bold">
              <Users size={14} />
              <span>{tournament.teamsJoined} / {tournament.maxTeams} Teams</span>
            </div>
            <span className="text-xs text-neutral-500">{Math.round((tournament.teamsJoined / tournament.maxTeams) * 100)}% Full</span>
          </div>
          <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden mb-6">
            <div 
              className="h-full gaming-gradient transition-all duration-1000" 
              style={{ width: `${(tournament.teamsJoined / tournament.maxTeams) * 100}%` }}
            />
          </div>

          <button
            disabled={isFull || tournament.status !== 'upcoming'}
            onClick={() => onJoin(tournament.id)}
            className={`w-full py-3 rounded-xl font-bold font-orbitron transition-all ${
              isFull || tournament.status !== 'upcoming'
                ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                : 'gaming-gradient text-white hover:shadow-lg hover:shadow-orange-500/20 active:scale-95'
            }`}
          >
            {isFull ? 'FULLY OCCUPIED' : tournament.status === 'ongoing' ? 'MATCH IN PROGRESS' : 'JOIN TOURNAMENT'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
