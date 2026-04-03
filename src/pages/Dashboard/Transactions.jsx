import React, { useEffect } from 'react';
import { useDashboardStore } from '../../store/useDashboardStore';
import { GlassCard } from '../../components/ui/GlassCard';
import { Search, Filter, ArrowUpRight } from 'lucide-react';

export function Transactions() {
  const { transactions, fetchDashboardData } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Transactions</h2>
          <p className="text-savaari-gray mt-1">Detailed history of all passenger payments and driver settlements.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1c1c1e] text-white rounded-xl border border-white/5 hover:bg-white/10 transition-all">
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      <GlassCard className="overflow-hidden border-white/5 bg-[#121214]/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-xs font-semibold text-savaari-gray uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-savaari-gray uppercase tracking-wider">Ride ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-savaari-gray uppercase tracking-wider">Driver</th>
                <th className="px-6 py-4 text-xs font-semibold text-savaari-gray uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-semibold text-savaari-gray uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-savaari-gray uppercase tracking-wider">Mode</th>
                <th className="px-6 py-4 text-xs font-semibold text-savaari-gray uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-savaari-gray uppercase tracking-wider text-right">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs text-savaari-accent">{txn.id}</td>
                  <td className="px-6 py-4 text-sm text-white/70">{txn.rideId}</td>
                  <td className="px-6 py-4 text-sm font-medium text-white">{txn.driverName}</td>
                  <td className="px-6 py-4 text-sm text-savaari-gray">{txn.customerPhone}</td>
                  <td className="px-6 py-4 text-sm font-bold text-savaari-green">{txn.amount}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/5 text-savaari-gray border border-white/5 uppercase">
                      {txn.paymentMode}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase ${
                      txn.status === 'Completed' 
                        ? 'bg-savaari-green/10 text-savaari-green border-savaari-green/20' 
                        : 'bg-red-400/10 text-red-400 border-red-400/20'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-savaari-gray text-right">{txn.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
