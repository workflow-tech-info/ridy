import React, { useState } from 'react';
import { Navigation } from '../components/ui/Navigation';
import { Footer } from '../components/ui/Footer';
import { GlassCard } from '../components/ui/GlassCard';
import { Play, Copy, CheckCircle2, ChevronRight, Terminal } from 'lucide-react';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { cn } from '../lib/utils';

export function APIPlayground() {
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [response, setResponse] = useState(null);
  const [activeTab, setActiveTab] = useState('nodejs');

  const codeSnippets = {
    nodejs: `const fetch = require('node-fetch');

async function createBooking() {
  const response = await fetch('https://api.ridy.io/v1/dispatch', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pickup: "Kochi Airport, CIAL",
      drop: "Kakanad IT Park",
      vehicleType: "Auto",
      customerPhone: "+919999999999"
    })
  });
  
  return response.json();
}

createBooking().then(console.log);`,
    curl: `curl -X POST https://api.ridy.io/v1/dispatch \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "pickup": "Kochi Airport, CIAL",
    "drop": "Kakanad IT Park",
    "vehicleType": "Auto",
    "customerPhone": "+919999999999"
  }'`
  };

  const codeStr = codeSnippets[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(codeStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setRunning(true);
    setResponse(null);
    setTimeout(() => {
      setResponse({
         id: "rc_8a7f9q2",
         status: "dispatching",
         estimated_eta_mins: 3,
         message: "Pooling nearby drivers..."
      });
      setRunning(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-primary selection:bg-savaari-accent selection:text-primary">
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Developer API</h1>
            <p className="text-savaari-gray text-lg max-w-2xl">
              Integrate the Ridy open mobility protocol directly into your backend. Test our REST endpoints live using the sandbox below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Documentation Side */}
             <div className="space-y-8">
                <GlassCard hoverEffect={false} className="p-8 bg-[#121214]">
                   <div className="flex items-center gap-3 mb-4">
                     <span className="bg-savaari-accent/20 text-savaari-accent font-mono px-2 py-1 rounded text-xs font-bold border border-savaari-accent/30">POST</span>
                     <h3 className="text-xl font-bold text-white">/v1/dispatch</h3>
                   </div>
                   <p className="text-savaari-gray text-sm leading-relaxed mb-6">Create a priority dispatch request. Our system will immediately ping the closest available driver in our open network and route them to the pickup coordinates.</p>
                   
                   <h4 className="text-white font-medium text-sm mb-3 border-b border-white/5 pb-2">Body Parameters</h4>
                   <ul className="space-y-3">
                     <li className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center text-sm">
                       <span className="font-mono text-savaari-accent min-w-[120px]">pickup</span>
                       <span className="text-savaari-gray">string (required) - Address or lat/lng.</span>
                     </li>
                     <li className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center text-sm">
                       <span className="font-mono text-savaari-accent min-w-[120px]">drop</span>
                       <span className="text-savaari-gray">string (required) - Destination address.</span>
                     </li>
                     <li className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center text-sm">
                       <span className="font-mono text-savaari-accent min-w-[120px]">vehicleType</span>
                       <span className="text-savaari-gray">string - 'Auto' | 'Sedan' | 'SUV'</span>
                     </li>
                   </ul>
                </GlassCard>

                <GlassCard hoverEffect={false} className="p-8 bg-[#121214] opacity-70">
                   <div className="flex items-center gap-3 mb-4">
                     <span className="bg-savaari-green/20 text-savaari-green font-mono px-2 py-1 rounded text-xs font-bold border border-savaari-green/30">WEBHOOK</span>
                     <h3 className="text-xl font-bold text-white">/webhook/missed-call</h3>
                   </div>
                   <p className="text-savaari-gray text-sm leading-relaxed">Register a webhook URL to receive instant push alerts whenever a customer gives a missed call to your dedicated business line.</p>
                   <div className="flex items-center gap-3 mb-4 mt-8">
                     <span className="bg-savaari-green/20 text-savaari-green font-mono px-2 py-1 rounded text-xs font-bold border border-savaari-green/30">POST</span>
                     <h3 className="text-xl font-bold text-white">/dispatch/accept</h3>
                   </div>
                   
                   <div className="flex items-center gap-3 mb-4 mt-8">
                     <span className="bg-savaari-accent/20 text-savaari-accent font-mono px-2 py-1 rounded text-xs font-bold border border-savaari-accent/30">POST</span>
                     <h3 className="text-xl font-bold text-white">/provider/register</h3>
                   </div>
                </GlassCard>
             </div>

             {/* Playground Code Side */}
             <div className="h-full flex flex-col">
                <div className="bg-[#1c1c1e] border border-white/10 rounded-t-2xl flex items-center justify-between px-4 py-3">
                   <div className="flex items-center gap-4">
                      <Terminal size={18} className="text-savaari-gray" />
                      <div className="flex gap-2">
                        <button onClick={() => setActiveTab('nodejs')} className={cn("text-xs font-medium px-3 py-1.5 rounded-md transition-colors", activeTab === 'nodejs' ? "bg-white/10 text-white" : "text-savaari-gray hover:text-white")}>Node.js</button>
                        <button onClick={() => setActiveTab('curl')} className={cn("text-xs font-medium px-3 py-1.5 rounded-md transition-colors", activeTab === 'curl' ? "bg-white/10 text-white" : "text-savaari-gray hover:text-white")}>cURL</button>
                      </div>
                   </div>
                   <button onClick={handleCopy} className="text-savaari-gray hover:text-white transition-colors" title="Copy to clipboard">
                     {copied ? <CheckCircle2 size={18} className="text-savaari-green" /> : <Copy size={18} />}
                   </button>
                </div>
                
                <div className="bg-[#0B0B0C] border-x border-b border-white/10 relative p-6 font-mono text-sm overflow-x-auto min-h-[300px]">
                  <pre className="text-[#a9b1d6]">
                     <code dangerouslySetInnerHTML={{__html: codeStr.replace(/(".*?")/g, '<span class="text-[#9ece6a]">$1</span>').replace(/(fetch|const|async|function|await|return)/g, '<span class="text-[#bb9af7]">$1</span>')}} />
                  </pre>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                   <PrimaryButton variant="accent" className="flex items-center gap-2 py-2.5 px-6 shrink-0" onClick={handleRun} disabled={running}>
                      {running ? <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" /> : <Play size={16} className="fill-current" />}
                      {running ? 'Executing...' : 'Run Request'}
                   </PrimaryButton>
                   <div className="text-xs text-savaari-gray hidden sm:block">Calls are routed through our sandbox testing environment.</div>
                </div>

                {/* Mock Response Box */}
                {(running || response) && (
                  <div className="mt-6">
                    <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2">Response Payload</h4>
                    <div className="bg-[#1c1c1e] rounded-xl border border-savaari-accent/30 p-4 font-mono text-sm text-[#9ece6a] min-h-[100px] shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                      {running ? (
                        <div className="flex items-center gap-2 text-savaari-accent">
                          <span className="w-2 h-2 rounded-full bg-savaari-accent animate-ping"></span> Awaiting response...
                        </div>
                      ) : (
                        <pre>{JSON.stringify(response, null, 2)}</pre>
                      )}
                    </div>
                  </div>
                )}
             </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
