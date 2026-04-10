import React from "react";
import { Navigation } from "../components/ui/Navigation";
import { Footer } from "../components/ui/Footer";
import { GlassCard } from "../components/ui/GlassCard";
import { JourneyConsole } from "../components/ui/JourneyConsole";
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

      {/* SECTION 1: HERO - PRO MAX REDESIGN */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        {/* Apple-style background layers */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,_rgba(0,240,255,0.15),transparent_70%)] pointer-events-none" />
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-savaari-accent/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-savaari-green/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-savaari-accent opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-savaari-accent"></span>
             </span>
             <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Open Ride Network is Live</span>
           </div>

           <h1 className="text-7xl lg:text-[120px] font-black tracking-[-0.04em] text-white mb-8 leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-1000">
              India’s open <br className="hidden md:block"/> ride network.
           </h1>
           <p className="text-xl lg:text-[28px] text-savaari-gray mb-14 max-w-3xl mx-auto font-medium leading-tight animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
             Ridy connects people, drivers, and fleets into <br className="hidden md:block"/> one open ride network.
           </p>
           
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
              <a href={`tel:${phoneNumber}`} className="group relative px-12 py-6 w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-black font-extrabold rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.15)]">
                <PhoneCall size={24} className="fill-current" />
                <span className="text-xl tracking-tight">Get Ride Now</span>
              </a>
              <Link to="/api-docs" className="group px-10 py-6 w-full sm:w-auto flex items-center justify-center gap-3 bg-white/5 text-white font-bold rounded-full border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all">
                <Zap size={20} className="text-savaari-accent" />
                <span>Try the API</span>
              </Link>
           </div>

           <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="flex items-center gap-2 font-black text-xl italic tracking-tighter">BECKN PROTOCOL</div>
              <div className="flex items-center gap-2 font-black text-xl italic tracking-tighter">OPEN MOBILITY</div>
              <div className="flex items-center gap-2 font-black text-xl italic tracking-tighter">ONE NETWORK</div>
           </div>
        </div>
      </section>

      <JourneyConsole />

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
              { title: "Voice-first", desc: "Give a missed call/text to toll-free number.", icon: Languages }
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

      {/* SECTION: RIDY EV FLEET - PRO MAX */}
      <section className="py-40 relative bg-[#0B0B0C] border-t border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_50%_0%,_rgba(0,240,255,0.05),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
               <span className="text-[10px] font-bold text-savaari-gray uppercase tracking-[0.2em]">Our Fleet</span>
             </div>
             <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-[-0.03em]">The Premium EV Fleet</h2>
             <p className="text-xl text-savaari-gray max-w-3xl mx-auto font-medium leading-relaxed">
               Designed for performance. Engineered for delivery professionals. Choose the plan that fits your ambition.
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Card 1: Rent-to-Own */}
            <div className="flex flex-col bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] border border-white/[0.05] p-10 hover:bg-white/[0.04] hover:border-savaari-accent/30 transition-all duration-500 group">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                   <span className="text-[10px] font-bold text-savaari-accent uppercase tracking-[0.2em]">Ridy Rent-to-Own</span>
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight leading-tight group-hover:text-savaari-accent transition-colors">Your Path to Ownership.</h3>
                <p className="text-savaari-gray mb-10 font-medium leading-relaxed">
                  Stop renting. Start owning. Transition from a pilot to an owner with our transparent 64-week ownership plan.
                </p>
                <div className="space-y-6">
                  {[
                    { title: "Zero Credit Checks", desc: "We believe in your potential, not your past." },
                    { title: "64-Week Ownership", desc: "Clear, automated weekly payments that lead to full vehicle title transfer." },
                    { title: "Premium Asset", desc: "Own the best-in-class ev scooters/bikes, built to last." },
                    { title: "Included Maintenance", desc: "We keep your future asset in top shape until the final payment." }
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-4">
                       <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-savaari-accent/10 flex items-center justify-center text-savaari-accent">
                          <CheckCircle2 size={14} />
                       </div>
                       <div>
                         <h4 className="text-white font-bold mb-1 tracking-tight">{feature.title}</h4>
                         <p className="text-sm text-savaari-gray leading-relaxed">{feature.desc}</p>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Pilot */}
            <div className="flex flex-col bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] border border-white/[0.05] p-10 hover:bg-white/[0.04] hover:border-[#FFBD2E]/30 transition-all duration-500 group shadow-[0_0_50px_rgba(255,189,46,0.03)] scale-100 lg:scale-[1.02] z-10 lg:-translate-y-4">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFBD2E]/10 border border-[#FFBD2E]/20 mb-8 backdrop-blur-md">
                   <span className="text-[10px] font-bold text-[#FFBD2E] uppercase tracking-[0.2em]">Ridy Pilot</span>
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight leading-tight group-hover:text-[#FFBD2E] transition-colors">Empowering Kerala’s Delivery Force.</h3>
                <p className="text-savaari-gray mb-10 font-medium leading-relaxed">
                  The ultimate app for the modern delivery professional. Maximize earnings with zero fuel overhead.
                </p>
                <div className="space-y-6">
                  {[
                    { title: "Unlimited Free Charging", desc: "Access our growing network across Kerala. Charge for free, ride for profit." },
                    { title: "Real-time Analytics", desc: "Track your earnings, battery health, and efficiency through our autoM8 powered dashboard." },
                    { title: "24/7 Roadside Support", desc: "Never be stranded. Our team is a tap away, ensuring 100% uptime." },
                    { title: "Performance Bonuses", desc: "Earn more as you ride more. Discounted rents for high-performing pilots." }
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-4">
                       <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#FFBD2E]/10 flex items-center justify-center text-[#FFBD2E]">
                          <CheckCircle2 size={14} />
                       </div>
                       <div>
                         <h4 className="text-white font-bold mb-1 tracking-tight">{feature.title}</h4>
                         <p className="text-sm text-savaari-gray leading-relaxed">{feature.desc}</p>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3: Rental */}
            <div className="flex flex-col bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] border border-white/[0.05] p-10 hover:bg-white/[0.04] hover:border-[#27C93F]/30 transition-all duration-500 group">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#27C93F]/10 border border-[#27C93F]/20 mb-8 backdrop-blur-md">
                   <span className="text-[10px] font-bold text-[#27C93F] uppercase tracking-[0.2em]">Ridy Rental</span>
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight leading-tight group-hover:text-[#27C93F] transition-colors">Premium Fleet. Flexible Terms.</h3>
                <p className="text-savaari-gray mb-10 font-medium leading-relaxed">
                  Access Kerala’s most powerful electric scooters starting at just ₹250/day.
                </p>
                <div className="space-y-6">
                  {[
                    { title: "The Premium Edge", desc: "Don't settle for low-speed mopeds. Ride high-range, high-torque vehicles designed for logistics." },
                    { title: "Simple Onboarding", desc: "Deposit of ₹8,999 gets you on the road with insurance, helmet, and registration included." },
                    { title: "No Fuel. No Maintenance", desc: "Focus on your deliveries; we handle the rest." },
                    { title: "Hyper-Local Freedom", desc: "Perfectly suited for Swiggy, Zomato, Zepto, and Blinkit partners." }
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-4">
                       <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#27C93F]/10 flex items-center justify-center text-[#27C93F]">
                          <CheckCircle2 size={14} />
                       </div>
                       <div>
                         <h4 className="text-white font-bold mb-1 tracking-tight">{feature.title}</h4>
                         <p className="text-sm text-savaari-gray leading-relaxed">{feature.desc}</p>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: FOR PROVIDERS / FLEETS - PRO MAX */}
      <section id="business" className="py-40 relative bg-[#0B0B0C] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-5xl lg:text-6xl font-black text-white mb-10 tracking-[-0.03em] leading-tight">Turn your fleet into <br className="hidden md:block"/> a ride network</h2>
              <p className="text-xl text-savaari-gray mb-12 font-medium leading-relaxed">
                Any fleet, taxi union, or mobility service can connect with Ridy and start receiving ride requests.
                Whether you have 5 vehicles or 500, Ridy helps you get more rides without depending on apps.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 <div className="p-10 bg-white/[0.03] rounded-[2.5rem] border border-white/[0.05] hover:bg-white/[0.06] transition-all">
                    <h4 className="text-savaari-accent font-black text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><Zap size={14}/> No commissions</h4>
                    <p className="text-sm text-savaari-gray font-medium leading-relaxed">Keep every rupee your drivers earn. We don't take a cut from their hard work.</p>
                 </div>
                 <div className="p-10 bg-white/[0.03] rounded-[2.5rem] border border-white/[0.05] hover:bg-white/[0.06] transition-all">
                    <h4 className="text-savaari-accent font-black text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><ShieldCheck size={14}/> Direct payments</h4>
                    <p className="text-sm text-savaari-gray font-medium leading-relaxed">Customers pay drivers directly via cash or UPI. No waiting for weekly payouts.</p>
                 </div>
              </div>
            </div>
            <div className="space-y-10">
               {[
                 { step: "1. Register your fleet", desc: "Create your provider account and set up your network profile.", icon: Building },
                 { step: "2. Connect your drivers", desc: "Onboard drivers using their phone numbers. App optional.", icon: UserPlus },
                 { step: "3. Start receiving rides", desc: "Get bookings directly from customers in your region instantly.", icon: Navigation }
               ].map((item, i) => (
                 <div key={i} className="flex gap-8 items-start group">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-white text-black flex items-center justify-center font-black text-2xl shrink-0 transition-transform group-hover:scale-110">{i+1}</div>
                    <div>
                      <h4 className="text-3xl font-black text-white mb-2 tracking-tight">{item.step}</h4>
                      <p className="text-lg text-savaari-gray font-medium leading-relaxed">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: ANY BUSINESS CAN INTEGRATE - PRO MAX */}
      <section className="py-40 relative bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-5xl lg:text-7xl font-black text-white mb-10 tracking-[-0.03em]">Plug Ridy into your business</h2>
          <p className="text-xl text-savaari-gray mb-20 max-w-3xl mx-auto font-medium leading-relaxed">
            Hotels, travel agencies, hospitals, and local businesses can integrate Ridy directly into their systems 
            to provide seamless transport for their customers and guests.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {[
              { title: "Hotels", desc: "Booking rides for guests directly from the reception lobby.", icon: Hotel },
              { title: "Hospitals", desc: "Arranging transport for patients, visitors, and staff.", icon: Hospital },
              { title: "Tour Operators", desc: "Managing group trips with trusted local drivers.", icon: Map },
              { title: "Local Shops", desc: "Helping customers travel home comfortably after shopping.", icon: Building }
            ].map((useCase, i) => (
              <div key={i} className="p-10 bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] border border-white/[0.05] hover:border-savaari-accent/30 transition-all hover:-translate-y-2 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-white mb-8 transition-colors group-hover:text-savaari-accent">
                  <useCase.icon size={32} />
                </div>
                <h4 className="text-2xl font-bold text-white mb-3 tracking-tight">{useCase.title}</h4>
                <p className="text-sm text-savaari-gray font-medium leading-relaxed">{useCase.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-24 text-4xl lg:text-5xl font-black text-white tracking-tight italic">One API. Instant ride access anywhere.</p>
        </div>
      </section>

      {/* SECTION: DEVELOPER / API - JOURNEY FLOW */}
      <section className="py-40 relative bg-[#0B0B0C] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative">
              {/* Visual Flow Component */}
              <div className="relative flex flex-col items-center gap-12 lg:gap-20">
                {/* Step 1: Client App */}
                <div className="relative z-10 w-full max-w-[280px] p-8 bg-white/[0.03] backdrop-blur-xl rounded-[2.5rem] border border-white/10 group animate-in fade-in slide-in-from-left-8 duration-700">
                  <div className="w-12 h-12 rounded-2xl bg-savaari-accent/10 flex items-center justify-center text-savaari-accent mb-6 group-hover:scale-110 transition-transform">
                    <Smartphone size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Client App</h4>
                  <p className="text-sm text-savaari-gray leading-relaxed">Users request a ride via your app or website integration.</p>
                </div>

                {/* Vertical Connector Line (Mobile/Desktop) */}
                <div className="absolute top-[120px] left-1/2 -translate-x-1/2 w-px h-[calc(100%-240px)] bg-gradient-to-b from-savaari-accent/50 via-savaari-accent/20 to-transparent" />
                
                {/* Step 2: Ridy Cloud API */}
                <div className="relative z-10 w-full max-w-[280px] p-8 bg-white/[0.03] backdrop-blur-xl rounded-[2.5rem] border border-white/10 group animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                  <div className="w-12 h-12 rounded-2xl bg-savaari-accent/10 flex items-center justify-center text-savaari-accent mb-6 group-hover:scale-110 transition-transform">
                    <Cpu size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Ridy API</h4>
                  <p className="text-sm text-savaari-gray leading-relaxed">Our gateway processes the request and matches the nearest fleet.</p>
                </div>

                {/* Step 3: Ride Confirmation */}
                <div className="relative z-10 w-full max-w-[280px] p-8 bg-white/[0.03] backdrop-blur-xl rounded-[2.5rem] border border-white/10 group animate-in fade-in slide-in-from-left-8 duration-700 delay-400">
                  <div className="w-12 h-12 rounded-2xl bg-savaari-green/10 flex items-center justify-center text-savaari-green mb-6 group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Confirmation</h4>
                  <p className="text-sm text-savaari-gray leading-relaxed">Instant ride assignment and status updates sent back to your user.</p>
                </div>

                {/* Pulse Glow Effect behind Step 2 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-savaari-accent/5 blur-[100px] pointer-events-none rounded-full" />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="w-20 h-20 rounded-3xl bg-savaari-accent/10 flex items-center justify-center text-savaari-accent mb-10 shadow-lg glow-pro">
                <Globe size={40} />
              </div>
              <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-[-0.03em] leading-tight">Build on Ridy</h2>
              <p className="text-xl text-savaari-gray mb-12 font-medium leading-relaxed">
                Connect your business to India's open mobility network. Our REST API handles the complexity of dispatch, payments, and fleet management.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/api-docs" className="px-12 py-6 bg-savaari-accent text-primary font-black rounded-full hover:shadow-[0_0_50px_rgba(0,240,255,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                   <Zap size={20} /> Try API Playground
                </Link>
                <a href="#business" className="px-10 py-6 bg-white/5 text-white font-bold rounded-full border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all text-center">
                  Registration Guide
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: OPEN MOBILITY & NETWORK EFFECT - PRO MAX */}
      <section className="py-40 relative bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(0,240,255,0.1)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="w-24 h-24 rounded-[2rem] bg-savaari-accent/10 flex items-center justify-center text-savaari-accent mx-auto mb-10 glow-pro">
              <Network size={48} className="animate-pulse" />
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-10 tracking-[-0.03em]">Built on Open Mobility</h2>
            <p className="text-xl lg:text-2xl text-savaari-gray mb-28 max-w-4xl mx-auto font-medium leading-relaxed">
              Ridy operates on open mobility principles inspired by the Beckn protocol. 
              Rides are not controlled by a single app—anyone can connect and serve customers.
            </p>

            {/* Network Diagram UI - PRO MAX */}
            <div className="relative max-w-5xl mx-auto h-[600px] mb-32">
               {/* Center Node */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-56 h-56 rounded-full bg-savaari-accent flex items-center justify-center shadow-[0_0_100px_rgba(0,240,255,0.5)] border-[12px] border-[#0B0B0C] relative">
                     <span className="text-primary font-black text-7xl italic tracking-tighter">R</span>
                     <div className="absolute -inset-6 border-2 border-savaari-accent/40 rounded-full animate-[spin_12s_linear_infinite]" />
                     <div className="absolute -inset-10 border border-savaari-accent/10 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
                  </div>
               </div>

               {/* Connected Nodes */}
               {[
                 { label: "Fleets", x: "5%", y: "50%", icon: Car },
                 { label: "Taxi Unions", x: "25%", y: "10%", icon: Building },
                 { label: "Businesses", x: "75%", y: "10%", icon: Hotel },
                 { label: "Developers", x: "95%", y: "50%", icon: Code },
                 { label: "Agencies", x: "75%", y: "90%", icon: Globe },
                 { label: "Drivers", x: "25%", y: "90%", icon: UserCheck }
               ].map((node, i) => (
                 <div key={i} className="absolute group" style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}>
                    <div className="flex flex-col items-center gap-6">
                       <div className="w-24 h-24 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-3xl border border-white/[0.08] flex items-center justify-center text-white/30 group-hover:text-savaari-accent group-hover:border-savaari-accent group-hover:bg-white/[0.08] group-hover:scale-110 transition-all duration-500 shadow-2xl">
                          <node.icon size={36} />
                       </div>
                       <span className="text-xs font-black text-savaari-gray uppercase tracking-[0.3em] group-hover:text-white transition-colors">{node.label}</span>
                    </div>
                 </div>
               ))}

               {/* Animated Pulse Rings */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/[0.03] rounded-full animate-[ping_6s_linear_infinite] opacity-40" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left bg-white/[0.02] backdrop-blur-[100px] p-20 rounded-[4rem] border border-white/[0.05] shadow-2xl hover:bg-white/[0.03] transition-colors duration-700">
              <div>
                <h3 className="text-4xl font-black text-white mb-8 tracking-tight">More providers. <br/> Better rides.</h3>
                <p className="text-savaari-gray text-xl font-medium leading-relaxed opacity-80">
                  As more fleets and services join Ridy, customers get faster rides and better availability, while drivers get more bookings. Everyone grows together in a shared ecosystem.
                </p>
              </div>
              <div>
                <h3 className="text-4xl font-black text-white mb-8 tracking-tight">Smart ride <br/> matching</h3>
                <p className="text-savaari-gray text-xl font-medium leading-relaxed opacity-80">
                  Ridy connects to multiple ride sources through a decentralized protocol. If one provider is not available, another automatically takes over—ensuring you always get your ride.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
      

      
      <Footer />
    </div>
  );
}
