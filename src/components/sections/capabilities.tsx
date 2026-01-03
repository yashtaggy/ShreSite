'use client';

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
    <section ref={containerRef} className="relative h-[400vh] bg-[#0a0a0a]">
      {/* Sticky Container */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content Side */}
          <div className="relative z-10">
            <header className="mb-12">
              <p className="text-accent text-xs font-bold tracking-[0.3em] uppercase mb-2">Capabilities</p>
              <h2 className="text-white text-4xl md:text-5xl font-bold">The Standard of Precision</h2>
            </header>

            <div className="relative h-[300px]">
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
          <div className="relative aspect-square w-full max-w-2xl mx-auto">
             <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10">
                {capabilities.map((cap, i) => (
                  <CapabilityImage 
                    key={cap.id} 
                    id={cap.id} 
                    index={i} 
                    progress={scrollYProgress} 
                  />
                ))}
             </div>
             {/* Decorative Element */}
             <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 blur-3xl rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
}

function CapabilityText({ cap, index, progress }: any) {
  const opacity = useTransform(
    progress,
    [index * 0.23, index * 0.23 + 0.14, (index + 1) * 0.23 - 0.14, (index + 1) * 0.23],
    [0, 1, 1, 0]
  );
  
  const y = useTransform(
    progress,
    [index * 0.23, index * 0.23 + 0.14, (index + 1) * 0.23 - 0.14, (index + 1) * 0.2],
    [20, 0, 0, -20]
  );

  return (
    <motion.div 
      style={{ opacity, y }} 
      className="absolute inset-0 flex flex-col justify-center"
    >
      <span className="text-white/30 font-mono text-5xl mb-4 italic">{cap.step}</span>
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{cap.title}</h3>
      <p className="text-gray-400 text-lg leading-relaxed max-w-md">
        {cap.description}
      </p>
    </motion.div>
  );
}

function CapabilityImage({ id, index, progress }: any) {
  const image = PlaceHolderImages.find((img) => img.id === id);
  
  // This creates the "reveal" effect where images slide up over each other
  const clipPath = useTransform(
    progress,
    [index * 0.25, (index + 1) * 0.25],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  // Subtle zoom effect while active
  const scale = useTransform(
    progress,
    [index * 0.25, (index + 1) * 0.25],
    [1.2, 1]
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
            className="object-cover opacity-80"
          />
        </motion.div>
      )}
    </motion.div>
  );
}