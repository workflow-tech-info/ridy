import React, { useState, useEffect } from "react";
import { useDashboardStore } from "../../store/useDashboardStore";
import { GlassCard } from "../../components/ui/GlassCard";
import { InputField } from "../../components/ui/InputField";
import { PrimaryButton } from "../../components/ui/PrimaryButton";
import { Search, MapPin, Navigation, Phone, Radar, ShieldCheck, Zap } from "lucide-react";
import { cn } from "../../lib/utils";

export function Dispatch() {
  const { activeDrivers, fetchDashboardData, loading } = useDashboardStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const filteredDrivers = activeDrivers.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-160px)] flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Mission Control</h2>
          <p className="text-savaari-gray mt-1">Real-time driver dispatching and network monitoring hub.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#1c1c1e] px-4 py-2 rounded-xl border border-white/5">
            <span className="w-2 h-2 rounded-full bg-savaari-green animate-pulse"></span>
            <span className="text-xs font-bold text-white uppercase tracking-wider">{activeDrivers.filter(d => d.status === 'available').length} Drivers Online</span>
          </div>
          <PrimaryButton variant="accent" className="flex items-center gap-2 px-6 py-2.5 shadow-lg shadow-savaari-accent/20">
            <Radar size={18} className="animate-pulse" />
            Scan Region
          </PrimaryButton>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Map View / Network Visualization */}
        <div className="flex-1 relative rounded-3xl border border-white/5 bg-[#0B0B0C] overflow-hidden group">
          {/* Grid Pattern Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

          {/* Simulated Driver Hub Nodes */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-savaari-accent/5 rounded-full border border-savaari-accent/10 animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-savaari-green/5 rounded-full border border-savaari-green/10 animate-pulse delay-700" />

          {/* Central Active Cursor */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute -inset-8 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute -inset-16 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              <div className="w-4 h-4 bg-savaari-accent rounded-full shadow-[0_0_20px_#00F0FF] border-2 border-primary z-20 relative" />
              <div className="absolute -inset-4 bg-savaari-accent/20 rounded-full animate-ping" />
            </div>
          </div>

          {/* Interactive Info Panel Overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
             <GlassCard className="px-6 py-4 bg-[#1c1c1e]/80 border-white/10 backdrop-blur-xl pointer-events-auto flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-savaari-gray uppercase tracking-widest">Network Efficiency</span>
                  <span className="text-xl font-bold text-white">98.4%</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-savaari-gray uppercase tracking-widest">Avg. Response</span>
                  <span className="text-xl font-bold text-white">1.2m</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <button className="flex items-center gap-2 px-4 py-2 bg-savaari-accent text-primary font-bold rounded-xl text-sm transition-transform hover:scale-105 active:scale-95">
                  <ShieldCheck size={16} /> Secure Mode
                </button>
             </GlassCard>
             
             <div className="flex flex-col gap-2 pointer-events-auto">
               <button className="w-10 h-10 border border-white/10 bg-[#1c1c1e]/80 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-colors shadow-lg">+</button>
               <button className="w-10 h-10 border border-white/10 bg-[#1c1c1e]/80 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-colors shadow-lg">-</button>
             </div>
          </div>

          <div className="absolute top-6 left-6 z-20">
             <div className="bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl space-y-3 shadow-2xl">
                <div className="flex items-center gap-2">
                   <div className="w-4 h-4 rounded-sm bg-savaari-accent/20 border border-savaari-accent/30" />
                   <span className="text-[10px] font-bold text-white/70 uppercase">High Demand Hubs</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-4 h-4 rounded-full bg-savaari-green shadow-[0_0_10px_#00FF55]" />
                   <span className="text-[10px] font-bold text-white/70 uppercase">Active Drivers</span>
                </div>
             </div>
          </div>
        </div>

        {/* Dispatch Operations Panel */}
        <div className="w-full lg:w-[400px] flex flex-col gap-6 h-full min-h-0">
          <GlassCard className="p-6 bg-[#121214]/50 border-white/5 flex flex-col min-h-0">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-white/5 pb-3">
              <Zap size={18} className="text-savaari-accent" /> Driver Selection
            </h3>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-savaari-gray" size={16} />
              <input 
                type="text" 
                placeholder="Search drivers or vehicle IDs..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-savaari-accent transition-colors" 
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
              {filteredDrivers.map((driver) => (
                <div key={driver.id} className="p-4 rounded-2xl bg-[#1c1c1e]/50 border border-white/5 hover:border-savaari-accent/30 transition-all group flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-savaari-accent/20 to-primary flex items-center justify-center font-bold text-savaari-accent border border-savaari-accent/10">
                        {driver.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{driver.name}</p>
                        <p className="text-[10px] text-savaari-gray font-mono uppercase">{driver.id} • {driver.vehicle}</p>
                      </div>
                    </div>
                    <div className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold border uppercase",
                      driver.status === 'available' ? 'bg-savaari-green/10 text-savaari-green border-savaari-green/20' : 'bg-red-400/10 text-red-400 border-red-400/20'
                    )}>
                      {driver.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                     <div className="bg-black/20 p-2 rounded-lg text-center">
                        <p className="text-[8px] text-savaari-gray uppercase font-bold">Distance</p>
                        <p className="text-xs text-white font-bold">{driver.distance || '0.5 km'}</p>
                     </div>
                     <div className="bg-black/20 p-2 rounded-lg text-center">
                        <p className="text-[8px] text-savaari-gray uppercase font-bold">Acceptance</p>
                        <p className="text-xs text-white font-bold">{driver.acceptanceRate || '95%'}</p>
                     </div>
                     <div className="bg-black/20 p-2 rounded-lg text-center">
                        <p className="text-[8px] text-savaari-gray uppercase font-bold">Trips</p>
                        <p className="text-xs text-white font-bold">{driver.totalRides || '120'}</p>
                     </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-savaari-accent text-primary py-2 rounded-xl text-xs font-bold hover:bg-savaari-accent/90 transition-all active:scale-95">
                      <Navigation size={14} /> Assign
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center border border-white/10 hover:bg-white/5 rounded-xl transition-colors">
                      <Phone size={14} className="text-savaari-gray" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
