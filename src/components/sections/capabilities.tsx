'use client';

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const capabilities = [
  {
    id: "capability-winding",
    title: "High-Precision Winding Systems",
    step: "01",
    description: "Automated precision coil & resistive element winding for potentiometric sensors - engineered for stability and accuracy.",
  },
  {
    id: "capability-testing",
    title: "Advanced Validation & Testing",
    step: "02",
    description: "Every unit undergoes rigorous inspection and reliability screening to meet global defense & OEM benchmarks.",
  },
  {
    id: "capability-pcb",
    title: "Integrated PCB & Assembly",
    step: "03",
    description: "In-house PCB population and electromechanical integration - enabling complete sensor development.",
  },
  {
    id: "capability-prototyping",
    title: "Rapid Engineering & Prototyping",
    step: "04",
    description: "Agile engineering capability allowing concept-to-hardware execution for quick-turn development.",
  },
  
];

export function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[180vh] sm:h-[220vh] md:h-[240vh] bg-[#0a0a0a]"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* Left: Content Side */}
            <div className="relative z-10 order-2 lg:order-1">
              <header className="mb-6 lg:mb-10">
                <p className="text-accent text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-2">
                  Capabilities
                </p>
                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  The Standard of Precision
                </h2>
              </header>

              {/* Text Container - Reduced height */}
              <div className="relative h-[180px] sm:h-[200px] lg:h-[240px] xl:h-[280px]">
                {capabilities.map((cap, i) => (
                  <CapabilityText 
                    key={cap.id} 
                    cap={cap} 
                    index={i} 
                    progress={scrollYProgress} 
                  />
                ))}
              </div>
            </div>

            {/* Right: Visual Side */}
            <div className="relative w-full max-w-2xl mx-auto h-[200px] sm:h-[280px] md:h-[320px] lg:h-[360px] xl:h-[400px]">
              <div className="absolute inset-0 rounded-xl lg:rounded-2xl overflow-hidden border border-white/10 shadow-xl lg:shadow-2xl">
                {capabilities.map((cap, i) => (
                  <CapabilityImage 
                    key={cap.id} 
                    id={cap.id} 
                    index={i} 
                    progress={scrollYProgress} 
                  />
                ))}
              </div>
              {/* Reduced decorative blur size */}
              <div className="absolute -bottom-2 -right-2 lg:-bottom-4 lg:-right-4 w-16 h-16 lg:w-20 lg:h-20 bg-accent/20 blur-2xl rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilityText({ cap, index, progress }: any) {
  const opacity = useTransform(
    progress,
    [
      index * 0.25, 
      index * 0.25 + 0.02,
      index * 0.25 + 0.20,
      (index + 1) * 0.25
    ],
    [0, 1, 1, 0]
  );
  
  const y = useTransform(
    progress,
    [
      index * 0.25, 
      index * 0.25 + 0.05, 
      index * 0.25 + 0.20, 
      (index + 1) * 0.25
    ],
    [15, 0, 0, -15]
  );

  return (
    <motion.div 
      style={{ opacity, y }} 
      className="absolute inset-0 flex flex-col justify-center"
    >
      <span className="text-white/30 font-mono text-2xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 italic">
        {cap.step}
      </span>
      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">
        {cap.title}
      </h3>
      <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md">
        {cap.description}
      </p>
    </motion.div>
  );
}

function CapabilityImage({ id, index, progress }: any) {
  const image = PlaceHolderImages.find((img) => img.id === id);
  
  const clipPath = useTransform(
    progress,
    [index * 0.25, (index + 1) * 0.25],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  const scale = useTransform(
    progress,
    [index * 0.25, (index + 1) * 0.25],
    [1.1, 1]
  );

  return (
    <motion.div 
      style={{ clipPath, zIndex: index }} 
      className="absolute inset-0 bg-slate-900"
    >
      {image && (
        <motion.div style={{ scale }} className="h-full w-full">
          <Image
            src={image.imageUrl}
            alt="Capability"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-70"
            priority={index === 0}
          />
        </motion.div>
      )}
    </motion.div>
  );
}