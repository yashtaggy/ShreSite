import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircuitBoard, Layers, Magnet, Component, type LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Products',
  description: 'Explore our range of potentiometric sensors, fluid level sensors, Hall-effect sensors, and electromechanical assemblies.',
};

type Product = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const products: Product[] = [
  {
    icon: CircuitBoard,
    title: 'Potentiometric Sensors',
    description: 'High-precision resistive sensors for accurate position and angle measurement. Customizable for various applications.',
  },
  {
    icon: Layers,
    title: 'Fluid Level Sensors',
    description: 'Reliable and durable sensors for measuring fluid levels in tanks and reservoirs, designed for harsh environments.',
  },
  {
    icon: Magnet,
    title: 'Hall-Effect Sensors',
    description: 'Non-contact sensors for speed, proximity, and position detection, offering long life and high reliability.',
  },
  {
    icon: Component,
    title: 'Electromechanical Assemblies',
    description: 'Custom-designed and manufactured assemblies combining sensors, PCBs, and mechanical parts into integrated solutions.',
  },
];

export default function ProductsPage() {
  return (
    <div className="container mx-auto max-w-6xl py-12 px-4 md:px-6 lg:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">Our Products</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Engineered for performance and reliability, our products are trusted in the most demanding applications.
        </p>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
        {products.map((product) => (
          <Card key={product.title} className="flex flex-col items-center p-6 text-center transition-shadow duration-300 hover:shadow-xl">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
              <product.icon className="h-8 w-8" />
            </div>
            <CardHeader className="p-0">
              <CardTitle className="text-2xl">{product.title}</CardTitle>
            </CardHeader>
            <CardContent className="mt-4 p-0">
              <p className="text-muted-foreground">{product.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
