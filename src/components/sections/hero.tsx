import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ChevronRight } from 'lucide-react';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            Precision in Motion
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-neutral-200 md:text-xl">
            Engineering high-performance sensors and assemblies for the world's most demanding industries.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/products">
                Explore Our Products <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
