import React from "react";
import { Navigation } from "../components/ui/Navigation";
import { Footer } from "../components/ui/Footer";
import { GlassCard } from "../components/ui/GlassCard";
import { 
  PhoneCall, CheckCircle2, ChevronRight, Car, UserCheck, Languages, 
  ArrowRight, Building, Siren, Map, Globe, UserPlus, PhoneIncoming, 
  Navigation as NavIcon, Zap, ShieldCheck, HeartPulse, Hospital, Hotel,
  Code, Layout, Share2, Network, Cpu, Smartphone
} from "lucide-react";
import { Link } from "react-router-dom";

export function Home() {
  const phoneNumber = "+918086477654";

  return (
    <div className="min-h-screen bg-primary selection:bg-savaari-accent selection:text-primary scroll-smooth font-sans">
      <Navigation />

      {/* SECTION 1: HERO */}
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
              <a href={`tel:${phoneNumber}`} className="group relative px-10 py-5 w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-black font-bold rounded-full overflow-hidden transition-all active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-savaari-accent/20 to-savaari-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <PhoneCall size={24} className="relative z-10 fill-current" />
                <span className="relative z-10 text-xl tracking-wide">Get Ride Now</span>
              </a>
              <span className="text-savaari-gray/80 text-lg font-medium tracking-wide">One toll-free number: {phoneNumber}</span>
           </div>
        </div>
      </section>

      {/* SEC 2: HOW IT WORKS */}
      <section id="how-it-works" className="py-32 relative bg-[#0B0B0C]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="mb-20 text-center">
             <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">How it works</h2>
             <p className="text-xl text-savaari-gray">Give a missed call. Get a ride. It's that simple.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
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

      {/* WHY RIDY SECTION */}
      <section className="py-32 relative bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">Why Ridy is different</h2>
            <p className="text-xl text-savaari-gray">Built for real-world mobility challenges.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "No app needed", desc: "Works on any phone, including basic feature phones.", icon: Smartphone },
              { title: "No commissions", desc: "Drivers keep 100% of their earnings. No hidden fees.", icon: Zap },
              { title: "Open network", desc: "Multiple providers and fleets for maximum availability.", icon: Share2 },
              { title: "Voice-first", desc: "Native local language support for inclusive access.", icon: Languages }
            ].map((point, i) => (
              <GlassCard key={i} className="p-8 border-white/5 bg-[#121214]">
                <div className="w-12 h-12 rounded-2xl bg-savaari-accent/10 flex items-center justify-center text-savaari-accent mb-6">
                  <point.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{point.title}</h3>
                <p className="text-savaari-gray leading-relaxed">{point.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: FOR PROVIDERS / FLEETS */}
      <section id="business" className="py-32 relative bg-[#0B0B0C] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-bold text-white mb-8 tracking-tight">Turn your fleet into a ride network</h2>
              <p className="text-xl text-savaari-gray mb-10 font-light leading-relaxed">
                Any fleet, taxi union, or mobility service can connect with Ridy and start receiving ride requests.
                Whether you have 5 vehicles or 500, Ridy helps you get more rides without depending on apps.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="p-8 bg-white/[0.03] rounded-3xl border border-white/5 hover:bg-white/[0.05] transition-colors">
                    <h4 className="text-savaari-accent font-bold mb-2 flex items-center gap-2"><Zap size={16}/> No commissions</h4>
                    <p className="text-sm text-savaari-gray">Keep every rupee your drivers earn. We don't take a cut from their hard work.</p>
                 </div>
                 <div className="p-8 bg-white/[0.03] rounded-3xl border border-white/5 hover:bg-white/[0.05] transition-colors">
                    <h4 className="text-savaari-accent font-bold mb-2 flex items-center gap-2"><ShieldCheck size={16}/> Direct payments</h4>
                    <p className="text-sm text-savaari-gray">Customers pay drivers directly via cash or UPI. No waiting for weekly payouts.</p>
                 </div>
              </div>
            </div>
            <div className="space-y-8">
               {[
                 { step: "1. Register your fleet", desc: "Create your provider account and set up your network profile.", icon: Building },
                 { step: "2. Connect your drivers", desc: "Onboard drivers using their phone numbers. App optional.", icon: UserPlus },
                 { step: "3. Start receiving rides", desc: "Get bookings directly from customers in your region instantly.", icon: Navigation }
               ].map((item, i) => (
                 <div key={i} className="flex gap-6 items-start group">
                    <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center font-bold text-xl shrink-0 group-hover:scale-110 transition-transform">{i+1}</div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-1">{item.step}</h4>
                      <p className="text-lg text-savaari-gray font-light">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: ANY BUSINESS CAN INTEGRATE */}
      <section className="py-32 relative bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">Plug Ridy into your business</h2>
          <p className="text-xl text-savaari-gray mb-16 max-w-3xl mx-auto font-light leading-relaxed">
            Hotels, travel agencies, hospitals, and local businesses can integrate Ridy directly into their systems 
            to provide seamless transport for their customers and guests.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { title: "Hotels", desc: "Booking rides for guests directly from the reception lobby.", icon: Hotel },
              { title: "Hospitals", desc: "Arranging transport for patients, visitors, and staff.", icon: Hospital },
              { title: "Tour Operators", desc: "Managing group trips with trusted local drivers.", icon: Map },
              { title: "Local Shops", desc: "Helping customers travel home comfortably after shopping.", icon: Building }
            ].map((useCase, i) => (
              <div key={i} className="p-8 bg-[#121214] rounded-3xl border border-white/5 hover:border-savaari-accent/30 transition-all hover:-translate-y-1">
                <useCase.icon size={32} className="text-savaari-accent mb-6" />
                <h4 className="text-xl font-bold text-white mb-2">{useCase.title}</h4>
                <p className="text-sm text-savaari-gray leading-relaxed">{useCase.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-20 text-3xl font-bold text-white tracking-tight">One API. Instant ride access anywhere.</p>
        </div>
      </section>

      {/* SECTION: DEVELOPER / API */}
      <section className="py-32 relative bg-[#0B0B0C] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-[#0B0B0C] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-savaari-accent/5 blur-3xl pointer-events-none" />
                <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-b border-white/10">
                   <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                      <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                   </div>
                   <div className="text-[10px] font-bold text-savaari-gray uppercase tracking-widest">ride-dispatch-v1</div>
                </div>
                <div className="p-10 font-mono text-sm overflow-x-auto leading-relaxed">
                   <p className="text-savaari-accent font-bold mb-4">POST /v1/dispatch</p>
                   <p className="text-white">{"{"}</p>
                   <p className="text-white ml-6">"pickup": <span className="text-savaari-green">"Kochi Airport"</span>,</p>
                   <p className="text-white ml-6">"drop": <span className="text-savaari-green">"Kakkanad"</span>,</p>
                   <p className="text-white ml-6">"vehicleType": <span className="text-savaari-green">"Auto"</span></p>
                   <p className="text-white">{"}"}</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Code size={48} className="text-savaari-accent mb-8" />
              <h2 className="text-5xl font-bold text-white mb-8 tracking-tight">Build on Ridy</h2>
              <p className="text-xl text-savaari-gray mb-10 font-light leading-relaxed">
                Developers can integrate ride booking directly into their apps, websites, or systems using our simple, powerful REST APIs.
              </p>
              <div className="flex gap-4">
                <Link to="/api-playground" className="px-10 py-5 bg-savaari-accent text-primary font-bold rounded-full hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all flex items-center gap-2">
                   <Zap size={20} /> Try API Playground
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: OPEN MOBILITY & NETWORK EFFECT */}
      <section className="py-32 relative bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(0,240,255,0.06)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="relative z-10">
            <Network size={64} className="text-savaari-accent mx-auto mb-8 animate-pulse" />
            <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">Built on Open Mobility</h2>
            <p className="text-xl text-savaari-gray mb-24 max-w-3xl mx-auto font-light leading-relaxed">
              Ridy operates on open mobility principles inspired by the Beckn protocol. 
              Rides are not controlled by a single app—anyone can connect and serve customers.
            </p>

            {/* Network Diagram UI */}
            <div className="relative max-w-4xl mx-auto h-[500px] mb-24">
               {/* Center Node */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-40 h-40 rounded-full bg-savaari-accent flex items-center justify-center shadow-[0_0_80px_rgba(0,240,255,0.4)] border-8 border-[#0B0B0C] relative">
                     <span className="text-primary font-black text-5xl italic tracking-tighter">R</span>
                     <div className="absolute -inset-4 border border-savaari-accent/40 rounded-full animate-[spin_10s_linear_infinite]" />
                     <div className="absolute -inset-8 border border-savaari-accent/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                  </div>
               </div>

               {/* Connected Nodes */}
               {[
                 { label: "Fleets", x: "10%", y: "50%", icon: Car },
                 { label: "Taxi Unions", x: "25%", y: "15%", icon: Building },
                 { label: "Businesses", x: "75%", y: "15%", icon: Hotel },
                 { label: "Developers", x: "90%", y: "50%", icon: Code },
                 { label: "Agencies", x: "75%", y: "85%", icon: Globe },
                 { label: "Drivers", x: "25%", y: "85%", icon: UserCheck }
               ].map((node, i) => (
                 <div key={i} className="absolute group" style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}>
                    <div className="flex flex-col items-center gap-4">
                       <div className="w-20 h-20 rounded-[2rem] bg-[#121214] border border-white/5 flex items-center justify-center text-white/40 group-hover:text-savaari-accent group-hover:border-savaari-accent group-hover:scale-110 transition-all duration-300">
                          <node.icon size={28} />
                       </div>
                       <span className="text-xs font-bold text-savaari-gray uppercase tracking-widest group-hover:text-white transition-colors">{node.label}</span>
                    </div>
                 </div>
               ))}

               {/* Animated Pulse Rings */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/5 rounded-full animate-[ping_5s_linear_infinite] opacity-30" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left bg-[#121214]/50 backdrop-blur-xl p-12 rounded-[3.5rem] border border-white/5 shadow-2xl">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">More providers. Better rides.</h3>
                <p className="text-savaari-gray text-lg font-light leading-relaxed">
                  As more fleets and services join Ridy, customers get faster rides and better availability, while drivers get more bookings. Everyone grows together in a shared ecosystem.
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">Smart ride matching</h3>
                <p className="text-savaari-gray text-lg font-light leading-relaxed">
                  Ridy connects to multiple ride sources through a decentralized protocol. If one provider is not available, another automatically takes over—ensuring you always get your ride.
                </p>
              </div>
            </div>
            <p className="mt-16 text-3xl font-bold text-savaari-accent tracking-wide uppercase italic">One network. Many providers. More availability.</p>
          </div>
        </div>
      </section>
      
      {/* FINAL BONUS OVERRIDE */}
      <div className="bg-savaari-accent text-[#0B0B0C] py-12 text-center text-3xl font-black tracking-tighter uppercase italic">
        One network. Many providers. Built for the future of Indian mobility.
      </div>
      
      <Footer />
    </div>
  );
}
