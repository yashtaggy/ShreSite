'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { sendInquiry } from '@/app/actions/contact';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await sendInquiry(formData);
    
    if (result.success) {
      setIsSuccess(true);
    } else {
      alert("Transmission failed. Please check your connection.");
    }
    setIsSubmitting(false);
  };

  return (
    <main className="bg-white min-h-screen pt-32 pb-24 relative text-slate-900 overflow-hidden">

      {/* subtle blueprint bg */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* LEFT SIDE - unchanged */}
            <div className="space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="h-1 w-12 bg-accent mb-8" />
                <h1 className="text-7xl font-black tracking-tighter mb-6 leading-[0.85]">
                  Start the <br/>
                  <span className="text-accent">Project.</span>
                </h1>
                <p className="text-slate-500 text-xl font-medium max-w-sm leading-relaxed">
                  Precision in communication is the first step toward precision in engineering.
                </p>
              </motion.div>

              <div className="space-y-4 pt-10 border-t border-slate-100">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Direct Contact</p>
                <div className="text-2xl font-bold tracking-tight text-slate-900 hover:text-accent transition-colors cursor-pointer">
                  shreyashsolutions.sales@gmail.com
                </div>
                <div className="text-xl font-medium text-slate-500">
                  +919689954861 / +919860047472
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="relative">
              <AnimatePresence mode="wait">

                {/* FORM */}
                {!isSuccess ? (
                  <motion.form 
                    key="contact-form"
                    initial={{ opacity: 0, scale: 0.97 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    onSubmit={handleSubmit}
                    className="bg-slate-50 p-8 md:p-12 rounded-sm border border-slate-200 space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
          <input 
            name="fullName" 
            required 
            placeholder="Full Name" 
            className="w-full bg-transparent border-b-2 border-slate-200 py-3 focus:border-accent transition-all outline-none font-bold placeholder:text-slate-300" 
          />
          <input 
            name="company" 
            required 
            placeholder="Company Name" 
            className="w-full bg-transparent border-b-2 border-slate-200 py-3 focus:border-accent transition-all outline-none font-bold placeholder:text-slate-300" 
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <input 
            name="phone" 
            required 
            type="tel" 
            placeholder="Phone (e.g. +91…)" 
            className="w-full bg-transparent border-b-2 border-slate-200 py-3 focus:border-accent transition-all outline-none font-bold placeholder:text-slate-300" 
          />
          <input 
            name="email" 
            required 
            type="email" 
            placeholder="Work Email" 
            className="w-full bg-transparent border-b-2 border-slate-200 py-3 focus:border-accent transition-all outline-none font-bold placeholder:text-slate-300" 
          />
        </div>

        <input 
          name="location" 
          required 
          placeholder="City / Location" 
          className="w-full bg-transparent border-b-2 border-slate-200 py-3 focus:border-accent transition-all outline-none font-bold placeholder:text-slate-300" 
        />

<textarea 
          name="message" 
          rows={3} 
          placeholder="Your Message" 
          className="w-full bg-transparent border-b-2 border-slate-200 py-3 focus:border-accent transition-all outline-none font-bold placeholder:text-slate-300 resize-none" 
        />

<button 
          disabled={isSubmitting}
          type="submit"
          className="group w-full bg-slate-900 hover:bg-accent text-white font-black py-6 mt-6 rounded-sm flex items-center justify-center gap-4 transition-all uppercase tracking-[0.4em] text-[10px] disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : <>Dispatch Inquiry <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" /></>}
        </button>
                  </motion.form>
                ) : (

                  /* SUCCESS MESSAGE — clean & professional */
                  <motion.div 
                    key="success-message"
                    initial={{ opacity: 0, y: 12 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-slate-200 p-16 text-center space-y-8 rounded-sm"
                  >
                    <CheckCircle2 size={64} className="text-accent mx-auto" />

                    <h2 className="text-3xl font-bold tracking-tight">
                      Thank You For Reaching Out
                    </h2>

                    <p className="text-slate-500 text-lg leading-relaxed max-w-md mx-auto">
                      We have received your inquiry. Our team will connect with you shortly to assist further.
                    </p>

                    <button 
                      onClick={() => setIsSuccess(false)} 
                      className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
