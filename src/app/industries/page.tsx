'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Stethoscope, Settings2, Truck, Zap, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const sectors = [
  {
    id: 'aerospace',
    title: 'Aerospace & Defense',
    icon: <Plane className="w-6 h-6" />,
    image: '/industries/aerospace.jpg',
    description: 'As a specialized aerospace sensor supplier in India, we provide mission-critical sensing for cockpit controls, UAV control surfaces, and radar positioning where failure is not an option. Our industrial potentiometers are engineered to withstand extreme G-forces, high-altitude atmospheric shifts, and electromagnetic interference. Typical use cases include flap position feedback in fixed-wing aircraft and turret rotation sensing in defense vehicles, ensuring absolute signal integrity in flight-safety systems and defense electronics.',
    specs: ['MIL-SPEC Durability', 'High Vibration Resistance', 'Redundant Circuitry'],
  },
  {
    id: 'medical',
    title: 'Medical Technology',
    icon: <Stethoscope className="w-6 h-6" />,
    image: '/industries/medical.jpg',
    description: 'Providing precision feedback for diagnostic imaging, surgical robotics, and fluid management systems with biocompatible standards. Our potentiometric sensors offer ultra-low torque solutions for delicate instrumentation and high-resolution feedback for MRI/CT gantry positioning. In the medical field, our sensors are used in infusion pumps and patient handling systems, meeting the stringent hygiene, non-magnetic, and sub-micron accuracy requirements of modern healthcare environments.',
    specs: ['Sub-micron Accuracy', 'Clean-room Assembly', 'Ultra-low Torque'],
  },
  {
    id: 'automation',
    title: 'Industrial Automation',
    icon: <Settings2 className="w-6 h-6" />,
    image: '/industries/automation.jpg',
    description: 'We serve as the nervous system for robotic joints, CNC feedback, and high-speed packaging lines. Our industrial potentiometers manufactured in India are designed for 24/7 heavy-duty operations, providing the millisecond response times necessary for synchronized multi-axis motion control. Common use cases include conveyor speed monitoring, robotic arm articulation feedback, and automated valve positioning in chemical processing plants.',
    specs: ['20M+ Cycle Life', 'IP67 Sealing', 'High Frequency Response'],
  },
  {
    id: 'machinery',
    title: 'Heavy Machinery',
    icon: <Truck className="w-6 h-6" />,
    image: '/industries/machinery.jpg',
    description: 'Ruggedized positioning for hydraulic booms, agricultural steering, and crane stabilization in extreme environments. Our heavy-duty industrial sensors are built into sealed housings that resist dust, mud, and high-pressure washdowns. They provide reliable angular feedback for operator safety in constructon and mining equipment, such as excavators, reach stackers, and specialized agricultural harvesters operating in the Indian terrain.',
    specs: ['Impact Resistance', 'Shielded Signal', 'Weather-proof Housing'],
  },
  {
    id: 'renewables',
    title: 'Renewable Energy',
    icon: <Zap className="w-6 h-6" />,
    image: '/industries/renewables.jpg',
    description: 'Optimizing solar tracking arrays and wind turbine pitch control for maximum efficiency and long-term UV exposure. Shreyash Solutions provides sensors specifically treated for outdoor longevity, ensuring that solar tracking mechanisms remain precise over decades of exposure. Our potentiometers are used for wind turbine blade pitch adjustment and solar panel inclination sensing, contributing to the Atmanirbhar Bharat mission in the green energy sector.',
    specs: ['UV Stable Housing', 'Zero Maintenance', 'Long-term Stability'],
  }
];

export default function IndustriesPage() {
  return (
    <main className="bg-white min-h-screen pt-32 pb-24 text-slate-900 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />

      <div className="container mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="max-w-4xl mb-20">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-accent mb-6">
            <div className="h-[2px] w-8 bg-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">What We Do</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
            Industries <br />
            <span className="text-accent italic font-serif font-light">We Serve.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed font-medium">
            High-quality sensors and potentiometers designed for the most demanding technical fields in India and beyond.
          </p>
        </div>

        {/* 3x2 GRID SYSTEM */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sectors.map((sector, idx) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              // Custom logic: last two items center themselves on large screens if there are exactly 5 items
              className={`group bg-slate-50 border border-slate-200 rounded-sm overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-1
                ${idx >= 3 ? 'lg:translate-x-[50%]' : ''}`}
            >
              {/* Image Container */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-200">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                <img
                  src={sector.image}
                  alt={sector.title}
                  className="w-full h-full object-cover group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>

              {/* Content Container */}
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-accent bg-white p-3 border border-slate-100 shadow-sm group-hover:bg-accent group-hover:text-white transition-colors">
                    {sector.icon}
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">{sector.title}</h3>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                  {sector.description}
                </p>

                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {sector.specs.map((spec) => (
                      <span key={spec} className="px-2 py-1 bg-white border border-slate-200 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <Link href="/contact" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group-hover:text-accent group-hover:gap-4 transition-all">
                    Consultation <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}