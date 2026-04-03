import React from "react";
import { Phone, MessageSquare, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-savaari-border bg-savaari-dark pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-savaari-accent flex items-center justify-center">
                <span className="text-primary font-bold text-xs">R</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">Ridy</span>
            </div>
            <p className="text-savaari-gray text-sm max-w-sm">
              No app. Just a missed call. The voice-first mobility network designed for everyone.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+918884484080" className="text-savaari-gray hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Phone size={14} /> Call us
                </a>
              </li>
              <li>
                <a href="https://wa.me/918884484080" className="text-savaari-gray hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <MessageSquare size={14} /> WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:support@ridy.io" className="text-savaari-gray hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Mail size={14} /> Email
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-savaari-gray hover:text-white transition-colors text-sm">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-savaari-gray hover:text-white transition-colors text-sm">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-savaari-border flex flex-col md:flex-row items-center justify-between">
          <p className="text-savaari-gray text-xs">© {new Date().getFullYear()} Ridy Mobility. All rights reserved.</p>
          <div className="text-savaari-gray text-xs mt-2 md:mt-0">
            Apple-inspired design, built for India.
          </div>
        </div>
      </div>
    </footer>
  );
}
