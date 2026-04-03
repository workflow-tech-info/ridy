import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, PhoneCall, CalendarPlus, Users, Car, Settings, LogOut, ChartNoAxesCombined, Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Live Calls', href: '/dashboard/calls', icon: PhoneCall },
  { name: 'Bookings', href: '/dashboard/bookings', icon: CalendarPlus },
  { name: 'Dispatch', href: '/dashboard/dispatch', icon: Car },
  { name: 'Drivers', href: '/dashboard/drivers', icon: Users },
  { name: 'Transactions', href: '/dashboard/transactions', icon: ChartNoAxesCombined },
  { name: 'Support', href: '/dashboard/support', icon: Users },
  { name: 'Analytics', href: '/dashboard/analytics', icon: ChartNoAxesCombined },
];

export function DashboardLayout({ children }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-savaari-dark flex text-white relative">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-savaari-border bg-primary h-screen sticky top-0 flex flex-col hidden md:flex">
        <div className="p-6">
           <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-savaari-accent flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <span className="text-primary font-bold text-lg">R</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">Ridy</span>
          </Link>
          <div className="mt-2 text-xs text-savaari-gray font-medium uppercase tracking-wider">Agent Console</div>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-6">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-[#1c1c1e] text-savaari-accent shadow-sm border border-white/5" 
                    : "text-savaari-gray hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon size={18} className={isActive ? "text-savaari-accent" : "text-savaari-gray"} />
                {item.name}
                {item.name === 'Live Calls' && (
                  <span className="ml-auto bg-savaari-accent text-primary text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                    2
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-savaari-border">
           <Link to="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-savaari-gray hover:text-white rounded-lg transition-colors">
              <Settings size={18} /> Settings
           </Link>
           <Link to="/login" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-savaari-gray hover:text-red-400 rounded-lg transition-colors mt-1">
              <LogOut size={18} /> Sign out
           </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Top Header / Nav */}
        <header className="h-16 border-b border-savaari-border bg-primary/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6 md:px-8">
           <div className="flex items-center gap-4">
              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-savaari-gray hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-lg font-bold tracking-tight text-white/90">
                {navigation.find(n => n.href === location.pathname)?.name || 'Dashboard'}
              </h1>
           </div>
           
           <div className="flex items-center gap-4 text-sm font-medium">
              <div className="hidden sm:flex items-center gap-2 bg-[#1c1c1e] px-3 py-1.5 rounded-full border border-white/5">
                <span className="w-2 h-2 rounded-full bg-savaari-green animate-pulse"></span>
                <span className="text-savaari-gray text-xs">Live</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-savaari-accent to-savaari-green flex items-center justify-center border border-white/10 shadow-sm cursor-pointer">
                 <span className="text-black text-[10px] font-black uppercase">AK</span>
              </div>
           </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
           {/* Ambient central glow for dashboard panels */}
           <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-savaari-accent/5 rounded-full blur-[140px] pointer-events-none" />
           <div className="relative z-10 max-w-7xl mx-auto">
             {children}
           </div>
        </div>
      </main>

      {/* Mobile Navigation Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="absolute top-0 left-0 bottom-0 w-72 bg-[#0B0B0C] border-r border-white/10 p-6 flex flex-col animate-in slide-in-from-left duration-300 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
               <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="w-8 h-8 rounded-full bg-savaari-accent flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">R</span>
                  </div>
                  <span className="text-white font-bold text-xl tracking-tight">Ridy</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-savaari-gray">
                  <X size={20} />
                </button>
            </div>

            <div className="mt-2 text-[10px] text-savaari-gray font-black uppercase tracking-[0.2em] mb-6">Console Menu</div>

            <nav className="flex-1 space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3.5 text-base font-bold rounded-2xl transition-all duration-200",
                      isActive 
                        ? "bg-savaari-accent/10 text-savaari-accent border border-savaari-accent/20" 
                        : "text-savaari-gray hover:text-white"
                    )}
                  >
                    <item.icon size={22} className={isActive ? "text-savaari-accent" : "text-savaari-gray"} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-6 border-t border-white/10 mt-auto">
               <Link to="/dashboard/settings" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 text-savaari-gray font-bold">
                  <Settings size={20} /> Settings
               </Link>
               <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 text-red-500 font-bold mt-2">
                  <LogOut size={20} /> Logout
               </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
