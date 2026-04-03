import React from "react";
import { useDashboardStore } from "../../store/useDashboardStore";
import { Phone, PhoneCall, PhoneMissed, Radar, UserCircle, Car, CheckCircle2 } from "lucide-react";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { GlassCard } from "../../components/ui/GlassCard";
import { PrimaryButton } from "../../components/ui/PrimaryButton";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

export function LiveCalls() {
  const liveCalls = useDashboardStore(state => state.liveCalls);
  const startCallFlow = useDashboardStore(state => state.startCallFlow);
  const endCall = useDashboardStore(state => state.endCall);
  
  const callFlowStep = useDashboardStore(state => state.callFlowStep);
  const simulatingCallId = useDashboardStore(state => state.simulatingCallId);
  const simulatingCall = liveCalls.find(c => c.id === simulatingCallId);

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Live Calls Queue</h2>
          <p className="text-savaari-gray text-sm mt-1">Handle incoming missed calls and process callbacks instantly.</p>
        </div>
      </div>

      <div className="space-y-4">
        {liveCalls.length === 0 ? (
          <div className="text-center py-20 text-savaari-gray">No active calls in queue.</div>
        ) : (
          liveCalls.map(call => (
            <GlassCard key={call.id} hoverEffect={!simulatingCallId} className={cn("transition-all duration-500", simulatingCallId === call.id ? "border-savaari-accent shadow-[0_0_40px_rgba(0,240,255,0.15)] ring-1 ring-savaari-accent" : (simulatingCallId ? "opacity-40 scale-[0.98]" : "bg-[#0B0B0C]/90"))}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="w-12 h-12 rounded-full bg-savaari-accent/10 flex items-center justify-center border border-savaari-accent/20 shrink-0">
                     {call.status === 'missed' ? <PhoneMissed className="text-red-400" /> : call.status === 'completed' ? <CheckCircle2 className="text-savaari-gray" /> : <PhoneCall className="text-savaari-accent" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white tracking-tight">{call.phone}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                      <span className="text-xs text-savaari-gray flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${call.status === 'Ringing' ? 'bg-savaari-accent animate-pulse' : (call.status === 'Connected' ? 'bg-savaari-green' : 'bg-red-400')}`}></span>
                        {call.status}
                      </span>
                      <span className="text-xs text-savaari-gray">•</span>
                      <span className="text-xs text-savaari-gray">{call.duration}</span>
                      <span className="text-xs text-savaari-gray">•</span>
                      <span className="text-xs text-savaari-accent font-medium">{call.language}</span>
                      <span className="text-xs text-savaari-gray">•</span>
                      <span className="text-xs text-savaari-gray">{call.location}</span>
                      <span className="text-xs text-savaari-gray">•</span>
                      <span className="text-xs text-savaari-gray">{call.time}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                   <StatusBadge status={call.status} />
                   
                   {(call.status === 'incoming' || call.status === 'missed') ? (
                     <PrimaryButton variant="accent" className="px-6 py-2 text-sm shrink-0" onClick={() => startCallFlow(call.id)}>
                       Action Callback
                     </PrimaryButton>
                   ) : (
                     <button className="px-6 py-2 text-sm border border-red-500/50 rounded-full font-medium text-red-400 hover:bg-red-500/10 transition-colors shrink-0" onClick={() => endCall(call.id)}>
                       {call.status === 'completed' ? "Clear Log" : "End Call & Dispatch"}
                     </button>
                   )}
                </div>
              </div>

              {/* LIVE FLOW ANIMATION MOUNT */}
              <AnimatePresence>
                {simulatingCallId === call.id && callFlowStep > 0 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: "1.5rem" }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className="border-t border-white/10 pt-6 overflow-hidden"
                  >
                    <div className="bg-[#121214] rounded-2xl p-6 border border-white/5 relative overflow-hidden">
                       {/* Animated background glow tracker */}
                       <motion.div 
                         className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-savaari-accent/0 via-savaari-accent/10 to-savaari-accent/0"
                         animate={{ x: ["-100%", "300%"] }}
                         transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                       />

                       <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                         {/* Step 1: Connecting */}
                         <div className={cn("flex flex-col items-center flex-1 text-center transition-opacity duration-500", callFlowStep >= 1 ? "opacity-100" : "opacity-30")}>
                            <div className="relative w-12 h-12 mb-3">
                               {callFlowStep === 1 && <div className="absolute inset-0 border-2 border-savaari-accent border-r-transparent rounded-full animate-spin" />}
                               <div className={cn("w-full h-full rounded-full flex items-center justify-center transition-colors", callFlowStep > 1 ? "bg-savaari-green text-primary" : "bg-white/10 text-savaari-gray")}>
                                 <Phone size={20} />
                               </div>
                            </div>
                            <span className="text-sm font-semibold text-white">Dialing Customer</span>
                            <span className="text-xs text-savaari-gray mt-1">IVR Automated Voice</span>
                         </div>

                         {/* Node Line */}
                         <div className="hidden md:block w-16 h-px bg-white/10" />

                         {/* Step 2: Details */}
                         <div className={cn("flex flex-col items-center flex-1 text-center transition-opacity duration-500", callFlowStep >= 2 ? "opacity-100" : "opacity-30")}>
                            <div className="relative w-12 h-12 mb-3">
                               {callFlowStep === 2 && <div className="absolute inset-0 border-2 border-savaari-accent border-r-transparent rounded-full animate-spin" />}
                               <div className={cn("w-full h-full rounded-full flex items-center justify-center transition-colors", callFlowStep > 2 ? "bg-savaari-green text-primary" : "bg-white/10 text-savaari-gray")}>
                                 <UserCircle size={20} />
                               </div>
                            </div>
                            <span className="text-sm font-semibold text-white">Details Received</span>
                            <span className="text-xs text-savaari-gray mt-1">Pickup: {call.location}</span>
                         </div>

                         {/* Node Line */}
                         <div className="hidden md:block w-16 h-px bg-white/10" />

                         {/* Step 3: Pooling */}
                         <div className={cn("flex flex-col items-center flex-1 text-center transition-opacity duration-500", callFlowStep >= 3 ? "opacity-100" : "opacity-30")}>
                            <div className="relative w-12 h-12 mb-3">
                               {callFlowStep === 3 && <div className="absolute inset-0 bg-savaari-accent/20 rounded-full animate-ping" />}
                               <div className={cn("w-full h-full rounded-full flex items-center justify-center transition-colors", callFlowStep > 3 ? "bg-savaari-green text-primary" : "bg-white/10 text-savaari-gray")}>
                                 <Radar size={20} />
                               </div>
                            </div>
                            <span className="text-sm font-semibold text-white">Pooling Drivers</span>
                            <span className="text-xs text-savaari-gray mt-1">Searching 5km radius...</span>
                         </div>

                         {/* Node Line */}
                         <div className="hidden md:block w-16 h-px bg-white/10" />

                         {/* Step 4: Dispatch */}
                         <div className={cn("flex flex-col items-center flex-1 text-center transition-opacity duration-500", callFlowStep >= 4 ? "opacity-100" : "opacity-30")}>
                            <div className="relative w-12 h-12 mb-3">
                               {callFlowStep === 4 && <div className="absolute -inset-2 bg-savaari-green/20 rounded-full blur animate-pulse" />}
                               <div className={cn("w-full h-full rounded-full flex items-center justify-center transition-colors relative z-10", callFlowStep >= 4 ? "bg-savaari-green text-primary" : "bg-white/10 text-savaari-gray")}>
                                 <Car size={20} />
                               </div>
                            </div>
                            <span className="text-sm font-semibold text-savaari-green">Driver Assigned</span>
                            <span className="text-xs text-savaari-gray mt-1">Ravi (KL 01 AB) on the way</span>
                         </div>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          ))
        )}
      </div>
    </div>
  );
}
