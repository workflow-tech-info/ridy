import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

export function JourneyConsole() {
  const [step, setStep] = useState(0); 
  const [typedText, setTypedText] = useState("");
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  const targetText = "plan my trip from Trivandrum to Leh";

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !inView) {
        setInView(true);
      }
    }, { threshold: 0.4 });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, [inView]);

  useEffect(() => {
    if (!inView || step > 0) return;

    let isMounted = true;

    const runSequence = async () => {
      // Short idle pause
      await new Promise(r => setTimeout(r, 800));
      if (!isMounted) return;
      setStep(1);
      
      // Step 1: Typing Simulation
      for (let i = 0; i < targetText.length; i++) {
        if (!isMounted) return;
        setTypedText(targetText.substring(0, i + 1));
        const isSpace = targetText[i] === ' ';
        const delay = isSpace ? 150 : 30 + Math.random() * 40;
        await new Promise(r => setTimeout(r, delay));
      }

      await new Promise(r => setTimeout(r, 600));
      if (!isMounted) return;
      setStep(2); // Thinking

      await new Promise(r => setTimeout(r, 1800));
      if (!isMounted) return;
      setStep(3); // Line reveals

      await new Promise(r => setTimeout(r, 2600));
      if (!isMounted) return;
      setStep(4); // Journey blocks

      await new Promise(r => setTimeout(r, 3800));
      if (!isMounted) return;
      setStep(5); // Total cost

      await new Promise(r => setTimeout(r, 1200));
      if (!isMounted) return;
      setStep(6); // Confirmation Checks

      await new Promise(r => setTimeout(r, 2800));
      if (!isMounted) return;
      setStep(7); // CTA
    };

    runSequence();

    return () => { isMounted = false; };
  }, [inView, step]);

  const legs = [
    { from: "Trivandrum", to: "Kochi", mode: "EV Taxi", dur: "4h", price: "₹2,400" },
    { from: "Kochi", to: "Delhi", mode: "Flight", dur: "3h", price: "₹6,800" },
    { from: "Delhi", to: "Leh", mode: "Bus + Local Taxi", dur: "18h", price: "₹3,200" }
  ];

  return (
    <section className="py-32 bg-primary relative overflow-hidden" ref={containerRef}>
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-[radial-gradient(circle_at_center,_rgba(0,240,255,0.03)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header Strings */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-4 tracking-tight font-sans">
            From one place to another. Handled.
          </h2>
          <p className="text-savaari-gray text-lg md:text-xl font-light">
            Just tell us where you want to go. The rest unfolds.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="rounded-[24px] bg-[#0A0A0C]/80 backdrop-blur-3xl border border-white/[0.08] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-700">
          
          {/* Mac Header Bar */}
          <div className="px-6 py-4 border-b border-white/[0.05] flex items-center bg-white/[0.01]">
            <div className="flex gap-2 relative z-10">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-80" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-80" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F] opacity-80" />
            </div>
            <div className="absolute left-0 right-0 text-center pointer-events-none">
              <span className="text-xs font-mono text-savaari-gray/60 tracking-wider">Console</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-8 md:p-12 font-mono text-sm md:text-base min-h-[440px] flex flex-col justify-start">
            
            {/* Input Line */}
            <div className="flex items-start text-white/90 leading-relaxed mb-6">
              <span className="text-savaari-accent mr-3 mt-0.5">{'>'}</span>
              <div className="flex-1 min-h-[24px] relative">
                {typedText}
                <motion.span 
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className={`inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-savaari-accent ml-1 align-middle translate-y-[-2px] ${step > 6 ? 'hidden' : ''}`}
                />
              </div>
            </div>

            {/* Step 2: Thinking */}
            <AnimatePresence>
              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  className="text-savaari-gray italic mb-6 ml-6"
                >
                  <span className="inline-flex">Thinking<motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.5, 1] }}>...</motion.span></span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: Progressive Intro Text */}
            {step >= 3 && (
              <div className="space-y-4 mb-10 ml-6 text-savaari-gray/90">
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  Planning your journey from Trivandrum to Leh.
                </motion.p>
                
                {step >= 3 && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                  >
                    This route spans multiple regions. Combining the most efficient options.
                  </motion.p>
                )}
              </div>
            )}

            {/* Step 4: Blocks Reveal */}
            {step >= 4 && (
              <div className="space-y-4 mb-10 ml-6">
                {legs.map((leg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 1.1, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05] group"
                  >
                    <div className="mb-3 sm:mb-0">
                      <div className="text-white/90 font-medium tracking-tight mb-1">
                        {leg.from} <span className="text-savaari-gray mx-2 break-keep">→</span> {leg.to}
                      </div>
                      <div className="text-xs text-savaari-gray flex gap-3">
                        <span className="text-savaari-accent/80">{leg.mode}</span>
                        <span>•</span>
                        <span>{leg.dur}</span>
                      </div>
                    </div>
                    <div className="text-right sm:text-left text-white/90 font-mono tracking-tight">
                      {leg.price}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Step 5 and 6: Wrap Total and Checks tightly */}
            <div className={`mt-auto pt-6 border-t border-white/[0.05] transition-opacity duration-1000 ${step >= 5 ? 'opacity-100' : 'opacity-0'}`}>
              
              <div className="flex flex-col md:flex-row md:items-end justify-between ml-6 gap-6">
                
                {/* Step 6: Checks */}
                <div className="space-y-3">
                  {step >= 6 && (
                    <>
                      {['Routes mapped', 'Availability checked', 'Providers matched'].map((txt, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: idx * 0.6, ease: "easeOut" }}
                          className="flex items-center gap-3 text-sm text-savaari-gray"
                        >
                          <div className="w-4 h-4 rounded-full bg-savaari-green/10 flex items-center justify-center text-savaari-green shrink-0">
                            <Check size={10} strokeWidth={3} />
                          </div>
                          <span>{txt}</span>
                        </motion.div>
                      ))}
                    </>
                  )}
                </div>

                {/* Step 5: Total */}
                {step >= 5 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-right pb-1"
                  >
                    <div className="text-xs text-savaari-gray mb-1">Total Estimated Cost</div>
                    <div className="text-2xl text-savaari-accent tracking-tighter">₹12,400</div>
                  </motion.div>
                )}
              </div>

            </div>

            {/* Step 7: Final CTA Center overlay or below */}
            {step >= 7 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mt-12 flex justify-center pb-2"
              >
                <button className="px-8 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-white font-sans text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                  Book this journey
                </button>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
