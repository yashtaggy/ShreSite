'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Zap, Users, ChevronRight,
  MapPin, Settings, Microscope, Globe, Target, Eye, Award
} from 'lucide-react';
import Image from 'next/image';
import { DustyParticles } from "@/components/ui/dusty-particles";

export default function AboutPage() {
  return (
    <main className="relative bg-white pt-20 overflow-hidden">

      {/* ATMOSPHERIC BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <DustyParticles />
      </div>

      {/* TECHNICAL BLUEPRINT GRID */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#00f2ff 1px, transparent 1px), linear-gradient(90deg, #00f2ff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 1. HERO WITH ARCHITECTURAL TEXTURE */}
      <section className="relative py-10 md:py-24 border-b border-slate-100 bg-transparent">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="mb-2 md:mb-8 p-6 bg-white shadow-xl shadow-slate-100 border border-slate-50">
              <Image
                src="/logo.png"
                alt="Shreyash Solutions"
                width={350}
                height={110}
                className="h-auto w-auto"
                priority
              />
            </div>

            <div className="max-w-3xl">
              <h1 className="text-sm font-black uppercase tracking-[0.5em] text-accent mb-6">
                Corporate Profile & Engineering Philosophy
              </h1>
              <p className="text-2xl md:text-3xl text-slate-800 leading-tight font-light tracking-tight mb-4">
                Engineering <span className="font-bold">Indigenous Reliability</span> for the world's most demanding environments.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE STORY WITH "SIDEBAR" TECHNICAL INFO */}
      <section className="pt-12 pb-24 relative">
        {/* Subtle Watermark background */}
        <div className="absolute top-40 right-0 opacity-[0.03] rotate-12 pointer-events-none hidden lg:block">
          <Settings size={600} />
        </div>

        <div className="container mx-auto px-6 max-w-6xl">

          {/* PROFESSIONAL ORIGIN BADGE (Indian Flag Integration) */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 py-2 px-4 bg-slate-50 border border-slate-100 rounded-full w-fit mb-8"
          >
            <div className="flex gap-0.5 items-center">
              <div className="h-2.5 w-4 bg-[#FF9933]" /> {/* Saffron */}
              <div className="h-2.5 w-4 bg-white border-y border-slate-100 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-[#000080]" /> {/* Chakra */}
              </div>
              <div className="h-2.5 w-4 bg-[#128807]" /> {/* Green */}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              Atmanirbhar Bharat <span className="text-slate-300 mx-1">|</span> Precision Engineered in Pune
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="h-8 w-1 bg-accent" /> Our Industrial Journey
              </h2>
              <div className="prose prose-slate space-y-6 text-slate-600 leading-relaxed">
                <p>
                  Established in 2017, Shreyash Solutions was born from a specialized vision:
                  to eliminate the dependency of Indian OEMs on imported sensing technologies.
                  As an emerging <strong>potentiometer manufacturer in Pune</strong>, we recognized that
                  in an era where precision components were often "black-box" imports, the domestic market
                  needed a reliable alternative. We chose the harder path - mastering the internal engineering of
                  <span className="text-slate-900 font-semibold"> Wire-wound and Conductive Plastic sensing elements</span> right here in India.
                </p>
                <p>
                  Our facility in Pune serves as a hub of indigenous innovation. We don't
                  just assemble sensors; we engineer them from the wire up. Our technical team, led by
                  <strong> Mr. Bharat B. Tagunde</strong>, focuses on <strong>high-linearity winding</strong> and <strong>custom shaft fabrication</strong>.
                  This level of control allows us to offer tolerances as tight as <strong>±0.05%</strong>,
                  meeting the rigorous standards of defense and aerospace research. As a
                  <strong> industrial potentiometer manufacturer in India</strong>, our goal is to provide
                  the scientific community and defense OEMs with hardware that is both robust and indigenously built.
                </p>
                <p>
                  Over the years, we have scaled our capabilities from a specialized
                  winding workshop to a comprehensive manufacturing unit. Today, our
                  portfolio includes 16+ field-proven custom designs, each built with the
                  discipline of our proprietary 2150-step Process Flow Architecture. We have established ourselves
                  as a key <strong>aerospace sensor supplier in India</strong>, collaborating with various
                  private and public sector units to enhance strategic self-reliance.
                </p>
                <p>
                  Our commitment to the "Make in India" initiative is reflected in every product we ship.
                  By utilizing locally sourced materials where possible and 100% domestic engineering,
                  we ensure that our <strong>industrial potentiometers</strong> and <strong>electromechanical assemblies</strong>
                  provide a sovereign and reliable solution for the nation's most critical infrastructure.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900 p-8 text-white rounded-sm">
                <Image src="/logos/makeinindia.png" alt="Make In India" width={150} height={70} className="mb-6 brightness-0 invert" />
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Commitment to Sovereignty</h4>
                <p className="text-[13px] text-slate-400 leading-relaxed">
                  We are a proud MSME (UDYAM) registered unit, contributing to the
                  Atmanirbhar Bharat initiative by providing locally designed and
                  manufactured electromechanical solutions.
                </p>
              </div>
              <div className="p-2 border border-slate-100 bg-white">
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-slate-400">Key Expertise</h4>
                <ul className="text-sm space-y-3 font-bold text-slate-700">
                  <li className="flex items-center gap-2"><Microscope size={14} className="text-accent" /> High-Linearity Winding</li>
                  <li className="flex items-center gap-2"><Settings size={14} className="text-accent" /> Custom Shaft Fabrication</li>
                  <li className="flex items-center gap-2"><Globe size={14} className="text-accent" /> Global Compliance EOL</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MISSION & VISION */}
      <section className="py-12 md:py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-12 bg-white border border-slate-200 relative group overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              {/* TECHNICAL CORNER ACCENTS */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent opacity-20 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent opacity-20 group-hover:opacity-100 transition-opacity" />

              <div className="absolute -right-8 -bottom-8 opacity-[0.05] group-hover:scale-110 group-hover:text-accent transition-all duration-700 text-slate-900">
                <Target size={200} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-accent mb-6">The Mission</h3>
              <p className="text-slate-600 leading-relaxed relative z-10 text-[15px]">
                To engineer reliable, precision-grade sensing solutions through fully indigenous manufacturing - strengthening India’s capability to design, build and deploy mission-critical sensor technology without import dependence and ensuring technical sovereignty and long-term reliability.
              </p>
            </div>
            <div className="p-12 bg-white border border-slate-200 relative group overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              {/* TECHNICAL CORNER ACCENTS */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent opacity-20 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent opacity-20 group-hover:opacity-100 transition-opacity" />

              <div className="absolute -right-8 -bottom-8 opacity-[0.05] group-hover:scale-110 group-hover:text-accent transition-all duration-700 text-slate-900">
                <Eye size={200} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-accent mb-6">The Vision</h3>
              <p className="text-slate-600 leading-relaxed relative z-10 text-[15px]">
                To establish India as a global centre for precision sensing technology - designing and manufacturing world-class potentiometric and electromechanical sensors entirely in-country, strengthening strategic self-reliance under Atmanirbhar Bharat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORE VALUES */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-400">Operational Excellence</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { title: "Quality First", icon: <ShieldCheck />, desc: "100% End-of-Line testing using calibrated digital instrumentation." },
              { title: "Pune Hub", icon: <MapPin />, desc: "Strategically located in India's engineering heartland for rapid logistics." },
              { title: "Agility", icon: <Zap />, desc: "MSME-driven speed allowing for prototype delivery in record timeframes." }
            ].map((v, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="text-accent shrink-0">{v.icon}</div>
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-tighter text-sm mb-2">{v.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LEADERSHIP QUOTE WITH MAKE IN INDIA WATERMARK */}
      <section className="py-12 md:py-32 border-t border-slate-100 relative overflow-hidden bg-white">

        {/* FAINTED WATERMARK LOGO */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.24] grayscale">
          <Image
            src="/logos/makeinindia.png"
            alt="Watermark"
            width={800}
            height={400}
            className="object-contain"
          />
        </div>

        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-2xl md:text-3xl font-serif italic text-slate-800 leading-snug mb-10">
              "In precision engineering, the difference between a successful mission
              and a system failure is measured in microns. We take that responsibility
              personally."
            </p>

            <div className="flex flex-col items-center">
              <div className="h-px w-12 bg-accent mb-4" />
              <p className="text-sm font-bold text-slate-900 tracking-[0.2em] uppercase">
                Bharat B. Tagunde
              </p>
              <p className="text-[10px] text-accent font-black uppercase tracking-widest mt-1">
                Lead Engineer & Founder
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}