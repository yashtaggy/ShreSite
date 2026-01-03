import { BrainCircuit, ShieldCheck, FlaskConical, DollarSign } from "lucide-react";

const advantages = [
  {
    icon: <BrainCircuit className="h-8 w-8 text-accent" />,
    title: "Domain Expertise",
    description:
      "Decades of specialized experience in sensor technology and electromechanical design.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-accent" />,
    title: "Military-Grade Quality",
    description:
      "Adherence to the strictest quality standards for reliability in critical applications.",
  },
  {
    icon: <FlaskConical className="h-8 w-8 text-accent" />,
    title: "R&D Capabilities",
    description:
      "A dedicated R&D team to innovate and develop custom solutions for unique challenges.",
  },
  {
    icon: <DollarSign className="h-8 w-8 text-accent" />,
    title: "Cost Advantages",
    description:
      "Strategic sourcing and optimized manufacturing processes for competitive pricing.",
  },
];

export function CompetitiveEdge() {
  return (
    <section className="py-24 bg-white">
      <div className="container px-4 md:px-6">

        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            The Shreyash Advantage
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover why industry leaders trust us for their most critical components.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {advantages.map((advantage) => (
            <div key={advantage.title} className="flex flex-col items-center text-center">
              
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border bg-secondary/60 shadow-sm">
                {advantage.icon}
              </div>

              <h3 className="text-lg font-semibold">{advantage.title}</h3>

              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
