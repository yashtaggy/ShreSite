'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function CompanyOverview() {
    return (
        <section className="py-24 bg-white border-t border-slate-100">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-accent mb-6">
                            Indigenous Sensor Engineering
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-8">
                            Pioneering Precision in <br />
                            <span className="text-accent italic">Indian Sensor Technology</span>
                        </h3>

                        <div className="prose prose-slate max-w-none text-slate-600 space-y-6 text-lg leading-relaxed">
                            <p>
                                As one of the prominent <strong>high precision sensor manufacturers India</strong> relies on, Shreyash Solutions has been at the forefront of the precision engineering sector since 2017. Operating from Pune’s industrial hub, we serve as a trusted <strong>defence sensor supplier India</strong> OEMs count on for mission-critical hardware. We specialize in the design and production of high-performance potentiometric sensors and electromechanical assemblies engineered for extreme reliability.
                            </p>

                            <p>
                                By focusing on indigenous innovation under the Atmanirbhar Bharat initiative, we have successfully reduced dependence on imported components for critical applications. Whether it is cockpit controls, radar systems, or industrial automation, our sensors deliver sub-micron accuracy and long-term signal stability.
                            </p>
                        </div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-slate-100">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h4 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-tighter">
                                Aerospace & Defence Specialization
                            </h4>
                            <p className="text-slate-600 leading-relaxed italic border-l-2 border-accent pl-4">
                                "We provide specialized electromechanical assemblies and custom potentiometric elements developed for high-vibration and extreme atmospheric environments encountered in aerospace research."
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <h4 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-tighter">
                                Industrial Automation Hub
                            </h4>
                            <p className="text-slate-600 leading-relaxed italic border-l-2 border-accent pl-4">
                                "Our sensors serve as the nervous system for robotic joints and CNC feedback systems, ensuring long-cycle stability and high-frequency response in modern manufacturing floors."
                            </p>
                        </motion.div>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-sm border border-slate-200">
                        <p className="text-sm text-slate-500 leading-relaxed">
                            For defense-grade or aerospace applications, Shreyash Solutions offers 100% end-of-line tested hardware. Our engineering team specializes in <strong>custom shaft fabrication</strong>, <strong>high-linearity winding</strong>, and <strong>conductive plastic sensing elements</strong>, ensuring that every unit complies with MSME (UDYAM) quality benchmarks. Currently supplying customers across multiple Indian states, we are actively expanding our scope to serve international OEMs across APAC, EMEA, and AMEA regions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
