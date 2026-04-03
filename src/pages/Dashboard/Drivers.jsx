import React, { useEffect, useState } from "react";
import { useDashboardStore } from "../../store/useDashboardStore";
import { GlassCard } from "../../components/ui/GlassCard";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { Search, Filter, MoreVertical, Award, TrendingUp, Clock, MapPin } from "lucide-react";
import { cn } from "../../lib/utils";

export function Drivers() {
  const { activeDrivers, fetchDashboardData } = useDashboardStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const filteredDrivers = activeDrivers.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Driver Fleet</h2>
          <p className="text-savaari-gray mt-1">Real-time performance metrics and availability of {activeDrivers.length} active drivers.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-savaari-gray" size={16} />
            <input 
              type="text" 
              placeholder="Search ID, Name or Vehicle..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#1c1c1e] border border-white/5 text-sm text-white pl-10 pr-4 py-2 rounded-xl w-64 focus:outline-none focus:border-savaari-accent transition-colors shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-[#1c1c1e] text-savaari-gray rounded-xl border border-white/5 hover:text-white transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Now', value: activeDrivers.filter(d => d.status === 'available').length, icon: Clock, color: 'text-savaari-accent' },
          { label: 'Avg. Acceptance', value: '94.2%', icon: TrendingUp, color: 'text-savaari-green' },
          { label: 'Top Rated', value: activeDrivers.filter(d => parseFloat(d.rating) >= 4.8).length, icon: Award, color: 'text-amber-400' },
          { label: 'Total Earnings', value: '₹4.2L', icon: TrendingUp, color: 'text-savaari-accent' },
        ].map((stat, i) => (
          <GlassCard key={i} className="p-4 border-white/5 bg-[#121214]/50 flex items-center gap-4">
            <div className={cn("w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center", stat.color)}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-savaari-gray uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-bold text-white">{stat.value}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="overflow-hidden border-white/5 bg-[#121214]/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-[10px] font-bold text-savaari-gray uppercase tracking-wider">Driver Details</th>
                <th className="px-6 py-4 text-[10px] font-bold text-savaari-gray uppercase tracking-wider">Vehicle Info</th>
                <th className="px-6 py-4 text-[10px] font-bold text-savaari-gray uppercase tracking-wider">Today's Stats</th>
                <th className="px-6 py-4 text-[10px] font-bold text-savaari-gray uppercase tracking-wider">History</th>
                <th className="px-6 py-4 text-[10px] font-bold text-savaari-gray uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-savaari-gray uppercase tracking-wider text-right">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredDrivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-savaari-accent/20 to-primary flex items-center justify-center font-bold text-savaari-accent border border-savaari-accent/10">
                          {driver.name.charAt(0)}
                       </div>
                       <div>
                          <p className="text-sm font-bold text-white">{driver.name}</p>
                          <p className="text-[10px] text-savaari-gray font-mono">{driver.id}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-white/70">
                    <div className="flex flex-col">
                      <span className="font-bold">{driver.vehicle}</span>
                      <span className="text-[10px] text-savaari-gray">SEDAN • WHITE</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-savaari-green">₹{driver.earningsToday || '0'}</span>
                      <span className="text-[10px] text-savaari-gray">{driver.acceptanceRate || '0%'} Acceptance</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-white">{driver.totalRides || '0'} Total Rides</span>
                      <span className="text-[10px] text-savaari-gray flex items-center gap-1"><Clock size={8}/> Last: {driver.lastActive || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase",
                      driver.status === 'available' ? 'bg-savaari-green/10 text-savaari-green border-savaari-green/20' : 
                      driver.status === 'busy' ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' : 
                      'bg-white/5 text-savaari-gray border-white/10'
                    )}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 text-sm font-bold text-white">
                      <span className="text-amber-400 text-lg">★</span> {driver.rating}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
