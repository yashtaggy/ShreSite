import React from 'react';
import { DustyParticles } from "@/components/ui/dusty-particles";
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/lib/types';
import { ProductGrid } from '@/components/products/product-grid';

export const revalidate = 3600;

async function getProducts(): Promise<Product[]> {
  try {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        model: data.model || '',
        name: data.name || '',
        description: data.description || '',
        customMessage: data.customMessage || '',
        image: data.image || '',
        gallery: data.gallery || [],
        specs: data.specs || {},
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || null)
      } as Product;
    });
  } catch (error) {
    console.error("Error fetching products server-side:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  const productLdJson = products.map((product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || product.name,
    "mpn": product.model,
    "brand": {
      "@type": "Brand",
      "name": "Shreyash Solutions"
    },
    "image": product.image
  }));

  return (
    <main className="relative min-h-screen bg-slate-50/30 pt-32 pb-24 overflow-hidden">
      {/* PRODUCT JSON-LD SCHEMA */}
      {productLdJson.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productLdJson) }}
        />
      )}

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

          <div className="flex flex-col gap-8">
            <p className="text-slate-500 text-xl max-w-xl leading-relaxed font-light">
              Shreyash Solutions delivers indigenous, mission-critical potentiometric
              hardware engineered for extreme linear accuracy and MIL-spec reliability.
            </p>

            <div className="prose prose-slate max-w-2xl text-slate-500 text-sm leading-relaxed border-l-2 border-accent/20 pl-6 space-y-4">
              <p>
                As specialized <strong>conductive plastic potentiometer developers India</strong>, we engineer high-precision sensing elements that serve as the backbone of modern industrial control. Our product portfolio includes <strong>wire-wound potentiometers</strong>, <strong>conductive plastic sensors</strong>, and specialized <strong>fluid level sensors</strong> designed for the harshest operational environments.
              </p>
              <p>
                Every unit we produce is the result of rigorous engineering—from high-grade resistive wire selection to final validation using calibrated digital instrumentation. Recognizing our growing international footprint as <strong>potentiometer exporters from India</strong>, our sensors are trusted for their stability under thermal stress and mechanical vibration, ensuring absolute signal integrity for aircraft control systems, radar platforms, and heavy-duty industrial machinery.
              </p>
            </div>
          </div>
        </div>

        <ProductGrid products={products} />
      </div>
    </main>
  );
}
