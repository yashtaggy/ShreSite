
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Aperture, Menu } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/industries', label: 'Industries' },
  { href: '/contact', label: 'Contact' },
];

function NavLink({ href, label, className }: { href: string; label: string; className?: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'text-sm font-medium transition-colors hover:text-primary',
        isActive ? 'text-primary' : 'text-muted-foreground',
        className
      )}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Aperture className="h-6 w-6 text-primary" />
            <span className="font-bold">Shreyash Solutions</span>
          </Link>
          <nav className="hidden items-center space-x-6 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild className="hidden md:inline-flex">
            <Link href="/contact?form=quote">Request a Quote</Link>
          </Button>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="mb-8 flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                <Aperture className="h-6 w-6 text-primary" />
                <span className="font-bold">Shreyash Solutions</span>
              </Link>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    className="text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ))}
              </nav>
              <Button asChild className="mt-8 w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <Link href="/contact?form=quote">Request a Quote</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
