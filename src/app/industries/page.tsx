import type { Metadata } from 'next';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description: 'Providing robust sensor solutions for defense, automotive, industrial automation, and agriculture.',
};

const industries = [
  {
    id: 'defense',
    name: 'Defense',
    imageId: 'industry-defense',
    useCases: [
      'Position feedback for missile fins and gimbals',
      'Throttle control for UAVs and ground vehicles',
      'Fluid level sensing in hydraulic systems',
      'Joysticks and control grips for remote weapon stations',
    ],
  },
  {
    id: 'automotive',
    name: 'Automotive',
    imageId: 'industry-automotive',
    useCases: [
      'Throttle and pedal position sensing',
      'Steering angle measurement',
      'Suspension height and ride control',
      'Fuel and DEF level monitoring in commercial vehicles',
    ],
  },
  {
    id: 'industrial-automation',
    name: 'Industrial Automation',
    imageId: 'industry-automation',
    useCases: [
      'Position feedback for robotic arms and actuators',
      'Valve position control in process industries',
      'Material handling and conveyor systems',
      'Joysticks for heavy machinery and cranes',
    ],
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    imageId: 'industry-agriculture',
    useCases: [
      'Steering and implement position for autonomous tractors',
      'Boom height control for sprayers',
      'Feed and seed level monitoring in hoppers',
      'Control levers for harvesters and combines',
    ],
  },
];

export default function IndustriesPage() {
  return (
    <div className="container mx-auto max-w-6xl py-12 px-4 md:px-6 lg:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">Industries We Serve</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
          Our solutions are engineered to withstand the unique challenges of your industry, delivering reliability where it matters most.
        </p>
      </div>

      <Tabs defaultValue="defense" className="mt-16 w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          {industries.map((industry) => (
            <TabsTrigger key={industry.id} value={industry.id}>
              {industry.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {industries.map((industry) => {
          const image = PlaceHolderImages.find((img) => img.id === industry.imageId);
          return (
            <TabsContent key={industry.id} value={industry.id} className="mt-8 rounded-lg border bg-card p-6 lg:p-8">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div className="relative aspect-video h-full w-full overflow-hidden rounded-md">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      data-ai-hint={image.imageHint}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-headline">Use Cases in {industry.name}</h3>
                  <ul className="mt-6 list-disc space-y-3 pl-5 text-muted-foreground">
                    {industry.useCases.map((useCase) => (
                      <li key={useCase}>{useCase}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
