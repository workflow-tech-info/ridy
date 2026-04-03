import React, { useState, useEffect } from "react";
import { useDashboardStore } from "../../store/useDashboardStore";
import { GlassCard } from "../../components/ui/GlassCard";
import { InputField } from "../../components/ui/InputField";
import { PrimaryButton } from "../../components/ui/PrimaryButton";
import { User, MapPin, Navigation, Search, Filter, Calendar, Clock } from "lucide-react";
import { cn } from "../../lib/utils";

export function Bookings() {
  const { bookings, fetchDashboardData, addBooking, loading } = useDashboardStore();
  const [formData, setFormData] = useState({ phone: '', name: '', pickup: '', drop: '', type: 'Auto' });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phone || !formData.pickup || !formData.drop) return;
    await addBooking({
      customerPhone: formData.phone,
      customerName: formData.name,
      pickup: formData.pickup,
      drop: formData.drop,
      vehicleType: formData.type
    });
    setFormData({ phone: '', name: '', pickup: '', drop: '', type: 'Auto' });
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">Fast Booking Entry</h2>
          <p className="text-savaari-gray mt-1">Keyboard-optimized interface for rapid phone dispatch.</p>
        </div>

        <GlassCard hoverEffect={false} className="p-8 bg-[#0B0B0C]/80 border-white/5">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <User size={18} className="text-savaari-accent" /> Customer Details
                </h3>
                <InputField 
                  label="Phone Number" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+91 99999 99999" 
                />
                <InputField 
                  label="Customer Name (Optional)" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Rahul" 
                />
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <MapPin size={18} className="text-savaari-green" /> Route Info
                </h3>
                <InputField 
                  label="Pickup Location" 
                  value={formData.pickup}
                  onChange={(e) => setFormData({...formData, pickup: e.target.value})}
                  placeholder="Search area or landmark..." 
                />
                <InputField 
                  label="Drop Location" 
                  value={formData.drop}
                  onChange={(e) => setFormData({...formData, drop: e.target.value})}
                  placeholder="Search area or landmark..." 
                />
              </div>
            </div>

            <div className="border-t border-white/5 pt-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <label className="text-xs font-bold text-savaari-gray uppercase tracking-wider mb-3 block">Vehicle Type</label>
                <div className="flex gap-2">
                  {['Auto', 'Sedan', 'SUV'].map(type => (
                    <button 
                      key={type} 
                      type="button" 
                      onClick={() => setFormData({...formData, type})}
                      className={cn(
                        "px-6 py-2 rounded-xl text-sm font-bold border transition-all",
                        formData.type === type 
                          ? "border-savaari-accent text-primary bg-savaari-accent shadow-lg shadow-savaari-accent/20" 
                          : "border-white/10 text-savaari-gray hover:border-white/30 hover:bg-white/5"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <PrimaryButton variant="accent" type="submit" className="px-10 py-3 flex items-center gap-2 shadow-lg shadow-savaari-accent/20" disabled={loading}>
                {loading ? <div className="w-5 h-5 border-2 border-primary border-t-transparent animate-spin rounded-full" /> : <Navigation size={18} />}
                Confirm & Dispatch
              </PrimaryButton>
            </div>
          </form>
        </GlassCard>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">Recent Bookings</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-savaari-gray" />
              <input type="text" placeholder="Search bookings..." className="bg-[#1c1c1e] border border-white/5 text-sm text-white pl-10 pr-4 py-2 rounded-xl w-64 focus:outline-none focus:border-savaari-accent transition-colors" />
            </div>
            <button className="p-2.5 bg-[#1c1c1e] text-savaari-gray rounded-xl border border-white/5 hover:text-white transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <GlassCard className="overflow-hidden border-white/5 bg-[#121214]/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-4 text-[10px] font-bold text-savaari-gray uppercase tracking-wider">Booking ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-savaari-gray uppercase tracking-wider">Route</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-savaari-gray uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-savaari-gray uppercase tracking-wider">Assigned Driver</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-savaari-gray uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-savaari-gray uppercase tracking-wider text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 font-mono text-xs text-savaari-accent">{booking.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-white font-medium flex items-center gap-1.5 line-clamp-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-savaari-accent"></span>
                          {booking.pickup}
                        </span>
                        <span className="text-[11px] text-savaari-gray flex items-center gap-1.5 line-clamp-1 mt-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-savaari-green"></span>
                          {booking.drop}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/70">{booking.customerPhone}</td>
                    <td className="px-6 py-4">
                       {booking.driverId ? (
                         <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-savaari-accent">
                               {booking.driverName?.charAt(0)}
                            </div>
                            <span className="text-sm text-white">{booking.driverName}</span>
                         </div>
                       ) : (
                         <span className="text-xs text-savaari-gray italic">Not Assigned</span>
                       )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase inline-flex items-center gap-1.5 shadow-sm",
                        booking.status === 'completed' && 'bg-savaari-green/10 text-savaari-green border-savaari-green/20',
                        booking.status === 'assigned' && 'bg-savaari-accent/10 text-savaari-accent border-savaari-accent/20',
                        booking.status === 'searching' && 'bg-amber-400/10 text-amber-400 border-amber-400/20',
                        booking.status === 'cancelled' && 'bg-red-400/10 text-red-400 border-red-400/20',
                      )}>
                        {booking.status === 'searching' && <span className="w-1 h-1 rounded-full bg-amber-400 animate-ping" />}
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[10px] text-savaari-gray text-right">
                       <div className="flex items-center justify-end gap-1.5">
                          <Calendar size={10} /> {new Date(booking.timestamp).toLocaleDateString()}
                       </div>
                       <div className="flex items-center justify-end gap-1.5 mt-1">
                          <Clock size={10} /> {new Date(booking.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
