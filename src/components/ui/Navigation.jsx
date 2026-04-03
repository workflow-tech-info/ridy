import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PhoneCall, Menu, X } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "How it works", href: "/#how-it-works" },
    { name: "For Drivers", href: "/#drivers" },
    { name: "Business", href: "/#business" },
    { name: "Developers", href: "/api-docs" },
    { name: "Dashboard", href: "/dashboard", accent: true },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled || isMenuOpen ? "bg-[#0B0B0C]/90 backdrop-blur-xl border-white/10 py-4" : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsMenuOpen(false)}>
          <div className="w-8 h-8 rounded-full bg-savaari-accent flex items-center justify-center transition-transform group-hover:scale-110">
            <span className="text-primary font-bold text-lg">R</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">Ridy</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <a 
              key={link.name}
              href={link.href} 
              className={`text-sm font-bold transition-all hover:text-white ${link.accent ? 'text-savaari-accent' : 'text-savaari-gray'}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton variant="accent" className="hidden sm:flex items-center gap-2 px-6 py-2 text-xs font-bold shadow-lg shadow-savaari-accent/10">
            <PhoneCall size={14} />
            Get Ride Now
          </PrimaryButton>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-white bg-white/5 rounded-xl border border-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0B0B0C] border-b border-white/10 p-6 space-y-6 flex flex-col animate-in fade-in slide-in-from-top-4 duration-300">
           {navLinks.map(link => (
            <a 
              key={link.name}
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className={`text-lg font-bold transition-all border-b border-white/5 pb-2 ${link.accent ? 'text-savaari-accent' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <PrimaryButton variant="accent" className="w-full flex items-center justify-center gap-2 py-4">
            <PhoneCall size={20} />
            Get Ride Now
          </PrimaryButton>
        </div>
      )}
    </nav>
  );
}
