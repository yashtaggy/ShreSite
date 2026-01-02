'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Aperture, Menu } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/industries', label: 'Industries' },
  { href: '/contact', label: 'Contact' },
];

function NavLink({
  href,
  label,
  className,
  onClick,
}: {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'group relative text-[16px] font-medium transition-colors duration-200',

        isActive
          ? 'text-primary'
          : 'text-muted-foreground hover:text-foreground',
        className
      )}
    >
      {label}

      <span
        className={cn(
        'absolute -bottom-1 left-0 h-[2px] w-full rounded bg-primary transition-all duration-200',
        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
        )}
      />
    </Link>
  );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur shadow-sm supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"   // <-- PUT YOUR LOGO FILE NAME HERE
            alt="Shreyash Solutions Logo"
            width={240}
            height={64}
            priority
            className="h-16 w-auto"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <div key={link.href} className="group">
              <NavLink href={link.href} label={link.label} />
            </div>
          ))}
        </nav>

        {/* CTA + MOBILE MENU */}
        <div className="flex items-center gap-3">
        <Button
          asChild
          size="lg"
          className="hidden md:inline-flex rounded-full px-6 shadow-md hover:shadow-lg transition-shadow"
        >
            <Link href="/contact?form=quote">Request a Quote</Link>
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-72">
              <Link
                href="/"
                className="mb-8 flex items-center space-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Aperture className="h-6 w-6 text-primary" />
                <span className="font-semibold">Shreyash Solutions</span>
              </Link>

              <nav className="flex flex-col space-y-5">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    className="text-base"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ))}
              </nav>

              <Button
                asChild
                className="mt-10 w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href="/contact?form=quote">Request a Quote</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
