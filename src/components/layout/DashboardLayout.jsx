import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, PhoneCall, CalendarPlus, Users, Car, Settings, LogOut, ChartNoAxesCombined } from "lucide-react";
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
        <header className="h-16 border-b border-savaari-border bg-primary/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
           <h1 className="text-lg font-semibold tracking-tight text-white/90">
             {navigation.find(n => n.href === location.pathname)?.name || 'Dashboard'}
           </h1>
           <div className="flex items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-2 bg-[#1c1c1e] px-3 py-1.5 rounded-full border border-white/5">
                <span className="w-2 h-2 rounded-full bg-savaari-green animate-pulse"></span>
                <span className="text-savaari-gray text-xs">System Online</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-savaari-accent to-savaari-green flex items-center justify-center ml-2 border border-white/10 shadow-sm cursor-pointer">
                 <span className="text-black text-xs font-bold">AK</span>
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
    </div>
  );
}
