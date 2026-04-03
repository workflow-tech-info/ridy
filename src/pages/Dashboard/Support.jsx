import React, { useState, useEffect } from 'react';
import { useDashboardStore } from '../../store/useDashboardStore';
import { GlassCard } from '../../components/ui/GlassCard';
import { Inbox, CheckCircle2, MessageSquare, Phone, User, Tag, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Support() {
  const { tickets, fetchDashboardData } = useDashboardStore();
  const [activeTab, setActiveTab] = useState('Open');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const filteredTickets = tickets.filter(t => t.status === activeTab);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Support Tickets</h2>
          <p className="text-savaari-gray mt-1">Manage customer complaints and driver assistance requests.</p>
        </div>
        <div className="flex bg-[#1c1c1e] p-1 rounded-xl border border-white/5 shadow-sm">
          <button 
            onClick={() => setActiveTab('Open')}
            className={cn(
              "px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
              activeTab === 'Open' ? "bg-savaari-accent text-primary" : "text-savaari-gray hover:text-white"
            )}
          >
            <Inbox size={16} /> Open
          </button>
          <button 
            onClick={() => setActiveTab('Resolved')}
            className={cn(
              "px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ml-1",
              activeTab === 'Resolved' ? "bg-savaari-accent text-primary" : "text-savaari-gray hover:text-white"
            )}
          >
            <CheckCircle2 size={16} /> Resolved
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTickets.map((ticket) => (
          <GlassCard key={ticket.id} className="p-6 border-white/5 bg-[#121214]/50 flex flex-col justify-between hover:border-savaari-accent/30 transition-all cursor-pointer">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-savaari-accent bg-savaari-accent/10 px-2 py-0.5 rounded border border-savaari-accent/20">
                  {ticket.id}
                </span>
                <span className="text-[10px] text-savaari-gray flex items-center gap-1">
                  <Clock size={10} /> {ticket.createdAt}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">{ticket.issue}</h3>
              <div className="space-y-2 mt-4 text-sm">
                <div className="flex items-center gap-3 text-savaari-gray">
                  <Phone size={14} className="text-white/50" />
                  <span>{ticket.userPhone}</span>
                </div>
                <div className="flex items-center gap-3 text-savaari-gray">
                  <User size={14} className="text-white/50" />
                  <span>Assigned to: <span className="text-white">{ticket.agent}</span></span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <button className="text-xs font-bold text-savaari-accent hover:underline flex items-center gap-1">
                <MessageSquare size={12} /> Respond
              </button>
              {activeTab === 'Open' ? (
                <button className="text-xs font-bold text-savaari-green hover:underline">Mark Resolved</button>
              ) : (
                <span className="text-[10px] font-bold text-savaari-green uppercase">Resolved</span>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
