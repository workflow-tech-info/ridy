import React from "react";
import { useDashboardStore } from "../../store/useDashboardStore";
import { StatCard } from "../../components/ui/StatCard";
import { Car, IndianRupee, PhoneCall, Route } from "lucide-react";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { GlassCard } from "../../components/ui/GlassCard";

export function DashboardHome() {
  const stats = useDashboardStore(state => state.stats);
  const activeDrivers = useDashboardStore(state => state.activeDrivers);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Rides Today" value={stats.ridesToday} trend={12} icon={Route} />
        <StatCard title="Revenue" value={stats.revenue} trend={8} icon={IndianRupee} />
        <StatCard title="Active Rides" value={stats.activeRideCount} icon={Car} />
        <StatCard title="Available Drivers" value={stats.availableDrivers} icon={PhoneCall} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Mock Map Preview */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-medium text-white mb-4">Live Activity Map</h3>
          <GlassCard hoverEffect={false} className="h-[400px] flex items-center justify-center relative overflow-hidden p-0 bg-[#0B0B0C]">
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-savaari-accent/40 via-black to-black" />
             {/* Map Grid Pattern Mockup */}
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
             
             {/* Mock Vehicles */}
             <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-savaari-accent rounded-full shadow-[0_0_15px_rgba(0,240,255,0.8)]" />
             <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-savaari-green rounded-full shadow-[0_0_15px_rgba(0,255,85,0.8)]" />
             <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-savaari-accent rounded-full shadow-[0_0_15px_rgba(0,240,255,0.8)]" />

             <span className="text-savaari-gray z-10 font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/5">Map Integration Ready (Mapbox/Google)</span>
          </GlassCard>
        </div>

        {/* Mini Driver List */}
        <div>
           <h3 className="text-lg font-medium text-white mb-4">Active Drivers Status</h3>
           <GlassCard hoverEffect={false} className="h-[400px] p-0 overflow-hidden bg-[#0B0B0C]/80">
              <div className="divide-y divide-savaari-border h-full overflow-y-auto">
                {activeDrivers.map(driver => (
                  <div key={driver.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                     <div>
                       <p className="text-sm font-medium text-white">{driver.name}</p>
                       <p className="text-xs text-savaari-gray">{driver.vehicle}</p>
                     </div>
                     <StatusBadge status={driver.status} />
                  </div>
                ))}
              </div>
           </GlassCard>
        </div>
      </div>
    </div>
  );
}
