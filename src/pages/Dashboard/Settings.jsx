import React, { useState } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Key, Globe, Volume2, DollarSign, Save, Shield, Bell, Database } from 'lucide-react';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { cn } from '../../lib/utils';

export function Settings() {
  const [activeTab, setActiveTab] = useState('General');

  const tabs = [
    { name: 'General', icon: Globe },
    { name: 'API & Webhooks', icon: Key },
    { name: 'Voice Config', icon: Volume2 },
    { name: 'Pricing', icon: DollarSign },
    { name: 'Security', icon: Shield },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Settings</h2>
        <p className="text-savaari-gray mt-1">Configure your Ridy instance and developer credentials.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar Tabs */}
        <aside className="lg:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                activeTab === tab.name 
                  ? "bg-savaari-accent text-primary shadow-lg shadow-savaari-accent/20" 
                  : "text-savaari-gray hover:text-white hover:bg-white/5"
              )}
            >
              <tab.icon size={18} className={activeTab === tab.name ? "text-primary" : "text-savaari-gray group-hover:text-white"} />
              {tab.name}
            </button>
          ))}
        </aside>

        {/* Right Content Area */}
        <div className="flex-1 space-y-6">
          <GlassCard className="p-8 border-white/5 bg-[#121214]/50">
            {activeTab === 'General' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Instance Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-savaari-gray uppercase tracking-wider">Site Name</label>
                      <input type="text" defaultValue="Ridy Mobility - Kochi" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-savaari-accent transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-savaari-gray uppercase tracking-wider">Default Region</label>
                      <input type="text" defaultValue="India / KL" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-savaari-accent transition-colors" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-bold">Maintenance Mode</h4>
                      <p className="text-sm text-savaari-gray">Disable public booking interface for maintenance.</p>
                    </div>
                    <div className="w-12 h-6 bg-white/10 border border-white/10 rounded-full relative cursor-pointer">
                      <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-savaari-gray" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-bold">Analytics Tracking</h4>
                      <p className="text-sm text-savaari-gray">Collect anonymous usage data for performance tracking.</p>
                    </div>
                    <div className="w-12 h-6 bg-savaari-accent/20 border border-savaari-accent/30 rounded-full relative cursor-pointer">
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-savaari-accent shadow-sm shadow-savaari-accent/50" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'API & Webhooks' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">API Management</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-[#1c1c1e] rounded-xl border border-white/10 flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-savaari-accent/10 text-savaari-accent"><Key size={20} /></div>
                        <div>
                          <p className="text-sm font-bold text-white uppercase tracking-wider">Production API Key</p>
                          <p className="font-mono text-xs text-savaari-gray">rk_prod_••••••••••••••••••••••••</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-xs font-bold text-savaari-accent hover:bg-savaari-accent/10 rounded-lg transition-all">Regenerate</button>
                    </div>

                    <div className="space-y-2 pt-4">
                      <label className="text-xs font-bold text-savaari-gray uppercase tracking-wider">Webhook Endpoint</label>
                      <div className="flex gap-2">
                        <input type="text" defaultValue="https://your-server.io/ridy-webhook" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-savaari-accent" />
                        <PrimaryButton variant="accent" className="px-6 py-2.5">Update</PrimaryButton>
                      </div>
                      <p className="text-[10px] text-savaari-gray">Payload format: JSON. Signed with secret.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Pricing' && (
              <div className="space-y-6">
                <div>
                   <h3 className="text-xl font-bold text-white mb-4">Fare Configuration</h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {['Auto', 'Sedan', 'SUV'].map((type) => (
                        <div key={type} className="p-4 bg-[#1c1c1e] rounded-xl border border-white/10 space-y-4">
                           <div className="flex items-center justify-between">
                              <h4 className="font-bold text-white">{type}</h4>
                              <div className="px-2 py-0.5 bg-savaari-accent/10 rounded text-xs text-savaari-accent font-bold border border-savaari-accent/20">Active</div>
                           </div>
                           <div className="space-y-1">
                              <label className="text-[10px] font-bold text-savaari-gray">BASE FARE</label>
                              <div className="flex items-center gap-2">
                                <span className="text-savaari-gray">₹</span>
                                <input type="number" defaultValue={type === 'Auto' ? 30 : 60} className="w-full bg-transparent border-b border-white/10 py-1 text-white text-xl font-bold focus:border-savaari-accent outline-none" />
                              </div>
                           </div>
                           <div className="space-y-1">
                              <label className="text-[10px] font-bold text-savaari-gray">PER KM</label>
                              <div className="flex items-center gap-2">
                                <span className="text-savaari-gray">₹</span>
                                <input type="number" defaultValue={type === 'Auto' ? 15 : 22} className="w-full bg-transparent border-b border-white/10 py-1 text-white text-xl font-bold focus:border-savaari-accent outline-none" />
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            )}
            
            <div className="mt-12 flex justify-end gap-3 border-t border-white/5 pt-8">
               <button className="px-8 py-3 text-sm font-bold text-white hover:text-white/80 transition-colors">Discard</button>
               <PrimaryButton variant="accent" className="flex items-center gap-2 px-10 py-3">
                  <Save size={18} />
                  Save Changes
               </PrimaryButton>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
