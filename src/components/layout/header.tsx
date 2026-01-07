'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

import { cn } from '@/lib/utils';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/products', label: 'Products & Solutions' },
  { href: '/infrastructure', label: 'Quality & Infrastructure' },
  { href: '/industries', label: 'Industries' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500 ease-in-out",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md py-3 shadow-sm border-b border-slate-200/60" 
          : "bg-transparent py-8 border-b border-transparent"
      )}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 lg:px-10">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="Shreyash Solutions Logo"
            width={180}
            height={45}
            priority
            className={cn(
              "w-auto transition-all duration-500 object-contain",
              isScrolled ? "h-9" : "h-12 md:h-14"
            )}
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-8 xl:gap-10 lg:flex ml-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.18em] transition-colors duration-300",
                  isActive ? "text-accent" : "text-slate-600 hover:text-black"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span 
                    layoutId="header-underline"
                    className="absolute -bottom-1 left-0 h-[2px] w-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ACTION AREA */}
        <div className="flex items-center gap-6">
          <Link 
            href="/contact?form=quote"
            className={cn(
              "hidden md:flex items-center gap-2 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-sm",
              isScrolled 
                ? "bg-accent text-white shadow-md hover:bg-slate-900 shadow-accent/20" 
                : "bg-white/10 backdrop-blur-md border border-white/20 text-slate-800 hover:bg-white hover:text-accent"
            )}
          >
            Request a Quote
            <ArrowRight size={14} className={isScrolled ? "text-white" : "text-accent"} />
          </Link>

          {/* MOBILE TOGGLE */}
          <button 
            className="lg:hidden p-2 text-slate-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* SCROLL PROGRESS INDICATOR */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-accent origin-left"
        style={{ scaleX }}
      />

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-white z-[60] lg:hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
               <Image src="/logo.png" alt="Logo" width={140} height={35} />
               <button onClick={() => setIsMobileMenuOpen(false)}><X size={28} /></button>
            </div>
            
            <nav className="flex flex-col px-10 py-16 gap-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.href}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-bold tracking-tight text-slate-900 active:text-accent"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link 
                href="/contact?form=quote"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-8 inline-flex items-center gap-4 text-accent text-xl font-bold uppercase tracking-widest"
              >
                Request a Quote <ArrowRight />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}