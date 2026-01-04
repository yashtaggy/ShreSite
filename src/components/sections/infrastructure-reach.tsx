'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { 
  Settings, 
  Activity, 
  ShieldCheck, 
  Factory, 
  Cpu,
  CheckCircle2,
  Search,
  PackageCheck,
  Zap,
  Globe2
} from "lucide-react";

/**
 * ANIMATED NUMBER COMPONENT
 * Handles the 0 to Target scroll animation
 */
function AnimatedNumber({ value }: { value: string }) {
  const numericValue = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/[0-9]/g, '');
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView) {
      let startTime: number | null = null;
      const duration = 1600;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(Math.pow(progress, 0.9) * numericValue));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [inView, numericValue]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/**
 * DATA MAPPING FROM PROCESS FLOW DOCUMENT
 */
const productionSteps = [
  { 
    id: "1020", 
    title: "Incoming Inspection", 
    desc: "Verification of raw materials using calibrated instruments per approved drawings.", 
    icon: <Search size={18}/> 
  },
  { 
    id: "2000", 
    title: "Precision Winding", 
    desc: "Element crafting using specific Ohm/Meter substrates and high-temp curing.", 
    icon: <Zap size={18}/> 
  },
  { 
    id: "2010", 
    title: "Shaft & Wiper Assembly", 
    desc: "Pneumatic press flaring and ultrasonic cleaning for sub-assemblies.", 
    icon: <Cpu size={18}/> 
  },
  { 
    id: "2080", 
    title: "Linearity Analysis", 
    desc: "Running required programs to verify +/-0.5% tolerance and electrical angle.", 
    icon: <Activity size={18}/> 
  },
  { 
    id: "2120", 
    title: "EOL Final Testing", 
    desc: "100% End-of-Line testing using specialized testers against data sheets.", 
    icon: <ShieldCheck size={18}/> 
  },
  { 
    id: "2150", 
    title: "Dispatch Readiness", 
    desc: "Pre-Dispatch Inspection reports and shock-protected foam packing.", 
    icon: <PackageCheck size={18}/> 
  },
];

export function InfrastructureReach() {
  return (
    <section className="relative py-32 bg-slate-950 overflow-hidden text-white">
      {/* Background Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
        backgroundImage:
        "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        }}
      />


      <div className="container mx-auto px-6 relative z-10">
        
        {/* 1. ANIMATED TRUST NUMBERS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32 border-b border-slate-900 pb-16">
          {[
            { label: "Established", value: "2015", sub: "Modern Era Manufacturing" },
            { label: "Field Deployed", value: "1000+", sub: "Mission-Critical Units" },
            { label: "Custom Solutions", value: "16+", sub: "Specialized R&D Projects" },
            { label: "Linearity", value: "0.05%", sub: "Industry Gold Standard" }
          ].map((stat, i) => (
            <div key={i} className="group">
              <h3 className="text-4xl md:text-5xl font-bold mb-2 text-white transition-colors group-hover:text-accent">
                <AnimatedNumber value={stat.value} />
              </h3>
              <p className="text-accent font-mono text-[10px] uppercase tracking-widest mb-1 font-bold">{stat.label}</p>
              <p className="text-slate-500 text-[10px] italic">{stat.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          {/* 2. INFRASTRUCTURE & CREDENTIALS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              <Factory size={12} />
              Verified Asset Base
            </div>
            
            <h2 className="text-5xl font-bold tracking-tighter leading-tight mb-8">
              Documented <span className="text-accent italic">Workflow</span>. <br /> 
              Repeatable Precision.
            </h2>
            
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
                Operating as an authorized <span className="text-white font-semibold">GeM OEM and MSME</span>, Shreyash Solutions utilizes a specialized bench setup—including 
                <span className="text-white"> Digital Storage Oscilloscopes</span> and <span className="text-white"> End-of-Line Testers</span>—to —ensuring every component meets real-world mission-critical reliability demands.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {[
                    "Precision Winding Station",
                    "EOL Calibration Setup",
                    "DSO Signal Analysis",
                    "Custom Testing Rigs"
                ].map((tool) => (
                    <div key={tool} className="flex items-center gap-3">
                        <CheckCircle2 className="text-accent" size={16} />
                        <span className="text-sm text-slate-300 font-medium">{tool}</span>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-slate-900 text-[10px] font-bold tracking-widest rounded-sm border border-slate-800 text-slate-400">UDYAM REGISTERED</span>
              <span className="px-4 py-2 bg-slate-900 text-[10px] font-bold tracking-widest rounded-sm border border-slate-800 text-slate-400">GST & IEC COMPLIANT</span>
              <span className="px-4 py-2 bg-slate-900 text-[10px] font-bold tracking-widest rounded-sm border border-slate-800 text-slate-400">ISO 9001:2015</span>
            </div>
          </motion.div>

          {/* 3. DYNAMIC PROCESS FLOW ANIMATION */}
          <div className="relative border-l border-slate-800 ml-4 pl-12 space-y-16">
            {/* The animated vertical progress line */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute top-0 left-[-2px] w-[2px] bg-gradient-to-b from-accent to-accent/30"/>

            {productionSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative z-10 group"
              >
                {/* Node Point */}
                <div className="absolute -left-[57px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-700 group-hover:border-accent transition-all duration-500" />
                <div className="absolute -left-[59px] top-[2px] w-6 h-6 rounded-full border border-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />                
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-mono text-accent/60 font-bold tracking-tighter">OPN {step.id}</span>
                    <div className="h-[1px] w-8 bg-slate-800" />
                  </div>
                  <h4 className="text-xl font-bold text-white group-hover:text-accent transition-colors flex items-center gap-3">
                    {step.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-sm mt-2">
                    {step.desc} 
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}