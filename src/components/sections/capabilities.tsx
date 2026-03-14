'use client';

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { DustyParticles } from "@/components/ui/dusty-particles";

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
      className="relative h-[200vh] bg-[#0a0a0a]"
    >
      {/* ATMOSPHERIC BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <DustyParticles />
      </div>

      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: Content Side */}
            <div className="relative z-10 order-2 lg:order-1">
              <header className="mb-8 md:mb-12">
                <p className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-2">
                  Technical Arsenal
                </p>
                <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight tracking-tighter">
                  Engineered for <br /><span className="text-accent italic">Precision</span>
                </h2>
              </header>

              {/* Fixed height container for text to prevent layout shift */}
              <div className="relative h-[160px] md:h-[200px]">
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
            <div className="relative w-full max-w-xl mx-auto aspect-square md:aspect-[4/3] order-1 lg:order-2">
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
                {capabilities.map((cap, i) => (
                  <CapabilityImage
                    key={cap.id}
                    id={cap.id}
                    index={i}
                    progress={scrollYProgress}
                  />
                ))}

                {/* Subtle Scan Line */}
                <motion.div
                  animate={{
                    top: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute left-0 w-full h-[1px] bg-accent/30 z-30 blur-[1px]"
                />
              </div>

              {/* Decorative Accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 blur-3xl rounded-full -z-10" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilityText({ cap, index, progress }: any) {
  const step = 0.25;
  const start = index * step;
  const end = (index + 1) * step;

  const opacity = useTransform(
    progress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [start, start + 0.05, end - 0.05, end],
    [20, 0, 0, -20]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <span className="text-accent/30 font-mono text-4xl md:text-6xl font-black mb-4 italic opacity-50">
        {cap.step}
      </span>
      <h3 className="text-xl md:text-3xl font-bold text-white mb-4">
        {cap.title}
      </h3>
      <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-sm">
        {cap.description}
      </p>
    </motion.div>
  );
}

function CapabilityImage({ id, index, progress }: any) {
  const image = PlaceHolderImages.find((img) => img.id === id);
  const step = 0.25;
  const start = index * step;

  // Real "Moving" transition: Slips in from the right
  const x = useTransform(
    progress,
    [start - 0.1, start, start + 0.25],
    ["100%", "0%", "-20%"]
  );

  const opacity = useTransform(
    progress,
    [start - 0.05, start, start + 0.25, start + 0.3],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ x, opacity, zIndex: index }}
      className="absolute inset-0"
    >
      {image && (
        <Image
          src={image.imageUrl}
          alt="Capability"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover brightness-75"
          priority={index === 0}
        />
      )}
    </motion.div>
  );
}
