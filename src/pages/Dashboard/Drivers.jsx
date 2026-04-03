import React from "react";
import { useDashboardStore } from "../../store/useDashboardStore";
import { GlassCard } from "../../components/ui/GlassCard";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { InputField } from "../../components/ui/InputField";
import { Search } from "lucide-react";

export function Drivers() {
  const drivers = useDashboardStore(state => state.activeDrivers);

  return (
    <div className="max-w-6xl mx-auto">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Driver Fleet</h2>
          <p className="text-savaari-gray text-sm mt-1">Manage and monitor active drivers in the network.</p>
        </div>
        
        <div className="relative w-full sm:w-64">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-savaari-gray" size={16} />
           <input 
             type="text" 
             placeholder="Search DL or Name..." 
             className="w-full bg-[#1c1c1e] border border-savaari-border rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-savaari-accent transition-colors"
           />
        </div>
      </div>

      <GlassCard hoverEffect={false} className="p-0 overflow-hidden bg-[#0B0B0C]/80 border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-savaari-border bg-[#121214]">
                <th className="p-4 text-sm font-medium text-savaari-gray">Driver Name</th>
                <th className="p-4 text-sm font-medium text-savaari-gray">Vehicle No</th>
                <th className="p-4 text-sm font-medium text-savaari-gray">Status</th>
                <th className="p-4 text-sm font-medium text-savaari-gray">Rating</th>
                <th className="p-4 text-sm font-medium text-savaari-gray text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-savaari-border">
              {drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-savaari-accent/10 flex items-center justify-center text-savaari-accent font-bold text-sm">
                          {driver.name.charAt(0)}
                       </div>
                       <span className="font-medium text-white">{driver.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-savaari-gray text-sm">{driver.vehicle}</td>
                  <td className="p-4"><StatusBadge status={driver.status} /></td>
                  <td className="p-4 text-savaari-gray text-sm">★ {driver.rating}</td>
                  <td className="p-4 text-right">
                    <button className="text-savaari-accent text-sm font-medium hover:text-white transition-colors">View Details</button>
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
