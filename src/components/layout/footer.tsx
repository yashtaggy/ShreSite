import Link from 'next/link';
import { Aperture, Twitter, Linkedin, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Aperture className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Shreyash Solutions</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Engineering precision sensors and electromechanical solutions for critical applications across industries.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 sm:grid-cols-3">
            <div>
              <p className="font-semibold">Navigation</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/products" className="text-muted-foreground hover:text-primary">Products</Link></li>
                <li><Link href="/services" className="text-muted-foreground hover:text-primary">Services</Link></li>
                <li><Link href="/industries" className="text-muted-foreground hover:text-primary">Industries</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
                 <li><Link href="/admin/seo" className="text-muted-foreground hover:text-primary">SEO Tool</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Our Offerings</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/products" className="text-muted-foreground hover:text-primary">Potentiometric Sensors</Link></li>
                <li><Link href="/products" className="text-muted-foreground hover:text-primary">Fluid Level Sensors</Link></li>
                <li><Link href="/products" className="text-muted-foreground hover:text-primary">Hall-effect Sensors</Link></li>
                <li><Link href="/services" className="text-muted-foreground hover:text-primary">Precision Winding</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Contact Us</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>123 Innovation Drive, Tech Park, Pune, 411057, India</li>
                <li><a href="mailto:inquiry@shreyash.com" className="hover:text-primary">inquiry@shreyash.com</a></li>
                <li><a href="tel:+911234567890" className="hover:text-primary">+91 123 456 7890</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Shreyash Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
