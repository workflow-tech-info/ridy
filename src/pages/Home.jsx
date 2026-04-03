import React from "react";
import { Navigation } from "../components/ui/Navigation";
import { Footer } from "../components/ui/Footer";
import { GlassCard } from "../components/ui/GlassCard";
import { PhoneCall, CheckCircle2, ChevronRight, Car, UserCheck, Languages, ArrowRight, Building, Siren, Map, Globe, UserPlus, PhoneIncoming, Navigation as NavIcon } from "lucide-react";

export function Home() {
  return (
    <div className="min-h-screen bg-primary selection:bg-savaari-accent selection:text-primary scroll-smooth font-sans">
      <Navigation />

      {/* SECTION 1: HERO UPGRADE */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-savaari-accent/20 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
           <h1 className="text-6xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-tight">
              No app. <br/> Just a phone call.
           </h1>
           <p className="text-xl lg:text-2xl text-savaari-gray mb-10 max-w-2xl mx-auto font-light">
             Book a ride anywhere in India. Even without internet.
           </p>
           
           <div className="flex flex-col items-center justify-center gap-6">
              <a href="tel:+919999999999" className="group relative px-10 py-5 w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-black font-bold rounded-full overflow-hidden transition-all active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-savaari-accent/20 to-savaari-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <PhoneCall size={24} className="relative z-10 fill-current" />
                <span className="relative z-10 text-xl tracking-wide">Get Ride Now</span>
              </a>
              <span className="text-savaari-gray/80 text-lg font-medium tracking-wide">One toll-free number. All languages supported.</span>
           </div>
        </div>
      </section>

      {/* SEC 2: HOW IT WORKS (User Flow) */}
      <section id="how-it-works" className="py-32 relative bg-[#0B0B0C]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="mb-20 text-center">
             <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">How it works</h2>
             <p className="text-xl text-savaari-gray">Give a missed call. Get a ride. It's that simple.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
              {/* Desktop connecting line */}
              <div className="hidden md:block absolute top-[60px] left-10 right-10 h-1 bg-gradient-to-r from-savaari-accent/20 via-savaari-accent to-savaari-green/20 rounded-full" />
              
              {[
                { title: "Missed Call", desc: "Give a missed call from any phone", icon: PhoneCall },
                { title: "Instant Callback", desc: "We call you back in your language", icon: PhoneIncoming },
                { title: "Tell Your Trip", desc: "Just say pickup and drop", icon: Languages },
                { title: "Driver Assigned", desc: "Nearest driver accepts your ride", icon: UserCheck },
                { title: "Ride Arrives", desc: "Driver calls you and reaches you", icon: Car }
              ].map((step, i) => (
                 <div key={i} className="relative flex flex-col items-center text-center group">
                    <div className="w-16 h-16 rounded-3xl bg-[#1c1c1e] border-2 border-savaari-accent/30 flex items-center justify-center text-savaari-accent mb-6 relative z-10 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                       <step.icon size={28} />
                       <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-savaari-accent text-black font-bold flex items-center justify-center border-4 border-[#0B0B0C]">{i+1}</div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-base text-savaari-gray px-2">{step.desc}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* SEC 3: BUILT FOR EVERYONE */}
      <section className="py-32 relative bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-white mb-16 tracking-tight text-center">Built for everyone</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <GlassCard className="p-8 group hover:-translate-y-2 transition-transform bg-[#121214]">
                <UserCheck size={32} className="text-savaari-green mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3">Elderly</h3>
                <p className="text-xl text-savaari-gray">No apps needed. Just call.</p>
              </GlassCard>
              <GlassCard className="p-8 group hover:-translate-y-2 transition-transform bg-[#121214]">
                <Map size={32} className="text-savaari-accent mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3">Rural</h3>
                <p className="text-xl text-savaari-gray">Works without internet or data.</p>
              </GlassCard>
              <GlassCard className="p-8 group hover:-translate-y-2 transition-transform bg-[#121214]">
                <Globe size={32} className="text-white mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3">Tourists</h3>
                <p className="text-xl text-savaari-gray">No local app installation required.</p>
              </GlassCard>
              <GlassCard className="p-8 group hover:-translate-y-2 transition-transform bg-[#121214]">
                <Building size={32} className="text-savaari-accent mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3">Businesses</h3>
                <p className="text-xl text-savaari-gray">Book instantly for your customers.</p>
              </GlassCard>
              <GlassCard className="p-8 group hover:-translate-y-2 transition-transform bg-[#121214] lg:col-span-2">
                <Siren size={32} className="text-red-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3">Emergency</h3>
                <p className="text-xl text-savaari-gray">The absolute fastest way to get a ride when seconds matter.</p>
              </GlassCard>
          </div>
        </div>
      </section>

      {/* SEC 4: LANGUAGE FEATURE */}
      <section className="py-32 relative bg-[#0B0B0C] border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-savaari-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <Languages size={48} className="text-savaari-accent mx-auto mb-8" />
          <h2 className="text-5xl font-bold text-white mb-8 tracking-tight">Speaks your language</h2>
          <p className="text-2xl text-savaari-gray mb-12 font-light">
            Our system automatically detects your spoken language <br className="hidden md:block"/> and seamlessly continues the call seamlessly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
             {['Malayalam', 'Tamil', 'Hindi', 'English', '+ 8 Regional'].map(lang => (
               <span key={lang} className="px-8 py-4 bg-[#1c1c1e] text-white text-xl font-medium rounded-full border border-white/10 shadow-lg cursor-pointer hover:border-savaari-accent transition-colors">
                 {lang}
               </span>
             ))}
          </div>
        </div>
      </section>

      {/* SEC 5: DRIVER FLOW */}
      <section id="drivers" className="py-32 relative bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div>
                <h2 className="text-5xl font-bold text-white mb-8 tracking-tight">Drive with Ridy</h2>
                <div className="space-y-6 mb-12">
                   <div className="flex items-center gap-4">
                     <CheckCircle2 size={28} className="text-savaari-green shrink-0" />
                     <span className="text-2xl text-white">No app required globally</span>
                   </div>
                   <div className="flex items-center gap-4">
                     <CheckCircle2 size={28} className="text-savaari-green shrink-0" />
                     <span className="text-2xl text-white">Works on any basic feature phone</span>
                   </div>
                   <div className="flex items-center gap-4">
                     <CheckCircle2 size={28} className="text-savaari-green shrink-0" />
                     <span className="text-2xl text-white">Keep 100% of full earnings</span>
                   </div>
                </div>
             </div>
             
             <div className="grid gap-6">
                {[
                  {step: 1, title: "You get a call", text: "System dials your phone natively"},
                  {step: 2, title: "Hear trip details", text: "Automated voice reads pickup & drop"},
                  {step: 3, title: "2. Choose your action", text: "Accept, skip, or listen again,go online/offline"},
                  {step: 4, title: "Pick up & earn", text: "Get direct cash from the customer"}
                ].map(s => (
                  <GlassCard key={s.step} hoverEffect className="p-6 bg-[#121214] flex items-center gap-6">
                     <div className="w-16 h-16 rounded-2xl bg-savaari-accent/10 border border-savaari-accent/30 text-savaari-accent flex items-center justify-center font-bold text-2xl shrink-0">{s.step}</div>
                     <div>
                       <h3 className="text-2xl font-bold text-white mb-1">{s.title}</h3>
                       <p className="text-lg text-savaari-gray">{s.text}</p>
                     </div>
                  </GlassCard>
                ))}
             </div>
           </div>
        </div>
      </section>

      {/* SEC 6: PROVIDER / FLEET */}
      <section className="py-32 relative bg-[#0B0B0C] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
           <Building size={48} className="text-white mx-auto mb-8 opacity-80" />
           <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">For taxi unions & fleets</h2>
           <p className="text-2xl text-savaari-gray mb-16 font-light">Bring your entire offline network of drivers online in minutes. No complex software.</p>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                 <UserPlus size={32} className="text-savaari-accent mx-auto mb-4" />
                 <h4 className="text-xl font-bold text-white mb-2">Register</h4>
                 <p className="text-savaari-gray">Add your union to Ridy</p>
              </div>
              <div className="text-center md:border-l md:border-white/10">
                 <Car size={32} className="text-savaari-accent mx-auto mb-4" />
                 <h4 className="text-xl font-bold text-white mb-2">Add Drivers</h4>
                 <p className="text-savaari-gray">Input phone numbers</p>
              </div>
              <div className="text-center md:border-l md:border-white/10">
                 <NavIcon size={32} className="text-savaari-accent mx-auto mb-4" />
                 <h4 className="text-xl font-bold text-white mb-2">Receive Requests</h4>
                 <p className="text-savaari-gray">Get rides immediately</p>
              </div>
           </div>
        </div>
      </section>

      {/* SEC 7: SYSTEM FLOW (VISUAL) */}
      <section className="py-32 relative bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
           <h2 className="text-4xl lg:text-5xl font-bold text-white mb-20 tracking-tight">How Ridy works behind the scenes</h2>
           
           <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 overflow-x-auto pb-8">
              {[
                {node: "User"},
                {arrow: true},
                {node: "Call"},
                {arrow: true},
                {node: "Ridy"},
                {arrow: true},
                {node: "Dispatch"},
                {arrow: true},
                {node: "Driver"},
                {arrow: true},
                {node: "Ride"}
              ].map((item, i) => (
                 item.arrow ? (
                   <ArrowRight key={i} size={24} className="text-savaari-gray rotate-90 md:rotate-0 shrink-0" />
                 ) : (
                   <div key={i} className="px-8 py-4 bg-[#121214] border border-white/10 rounded-2xl text-xl font-bold text-white shadow-lg shrink-0">
                     {item.node}
                   </div>
                 )
              ))}
           </div>
        </div>
      </section>
      
      {/* FINAL BONUS OVERRIDE */}
      <div className="bg-savaari-accent text-[#0B0B0C] py-6 text-center text-xl font-bold tracking-tight">
        "Works on any phone. Anywhere in India."
      </div>
      
      <Footer />
    </div>
  );
}
