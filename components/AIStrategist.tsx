
import React, { useState } from 'react';
import { Send, Zap, Shield, Target } from 'lucide-react';
import { getBooyahStrategy } from '../services/gemini';

const AIStrategist: React.FC = () => {
  const [map, setMap] = useState('Bermuda');
  const [playstyle, setPlaystyle] = useState('Aggressive');
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetAdvice = async () => {
    setLoading(true);
    const result = await getBooyahStrategy(map, playstyle);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-black font-orbitron text-white mb-2 italic">
          BOOYAH <span className="text-orange-500">STRATEGIST</span>
        </h2>
        <p className="text-neutral-400">Powered by Gemini AI - Get professional insights for your next match.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-neutral-900 p-8 rounded-3xl border border-neutral-800 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase text-neutral-500 tracking-widest">Select Map</label>
            <div className="grid grid-cols-2 gap-3">
              {['Bermuda', 'Purgatory', 'Kalahari', 'Alpine'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMap(m)}
                  className={`py-3 rounded-xl font-bold font-orbitron border-2 transition-all ${
                    map === m ? 'border-orange-500 bg-orange-500/10 text-orange-500' : 'border-neutral-800 hover:border-neutral-600 text-neutral-400'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase text-neutral-500 tracking-widest">Playstyle</label>
            <div className="grid grid-cols-2 gap-3">
              {['Aggressive', 'Passive', 'Balanced', 'Sniper-Heavy'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPlaystyle(p)}
                  className={`py-3 rounded-xl font-bold font-orbitron border-2 transition-all ${
                    playstyle === p ? 'border-orange-500 bg-orange-500/10 text-orange-500' : 'border-neutral-800 hover:border-neutral-600 text-neutral-400'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGetAdvice}
            disabled={loading}
            className="w-full gaming-gradient py-4 rounded-xl font-black font-orbitron text-white text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              <>
                <Zap size={24} />
                ANALYZE STRATEGY
              </>
            )}
          </button>
        </div>

        <div className="bg-neutral-900 p-8 rounded-3xl border border-neutral-800 min-h-[400px] flex flex-col justify-center relative overflow-hidden">
          {advice ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 text-orange-500">
                <Target size={32} />
                <h3 className="text-2xl font-bold font-orbitron">MISSION PLAN</h3>
              </div>
              <p className="text-neutral-300 leading-relaxed text-lg whitespace-pre-line italic">
                "{advice}"
              </p>
              <div className="pt-6 border-t border-neutral-800 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-green-500">
                  <Shield size={20} />
                  <span className="text-sm font-bold">Safe Rotation</span>
                </div>
                <div className="flex items-center gap-2 text-red-500">
                  <Zap size={20} />
                  <span className="text-sm font-bold">Combat Ready</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4 opacity-50">
              <Zap size={64} className="mx-auto text-neutral-600" />
              <p className="font-orbitron text-neutral-500 uppercase tracking-widest">Select parameters and click analyze</p>
            </div>
          )}
          
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default AIStrategist;
