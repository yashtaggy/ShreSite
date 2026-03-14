import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ParticleNetwork } from "@/components/ui/particle-network";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* PARTICLE NETWORK BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-80">
        <ParticleNetwork />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-16 sm:pt-36 sm:pb-24 md:pt-48 md:pb-32 pointer-events-none">

        {/* POSITIONING BADGE */}
        <div className="inline-flex items-center rounded-full border bg-white/70 backdrop-blur-md px-4 py-1 text-xs sm:text-sm text-muted-foreground shadow-sm pointer-events-auto">
          Global-Standard Potentiometric & Sensor Manufacturer - Designed & Built in INDIA
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-6 sm:mt-10 max-w-4xl pointer-events-auto">
          <h1 className="font-headline text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Empowering Innovation
            <br />
            Through Sensor Technology
          </h1>

          <div className="mt-3 h-[3px] w-20 sm:w-24 rounded-full bg-accent" />

          <p className="mt-4 sm:mt-6 max-w-3xl text-base sm:text-lg md:text-xl text-muted-foreground">
            High-precision potentiometric and electromechanical sensor solutions
            engineered for OEMs, defense, automotive, industrial automation and mission-critical systems.
          </p>

          <div className="mt-6 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
            <Button asChild size="lg" className="rounded-full px-6 bg-accent text-white">
              <Link href="/products">Explore Products</Link>
            </Button>

            <Button asChild size="lg" variant="secondary" className="rounded-full px-6">
              <Link href="/contact?form=quote">Request a Quote</Link>
            </Button>
          </div>
        </div>

        {/* TRUST STRIP */}
        <div className="mt-8 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm text-muted-foreground border-t pt-4 sm:pt-6 pointer-events-auto">
          <span>ISO 9001:2015 Certified</span>
          <span className="hidden sm:inline">•</span>
          <span>Registered Vendor – DRDO / RCI</span>
          <span className="hidden sm:inline">•</span>
          <span>OEM Supplier – Government e-Marketplace</span>
        </div>
      </div>
    </section>
  );
}
