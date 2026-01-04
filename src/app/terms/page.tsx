import React from 'react';

export default function TermsPage() {
  return (
    <main className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="text-4xl font-bold tracking-tighter mb-8">Terms & <span className="text-accent italic">Conditions</span></h1>
        
        <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. Acceptance of Quotations</h2>
            <p>All quotations provided by Shreyash Solutions are valid for 30 days unless otherwise stated. Orders are only accepted upon receipt of an official Purchase Order (PO).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">2. Manufacturing & Lead Times</h2>
            <p>Lead times for custom sensor developments (including winding and assembly) are estimates and commence from the date of design approval. We strive for 100% on-time delivery but are not liable for delays caused by raw material supply chain disruptions.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">3. Quality & Warranty</h2>
            <p>All products undergo 100% End-of-Line (EOL) testing as per our Process Flow Architecture. Shreyash Solutions warrants that products will be free from defects in material and workmanship under normal use for a period of 12 months from dispatch.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Limitation of Liability</h2>
            <p>Our liability is limited to the repair or replacement of the sensing unit. We are not liable for any consequential damages arising from the use of our components in larger systems.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">5. Governing Law</h2>
            <p>These terms are governed by the laws of India, with jurisdiction specifically under the courts of Pune, Maharashtra.</p>
          </section>
        </div>
      </div>
    </main>
  );
}