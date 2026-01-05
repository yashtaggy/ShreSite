'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Info, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const products = [
  { 
    id: 'sy-901', 
    model: 'SY-901001', 
    name: 'Precision Wire-wound Potentiometer', 
    image: '/products/SP_01/Hero.png', 
    gallery: [
      '/products/SP_01/Hero.png',
      '/products/SP_01/angle1.png',
      '/products/SP_01/angle2.png',
      '/products/SP_01/angle3.png'
    ],
    specs: { technology: 'Precision Wire-wound', diameter: '22.2 mm', turns: '10 Turn', resistance: '1kΩ to 100kΩ', electricalAngle: '3600° ±2°', mechanicalAngle: '3600° +10°', tolerance: '±5%', linearity: '±0.25%', ipRating: 'IP65', rotationalLife: '2 Million Shaft Revolutions' } 
  },
  { 
    id: 'sy-902', 
    model: 'SY-901002', 
    name: 'Conductive Plastic Sensor', 
    image: '/products/SP_02/Hero.png', 
    gallery: [
      '/products/SP_02/Hero.png',
      '/products/SP_02/angle1.png',
      '/products/SP_02/angle2.png'
    ],
    specs: { technology: 'Conductive Plastic', diameter: '13 mm', turns: 'Single Turn', resistance: '1kΩ to 50kΩ', electricalAngle: '340° ±2°', mechanicalAngle: '360° Continuous', tolerance: '±10%', linearity: '±1%', ipRating: 'IP67', rotationalLife: '20 Million Revolutions' } 
  },
  { 
    id: 'sy-903', 
    model: 'SY-901003', 
    name: 'Hollow Shaft Potentiometer', 
    image: '/products/SP_03/Hero.png', 
    gallery: [
      '/products/SP_03/Hero.png',
      '/products/SP_03/angle1.png',
      '/products/SP_03/angle2.png',
      '/products/SP_03/angle3.png'
    ],
    specs: { technology: 'Wire-wound', diameter: '30 mm', turns: 'Single Turn', resistance: '5kΩ', electricalAngle: '350°', mechanicalAngle: '360°', tolerance: '±5%', linearity: '±0.5%', ipRating: 'IP54', rotationalLife: '1 Million Revolutions' } 
  },
  { 
    id: 'sy-904', 
    model: 'SY-901004', 
    name: 'Servo Mount Precision', 
    image: '/products/SP_04/Hero.png', 
    gallery: [
      '/products/SP_04/Hero.png',
      '/products/SP_04/angle1.png',
      '/products/SP_04/angle2.png'
    ],
    specs: { technology: 'Hybrid', diameter: '22 mm', turns: '3 Turn', resistance: '10kΩ', electricalAngle: '1080°', mechanicalAngle: '1090°', tolerance: '±3%', linearity: '±0.1%', ipRating: 'IP65', rotationalLife: '5 Million Revolutions' } 
  },
  { 
    id: 'sy-905', 
    model: 'SY-901005', 
    name: 'Industrial Grade Linear', 
    image: '/products/SP_05/Hero.png', 
    gallery: [
      '/products/SP_05/Hero.png',
      '/products/SP_05/angle1.png',
      '/products/SP_05/angle2.png',
      '/products/SP_05/angle3.png'
    ],
    specs: { technology: 'Wire-wound', diameter: '25 mm', turns: '5 Turn', resistance: '2kΩ to 20kΩ', electricalAngle: '1800°', mechanicalAngle: '1810°', tolerance: '±5%', linearity: '±0.2%', ipRating: 'IP65', rotationalLife: '2 Million Revolutions' } 
  },
  { 
    id: 'sy-906', 
    model: 'SY-901006', 
    name: 'Miniature Precision Pot', 
    image: '/products/SP_06/Hero.png', 
    gallery: [
      '/products/SP_06/Hero.png',
      '/products/SP_06/angle1.png'
    ],
    specs: { technology: 'Conductive Plastic', diameter: '9 mm', turns: 'Single Turn', resistance: '1kΩ to 10kΩ', electricalAngle: '300°', mechanicalAngle: '310°', tolerance: '±20%', linearity: '±2%', ipRating: 'IP40', rotationalLife: '10 Million Revolutions' } 
  },
];

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');

  // Reset active image to Hero whenever a new product is opened
  useEffect(() => {
    if (selectedProduct) {
      setActiveImage(selectedProduct.image);
    }
  }, [selectedProduct]);

  return (
    <main className="bg-white pt-32 pb-24">
      <div className="container mx-auto px-6">
        
        {/* HEADER SECTION */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mb-6 uppercase">
            Precision <span className="text-accent italic">Products</span>
          </h1>
          <p className="text-slate-600 text-lg border-l-4 border-accent pl-6 leading-relaxed">
            Engineered for indigenous reliability. Our potentiometric solutions are designed 
            to perform in the most demanding electromechanical environments.
          </p>
        </div>

        {/* 3x2 PRODUCT GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -8 }}
              className="group bg-white border border-slate-200 p-8 rounded-sm transition-all hover:shadow-xl hover:border-accent/30"
            >
              <div className="aspect-square relative mb-8 overflow-hidden bg-slate-50 rounded-sm border border-slate-100">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-contain p-6 transition-transform duration-500 scale-90 group-hover:scale-100"
                />
              </div>

              <div className="space-y-2">
                <p className="text-accent font-mono text-xs font-bold tracking-widest uppercase">
                  {product.model}
                </p>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {product.name}
                </h3>
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="pt-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-accent transition-colors underline underline-offset-8 decoration-slate-200 group-hover:decoration-accent"
                >
                  View Specifications <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
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
                       <Image 
                         src={activeImage} 
                         alt="Selected View" 
                         fill 
                         className="object-contain p-4" 
                       />
                    </div>
                    
                    {/* GALLERY THUMBNAILS */}
                    <div className="flex flex-wrap gap-2">
                       {selectedProduct.gallery.map((img, idx) => (
                         <button 
                           key={idx}
                           onClick={() => setActiveImage(img)}
                           className={`relative w-16 h-16 border-2 rounded-sm overflow-hidden bg-slate-50 transition-all ${activeImage === img ? 'border-accent' : 'border-slate-200 hover:border-slate-400'}`}
                         >
                           <Image src={img} alt={`Angle ${idx}`} fill className="object-contain p-1" />
                         </button>
                       ))}
                    </div>

                    <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-sm">
                       <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
                         <Info size={12} className="inline mr-2 mb-0.5" /> 
                         Custom modifications available for shaft length, electrical angle, and terminal housing.
                       </p>
                    </div>
                  </div>

                  {/* Right: Spec Table */}
                  <div className="space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b pb-2">Operational Parameters</h4>
                    <div className="space-y-3">
                      {Object.entries(selectedProduct.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-slate-50 text-sm">
                          <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-bold text-slate-900 text-right ml-4">{value}</span>
                        </div>
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