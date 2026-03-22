'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Info, ArrowRight, Loader2, Package } from 'lucide-react';
import { DustyParticles } from "@/components/ui/dusty-particles";
import Image from 'next/image';
import Link from 'next/link';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/lib/types';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(prods);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Reset active image to Primary whenever a new product is opened
  useEffect(() => {
    if (selectedProduct) {
      setActiveImage(selectedProduct.image);
    }
  }, [selectedProduct]);

  return (
    <main className="relative min-h-screen bg-slate-50/30 pt-32 pb-24 overflow-hidden">
      {/* 1. ATMOSPHERIC BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <DustyParticles />
      </div>

      {/* 2. TECHNICAL BLUEPRINT GRID */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#00f2ff 1px, transparent 1px), linear-gradient(90deg, #00f2ff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">

        {/* HEADER SECTION */}
        <div className="max-w-4xl mb-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 mb-8 uppercase leading-none">
            Precision <br />
            <span className="text-accent italic">Sensors & Specs</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <p className="text-slate-500 text-xl max-w-xl leading-relaxed font-light">
              Shreyash Solutions delivers indigenous, mission-critical potentiometric
              hardware engineered for extreme linear accuracy and MIL-spec reliability.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="animate-spin text-accent" size={48} />
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-slate-400">Synchronizing Strategic Data...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-200 p-20 text-center rounded-sm">
            <Package className="mx-auto text-slate-200 mb-4" size={48} />
            <p className="text-slate-400 font-mono text-[10px] uppercase tracking-widest font-black italic">Inventory Depleted: No units registered</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative bg-white border border-slate-200 p-6 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:border-accent hover:z-20"
              >
                {/* TECHNICAL CORNER ACCENTS */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-100 group-hover:border-accent/40 transition-colors" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-slate-100 group-hover:border-accent/40 transition-colors" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-slate-100 group-hover:border-accent/40 transition-colors" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-100 group-hover:border-accent/40 transition-colors" />

                <div className="relative aspect-square mb-10 overflow-hidden bg-slate-50/50 flex items-center justify-center p-8 group-hover:bg-accent/[0.02] transition-colors rounded-sm shadow-inner group-hover:shadow-none">
                  {/* BLUEPRINT DOTS IN IMAGE BG */}
                  <div className="absolute inset-0 opacity-[0.2] pointer-events-none"
                    style={{ backgroundImage: `radial-gradient(circle, #000 0.5px, transparent 0.5px)`, backgroundSize: '12px 12px' }} />

                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-8 transition-all duration-700 scale-90 group-hover:scale-100 group-hover:rotate-1"
                  />

                  {/* OVERLAY TAG */}
                  <div className="absolute top-4 left-4 flex flex-col items-start gap-1">
                    <span className="text-[8px] font-mono font-bold bg-slate-900 text-white px-2 py-0.5 tracking-tighter">PN: {product.model.toUpperCase()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-accent font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
                        {product.model}
                      </p>
                      <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">Indigenously Built</span>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] 
                                text-slate-900 hover:text-accent transition-all group/btn"
                    >
                      Open Datasheet
                      <div className="p-1 bg-slate-950 text-white rounded-full group-hover/btn:bg-accent group-hover/btn:translate-x-1 transition-all">
                        <ChevronRight size={10} />
                      </div>
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* TECHNICAL MODAL (Pop-up) */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col"
            >
              {/* MODAL HEADER */}
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
                <div>
                  <p className="text-accent font-mono text-xs font-bold uppercase tracking-widest">Technical Datasheet</p>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedProduct.model}</h2>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              {/* MODAL CONTENT */}
              <div className="flex-1 overflow-y-auto p-8">
                <div className="grid md:grid-cols-2 gap-10">
                  {/* Left: Product Images with Thumbnails */}
                  <div className="space-y-6">
                    <div className="aspect-square bg-slate-50 border border-slate-200 rounded-sm p-8 flex items-center justify-center relative">
                      {activeImage && (
                        <Image
                          src={activeImage}
                          alt="Selected View"
                          fill
                          className="object-contain p-4"
                        />
                      )}
                    </div>

                    {/* GALLERY THUMBNAILS */}
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.gallery?.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImage(img)}
                          className={`relative w-16 h-16 border-2 rounded-sm overflow-hidden bg-slate-50 transition-all ${activeImage === img ? 'border-accent' : 'border-slate-200 hover:border-slate-400'}`}
                        >
                          <Image src={img} alt={`Angle ${idx}`} fill className="object-contain p-1" />
                        </button>
                      ))}
                    </div>

                    {(selectedProduct.customMessage || "Custom modifications available for shaft length, electrical angle, and terminal housing.") && (
                      <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-sm">
                        <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
                          <Info size={12} className="inline mr-2 mb-0.5" />
                          {selectedProduct.customMessage || "Custom modifications available for shaft length, electrical angle, and terminal housing."}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right: Spec Table and Description */}
                  <div className="space-y-6">
                    {selectedProduct.description && (
                      <div className="mb-8 p-4 bg-slate-50 border-l-2 border-accent">
                        <p className="text-sm text-slate-600 font-light leading-relaxed italic">
                          "{selectedProduct.description}"
                        </p>
                      </div>
                    )}

                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b pb-2">Operational Parameters</h4>
                    <div className="space-y-3">
                      {Object.entries(selectedProduct.specs || {}).map(([key, value]) => (
                        value && (
                          <div key={key} className="flex justify-between py-2 border-b border-slate-50 text-sm">
                            <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="font-bold text-slate-900 text-right ml-4">{value}</span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* MODAL FOOTER */}
              <div className="p-8 border-t border-slate-100 bg-slate-50">
                <Link
                  href={`/contact?product=${selectedProduct.model}`}
                  className="w-full bg-accent hover:bg-slate-900 text-white font-bold py-4 px-6 rounded-sm flex items-center justify-center gap-3 transition-all tracking-widest uppercase text-xs"
                >
                  Enquire for {selectedProduct.model} <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
