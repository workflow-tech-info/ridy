import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PhoneCall } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
        scrolled ? "bg-savaari-dark/80 backdrop-blur-lg border-savaari-border py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-savaari-accent flex items-center justify-center">
            <span className="text-primary font-bold text-lg">R</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">Ridy</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="/#how-it-works" className="text-sm font-medium text-savaari-gray hover:text-white transition-colors">How it works</a>
          <a href="/#drivers" className="text-sm font-medium text-savaari-gray hover:text-white transition-colors">For Drivers</a>
          <a href="/#business" className="text-sm font-medium text-savaari-gray hover:text-white transition-colors">Business</a>
          <Link to="/api-docs" className="text-sm font-medium text-savaari-gray hover:text-white transition-colors">Developers</Link>
          <Link to="/dashboard" className="text-sm font-medium text-savaari-accent hover:text-savaari-accent/80 transition-colors">Dashboard</Link>
        </div>

        <div className="flex items-center">
          <PrimaryButton variant="accent" className="hidden sm:flex items-center gap-2 px-6 py-2 text-sm">
            <PhoneCall size={16} />
            Get Ride Now
          </PrimaryButton>
        </div>
      </div>
    </nav>
  );
}
