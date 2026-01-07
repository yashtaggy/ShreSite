'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, BarChart3, Microscope, Factory, CheckCircle } from 'lucide-react';

const machinery = [
  { id: 1, src: '/images/infra/machine1.jpg', title: 'Precision Winding Unit' },
  { id: 2, src: '/images/infra/machine2.jpg', title: 'Testing Assembly' },
  { id: 3, src: '/images/infra/machine3.jpg', title: 'Calibration Station' },
  { id: 4, src: '/images/infra/machine4.jpg', title: 'Final Inspection' },
  { id: 5, src: '/images/infra/machine5.jpg', title: 'R&D Lab' },
];

export default function QualityInfrastructure() {
  return (
    <main className="bg-white min-h-screen pt-32 pb-24 text-slate-900">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="max-w-4xl mb-20">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-accent mb-6">
            <div className="h-[2px] w-8 bg-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Facility & Standards</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
            Quality & <br/>
            <span className="text-accent italic font-serif font-light">Infrastructure.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed font-medium">
            Our Pune facility is designed for zero-defect manufacturing, combining advanced machinery with strict quality control protocols.
          </p>
        </div>

        {/* MACHINERY GRID - Masonry Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-32">
          <div className="md:col-span-2 h-[400px] bg-slate-100 rounded-sm overflow-hidden relative group">
            <img src={machinery[0].src} alt={machinery[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-slate-200">{machinery[0].title}</div>
          </div>
          <div className="h-[400px] bg-slate-100 rounded-sm overflow-hidden relative group">
            <img src={machinery[1].src} alt={machinery[1].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-slate-200">{machinery[1].title}</div>
          </div>
          {machinery.slice(2).map((item) => (
            <div key={item.id} className="h-[300px] bg-slate-100 rounded-sm overflow-hidden relative group">
              <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-slate-200">{item.title}</div>
            </div>
          ))}
        </div>

        {/* THE "WHY TRUST" SECTION - Dense Content */}
        <div className="grid lg:grid-cols-12 gap-16 items-start py-20 border-t border-slate-100">
          <div className="lg:col-span-4 sticky top-32">
            <h2 className="text-4xl font-black tracking-tight mb-6">Why Trust <br/>Shreyash Solutions?</h2>
            <p className="text-slate-500 mb-8">Our reputation is built on consistency and technical transparency. We invite our clients to understand the depth of our quality commitment.</p>
            <div className="space-y-4">
              {[
                { icon: <ShieldCheck size={20}/>, text: 'ISO 9001:2015 Certified' },
                { icon: <CheckCircle size={20}/>, text: '100% In-house Testing' },
                { icon: <Microscope size={20}/>, text: 'Advanced R&D Cell' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-800">
                  <span className="text-accent">{item.icon}</span> {item.text}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid md:grid-cols-2 gap-10">
            {/* Detailed Bullet Points */}
            <div className="space-y-8">
              <div>
                <h4 className="font-black text-accent text-xs uppercase tracking-widest mb-4">Quality Control Process</h4>
                <ul className="space-y-4 text-sm text-slate-500 leading-relaxed list-none">
                  <li className="flex gap-2"><strong>•</strong> Raw Material Inspection: Strict verification of incoming alloys, plastics, and conductive elements to ensure they meet RoHS/REACH standards.</li>
                  <li className="flex gap-2"><strong>•</strong> In-Process Monitoring: Real-time resistance tracking during the winding and assembly phases to catch variances early.</li>
                  <li className="flex gap-2"><strong>•</strong> Final Batch Testing: Every single product is subjected to electrical tolerance checks and mechanical torque verification.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-black text-accent text-xs uppercase tracking-widest mb-4">Infrastructure Capabilities</h4>
                <ul className="space-y-4 text-sm text-slate-500 leading-relaxed list-none">
                  <li className="flex gap-2"><strong>•</strong> Production Capacity: Scalable setup capable of handling prototype orders to mass production volumes without quality drop-offs.</li>
                  <li className="flex gap-2"><strong>•</strong> Custom Tooling: In-house workshop for creating custom fixtures and housing molds based on specific client drawings.</li>
                  <li className="flex gap-2"><strong>•</strong> Calibration Lab: Environmentally controlled lab for the calibration of high-precision sensors used in medical and aerospace sectors.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="font-black text-accent text-xs uppercase tracking-widest mb-4">Environmental Commitment</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  We are committed to sustainable manufacturing. Our facility utilizes energy-efficient machinery and ensures that all scrap metals and plastics are recycled through certified industrial waste partners. Our products are designed for long-life cycles, reducing the environmental impact of electronic waste.
                </p>
              </div>
              <div>
                <h4 className="font-black text-accent text-xs uppercase tracking-widest mb-4">Technical Documentation</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Transparency is key. We provide comprehensive data sheets, COAs (Certificate of Analysis), and test reports upon request. Our technical team maintains a digital log of every batch produced, allowing for full traceability even years after the product has been deployed in the field.
                </p>
              </div>
              <div className="p-6 bg-slate-900 text-white rounded-sm">
                <h4 className="font-black text-xs uppercase tracking-widest mb-3">Zero Defect Policy</h4>
                <p className="text-[11px] leading-relaxed opacity-70">
                  Our internal target is 0 PPM (Parts Per Million) rejection rate. Through continuous staff training and automated testing rigs, we maintain a quality standard that rivals global manufacturers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}