import React from "react";
import { GlassCard } from "../../components/ui/GlassCard";

export function Analytics() {
  // Simple CSS-based bar chart mock to keep it fast & no-deps
  const weeklyData = [
    { day: "Mon", rides: 80, height: "40%" },
    { day: "Tue", rides: 110, height: "60%" },
    { day: "Wed", rides: 95, height: "50%" },
    { day: "Thu", rides: 140, height: "80%" },
    { day: "Fri", rides: 190, height: "100%" },
    { day: "Sat", rides: 160, height: "85%" },
    { day: "Sun", rides: 130, height: "70%" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">System Analytics</h2>
        <p className="text-savaari-gray text-sm mt-1">Operational metrics and high-level performance overviews.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Weekly Rides Chart */}
        <GlassCard hoverEffect={false} className="p-8 bg-[#0B0B0C]/80 flex flex-col h-[400px]">
           <div className="mb-6">
              <h3 className="text-white font-semibold">Weekly Completion Volume</h3>
              <p className="text-savaari-gray text-xs">Total successful rides dispatched</p>
           </div>
           
           <div className="flex-1 flex items-end justify-between gap-4 pt-10 pb-2 border-b border-savaari-border relative">
              {weeklyData.map((d, i) => (
                <div key={i} className="flex flex-col items-center w-full group">
                  <div className="text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 mb-2 font-mono bg-[#1c1c1e] px-2 py-1 rounded">
                    {d.rides}
                  </div>
                  <div className="w-full max-w-[40px] bg-savaari-accent/20 hover:bg-savaari-accent/40 rounded-t-md transition-all relative overflow-hidden" style={{ height: d.height }}>
                     {/* Gradient fill */}
                     <div className="absolute bottom-0 left-0 right-0 top-1/2 bg-gradient-to-t from-savaari-accent/60 to-transparent" />
                  </div>
                  <span className="text-xs text-savaari-gray mt-4">{d.day}</span>
                </div>
              ))}
           </div>
        </GlassCard>

        {/* Heatmap / Zone Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
           <GlassCard className="bg-[#121214] border-white/5 flex flex-col justify-center text-center p-6">
              <span className="text-4xl font-bold text-white mb-2">94%</span>
              <span className="text-sm font-medium text-savaari-gray">Dispatch Rate</span>
              <div className="w-full bg-black h-1.5 rounded-full mt-4 overflow-hidden">
                <div className="w-[94%] bg-savaari-green h-full rounded-full" />
              </div>
           </GlassCard>
           
           <GlassCard className="bg-[#121214] border-white/5 flex flex-col justify-center text-center p-6">
              <span className="text-4xl font-bold text-white mb-2">2.4m</span>
              <span className="text-sm font-medium text-savaari-gray">Avg. Wait Time</span>
              <div className="w-full bg-black h-1.5 rounded-full mt-4 overflow-hidden">
                <div className="w-[30%] bg-savaari-accent h-full rounded-full" />
              </div>
           </GlassCard>

           <GlassCard className="sm:col-span-2 bg-[#0B0B0C]/80">
              <h3 className="text-white font-semibold text-sm mb-4">Top Hubs Today</h3>
              <div className="space-y-4">
                 {[
                   { name: "Kochi Airport Zone", val: 84 },
                   { name: "Edappally Metro Station", val: 56 },
                   { name: "Infopark Campus", val: 32 }
                 ].map((hub, i) => (
                    <div key={i} className="flex items-center justify-between">
                       <span className="text-savaari-gray text-sm">{hub.name}</span>
                       <span className="text-white font-mono text-sm">{hub.val} rides</span>
                    </div>
                 ))}
              </div>
           </GlassCard>
        </div>
      </div>
    </div>
  );
}
