import React from 'react';

export default function PrivacyPage() {
  return (
    <main className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="text-4xl font-bold tracking-tighter mb-8">Privacy <span className="text-accent italic">Policy</span></h1>
        
        <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
          <p>At Shreyash Solutions, we respect the confidentiality of our engineering partners and clients. This policy outlines how we handle data.</p>
          
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Data Collection</h2>
            <p>We only collect information provided voluntarily via our "Request a Quote" or "Contact" forms, such as name, company email, and technical specifications.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Confidentiality of Designs</h2>
            <p>As an MSME serving Defense and Aerospace sectors, we treat all custom drawings and technical requirements as Strictly Confidential. We do not share client specifications with third parties without prior written consent.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Cookies & Analytics</h2>
            <p>Our website uses minimal cookies to improve user experience and analyze site traffic for better performance.</p>
          </section>
        </div>
      </div>
    </main>
  );
}