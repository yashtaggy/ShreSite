'use client';

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Settings2,
  Microscope,
  Dna,
  ArrowRight,
  Zap,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DustyParticles } from "@/components/ui/dusty-particles";

const advantages = [
  {
    icon: <Dna />,
    title: "Precision Winding DNA",
    description: "Decades of mastery in fine-wire winding (WW) and conductive plastic (CP) technologies for extreme linearity.",
    metric: "Linearity: ±0.05%",
    category: "CORE TECH",
    accent: "bg-accent"
  },
  {
    icon: <ShieldCheck />,
    title: "Defense-Grade Validation",
    description: "Registered RCI-DRDO & GeM OEM vendor. Components qualified for JSS-55555 & MIL-STD environmental stress.",
    metric: "Standard: MIL-810H",
    category: "COMPLIANCE",
    accent: "bg-amber-500"
  },
  {
    icon: <Microscope />,
    title: "In-House R&D Lab",
    description: "Custom sensor development following the 'V-Model' lifecycle—from concept to MIL-spec hardware.",
    metric: "Cycle: <14 Days",
    category: "INNOVATION",
    accent: "bg-accent"
  },
  {
    icon: <Settings2 />,
    title: "Integrated Manufacturing",
    description: "Unified facility for winding, coating, and precision machining under ISO 9001:2015 controls.",
    metric: "Vertical: 100%",
    category: "FACILITY",
    accent: "bg-accent"
  }
];

export function CompetitiveEdge() {
  return (
    <section className="relative py-20 sm:py-28 md:py-32 bg-[#F8FAFC] overflow-hidden border-t border-slate-200">

      {/* 1. DUSTY PARTICLES BACKGROUND (Persistent and Mobile Friendly) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-100">
        <DustyParticles />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* SECTION HEADER */}
        <div className="max-w-4xl mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm"
          >
            <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
            The Shreyash Edge
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 mb-8 leading-[0.95]">
            Engineered for <span className="text-accent">Reliability</span>. <br />
            Tested for the Extreme.
          </h2>

          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed border-l-4 border-slate-200 pl-8">
            Authorized <span className="text-slate-900 font-semibold">GeM OEM</span> & <span className="text-slate-900 font-semibold">HAL Vendor</span>, bridging the gap between custom R&D and large-scale defense supply.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative p-10 bg-white/90 border border-slate-200 rounded-sm flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-accent/30"
            >
              <div className={cn("absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity", adv.accent)} />

              <div className="absolute top-4 right-4 font-mono text-[9px] text-slate-300 group-hover:text-slate-900 transition-colors">
                {adv.category}
              </div>

              <div className="mb-12">
                <div className={cn(
                  "mb-8 inline-flex h-14 w-14 items-center justify-center rounded-sm transition-all duration-500 shadow-inner border border-slate-100",
                  adv.accent === "bg-amber-500" ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-accent"
                )}>
                  {React.cloneElement(adv.icon as any, { size: 28, strokeWidth: 1.2 })}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                  {adv.title}
                </h3>
                <p className="text-[15px] text-slate-500 leading-relaxed">
                  {adv.description}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                <span className={cn(
                  "font-mono text-[10px] font-bold px-2 py-0.5 rounded",
                  adv.accent === "bg-amber-500" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500 group-hover:text-accent"
                )}>
                  {adv.metric}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* LOGO AUTHORIZATION STRIP */}
        <div className="pt-16 border-t border-slate-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-accent font-bold tracking-widest text-[10px] uppercase">
                <Award size={14} />
                Strategic Authorizations
              </div>
              <p className="text-xs text-slate-400 font-mono italic">GOVERNMENT & DEFENSE AUTHORIZATION STATUS</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">

              {/* HINDUSTAN AERONAUTICS LIMITED */}
              <div className="flex flex-col items-center gap-3 group cursor-default">
                <img src="/logos/hal.png" alt="HAL Logo" className="h-12 w-auto object-contain transition-all opacity-80 group-hover:opacity-100 group-hover:scale-110" />
                <span className="text-[8px] font-bold tracking-[0.2em] text-slate-400 transition-colors group-hover:text-slate-900 uppercase">HAL Authorized Vendor</span>
              </div>

              {/* GOVERNMENT E-MARKETPLACE */}
              <div className="flex flex-col items-center gap-3 group cursor-default">
                <img src="/logos/gem.png" alt="GeM Logo" className="h-12 w-auto object-contain transition-transform group-hover:scale-110" />
                <span className="text-[8px] font-bold tracking-[0.2em] text-slate-400 group-hover:text-slate-900 transition-colors uppercase">Government E-Marketplace OEM</span>
              </div>

              {/* RCI DRDO */}
              <div className="flex flex-col items-center gap-3 group cursor-default">
                <img src="/logos/rci.png" alt="RCI Logo" className="h-12 w-auto object-contain transition-transform group-hover:scale-110" />
                <span className="text-[8px] font-bold tracking-[0.2em] text-slate-400 group-hover:text-slate-900 transition-colors uppercase">RCI DRDO Registered</span>
              </div>

              <div className="flex flex-col items-center gap-3 group cursor-default">
                <img src="/logos/msme.png" alt="MSME Logo" className="h-12 w-auto object-contain transition-transform group-hover:scale-110" />
                <span className="text-[8px] font-bold tracking-[0.2em] text-slate-400 group-hover:text-slate-900 transition-colors uppercase">Micro, Small and Medium Enterprises</span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
