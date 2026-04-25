import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { BackToTop } from "@/components/ui/back-to-top";

export const metadata: Metadata = {
  title: {
    default: 'Shreyash Solutions',
    template: '%s | Shreyash Solutions',
  },
  description:
    'High-quality potentiometric sensors, fluid level sensors, and electromechanical assemblies for various industries including defense, automotive, and automation.',
  verification: {
    google: 'P97r7tR6NnST0-FUZTSPr4QttdscxRyAjlakdyjcvEM',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <div className="relative flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
