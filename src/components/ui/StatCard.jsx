import React from "react";
import { cn } from "../../lib/utils";

export function StatCard({ title, value, trend, icon: Icon, className }) {
  return (
    <div className={cn("bg-[#121214]/80 backdrop-blur-sm border border-savaari-border rounded-2xl p-5 shadow-sm transition-all hover:bg-[#1c1c1e]", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-savaari-gray">{title}</h3>
        {Icon && (
          <div className="p-2 bg-white/5 rounded-lg border border-white/5">
            <Icon size={16} className="text-savaari-accent" />
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
        {trend && (
           <span className={cn("text-xs font-medium", trend > 0 ? "text-savaari-green" : "text-red-400")}>
              {trend > 0 ? "+" : ""}{trend}% today
           </span>
        )}
      </div>
    </div>
  );
}
