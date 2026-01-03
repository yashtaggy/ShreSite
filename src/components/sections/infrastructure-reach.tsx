'use client';

import { motion } from "framer-motion";
import { Factory, Globe2, Truck, Layers, Cog, ShieldCheck } from "lucide-react";

export function InfrastructureReach() {
  return (
    <section className="relative bg-[#080B0E] text-white py-28 border-t border-white/10 overflow-hidden">

      {/* ENGINEERING GRID */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #0f172a 1px, transparent 1px),
                           linear-gradient(to bottom, #0f172a 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* TURQUOISE LINE */}
      <div className="absolute left-1/2 -top-6 h-16 w-[2px] bg-accent -translate-x-1/2" />

      <div className="relative container mx-auto px-6 max-w-7xl">

        {/* HEADER */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-6"
          >
            Manufacturing Infrastructure & Global Reach
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Built for Precision. <span className="text-accent">Scaled for Delivery.</span>
          </h2>

          <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            A fully-integrated sensor manufacturing ecosystem — combining in-house winding, machining,
            PCB population, assembly and validation — enabling repeatable quality at OEM scale.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">

          {/* Facility */}
          <Card
            icon={<Factory size={30} />}
            title="Integrated Manufacturing Facility"
            points={[
              "Precision winding (WW / CP)",
              "PCB population & assembly",
              "Electromechanical integration",
              "ISO 9001:2015 quality system"
            ]}
          />

          {/* QA Lab */}
          <Card
            icon={<ShieldCheck size={30} />}
            title="Quality & Reliability Lab"
            points={[
              "Environmental stress testing",
              "Linearity & repeatability validation",
              "Endurance & lifecycle testing",
              "100% unit QC screening"
            ]}
          />

          {/* Production */}
          <Card
            icon={<Cog size={30} />}
            title="Production Capability"
            points={[
              "Prototype — Batch — Series",
              "Custom sensor engineering",
              "OEM private-label builds",
              "Defense-qualified workflows"
            ]}
          />
        </div>

        {/* MAP + REACH */}
        <div className="relative rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-10">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Map */}
            <div className="relative">
              <div className="absolute inset-0 bg-[url('/worldmap.svg')] bg-contain bg-center bg-no-repeat opacity-[0.25]" />

              <div className="relative space-y-6">
                <h3 className="text-2xl font-bold">Global OEM Supply Reach</h3>

                <p className="text-slate-300 leading-relaxed max-w-lg">
                  Supplying mission-critical industries across India, APAC, the Middle East and Europe —
                  with export-ready documentation and compliant logistics support.
                </p>

                <div className="grid grid-cols-2 gap-6 mt-4">
                  <Metric label="ENGINEERING LEGACY" value="25+ Years" />
                  <Metric label="IN-HOUSE MANUFACTURING" value="100%" />
                  <Metric label="DEFENSE VENDOR STATUS" value="APPROVED" />
                  <Metric label="EXPORT COMPLIANCE" value="SUPPORTED" />
                </div>
              </div>
            </div>

            {/* Supply Chain */}
            <div className="space-y-10">

              <Feature
                icon={<Globe2 />}
                title="Export-Ready Documentation"
                desc="HS classification, compliance paperwork & OEM traceability support available."
              />

              <Feature
                icon={<Truck />}
                title="Optimised Global Logistics"
                desc="Air & sea shipment support with secure packaging for sensitive components."
              />

              <Feature
                icon={<Layers />}
                title="Scalable Supply Programs"
                desc="From prototype runs to multi-year scheduled orders with repeatability controls."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ———— COMPONENTS ———— */

function Card({ icon, title, points }: any) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="p-8 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
    >
      <div className="text-accent mb-6">{icon}</div>

      <h3 className="text-xl font-bold mb-4">{title}</h3>

      <ul className="space-y-2 text-slate-300">
        {points.map((p: string, i: number) => (
          <li key={i} className="text-sm">• {p}</li>
        ))}
      </ul>
    </motion.div>
  );
}

function Metric({ label, value }: any) {
  return (
    <div>
      <div className="text-accent font-mono text-xs tracking-widest mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

function Feature({ icon, title, desc }: any) {
  return (
    <div className="flex gap-6">
      <div className="text-accent">{icon}</div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
