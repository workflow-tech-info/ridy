import React, { useState } from 'react';
import { Navigation } from '../components/ui/Navigation';
import { Footer } from '../components/ui/Footer';
import { GlassCard } from '../components/ui/GlassCard';
import { Play, Copy, CheckCircle2, Terminal, Send, Code, Database, Zap } from 'lucide-react';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { cn } from '../lib/utils';
import api from '../lib/api';

export function APIPlayground() {
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [response, setResponse] = useState(null);
  const [activeTab, setActiveTab] = useState('nodejs');
  const [activeEndpoint, setActiveEndpoint] = useState('POST /v1/dispatch');
  const [formData, setFormData] = useState({
    pickup: "Kochi Airport, CIAL",
    drop: "Kakanad IT Park",
    vehicleType: "Auto",
    customerPhone: "+919999999999"
  });

  const endpoints = [
    { method: 'POST', path: '/v1/dispatch', description: 'Create a new ride request and start driver pooling.' },
    { method: 'POST', path: '/dispatch/accept', description: 'Manually accept a ride request on behalf of a driver.' },
    { method: 'GET', path: '/bookings', description: 'Retrieve a list of all recent ride bookings.' },
    { method: 'GET', path: '/drivers', description: 'Fetch all registered drivers in the host network.' },
    { method: 'POST', path: '/webhook/missed-call', description: 'Simulate an incoming missed call event.' },
    { method: 'GET', path: '/analytics/summary', description: 'Get high-level operational metrics.' }
  ];

  const handleRun = async () => {
    setRunning(true);
    setResponse(null);
    try {
      let res;
      if (activeEndpoint === 'POST /v1/dispatch') {
        res = await api.createBooking(formData);
      } else if (activeEndpoint === 'POST /dispatch/accept') {
        res = await api.acceptBooking({ bookingId: 'ridy_1001', driverId: 'd1' });
      } else if (activeEndpoint === 'GET /bookings') {
        res = await api.getBookings();
      } else if (activeEndpoint === 'GET /drivers') {
        res = await api.getDrivers();
      } else if (activeEndpoint === 'POST /webhook/missed-call') {
        res = await api.simulateMissedCall(formData.customerPhone);
      } else if (activeEndpoint === 'GET /analytics/summary') {
        res = await api.getAnalytics();
      }
      setResponse(res);
    } catch (err) {
      setResponse({ error: err.message });
    } finally {
      setRunning(false);
    }
  };

  const getCodeSnippet = () => {
    if (activeTab === 'curl') {
      return `curl -X ${activeEndpoint.split(' ')[0]} http://localhost:3001${activeEndpoint.split(' ')[1]} \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(formData, null, 2)}'`;
    }
    return `const fetch = require('node-fetch');

async function runRequest() {
  const response = await fetch('http://localhost:3001${activeEndpoint.split(' ')[1]}', {
    method: '${activeEndpoint.split(' ')[0]}',
    headers: { 'Content-Type': 'application/json' },
    body: ${activeEndpoint.startsWith('GET') ? 'null' : `JSON.stringify(${JSON.stringify(formData, null, 2)})`}
  });
  
  return response.json();
}

runRequest().then(console.log);`;
  };

  return (
    <div className="min-h-screen bg-primary selection:bg-savaari-accent selection:text-primary">
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-5xl font-bold tracking-tight text-white mb-4">Developer Playground</h1>
            <p className="text-savaari-gray text-lg max-w-2xl">
              The Ridy REST API sandbox. Test endpoints live against the local mock backend and explore the protocol.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar: Endpoints */}
            <div className="lg:col-span-4 space-y-3">
              <h3 className="text-xs font-bold text-savaari-gray uppercase tracking-widest px-2 mb-4">Endpoints</h3>
              {endpoints.map((ep) => {
                const fullId = `${ep.method} ${ep.path}`;
                const isActive = activeEndpoint === fullId;
                return (
                  <button 
                    key={fullId}
                    onClick={() => setActiveEndpoint(fullId)}
                    className={cn(
                      "w-full text-left p-4 rounded-2xl border transition-all group",
                      isActive 
                        ? "bg-savaari-accent/10 border-savaari-accent/30 shadow-lg shadow-savaari-accent/5" 
                        : "bg-[#121214] border-white/5 hover:border-white/20"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <span className={cn(
                        "text-[10px] font-bold px-1.5 py-0.5 rounded border",
                        ep.method === 'POST' ? 'bg-savaari-accent/20 text-savaari-accent border-savaari-accent/20' : 'bg-savaari-green/20 text-savaari-green border-savaari-green/20'
                      )}>{ep.method}</span>
                      <span className="text-sm font-mono text-white group-hover:text-savaari-accent transition-colors">{ep.path}</span>
                    </div>
                    <p className="text-xs text-savaari-gray line-clamp-1">{ep.description}</p>
                  </button>
                );
              })}
            </div>

            {/* Main Playground */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <GlassCard className="p-8 bg-[#121214]/50 border-white/5">
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-savaari-accent/10 text-savaari-accent">
                         <Zap size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-white">Execute Request</h3>
                   </div>
                   <div className="flex items-center gap-2">
                      <button onClick={() => setActiveTab('nodejs')} className={cn("px-4 py-1.5 rounded-lg text-xs font-bold", activeTab === 'nodejs' ? "bg-white/10 text-white" : "text-savaari-gray")}>Node.js</button>
                      <button onClick={() => setActiveTab('curl')} className={cn("px-4 py-1.5 rounded-lg text-xs font-bold", activeTab === 'curl' ? "bg-white/10 text-white" : "text-savaari-gray")}>cURL</button>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {/* Input Section */}
                   <div className="space-y-6">
                      <h4 className="text-xs font-bold text-savaari-gray uppercase tracking-widest border-b border-white/5 pb-2">Request Body</h4>
                      {activeEndpoint.startsWith('POST') ? (
                        <div className="space-y-4">
                           {Object.keys(formData).map(key => (
                              <div key={key} className="space-y-1.5">
                                 <label className="text-[10px] font-mono text-savaari-accent uppercase">{key}</label>
                                 <input 
                                   type="text" 
                                   value={formData[key]} 
                                   onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                                   className="w-full bg-[#1c1c1e] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-savaari-accent"
                                 />
                              </div>
                           ))}
                        </div>
                      ) : (
                        <div className="py-12 text-center text-savaari-gray opacity-50 italic text-sm">No body required for GET requests</div>
                      )}
                   </div>

                   {/* Snippet Section */}
                   <div className="space-y-6 flex flex-col">
                      <div className="flex items-center justify-between h-5">
                         <h4 className="text-xs font-bold text-savaari-gray uppercase tracking-widest border-b border-white/5 pb-2 mb-0">Code Snippet</h4>
                         <button onClick={() => { navigator.clipboard.writeText(getCodeSnippet()); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="text-savaari-gray hover:text-white pb-3">
                           {copied ? <CheckCircle2 size={16} className="text-savaari-green" /> : <Copy size={16} />}
                         </button>
                      </div>
                      <div className="flex-1 bg-black rounded-2xl p-4 font-mono text-[11px] overflow-x-auto text-[#a9b1d6] border border-white/5 whitespace-pre">
                         {getCodeSnippet()}
                      </div>
                   </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-savaari-gray">
                      <Database size={12} /> TARGET: http://localhost:3001
                   </div>
                   <PrimaryButton variant="accent" onClick={handleRun} disabled={running} className="px-10 py-3 flex items-center gap-2 shadow-lg shadow-savaari-accent/20">
                      {running ? <div className="w-5 h-5 border-2 border-primary border-t-transparent animate-spin rounded-full" /> : <Send size={18} />}
                      {running ? 'Executing...' : 'Run Request'}
                   </PrimaryButton>
                </div>
              </GlassCard>

              {/* Response Output */}
              {(running || response) && (
                <GlassCard className="p-8 bg-black/50 border-savaari-accent/20">
                  <h4 className="text-xs font-bold text-savaari-accent uppercase tracking-widest mb-4">API Response</h4>
                  <div className="bg-[#0B0B0C] rounded-xl p-4 font-mono text-[12px] text-savaari-green min-h-[150px] border border-savaari-accent/10 whitespace-pre">
                    {running ? (
                      <div className="flex items-center gap-3 animate-pulse">
                         <div className="w-2 h-2 rounded-full bg-savaari-accent" />
                         Processing request...
                      </div>
                    ) : (
                      JSON.stringify(response, null, 2)
                    )}
                  </div>
                </GlassCard>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
