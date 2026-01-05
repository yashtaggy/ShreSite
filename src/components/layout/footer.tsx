import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-900 pt-16 pb-8">
      <div className="container mx-auto max-w-screen-2xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* COLUMN 1: BRANDING */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image 
                src="/logo.png" 
                alt="Shreyash Solutions Logo" 
                width={180} 
                height={60} 
                className="h-auto w-auto"
                priority
              />
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Specialized MSME manufacturing unit delivering mission-critical 
              electromechanical sensing solutions for Defense and Aerospace OEMs since 2015.
            </p>
            <div className="flex space-x-3">
              <Link href="https://linkedin.com" className="p-2 border border-slate-200 rounded-sm hover:border-accent hover:text-accent transition-all">
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 border-l-2 border-accent pl-3">Navigation</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="/about" className="text-slate-600 hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/products" className="text-slate-600 hover:text-accent transition-colors">Products & Solutions</Link></li>
              <li><Link href="/services" className="text-slate-600 hover:text-accent transition-colors">Manufacturing Services</Link></li>
              <li><Link href="/industries" className="text-slate-600 hover:text-accent transition-colors">Industries Served</Link></li>
              <li><Link href="/contact" className="text-slate-600 hover:text-accent transition-colors">Request a Quote</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: CONTACT DETAILS */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 border-l-2 border-accent pl-3">Contact HQ</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-accent mt-1 shrink-0" />
                <p className="text-sm text-slate-600">
                SR. NO. 63/12/4, 305, Lake Bridge, Jambhulwadi Road,  Pune-411046<br />
                  <span className="text-xs text-slate-400"></span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <a href="mailto:shreyashsolutions.sales@gmail.com" className="text-sm text-slate-600 hover:text-accent">shreyashsolutions.sales@gmail.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <a href="tel:+919689954861" className="text-sm font-bold text-slate-900">+919689954861 / +919860047472</a>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Lead Engineer:</p>
                <p className="text-sm font-bold text-slate-800">Mr. Bharat B. Tagunde</p>
              </div>
            </div>
          </div>

          {/* COLUMN 4: LOCATION MAP */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 border-l-2 border-accent pl-3">Our Location</h4>
            <div className="w-full h-40 bg-slate-100 rounded-sm overflow-hidden border border-slate-200 relative group">
              {/* Replace the URL below with your actual Google Maps Embed Link */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.0344739699!2d73.78056541640625!3d18.524890199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43105d9a2be3!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              ></iframe>
            </div>
            <Link href="https://maps.app.goo.gl/KWqxa5c8zG9gTxsH9" className="mt-2 text-[10px] flex items-center gap-1 text-slate-400 hover:text-accent font-bold uppercase tracking-tighter">
              Get Directions <ExternalLink size={10} />
            </Link>
          </div>

        </div>

        {/* BOTTOM LEGAL BAR */}
        {/* BOTTOM LEGAL BAR */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[11px] text-slate-400 flex flex-wrap gap-4 md:gap-8 justify-center">
            <span>© {new Date().getFullYear()} Shreyash Solutions. All rights reserved.</span>
            <Link href="/terms" className="hover:text-accent transition-colors">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
          </div>
          
          <div className="text-[11px] font-medium text-slate-400">
            Designed & Developed by{" "}
            <a 
              href="https://www.linkedin.com/in/yash-t-a4330b1b5/"         
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-900 font-bold border-b border-accent/30 hover:text-accent hover:border-accent transition-all cursor-pointer"
            >
              Yash Tagunde
                </a>
              </div>
          </div>
      </div>
    </footer>
  );
}