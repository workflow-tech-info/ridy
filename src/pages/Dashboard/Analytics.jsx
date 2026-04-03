import React, { useEffect } from "react";
import { useDashboardStore } from "../../store/useDashboardStore";
import { GlassCard } from "../../components/ui/GlassCard";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, LineChart, Line, Cell
} from 'recharts';
import { TrendingUp, Users, Calendar, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function Analytics() {
  const { stats, fetchDashboardData } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1c1c1e] border border-white/10 p-3 rounded-xl shadow-2xl backdrop-blur-md">
          <p className="text-[10px] font-bold text-savaari-gray uppercase mb-1">{label}</p>
          <p className="text-sm font-bold text-white">{payload[0].name}: <span className="text-savaari-accent">{payload[0].value}</span></p>
        </div>
      );
    }
    return null;
  };

  if (!stats?.trends?.rides || !stats?.trends?.revenue) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-savaari-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="text-savaari-gray font-medium animate-pulse">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">System Analytics</h2>
          <p className="text-savaari-gray mt-1">Operational metrics and high-level network performance overviews.</p>
        </div>
        <div className="flex bg-[#1c1c1e] p-1 rounded-xl border border-white/5">
           {['Day', 'Week', 'Month', 'Year'].map(t => (
             <button key={t} className={cn("px-4 py-1.5 rounded-lg text-xs font-bold transition-all", t === 'Week' ? 'bg-savaari-accent text-primary' : 'text-savaari-gray hover:text-white')}>{t}</button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Rides', value: '1,284', change: '+12.5%', isUp: true, icon: Calendar },
          { label: 'Revenue', value: stats.revenue || '₹0', change: '+8.2%', isUp: true, icon: TrendingUp },
          { label: 'Active Drivers', value: stats.activeRideCount || 0, change: '-2.4%', isUp: false, icon: Users },
          { label: 'Avg. Wait', value: '2.4m', change: '-15.0%', isUp: true, icon: Clock },
        ].map((stat, i) => (
          <GlassCard key={i} className="p-6 border-white/5 bg-[#121214]/50">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-white/5 text-savaari-gray">
                 <stat.icon size={20} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full",
                stat.isUp ? "bg-savaari-green/10 text-savaari-green" : "bg-red-400/10 text-red-400"
              )}>
                {stat.isUp ? <ArrowUpRight size={10}/> : <ArrowDownRight size={10}/>}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-[10px] font-bold text-savaari-gray uppercase tracking-widest mt-1">{stat.label}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Rides Chart */}
        <GlassCard className="p-8 border-white/5 bg-[#121214]/50 h-[450px] flex flex-col">
           <div className="mb-8">
              <h3 className="text-xl font-bold text-white">Ride Volume</h3>
              <p className="text-savaari-gray text-xs mt-1">Total successful rides dispatched per day</p>
           </div>
           <div className="flex-1 min-h-0">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={stats.trends.rides}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#8E8E93', fontSize: 12}}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} cursor={{fill: '#ffffff05'}} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} name="Rides">
                    {stats.trends.rides.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 5 ? '#00F0FF' : '#ffffff10'} />
                    ))}
                  </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </GlassCard>

        {/* Revenue Trend */}
        <GlassCard className="p-8 border-white/5 bg-[#121214]/50 h-[450px] flex flex-col">
           <div className="mb-8">
              <h3 className="text-xl font-bold text-white">Revenue Trend</h3>
              <p className="text-savaari-gray text-xs mt-1">Daily gross revenue in INR</p>
           </div>
           <div className="flex-1 min-h-0">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={stats.trends.revenue}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00F0FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#8E8E93', fontSize: 12}}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#00F0FF" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRev)" 
                    name="Revenue"
                  />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <GlassCard className="lg:col-span-2 p-8 border-white/5 bg-[#121214]/50">
            <h3 className="text-lg font-bold text-white mb-6">Top Performing Regions</h3>
            <div className="space-y-6">
               {[
                 { name: "Kochi Airport Zone", val: 84, trend: '+12%', color: 'bg-savaari-accent' },
                 { name: "Edappally Metro Station", val: 56, trend: '+5%', color: 'bg-savaari-green' },
                 { name: "Infopark Campus", val: 32, trend: '-2%', color: 'bg-white/20' }
               ].map((hub, i) => (
                  <div key={i} className="space-y-2">
                     <div className="flex justify-between items-end">
                        <div>
                           <p className="text-sm font-bold text-white">{hub.name}</p>
                           <p className="text-[10px] text-savaari-gray uppercase font-bold tracking-widest">{hub.val} Rides Today</p>
                        </div>
                        <span className={`text-xs font-bold ${hub.trend.startsWith('+') ? 'text-savaari-green' : 'text-red-400'}`}>{hub.trend}</span>
                     </div>
                     <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full transition-all duration-1000", hub.color)} style={{ width: `${(hub.val / 100) * 100}%` }} />
                     </div>
                  </div>
               ))}
            </div>
         </GlassCard>

         <GlassCard className="p-8 border-white/5 bg-gradient-to-br from-savaari-accent/10 to-primary flex flex-col justify-center text-center">
            <h3 className="text-xl font-bold text-white mb-2">Ready to Scale?</h3>
            <p className="text-sm text-savaari-gray mb-8">Your current network efficiency is at an all-time high. Consider onboarding more drivers in Edappally.</p>
            <button className="w-full py-3 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-all active:scale-95 shadow-xl shadow-white/5">
               View Driver Onboarding
            </button>
         </GlassCard>
      </div>
    </div>
  );
}
