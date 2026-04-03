import React from "react";
import { GlassCard } from "../../components/ui/GlassCard";
import { InputField } from "../../components/ui/InputField";
import { PrimaryButton } from "../../components/ui/PrimaryButton";
import { User, MapPin, Navigation } from "lucide-react";

export function Bookings() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, submit fast booking
  };

  return (
    <div className="max-w-4xl mx-auto">
       <div className="mb-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">Fast Booking Entry</h2>
        <p className="text-savaari-gray text-sm mt-1">Keyboard-optimized interface for rapid phone dispatch.</p>
      </div>

      <GlassCard hoverEffect={false} className="p-8 bg-[#0B0B0C]/80">
         <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Customer Details */}
              <div className="space-y-6">
                 <h3 className="text-lg font-medium text-white flex items-center gap-2 border-b border-savaari-border pb-2">
                    <User size={18} className="text-savaari-accent" /> Customer Details
                 </h3>
                 <InputField label="Phone Number" autoFocus placeholder="+91 99999 99999" />
                 <InputField label="Customer Name (Optional)" placeholder="e.g. Rahul" />
              </div>

              {/* Ride Details */}
              <div className="space-y-6">
                 <h3 className="text-lg font-medium text-white flex items-center gap-2 border-b border-savaari-border pb-2">
                    <MapPin size={18} className="text-savaari-green" /> Route Info
                 </h3>
                 <InputField label="Pickup Location" placeholder="Search area or landmark..." />
                 <InputField label="Drop Location" placeholder="Search area or landmark..." />
              </div>
            </div>

            <div className="border-t border-savaari-border pt-6 flex flex-wrap gap-4">
               <div>
                  <label className="text-sm text-savaari-gray ml-1 mb-2 block">Vehicle Type</label>
                  <div className="flex gap-2">
                     {['Auto', 'Sedan', 'SUV'].map(type => (
                       <button key={type} type="button" className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${type === 'Auto' ? 'border-savaari-accent text-savaari-accent bg-savaari-accent/10' : 'border-white/10 text-savaari-gray hover:border-white/30'}`}>
                         {type}
                       </button>
                     ))}
                  </div>
               </div>
            </div>

            <div className="pt-4 flex justify-end">
               <PrimaryButton variant="accent" type="submit" className="w-full md:w-auto px-10 flex items-center gap-2">
                  <Navigation size={18} /> Dispatch Driver
               </PrimaryButton>
            </div>
         </form>
      </GlassCard>
    </div>
  );
}
