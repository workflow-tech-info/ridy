import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function JourneyConsole() {
  // INTRO STATES
  const [step, setStep] = useState(0); 
  const [typedText, setTypedText] = useState("");
  const [inView, setInView] = useState(false);
  
  // POST-CONFIRMATION STATES
  const [confirmed, setConfirmed] = useState(false);
  const [confirmStep, setConfirmStep] = useState(0);

  // INTERACTIVE TERMINAL STATES
  const [interactiveMode, setInteractiveMode] = useState(false);
  const [history, setHistory] = useState([]); 
  const [inputVal, setInputVal] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [context, setContext] = useState("idle");

  const containerRef = useRef(null);
  const scrollableRef = useRef(null);
  const inputRef = useRef(null);
  const hasRunIntro = useRef(false);

  const introTargetText = "plan my trip from Trivandrum to Munnar";

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !inView) {
        setInView(true);
      }
    }, { threshold: 0.1 }); 
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [inView]);

  // Auto-scroll loop
  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, [step, confirmStep, typedText, history, interactiveMode, isProcessing, inputVal]);

  // Click on terminal focuses input
  const handleContainerClick = () => {
    if (interactiveMode && !isProcessing && inputRef.current) {
      inputRef.current.focus();
    }
  };

  // ----------------------------------------------------
  // AUTOMATED INTRO SEQUENCE
  // ----------------------------------------------------
  useEffect(() => {
    if (!inView || hasRunIntro.current) return;
    hasRunIntro.current = true;

    let isMounted = true;
    const runIntro = async () => {
      await new Promise(r => setTimeout(r, 200));
      if (!isMounted) return; setStep(1); 
      for (let i = 0; i < introTargetText.length; i++) {
        if (!isMounted) return;
        setTypedText(introTargetText.substring(0, i + 1));
        await new Promise(r => setTimeout(r, 10)); 
      }
      await new Promise(r => setTimeout(r, 100)); if (!isMounted) return; setStep(2); 
      await new Promise(r => setTimeout(r, 400)); if (!isMounted) return; setStep(3); 
      await new Promise(r => setTimeout(r, 400)); if (!isMounted) return; setStep(4); 
      await new Promise(r => setTimeout(r, 400)); if (!isMounted) return; setStep(5); 
      await new Promise(r => setTimeout(r, 300)); if (!isMounted) return; setStep(6); 
    };

    runIntro();
    return () => { isMounted = false; };
  }, [inView]);

  const handleConfirm = async () => {
    if (confirmed) return;
    setConfirmed(true);
    setStep(7); 
    setConfirmStep(1); 
    await new Promise(r => setTimeout(r, 300));
    setConfirmStep(2); 
    await new Promise(r => setTimeout(r, 500));
    setConfirmStep(3); 
    await new Promise(r => setTimeout(r, 700));
    setConfirmStep(4); 
    
    // Trigger transition to interactive mode
    setTimeout(() => {
       initInteractiveMode();
    }, 1500); 
  };


  // ----------------------------------------------------
  // INTERACTIVE ENGINE
  // ----------------------------------------------------
  const initInteractiveMode = () => {
      setHistory([{
         id: Date.now(),
         type: 'system',
         content: (
            <motion.div initial={{opacity:0, y:-5}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="text-[#a0a0a0] bg-[#ffffff05] p-5 rounded-lg border border-[#ffffff0a] mt-6 mb-4 relative overflow-hidden">
               <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#27c93f]"></div>
               <div className="font-bold text-white mb-4">You can manage your journey anytime:</div>
               <div className="flex items-center gap-4 mb-2"><span className="text-[#ffbd2e] font-bold w-[80px]">/plan</span>   <span>→ Plan a new trip</span></div>
               <div className="flex items-center gap-4 mb-2"><span className="text-[#ffbd2e] font-bold w-[80px]">/dispatch</span> <span>→ View or modify current trip</span></div>
               <div className="flex items-center gap-4 mb-2"><span className="text-[#ffbd2e] font-bold w-[80px]">/notify</span>   <span>→ Resend trip details</span></div>
               <div className="flex items-center gap-4"><span className="text-[#ffbd2e] font-bold w-[80px]">/help</span>       <span>→ See all commands</span></div>
            </motion.div>
         )
      }]);
      setInteractiveMode(true);
  };

  const processCommand = (cmdstr) => {
    const val = cmdstr.trim().toLowerCase();
    
    const pushSystem = (content) => {
       setHistory(prev => [...prev, { id: Date.now() + Math.random(), type: 'system', content }]);
    };

    // 1. Check open context
    if (context === 'cancel') {
        if (val === 'yes' || val === 'y') {
            pushSystem(
               <div className="mt-2">
                 <div className="text-[#ff5f56] font-bold mb-1">Trip cancelled.</div>
                 <div className="text-[#a0a0a0]">Refund initiated (if applicable). Your schedule has been cleared.</div>
               </div>
            );
        } else {
            pushSystem(<div className="text-[#27c93f] mt-2">Cancellation aborted. Your trip is still on track.</div>);
        }
        setContext("idle");
        return;
    }

    if (context === 'plan') {
        pushSystem(
           <div className="mt-2">
             <div className="text-[#a0a0a0] mb-2">Analyzing routes to <span className="text-white font-bold">{cmdstr}</span>...</div>
             <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}} className="text-[#27c93f]">
                ✓ Route identified. Fetching providers...<br/>
                <span className="text-[#a0a0a0] text-sm">(Simulation: Continuing this flow acts identically to the intro.)</span>
             </motion.div>
           </div>
        );
        setContext("idle");
        return;
    }

    // 2. Natural language intercept for active trip modification
    if (context === 'dispatch' || val.includes("change time") || val.includes("change pickup") || val.includes("add stop")) {
        pushSystem(
            <div className="mt-2">
                <span className="text-white font-bold mb-2">Updating itinerary...</span>
                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 0.5}} className="mt-2 text-[#27c93f]">✓ Request sent to driver Arun Kumar.</motion.div>
                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 1.0}} className="text-[#27c93f]">✓ Time and fare adjusted automatically.</motion.div>
            </div>
        );
        setContext("idle");
        return;
    }

    // 3. Core Commands
    switch (val) {
      case '/plan':
         pushSystem(<div className="mt-2 font-bold text-white">Where would you like to go next?</div>);
         setContext("plan");
         break;

      case '/dispatch':
         pushSystem(
            <div className="mt-2">
               <div className="text-[#a0a0a0] mb-4">---</div>
               <div className="text-white font-bold mb-3">Current Booking:</div>
               <div className="text-[#a0a0a0] mb-4 pl-4 border-l border-[#333]">
                  Trip: <span className="text-white">Trivandrum → Munnar</span><br/>
                  Pickup: <span className="text-white">6:00 AM</span><br/>
                  Driver: <span className="text-white">Arun Kumar</span><br/>
                  Vehicle: <span className="text-white">White Dzire</span>
               </div>
               <div className="font-bold text-white mb-2">Modification Options:</div>
               <div className="text-[#a0a0a0]">
                 1. Change pickup time<br/>
                 2. Change pickup location<br/>
                 3. Add stop<br/>
               </div>
               <div className="mt-3 text-sm italic text-[#888]">Type naturally (e.g. "change time to 7am")</div>
            </div>
         );
         setContext("dispatch");
         break;

      case '/notify':
         pushSystem(
            <div className="mt-2">
               <div className="text-[#a0a0a0] mb-4">Resending your trip details...</div>
               <div className="space-y-1">
                  <motion.div initial={{opacity:0, x:-5}} animate={{opacity:1, x:0}} transition={{delay:0.3}} className="text-[#27c93f]">✓ WhatsApp sent</motion.div>
                  <motion.div initial={{opacity:0, x:-5}} animate={{opacity:1, x:0}} transition={{delay:0.7}} className="text-[#27c93f]">✓ Email sent</motion.div>
                  <motion.div initial={{opacity:0, x:-5}} animate={{opacity:1, x:0}} transition={{delay:1.1}} className="text-[#27c93f]">✓ SMS sent</motion.div>
               </div>
            </div>
         );
         break;

      case '/help':
         pushSystem(
            <div className="mt-2 text-[#a0a0a0]">
               <div className="text-white font-bold mb-3">Available commands:</div>
               <div className="flex items-center gap-4 mb-1"><span className="text-[#ffbd2e] font-bold w-[80px]">/plan</span>   <span>Plan a new journey</span></div>
               <div className="flex items-center gap-4 mb-1"><span className="text-[#ffbd2e] font-bold w-[80px]">/dispatch</span> <span>Manage current booking</span></div>
               <div className="flex items-center gap-4 mb-1"><span className="text-[#ffbd2e] font-bold w-[80px]">/notify</span>   <span>Resend details</span></div>
               <div className="flex items-center gap-4 mb-1"><span className="text-[#ffbd2e] font-bold w-[80px]">/cancel</span>   <span>Cancel current trip</span></div>
               <div className="flex items-center gap-4"><span className="text-[#ffbd2e] font-bold w-[80px]">/status</span>   <span>Check driver status</span></div>
            </div>
         );
         break;

      case '/status':
         pushSystem(
            <div className="mt-2 border-l-2 border-[#27c93f] pl-4">
              <div className="text-white font-bold mb-2">Driver is on the way</div>
              <div className="text-[#a0a0a0]">ETA: <span className="text-white">12 minutes</span></div>
              <div className="text-[#a0a0a0]">Current location: <span className="text-white">3.2 km away</span></div>
            </div>
         );
         break;

      case '/cancel':
         pushSystem(<div className="mt-2 text-[#ffbd2e] font-bold">Are you sure you want to cancel this trip? (yes/no)</div>);
         setContext("cancel");
         break;

      default:
         if (val !== '') {
            pushSystem(<div className="mt-2 text-[#ff5f56]">Command not found. Type <span className="font-bold">/help</span> for available options.</div>);
         }
         break;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputVal.trim() !== '') {
      const userCmd = inputVal;
      setInputVal("");
      setIsProcessing(true);
      
      setHistory(prev => [...prev, { id: Date.now(), type: 'user', content: userCmd }]);

      // Natural delayed response
      setTimeout(() => {
         processCommand(userCmd);
         setIsProcessing(false);
      }, 300 + Math.random() * 200);
    }
  };


  // ----------------------------------------------------
  // RENDER INTERFACE
  // ----------------------------------------------------
  return (
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden" ref={containerRef}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-[radial-gradient(circle_at_center,_rgba(0,240,255,0.02)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-4 tracking-tight font-sans">
            Your journey, already connected.
          </h2>
          <p className="text-savaari-gray text-lg md:text-xl font-light">
            Plan, choose, and book rides without switching apps. It all comes together where you are.
          </p>
        </div>

        {/* Console Container */}
        <div 
          className="rounded-[12px] bg-[#1a1a1a] border border-[#303030] shadow-2xl overflow-hidden font-mono mx-auto max-w-[800px] flex flex-col"
          onClick={handleContainerClick}
        >
          {/* Top Bar */}
          <div className="h-10 bg-[#2d2d2d] flex items-center px-4 relative cursor-default">
            <div className="flex gap-1.5 relative z-10 w-16 md:w-20">
              <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
              <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
              <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[#888] text-[11px] md:text-[13px] font-semibold tracking-wide">
              savaari-cli — claude
            </div>
          </div>

          {/* Scrollable Output Viewport */}
          <div 
            ref={scrollableRef}
            className="p-4 md:p-8 h-[400px] md:h-[550px] overflow-y-auto scroll-smooth flex flex-col justify-start text-[13px] md:text-[14px] leading-[1.6] text-[#e0e0e0] custom-scrollbar"
          >
            {/* Logo Boilerplate */}
            <div className="flex gap-4 mb-8">
              <div className="flex flex-col items-center pt-1 gap-[2px]">
                <div className="w-10 h-7 bg-[#d97771] rounded-sm relative">
                   <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-[#1a1a1a]" />
                   <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#1a1a1a]" />
                   <div className="absolute bottom-[-4px] left-2 w-1.5 h-1.5 bg-[#d97771]" />
                   <div className="absolute bottom-[-4px] right-2 w-1.5 h-1.5 bg-[#d97771]" />
                   <div className="absolute top-1/2 -left-1 w-1 h-3 bg-[#d97771]" />
                   <div className="absolute top-1/2 -right-1 w-1 h-3 bg-[#d97771]" />
                </div>
              </div>
              <div className="text-[#a0a0a0]">
                <div className="font-bold text-[#e0e0e0]">Claude Code <span className="font-normal text-[#a0a0a0]">v2.0.24</span></div>
                <div>Sonnet 3.5 • Claude Max</div>
                <div>/Users/chris/Documents/savaari</div>
              </div>
            </div>

            {/* Simulated Intro Execution */}
            <div className="flex items-start mb-6">
              <span className="text-[#7f7f7f] font-bold mr-3 mt-px">{'>'}</span>
              <div className="flex-1 relative break-words">
                {typedText.length > 0 && <span className="bg-[#4d4d4d] text-white px-[6px] py-[1px] rounded-sm">{typedText}</span>}
                {step === 1 && !interactiveMode && (
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="inline-block w-2.5 h-[18px] bg-[#a0a0a0] ml-1 align-middle translate-y-[-2px]" />
                )}
              </div>
            </div>

            {step >= 2 && (
              <div className="flex flex-col mb-4">
                <AnimatePresence>
                  {step === 2 && (
                    <motion.div key="think1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0 } }} className="flex items-start text-[#a0a0a0]">
                      <span className="mr-4 mt-px text-sm">●</span>
                      <span>Thinking<motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>...</motion.span></span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {step >= 3 && (
                  <div className="flex items-start">
                    <span className="text-white mr-4 mt-px text-sm">●</span>
                    <div className="flex-1 text-[#e0e0e0]">
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }} className="mb-6">
                        Planning your trip from Trivandrum to Munnar.<br/>
                        This is a scenic hill journey through Kerala, best done by road.<br/>
                        I’ll map out your travel, stays, and experiences — all in one flow.<br/><br/>
                        
                        <div className="text-[#606060] mb-4">---</div>

                        <span className="text-white font-bold">📍 Route Overview</span><br/>
                        Trivandrum → Munnar<br/>
                        Travel Time: 8–9 hours (including breaks)<br/>
                        <span className="text-[#a0a0a0]">Recommended Departure: 6:00 AM</span>
                      </motion.div>

                      {step >= 4 && (
                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }} className="mb-6">
                          <div className="text-[#606060] mb-4">---</div>
                          <span className="text-white font-bold">🚗 Fetching ride options from Ridy...</span><br/>
                          Optimizing pricing...<br/><br/>
                          
                          <div className="text-[#606060] mb-4">---</div>
                          
                          <span className="text-white font-bold">🚖 Ride Option Selected</span><br/>
                          Vehicle: AC Sedan<br/>
                          Driver ETA: 12 minutes<br/><br/>
                          Fare: ₹4,800 <span className="text-[#a0a0a0]">(all-inclusive estimate)</span><br/><br/>

                          <div className="text-[#606060] mb-4">---</div>
                          <span className="text-white font-bold">🏨 Places to Stay</span><br/>
                          • Budget: ₹1,000 – ₹2,000 (Local homestays)<br/>
                          • Premium: ₹5,000+ (Resorts with mountain views)<br/>

                        </motion.div>
                      )}

                      {step >= 5 && (
                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }} className="mb-6">
                          <div className="text-[#606060] mb-4">---</div>
                          <span className="text-[#27c93f] font-bold">💰 Total Travel Cost</span><br/>
                          Estimated Total: ₹5,500 – ₹6,000
                        </motion.div>
                      )}

                      {step >= 6 && !confirmed && !interactiveMode && (
                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }}>
                          <div className="text-[#606060] mb-4">---</div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <span>Would you like to confirm this booking? [Y/n]</span>
                            <button 
                              onClick={handleConfirm}
                              className="px-6 py-2 bg-[#e0e0e0] text-[#1a1a1a] font-bold text-xs tracking-wide uppercase rounded hover:bg-white transition-all active:scale-95"
                            >
                              Confirm [Y]
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* POST CONFIRMATION */}
                      {confirmed && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 pt-6 border-t border-[#333]">
                           <div className="flex items-start mb-6 -ml-7 border-l-2 border-transparent">
                            <span className="text-[#7f7f7f] font-bold mr-3 mt-px">{'>'}</span>
                            <div className="flex-1 text-[#e0e0e0] font-bold">Y</div>
                           </div>

                           {confirmStep >= 2 && (
                             <div className="flex items-start mb-4 -ml-7">
                               <span className="text-white mr-4 mt-px text-sm">●</span>
                               <div className="flex-1 text-[#e0e0e0]">
                                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
                                  confirming booking...
                                 </motion.div>

                                 {confirmStep >= 3 && (
                                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }} className="mt-4 text-[#a0a0a0]">
                                    Securing your ride... Assigning driver... Locking fare...
                                  </motion.div>
                                 )}

                                 {confirmStep >= 4 && (
                                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }} className="mt-4">
                                    <div className="text-[#606060] mb-4">---</div>
                                    <div className="text-[#27c93f] font-bold mb-4">✅ Booking Confirmed</div>
                                    Driver: Arun Kumar<br/>
                                    Vehicle: White Dzire (KL-07 XX 1234)<br/><br/>
                                    <div className="text-white font-bold">Have a great journey to Munnar 🌄</div>
                                  </motion.div>
                                 )}
                               </div>
                             </div>
                           )}
                        </motion.div>
                      )}

                    </div>
                  </div>
                )}
              </div>
            )}

            {/* INTERACTIVE HISTORY ENGINE (Post Intro) */}
            {interactiveMode && (
              <div className="mt-2">
                {history.map((item, index) => (
                  <div key={item.id} className="mb-6 flex items-start">
                    {item.type === 'user' ? (
                      <span className="text-[#7f7f7f] font-bold mr-3 mt-px">{'>'}</span>
                    ) : (
                      <span className="text-white mr-4 mt-px text-sm">●</span>
                    )}
                    <div className={`flex-1 ${item.type === 'user' ? 'text-white' : 'text-[#e0e0e0]'}`}>
                      {item.type === 'user' ? (
                        <span className="bg-[#4d4d4d] text-white px-[6px] py-[1px] rounded-sm">{item.content}</span>
                      ) : (
                        <motion.div initial={{ opacity:0, y:3 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.2 }}>
                          {item.content}
                        </motion.div>
                      )}
                    </div>
                  </div>
                ))}

                {/* ACTIVE INPUT LINE */}
                <div className="flex items-start opacity-100 transition-opacity duration-300">
                    <span className="text-[#7f7f7f] font-bold mr-3 mt-px">{'>'}</span>
                    <div className="flex-1 relative flex items-center bg-transparent group">
                      <input 
                        ref={inputRef}
                        type="text"
                        value={inputVal}
                        onChange={e => setInputVal(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isProcessing}
                        spellCheck={false}
                        autoComplete="off"
                        className="bg-transparent text-white outline-none flex-1 font-mono text-[13px] md:text-[14px] leading-[1.6]"
                        style={{ caretColor: '#a0a0a0' }} 
                      />
                      {/* Simulated processing block indicator */}
                      {isProcessing && (
                         <div className="absolute inset-0 bg-[#1a1a1a] flex items-center pr-2 pointer-events-none">
                            <span className="text-[#4d4d4d] italic">thinking<motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }}>...</motion.span></span>
                         </div>
                      )}
                    </div>
                </div>
              </div>
            )}

          </div>

          {/* Claude Terminal Footer */}
          <div className="h-8 bg-[#1a1a1a] border-t border-[#333] flex shrink-0 items-center justify-between px-4 text-[#666] text-[12px] font-mono">
            <span>? for shortcuts</span>
            <div className="flex items-center gap-1.5 md:gap-2">
              {interactiveMode && <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#27c93f] shadow-[0_0_10px_#27c93f]" />}
              <span className="hidden sm:inline">Interactive Session Active</span>
              <span className="sm:hidden">Active</span>
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
      `}} />
    </section>
  );
}
