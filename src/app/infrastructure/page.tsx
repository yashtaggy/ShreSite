'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Microscope, CheckCircle, Factory } from 'lucide-react';

const machinery = [
  { id: 1, src: '/images/infra/machine1.jpg', title: 'Precision Winding Unit' },
  { id: 2, src: '/images/infra/machine2.jpg', title: 'Testing Assembly' },
  { id: 3, src: '/images/infra/machine3.jpg', title: 'Calibration Station' },
  { id: 4, src: '/images/infra/machine4.jpg', title: 'Final Inspection' },
  { id: 5, src: '/images/infra/machine5.jpg', title: 'R&D Lab' },
];

export default function QualityInfrastructure() {
  return (
    <main className="bg-white min-h-screen pt-32 pb-24 text-slate-900 overflow-x-hidden">
      {/* Blueprint Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* HEADER SECTION */}
        <header className="max-w-4xl mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="flex items-center gap-3 text-accent mb-6"
          >
            <div className="h-[2px] w-8 bg-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Facility & Standards</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8"
          >
            Quality & <br/>
            <span className="text-accent italic font-serif font-light">Infrastructure.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed font-medium"
          >
            Our Pune facility is engineered for zero-defect manufacturing, combining advanced technology with strict verification protocols.
          </motion.p>
        </header>

        {/* MACHINERY GRID - Fully Responsive Masonry-style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-24 md:mb-32">
          {/* Main Large Image */}
          <div className="md:col-span-2 h-[300px] md:h-[450px] bg-slate-100 rounded-sm overflow-hidden relative group">
            <img 
              src={machinery[0].src} 
              alt={machinery[0].title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white/95 backdrop-blur px-4 py-2 text-[9px] font-bold uppercase tracking-widest border border-slate-200">
              {machinery[0].title}
            </div>
          </div>

          {/* Side Image */}
          <div className="h-[300px] md:h-[450px] bg-slate-100 rounded-sm overflow-hidden relative group">
            <img 
              src={machinery[1].src} 
              alt={machinery[1].title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur px-4 py-2 text-[9px] font-bold uppercase tracking-widest border border-slate-200">
              {machinery[1].title}
            </div>
          </div>

          {/* Bottom Row Images */}
          {machinery.slice(2).map((item) => (
            <div key={item.id} className="h-[250px] md:h-[350px] bg-slate-100 rounded-sm overflow-hidden relative group">
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur px-4 py-2 text-[9px] font-bold uppercase tracking-widest border border-slate-200">
                {item.title}
              </div>
            </div>
          ))}
        </div>

        {/* THE "WHY TRUST" SECTION - Responsive Desktop (Sticky) to Mobile (Stacked) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start py-12 lg:py-20 border-t border-slate-100">
          
          {/* LEFT: Branding & Stats */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
            <div className="max-w-md">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                Why Trust <br className="hidden lg:block"/>Shreyash Solutions?
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-10">
                Our reputation is built on consistency and technical transparency. 
                We invite our clients to understand the depth of our quality commitment.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {[
                  { icon: <ShieldCheck size={20}/>, text: 'ISO 9001:2015 Certified' },
                  { icon: <CheckCircle size={20}/>, text: '100% In-house Testing' },
                  { icon: <Microscope size={20}/>, text: 'Advanced R&D Cell' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 border border-slate-100 rounded-sm text-sm font-bold text-slate-900">
                    <span className="text-accent">{item.icon}</span> {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Detailed Technical Columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
              
              {/* Technical Processes Column */}
              <div className="space-y-12">
                <div>
                  <h4 className="font-black text-accent text-[10px] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                    <Factory size={14} /> Quality Control Process
                  </h4>
                  <ul className="space-y-6 text-sm text-slate-500 leading-relaxed">
                    <li className="flex gap-4">
                      <span className="text-accent font-black">01.</span>
                      <span><strong>Raw Material Inspection:</strong> We verify all incoming alloys, medical-grade plastics, and conductive elements to ensure they meet RoHS compliance.</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-accent font-black">02.</span>
                      <span><strong>In-Process Monitoring:</strong> Real-time resistance and linearity tracking during the winding phases to eliminate variances instantly.</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-accent font-black">03.</span>
                      <span><strong>Final Inspection:</strong> Every unit undergoes 100% electrical tolerance checks and mechanical torque verification before packaging.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-black text-accent text-[10px] uppercase tracking-[0.3em] mb-6">Infrastructure Scope</h4>
                  <ul className="space-y-6 text-sm text-slate-500 leading-relaxed">
                    <li className="flex gap-4">
                      <span className="text-accent font-black">01.</span>
                      <span><strong>Production Scale:</strong> Our facility is optimized to handle both high-mix low-volume (HMLV) prototypes and mass production.</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-accent font-black">02.</span>
                      <span><strong>Custom Tooling:</strong> We maintain an in-house workshop for developing custom molds and calibration fixtures for unique client needs.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Documentation & Values Column */}
              <div className="space-y-12">
                <div className="p-8 bg-slate-50 border border-slate-100 rounded-sm">
                  <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-4 text-slate-900">Environmental Standards</h4>
                  <p className="text-sm text-slate-500 leading-relaxed italic">
                    "We utilize energy-efficient machinery and ensure all industrial scrap is recycled through certified partners, reducing our carbon footprint."
                  </p>
                </div>

                <div>
                  <h4 className="font-black text-accent text-[10px] uppercase tracking-[0.3em] mb-6">Technical Transparency</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Transparency is our priority. We provide comprehensive data sheets, COAs, and test reports. Our digital logs maintain full batch traceability for 5+ years.
                  </p>
                </div>

                <div className="p-8 bg-slate-900 text-white rounded-sm shadow-2xl shadow-slate-200">
                  <div className="flex items-center gap-3 mb-4 text-accent">
                    <Zap size={18} fill="currentColor" />
                    <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-white">Zero Defect Policy</h4>
                  </div>
                  <p className="text-[12px] leading-relaxed opacity-80">
                    Our internal target is 0 PPM rejection. Through continuous training and automated testing rigs, we maintain a standard that rivals global OEMs.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}