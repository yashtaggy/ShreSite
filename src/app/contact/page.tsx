'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { sendInquiry } from '@/app/actions/contact';
import { DustyParticles } from "@/components/ui/dusty-particles";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const result = await sendInquiry(formData);

    if (result.success) setIsSuccess(true);
    else alert("Transmission failed. Please check your connection.");

    setIsSubmitting(false);
  };

  return (
    <main className="relative min-h-screen pt-24 md:pt-32 pb-20 overflow-hidden bg-white">
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

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* LEFT SIDE */}
          <div className="space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="h-1 w-10 bg-accent mb-6 mx-auto lg:mx-0" />

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05] mb-6">
                Start the <br />
                <span className="text-accent">Project.</span>
              </h1>

              <p className="text-slate-500 text-base md:text-xl max-w-md mx-auto lg:mx-0">
                Precision in communication is the first step toward precision in engineering.
              </p>
            </motion.div>

            <div className="pt-8 border-t border-slate-100 space-y-3 text-center lg:text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Direct Contact
              </p>
              <p className="text-lg md:text-2xl font-bold text-slate-900 break-all">
                shreyashsolutions.sales@gmail.com
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  onSubmit={handleSubmit}
                  className="relative group bg-white border border-slate-200 rounded-sm p-6 md:p-10 space-y-6 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {/* TECHNICAL CORNER ACCENTS */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-100 group-hover:border-accent/40 transition-colors" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-slate-100 group-hover:border-accent/40 transition-colors" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-slate-100 group-hover:border-accent/40 transition-colors" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-100 group-hover:border-accent/40 transition-colors" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input name="fullName" required placeholder="Full Name" className="input" />
                    <input name="company" required placeholder="Company Name" className="input" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input name="phone" required placeholder="Phone" className="input" />
                    <input name="email" required type="email" placeholder="Work Email" className="input" />
                  </div>

                  <input name="location" required placeholder="City / Location" className="input" />

                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Your Message"
                    className="input resize-none"
                  />

                  <button
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 hover:bg-accent text-white font-black py-5 rounded-sm flex items-center justify-center gap-3 uppercase tracking-[0.25em] text-[10px] transition-all"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <>Dispatch Inquiry <ArrowRight size={16} /></>}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-slate-200 rounded-sm p-10 text-center space-y-6"
                >
                  <CheckCircle2 size={56} className="text-accent mx-auto" />
                  <h2 className="text-2xl md:text-3xl font-bold">Thank You</h2>
                  <p className="text-slate-500 max-w-sm mx-auto">
                    We have received your inquiry and will connect with you shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Input styles */}
      <style jsx>{`
        .input {
          width: 100%;
          background: transparent;
          border-bottom: 2px solid #e2e8f0;
          padding: 0.75rem 0;
          font-weight: 700;
          outline: none;
          transition: border-color 0.3s;
        }
        .input:focus {
          border-color: var(--accent);
        }
      `}</style>
    </main>
  );
}
