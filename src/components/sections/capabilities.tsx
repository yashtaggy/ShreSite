import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const capabilities = [
  {
    id: 'capability-winding',
    title: 'Precision Winding',
    description: 'State-of-the-art automated winding for high-precision potentiometric elements and coils.',
  },
  {
    id: 'capability-pcb',
    title: 'PCB Assembly',
    description: 'In-house SMT and through-hole PCB assembly for complete product integration.',
  },
  {
    id: 'capability-testing',
    title: 'Advanced Testing',
    description: 'Rigorous testing protocols using advanced equipment to ensure military-grade quality.',
  },
  {
    id: 'capability-prototyping',
    title: 'Rapid Prototyping',
    description: 'Fast-track your development with our agile prototyping and design iteration capabilities.',
  },
];

export function Capabilities() {
  return (
    <section className="py-12 lg:py-24 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Our Core Capabilities</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From design to delivery, we have the in-house expertise to manage your entire product lifecycle.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability) => {
            const image = PlaceHolderImages.find((img) => img.id === capability.id);
            return (
              <Card key={capability.id} className="overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                {image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      data-ai-hint={image.imageHint}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{capability.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{capability.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
