import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PenTool, Cog, ClipboardCheck, type LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Services | Custom Sensor Design & Winding',
  description: 'Specialized engineering services including custom potentiometric sensor design, high-precision wire winding, and third-party inspection for electronic components in Pune.',
};

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    icon: PenTool,
    title: 'Custom Potentiometric Sensor Design',
    description: 'Collaborate with our Pune-based engineering team to design custom industrial potentiometers tailored to your exact specifications. We specialize in developing unique electromechanical solutions for unconventional applications, ensuring that your sensor meets reach, torque, and electrical angle requirements perfectly. Whether you need a one-off prototype or a scalable design for mass production, our sensor design services provide the technical blueprint for success.',
  },
  {
    icon: Cog,
    title: 'Precision Winding Services in India',
    description: 'Leverage our advanced, automated winding technology for your specific components. Shreyash Solutions offers high-precision wire-winding as a standalone service, catering to other manufacturers and research labs who require consistent and accurate resistive elements. Our facility is equipped to handle various wire gauges and core materials, delivering precision winding that adheres to the highest aerospace and defense standards in India.',
  },
  {
    icon: ClipboardCheck,
    title: 'Third-Party Inspection & Validation',
    description: 'Ensure the reliability of your components with our state-of-the-art testing facility in Pune. We provide impartial, third-party inspection and validation services for industrial sensors and electronic assemblies. Our validation process includes electrical angle verification, linearity testing, and environmental stress screening, providing you with a certified data datasheet that benchmarks your product against global quality and reliability standards.',
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto max-w-6xl py-12 px-4 md:px-6 lg:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">Our Services</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Extend your capabilities with our specialized engineering and manufacturing services.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="p-6 transition-shadow duration-300 hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <service.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardHeader className="p-0">
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="mt-2 p-0">
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
