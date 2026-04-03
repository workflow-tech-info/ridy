import React from "react";
import { cn } from "../../lib/utils";

export function StatusBadge({ status, className }) {
  const configs = {
    active: { bg: "bg-savaari-green/20", border: "border-savaari-green/30", text: "text-savaari-green", label: "Active" },
    incoming: { bg: "bg-savaari-accent/20", border: "border-savaari-accent/30", text: "text-savaari-accent", label: "Incoming" },
    missed: { bg: "bg-red-500/20", border: "border-red-500/30", text: "text-red-400", label: "Missed" },
    completed: { bg: "bg-white/10", border: "border-white/10", text: "text-savaari-gray", label: "Completed" },
    available: { bg: "bg-savaari-green/20", border: "border-savaari-green/30", text: "text-savaari-green", label: "Available" },
    busy: { bg: "bg-orange-500/20", border: "border-orange-500/30", text: "text-orange-400", label: "Busy" },
    offline: { bg: "bg-white/10", border: "border-white/10", text: "text-savaari-gray", label: "Offline" },
  };

  const current = configs[status] || configs.completed;

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm", current.bg, current.text, current.border, className)}>
      {(status === 'active' || status === 'incoming' || status === 'available') && (
        <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", current.bg.replace('/20', ''))} />
      )}
      {current.label}
    </span>
  );
}
