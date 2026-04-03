import React from "react";
import { GlassCard } from "../../components/ui/GlassCard";
import { InputField } from "../../components/ui/InputField";
import { PrimaryButton } from "../../components/ui/PrimaryButton";
import { Search, MapPin, Navigation } from "lucide-react";

export function Dispatch() {
  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-160px)] flex flex-col">
       <div className="mb-6 flex-shrink-0">
        <h2 className="text-2xl font-bold text-white tracking-tight">Manual Dispatch</h2>
        <p className="text-savaari-gray text-sm mt-1">Force-assign rides and monitor geographic heatmaps.</p>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 bg-transparent">
         {/* Map View representing Google/Mapbox map */}
         <GlassCard hoverEffect={false} className="flex-1 relative overflow-hidden p-0 bg-[#121214] border-white/10 rounded-2xl">
            {/* Map Placeholder Styles */}
            <div className="absolute inset-0 bg-[#0B0B0C]" />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0C]/40 to-transparent pointer-events-none" />

            {/* Simulated Live Route / Driver Location */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <div className="w-48 h-48 border border-dashed border-savaari-accent/30 rounded-full flex items-center justify-center relative bg-savaari-accent/5">
                 <div className="w-6 h-6 bg-savaari-accent rounded-full border-4 border-[#0B0B0C] shadow-[0_0_20px_rgba(0,240,255,1)] flex items-center justify-center z-10 relative" >
                   <div className="absolute inset-x-0 -bottom-8 whitespace-nowrap text-xs text-white font-medium bg-black/80 px-2 py-0.5 rounded backdrop-blur border border-white/10">Driver KL-01</div>
                 </div>
               </div>
            </div>

            <div className="absolute top-4 left-4">
              <div className="bg-[#1c1c1e] text-savaari-gray text-xs font-mono px-3 py-1.5 rounded-md border border-white/10 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-savaari-green animate-pulse" /> Live Tracking Active
              </div>
            </div>
         </GlassCard>

         {/* Dispatch override panel */}
         <div className="w-full lg:w-96 flex flex-col gap-6 overflow-y-auto pr-2">
            <GlassCard hoverEffect={false} className="p-6 bg-[#0B0B0C]/90">
               <h3 className="text-white font-medium mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
                 <Navigation size={16} className="text-savaari-green" /> Override Assignment
               </h3>
               <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-[32px] text-savaari-gray h-4 w-4" />
                    <InputField label="Find Driver (ID or Phone)" placeholder="e.g. DL-293" className="[&_input]:pl-9" />
                  </div>
                  
                  <div className="bg-savaari-accent/10 border border-savaari-accent/20 rounded-xl p-3 flex justify-between items-center">
                     <div>
                       <div className="text-white text-sm font-medium">Found: Ravi Kumar</div>
                       <div className="text-savaari-accent text-xs">0.4 km away</div>
                     </div>
                     <PrimaryButton variant="accent" className="px-4 py-1 text-xs">Assign</PrimaryButton>
                  </div>
               </div>
            </GlassCard>
            
            <GlassCard hoverEffect={false} className="p-6 bg-[#0B0B0C]/90 flex-1">
               <h3 className="text-white font-medium mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
                 <MapPin size={16} className="text-white" /> Live Regions
               </h3>
               <div className="space-y-3">
                 {[
                   {name: 'Kochi Central Hub', status: 'High Demand', color: 'savaari-accent'},
                   {name: 'Trivandrum South', status: 'Low Demand', color: 'savaari-gray'},
                   {name: 'Edappally Route 4', status: 'Surge', color: 'red-400'}
                 ].map((region, i) => (
                    <div key={i} className="flex justify-between items-center p-2 hover:bg-white/5 rounded-lg border border-transparent hover:border-white/5 cursor-pointer transition-all">
                       <span className="text-sm text-white">{region.name}</span>
                       <span className={`text-[10px] font-bold uppercase tracking-wider text-${region.color}`}>{region.status}</span>
                    </div>
                 ))}
               </div>
            </GlassCard>
         </div>
      </div>
    </div>
  );
}
