
import React from 'react';
import { Trophy, Medal, Star } from 'lucide-react';
import { TOP_PLAYERS } from '../constants';

const Leaderboard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-neutral-900 rounded-3xl border border-neutral-800 overflow-hidden">
      <div className="p-8 border-b border-neutral-800 bg-neutral-900/50 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black font-orbitron text-white tracking-tight italic">GLOBAL <span className="text-orange-500">LEGENDS</span></h2>
          <p className="text-neutral-400 text-sm">Real-time ranking based on tournament performance.</p>
        </div>
        <Trophy className="text-orange-500" size={40} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-black/20 text-neutral-500 text-xs uppercase font-black tracking-widest">
              <th className="px-8 py-4">Rank</th>
              <th className="px-8 py-4">Player</th>
              <th className="px-8 py-4">Kills</th>
              <th className="px-8 py-4">Win Rate</th>
              <th className="px-8 py-4">Tier</th>
              <th className="px-8 py-4 text-right">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {TOP_PLAYERS.map((player, index) => (
              <tr key={player.id} className="hover:bg-neutral-800/50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    {index === 0 ? (
                      <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                        <Medal size={18} />
                      </div>
                    ) : index === 1 ? (
                      <div className="w-8 h-8 rounded-full bg-slate-300/20 flex items-center justify-center text-slate-300">
                        <Medal size={18} />
                      </div>
                    ) : index === 2 ? (
                      <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-700">
                        <Medal size={18} />
                      </div>
                    ) : (
                      <span className="w-8 text-center font-bold text-neutral-600">#{index + 1}</span>
                    )}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <img src={`https://picsum.photos/seed/${player.id}/40/40`} className="w-10 h-10 rounded-full border border-neutral-700" alt="" />
                    <span className="font-bold font-orbitron text-white group-hover:text-orange-500 transition-colors">{player.name}</span>
                  </div>
                </td>
                <td className="px-8 py-6 font-mono font-bold text-neutral-300">{player.kills}</td>
                <td className="px-8 py-6 font-semibold text-green-500">{player.winRate}</td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    player.rank === 'Grandmaster' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                    player.rank === 'Heroic' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 
                    'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                  }`}>
                    {player.rank}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <span className="font-orbitron font-black text-xl text-white">
                    {Math.floor(player.kills * 1.5 + player.booyahs * 10)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
