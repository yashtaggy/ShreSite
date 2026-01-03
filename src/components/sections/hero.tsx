import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-40 pb-24 md:pt-48 md:pb-32">

        {/* POSITIONING BADGE */}
        <div className="inline-flex items-center rounded-full border bg-white px-4 py-1 text-sm text-muted-foreground shadow-sm fade-up">
          Global-Standard Potentiometric & Sensor Manufacturer - Designed & Built in INDIA
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-10 max-w-4xl fade-up" style={{ animationDelay: "0.3s" }}>
          <h1 className="font-headline text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Empowering Innovation
            <br />
            Through Sensor Technology
          </h1>
          <div className="mt-3 h-[3px] w-24 rounded-full bg-accent" />
          
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
            High-precision potentiometric and electromechanical sensor solutions 
            engineered for OEMs, defense, automotive, industrial automation and mission-critical systems.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-full px-6 shadow-sm bg-accent text-white hover:bg-accent/90"
          >
          <Link href="/products">Explore Products</Link>
          </Button>


            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-full px-6"
            >
              <Link href="/contact?form=quote">Request a Quote</Link>
            </Button>
          </div>
        </div>

        {/* TRUST STRIP */}
        <div className="mt-16 flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-t pt-6 fade-up" style={{ animationDelay: "0.4s" }}>
          <span>ISO 9001:2015 Certified</span>
          <span>•</span>
          <span>Registered Vendor - DRDO / RCI</span>
          <span>•</span>
          <span>OEM Supplier - Government e-Marketplace</span>
        </div>
      </div>
    </section>
  );
}
