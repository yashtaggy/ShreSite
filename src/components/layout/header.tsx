'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

import { cn } from '@/lib/utils';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/industries', label: 'Industries' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // 1. Setup Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 2. Handle background transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500 ease-in-out",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md py-3 shadow-sm border-b border-slate-200/60" 
          : "bg-transparent py-8 border-b border-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        
        {/* LOGO - Smoothly scales down */}
        <Link href="/" className="flex items-center transition-transform duration-500">
          <Image
            src="/logo.png"
            alt="Shreyash Solutions Logo"
            width={200}
            height={50}
            priority
            className={cn(
              "w-auto transition-all duration-500",
              isScrolled ? "h-10" : "h-12 md:h-14"
            )}
          />
        </Link>

        {/* DESKTOP NAV - Premium Spacing & Typography */}
        <nav className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-[13px] font-bold uppercase tracking-[0.15em] transition-colors duration-300",
                  isActive ? "text-accent" : "text-slate-600 hover:text-black"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span 
                    layoutId="header-underline"
                    className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ACTION AREA - Minimalist CTA */}
        <div className="flex items-center gap-8">
          <Link 
            href="/contact?form=quote"
            className={cn(
              "hidden md:block text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border-b-2 pb-1",
              isScrolled 
                ? "text-slate-900 border-accent hover:border-slate-900" 
                : "text-slate-800 border-accent/40 hover:border-accent"
            )}
          >
            Request a Quote
          </Link>

          {/* MOBILE TOGGLE */}
          <button 
            className="lg:hidden p-2 text-slate-900 transition-transform active:scale-90"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. ELITE SCROLL PROGRESS INDICATOR (1px precision line) */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1.5px] bg-accent origin-left"
        style={{ scaleX }}
      />

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white border-b border-slate-200 overflow-hidden lg:hidden shadow-xl"
          >
            <nav className="flex flex-col px-8 py-12 gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-bold tracking-tight text-slate-900 hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/contact?form=quote"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 text-accent font-bold uppercase tracking-widest border-l-4 border-accent pl-4"
              >
                Request a Quote →
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}