
import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Facebook, 
  Youtube, 
  Trophy, 
  Zap, 
  Users, 
  Flame, 
  ShieldCheck, 
  X, 
  Smartphone,
  Calendar,
  Clock,
  Banknote,
  Layers,
  Settings,
  Plus,
  Trash2,
  Edit,
  Save,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { TOURNAMENTS as INITIAL_TOURNAMENTS } from './constants';
import { Tournament } from './services/types';

const App: React.FC = () => {
  // --- Persistence Logic ---
  const [tournaments, setTournaments] = useState<Tournament[]>(() => {
    const saved = localStorage.getItem('ff_tournaments');
    return saved ? JSON.parse(saved) : INITIAL_TOURNAMENTS;
  });

  const [links, setLinks] = useState({
    download: localStorage.getItem('ff_link_download') || "https://your-download-link.com",
    facebook: localStorage.getItem('ff_link_facebook') || "https://facebook.com/your-page",
    youtube: localStorage.getItem('ff_link_youtube') || "https://youtube.com/your-channel",
    whatsapp: localStorage.getItem('ff_link_whatsapp') || "https://chat.whatsapp.com/your-group"
  });

  useEffect(() => {
    localStorage.setItem('ff_tournaments', JSON.stringify(tournaments));
  }, [tournaments]);

  useEffect(() => {
    localStorage.setItem('ff_link_download', links.download);
    localStorage.setItem('ff_link_facebook', links.facebook);
    localStorage.setItem('ff_link_youtube', links.youtube);
    localStorage.setItem('ff_link_whatsapp', links.whatsapp);
  }, [links]);

  // --- UI State ---
  const [showDownloadPrompt, setShowDownloadPrompt] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [editingTournament, setEditingTournament] = useState<Tournament | null>(null);

  const handleJoinClick = () => {
    setShowDownloadPrompt(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Admin Handlers ---
  const handleUpdateLink = (key: keyof typeof links, value: string) => {
    setLinks(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveTournament = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updated: Tournament = {
      id: editingTournament?.id || Date.now().toString(),
      name: formData.get('name') as string,
      prizePool: formData.get('prize') as string,
      entryFee: formData.get('entry') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      format: formData.get('format') as any,
      status: formData.get('status') as any,
      imageUrl: formData.get('imageUrl') as string || 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
      teamsJoined: editingTournament?.teamsJoined || 0,
      maxTeams: parseInt(formData.get('maxTeams') as string) || 48,
    };

    if (editingTournament?.id) {
      setTournaments(tournaments.map(t => t.id === updated.id ? updated : t));
    } else {
      setTournaments([updated, ...tournaments]);
    }
    setEditingTournament(null);
  };

  const handleDeleteTournament = (id: string) => {
    if (window.confirm('Are you sure you want to delete this tournament?')) {
      setTournaments(tournaments.filter(t => t.id !== id));
    }
  };

  return (
    <div className={`min-h-screen bg-[#0a0a0c] text-white selection:bg-orange-500/30 ${(showDownloadPrompt || isAdminOpen) ? 'h-screen overflow-hidden' : ''}`}>
      
      {/* Floating WhatsApp Button */}
      <a 
        href={links.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all group animate-bounce"
      >
        <MessageCircle size={32} className="text-white" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#25D366] text-white text-[10px] font-black font-orbitron px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
          JOIN WHATSAPP GROUP
        </span>
      </a>

      {/* --- Admin Panel Modal --- */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-neutral-900 w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] overflow-hidden flex flex-col border border-white/10 shadow-2xl">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-orange-500/5">
              <div className="flex items-center gap-3">
                <Settings className="text-orange-500" size={28} />
                <h2 className="text-2xl font-black font-orbitron uppercase italic text-white">Admin Control Center</h2>
              </div>
              <button 
                onClick={() => { setIsAdminOpen(false); setEditingTournament(null); }} 
                className="p-3 hover:bg-white/5 rounded-full transition-colors text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-12">
              <section className="space-y-6">
                <h3 className="text-xs font-black font-orbitron text-orange-500 uppercase tracking-[0.3em]">Global Site Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest">Download Link</label>
                    <input 
                      type="text" 
                      value={links.download} 
                      onChange={(e) => handleUpdateLink('download', e.target.value)}
                      className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl text-sm focus:border-orange-500 outline-none transition-all text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest">WhatsApp Group Link</label>
                    <input 
                      type="text" 
                      value={links.whatsapp} 
                      onChange={(e) => handleUpdateLink('whatsapp', e.target.value)}
                      className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl text-sm focus:border-orange-500 outline-none transition-all text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest">Facebook Page</label>
                    <input 
                      type="text" 
                      value={links.facebook} 
                      onChange={(e) => handleUpdateLink('facebook', e.target.value)}
                      className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl text-sm focus:border-orange-500 outline-none transition-all text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest">YouTube Channel</label>
                    <input 
                      type="text" 
                      value={links.youtube} 
                      onChange={(e) => handleUpdateLink('youtube', e.target.value)}
                      className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl text-sm focus:border-orange-500 outline-none transition-all text-white"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-black font-orbitron text-orange-500 uppercase tracking-[0.3em]">Tournaments List</h3>
                  <button 
                    onClick={() => setEditingTournament({ id: '', name: '', prizePool: '', entryFee: '', date: '', time: '', teamsJoined: 0, maxTeams: 48, status: 'upcoming', format: 'Squad', imageUrl: '' })}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-[10px] font-black font-orbitron transition-all"
                  >
                    <Plus size={16} /> ADD NEW MATCH
                  </button>
                </div>

                {editingTournament && (
                  <form onSubmit={handleSaveTournament} className="bg-black/40 p-8 rounded-3xl border border-orange-500/30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in slide-in-from-top-4 duration-300">
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">Match Name</label>
                      <input name="name" defaultValue={editingTournament.name} required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm focus:border-orange-500 outline-none text-white" placeholder="Bermuda Clash" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">Prize Pool</label>
                      <input name="prize" defaultValue={editingTournament.prizePool} required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm focus:border-orange-500 outline-none text-white" placeholder="৳10,000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">Entry Fee</label>
                      <input name="entry" defaultValue={editingTournament.entryFee} required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm focus:border-orange-500 outline-none text-white" placeholder="৳50 or FREE" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">Date</label>
                      <input name="date" type="date" defaultValue={editingTournament.date} required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm focus:border-orange-500 outline-none text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">Time</label>
                      <input name="time" defaultValue={editingTournament.time} required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm focus:border-orange-500 outline-none text-white" placeholder="18:00 BST" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">Format</label>
                      <select name="format" defaultValue={editingTournament.format} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm focus:border-orange-500 outline-none appearance-none text-white">
                        <option value="Solo">Solo</option>
                        <option value="Duo">Duo</option>
                        <option value="Squad">Squad</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">Status</label>
                      <select name="status" defaultValue={editingTournament.status} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm focus:border-orange-500 outline-none appearance-none text-white">
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">Image URL</label>
                      <input name="imageUrl" defaultValue={editingTournament.imageUrl} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm focus:border-orange-500 outline-none text-white" placeholder="https://..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-neutral-500">Max Slots</label>
                      <input name="maxTeams" type="number" defaultValue={editingTournament.maxTeams} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm focus:border-orange-500 outline-none text-white" />
                    </div>
                    <div className="md:col-span-full flex gap-4 pt-4">
                      <button type="submit" className="gaming-gradient text-white px-8 py-4 rounded-2xl font-black font-orbitron text-xs flex items-center gap-2 hover:scale-105 active:scale-95 transition-all">
                        <Save size={18} /> SAVE CHANGES
                      </button>
                      <button type="button" onClick={() => setEditingTournament(null)} className="bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl font-black font-orbitron text-xs transition-all text-white">
                        CANCEL
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-4">
                  {tournaments.map(t => (
                    <div key={t.id} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 group hover:border-white/10 transition-all">
                      <div className="flex items-center gap-4">
                        <img src={t.imageUrl || 'https://images.unsplash.com/photo-1542751371-adc38448a05e'} className="w-14 h-14 rounded-xl object-cover" alt="" />
                        <div>
                          <h4 className="font-bold font-orbitron text-white uppercase">{t.name}</h4>
                          <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-black">{t.date} • {t.prizePool} • {t.format}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setEditingTournament(t)} className="p-3 bg-white/5 hover:bg-orange-500/20 text-neutral-400 hover:text-orange-500 rounded-xl transition-all"><Edit size={18} /></button>
                        <button onClick={() => handleDeleteTournament(t.id)} className="p-3 bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-500 rounded-xl transition-all"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* --- Download Action Overlay --- */}
      {showDownloadPrompt && (
        <div className="fixed inset-0 z-[100] bg-[#0a0a0c] flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full"></div>
          </div>
          
          <button 
            onClick={() => setShowDownloadPrompt(false)}
            className="absolute top-8 right-8 text-neutral-400 hover:text-white transition-all bg-white/5 p-3 rounded-full border border-white/10 z-50 hover:scale-110 active:scale-95"
          >
            <X size={24} />
          </button>

          <div className="relative z-10 max-w-lg w-full space-y-8 text-center animate-in zoom-in duration-300">
            <div className="inline-flex items-center justify-center w-28 h-28 bg-orange-500/10 rounded-[2.5rem] border border-orange-500/30 mb-2">
              <Smartphone size={56} className="text-orange-500" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black font-orbitron tracking-tighter italic text-white uppercase">
                GET THE <span className="text-orange-500">APP</span>
              </h2>
              <p className="text-xl text-neutral-400 font-medium max-w-sm mx-auto">
                Download the official NexGen Gaming app to participate in tournaments.
              </p>
            </div>

            <div className="pt-4 space-y-4">
              <a 
                href={links.download}
                target="_blank"
                rel="noreferrer"
                className="w-full group flex items-center justify-center gap-4 gaming-gradient px-12 py-7 rounded-3xl text-white font-black font-orbitron text-2xl transition-all hover:scale-[1.03] active:scale-95 shadow-[0_20px_40px_-10px_rgba(249,115,22,0.4)]"
              >
                <Download className="animate-bounce" />
                DOWNLOAD NOW
              </a>

              <a 
                href={links.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-full group flex items-center justify-center gap-4 bg-[#25D366] px-12 py-7 rounded-3xl text-white font-black font-orbitron text-2xl transition-all hover:scale-[1.03] active:scale-95 shadow-[0_20px_40px_-10px_rgba(37,211,102,0.4)]"
              >
                <MessageCircle />
                JOIN WHATSAPP GROUP
              </a>
              
              <button 
                onClick={() => setShowDownloadPrompt(false)}
                className="text-neutral-500 font-black font-orbitron uppercase tracking-[0.2em] text-[10px] hover:text-white transition-colors"
              >
                Return to Matches
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 py-4 px-6 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white font-orbitron font-black text-sm">N</div>
            <span className="font-orbitron font-black text-sm tracking-tighter text-white uppercase italic">
              NexGen <span className="text-orange-500">Gaming</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-neutral-400">
            <a href={links.whatsapp} target="_blank" rel="noreferrer" className="hover:text-[#25D366] transition-colors"><MessageCircle size={18} /></a>
            <a href={links.facebook} target="_blank" rel="noreferrer" className="hover:text-[#1877F2] transition-colors"><Facebook size={16} /></a>
            <a href={links.youtube} target="_blank" rel="noreferrer" className="hover:text-[#FF0000] transition-colors"><Youtube size={18} /></a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 px-6 overflow-hidden flex flex-col items-center">
        {/* Background Overlay */}
        <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center brightness-[0.2]"></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-[#0a0a0c]"></div>

        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 rounded-full mb-10">
          <span className="text-[9px] font-black font-orbitron uppercase tracking-[0.3em] text-orange-500">🔥 OFFICIAL TOURNAMENT HUB</span>
        </div>

        <div className="text-center mb-12 max-w-5xl">
          <h1 className="text-6xl md:text-[9rem] font-black font-orbitron leading-[0.75] tracking-tighter italic text-white uppercase flex flex-col items-center">
            NexGen
            <span className="text-orange-500 drop-shadow-[0_10px_25px_rgba(249,115,22,0.5)]">Gaming</span>
          </h1>
          <p className="mt-10 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Unlock the ultimate eSports experience. Participate in daily Free Fire matches, climb the ranks, and secure your glory.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <button 
            onClick={() => setShowDownloadPrompt(true)}
            className="group flex items-center gap-4 bg-orange-500 px-12 py-5 rounded-xl text-white font-black font-orbitron text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_15px_40px_-5px_rgba(249,115,22,0.6)]"
          >
            <Download size={24} />
            DOWNLOAD NOW
          </button>
          
          <a 
            href={links.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 bg-[#25D366] px-12 py-5 rounded-xl text-white font-black font-orbitron text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_15px_40px_-5px_rgba(37,211,102,0.6)]"
          >
            <MessageCircle size={24} />
            JOIN WHATSAPP
          </a>
        </div>

        <div className="flex gap-8 text-neutral-600">
          <a href={links.whatsapp} target="_blank" rel="noreferrer" className="hover:text-[#25D366] transition-colors"><MessageCircle size={24} /></a>
          <a href={links.facebook} target="_blank" rel="noreferrer" className="hover:text-[#1877F2] transition-colors"><Facebook size={24} /></a>
          <a href={links.youtube} target="_blank" rel="noreferrer" className="hover:text-[#FF0000] transition-colors"><Youtube size={28} /></a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Trophy, label: 'PRIZE POOL', value: '৳5L+', color: 'text-orange-500' },
            { icon: Users, label: 'ACTIVE GAMERS', value: '10K+', color: 'text-blue-500' },
            { icon: Zap, label: 'INSTANT PAYOUT', value: '100%', color: 'text-yellow-500' },
            { icon: ShieldCheck, label: 'SECURE PLAY', value: 'Safe', color: 'text-green-500' },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#111114]/50 border border-white/5 p-10 rounded-[2.5rem] flex flex-col items-center text-center shadow-xl">
              <div className={`mb-6 p-4 rounded-2xl bg-black/30 ${item.color}`}><item.icon size={36} /></div>
              <span className="text-4xl font-black font-orbitron text-white leading-tight uppercase">{item.value}</span>
              <span className="text-[10px] uppercase font-black text-neutral-500 tracking-[0.2em] mt-3">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Matches Grid */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="mb-14 border-l-4 border-orange-500 pl-8">
          <h2 className="text-4xl md:text-6xl font-black font-orbitron italic tracking-tighter uppercase text-white">
            UPCOMING <span className="text-orange-500">MATCHES</span>
          </h2>
          <p className="text-neutral-500 text-sm mt-3 uppercase font-bold tracking-widest opacity-80">Join the battlefield. Real prizes, real players, next-gen competition.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {tournaments.map((tournament) => {
            const isFull = tournament.teamsJoined >= tournament.maxTeams;
            const percentage = Math.min(100, Math.round((tournament.teamsJoined / tournament.maxTeams) * 100));
            return (
              <div key={tournament.id} className="bg-[#111114] rounded-[2rem] overflow-hidden border border-white/5 flex flex-col group shadow-2xl">
                <div className="relative h-60 overflow-hidden">
                  <img src={tournament.imageUrl || 'https://images.unsplash.com/photo-1542751371-adc38448a05e'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                  <div className="absolute top-5 left-5 bg-black/70 backdrop-blur px-4 py-1.5 rounded-lg text-[10px] font-black font-orbitron uppercase text-orange-500 border border-white/10">
                    {tournament.format}
                  </div>
                  <div className={`absolute top-5 right-5 px-4 py-1.5 rounded-lg text-[10px] font-black font-orbitron uppercase text-white ${tournament.status === 'ongoing' ? 'bg-red-500' : 'bg-green-500'}`}>
                    {tournament.status}
                  </div>
                </div>
                <div className="p-10 space-y-8 flex-1 flex flex-col">
                  <h3 className="text-3xl font-black font-orbitron uppercase italic tracking-tighter text-white group-hover:text-orange-500 transition-colors">{tournament.name}</h3>
                  
                  <div className="grid grid-cols-2 gap-y-4 text-xs">
                    <div className="flex items-center gap-3 text-neutral-400 font-bold">
                      <Banknote size={16} className="text-orange-500" />
                      <span>Pool: <b className="text-white ml-1">{tournament.prizePool}</b></span>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-400 font-bold">
                      <Layers size={16} className="text-orange-500" />
                      <span>Entry: <b className="text-white ml-1">{tournament.entryFee}</b></span>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-400 font-bold">
                      <Calendar size={16} className="text-orange-500" />
                      <span>{tournament.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-400 font-bold">
                      <Clock size={16} className="text-orange-500" />
                      <span>{tournament.time}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                     <div className="flex justify-between text-[10px] font-black font-orbitron text-neutral-500 uppercase tracking-widest mb-3">
                       <span>{tournament.teamsJoined} / {tournament.maxTeams} TEAMS</span>
                       <span className="text-orange-500">{percentage}% Full</span>
                     </div>
                     <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" style={{ width: `${percentage}%` }}></div>
                     </div>
                  </div>

                  <button 
                    disabled={isFull || tournament.status !== 'upcoming'}
                    onClick={handleJoinClick}
                    className={`w-full py-5 rounded-2xl font-black font-orbitron uppercase text-sm tracking-[0.1em] transition-all mt-auto ${
                      isFull || tournament.status !== 'upcoming' 
                      ? 'bg-[#1a1a1e] text-neutral-600 cursor-not-allowed border border-white/5' 
                      : 'bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-500/20 active:scale-95'
                    }`}
                  >
                    {isFull ? 'FULLY OCCUPIED' : tournament.status === 'ongoing' ? 'MATCH ONGOING' : 'JOIN TOURNAMENT'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section Banner - Reduced size Version */}
      <section className="px-6 mb-24 max-w-5xl mx-auto">
        <div className="bg-orange-500 rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 -z-10 opacity-10 transform translate-x-1/3 -translate-y-1/3 rotate-12">
             <Trophy size={400} />
          </div>
          
          <div className="space-y-5 max-w-xl text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black font-orbitron italic leading-[0.9] text-white uppercase tracking-tighter">
              START YOUR <br/> JOURNEY TODAY.
            </h2>
            <p className="text-orange-50 font-black text-xs md:text-sm uppercase tracking-wider opacity-90">
              Download the NexGen Gaming app and claim your first entry bonus.
            </p>
          </div>

          <div className="flex flex-col gap-3 min-w-[240px]">
            <button 
              onClick={() => setShowDownloadPrompt(true)}
              className="bg-white text-orange-600 px-8 py-4 rounded-xl font-black font-orbitron text-base flex items-center justify-between gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10"
            >
              GET THE APP <ChevronRight size={20} />
            </button>
            <a 
              href={links.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="bg-black/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-black font-orbitron text-base flex items-center justify-between gap-3 hover:bg-black/20 transition-all border border-white/10"
            >
              WHATSAPP GROUP <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white font-orbitron font-black text-sm">N</div>
            <span className="font-orbitron font-black text-lg tracking-tighter text-white uppercase italic">
              NexGen <span className="text-orange-500">Gaming</span>
            </span>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-[0.3em] text-center">
              © 2024 NexGen Gaming. ALL RIGHTS RESERVED. NOT AFFILIATED WITH GARENA.
            </p>
            <div className="flex gap-6 items-center">
              <button onClick={() => setIsAdminOpen(true)} className="text-[9px] font-black font-orbitron text-neutral-900 hover:text-neutral-700 transition-colors uppercase tracking-[0.5em]">
                STAFF PORTAL
              </button>
              <a href={links.whatsapp} target="_blank" rel="noreferrer" className="text-[9px] font-black font-orbitron text-neutral-800 hover:text-[#25D366] transition-colors uppercase tracking-[0.5em]">
                WHATSAPP
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
