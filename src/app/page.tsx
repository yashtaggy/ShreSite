import { Capabilities } from '@/components/sections/capabilities';
import { CompetitiveEdge } from '@/components/sections/competitive-edge';
import { Hero } from '@/components/sections/hero';
import { InfrastructureReach } from "@/components/sections/infrastructure-reach";
import { CompanyOverview } from '@/components/sections/company-overview';

export default function Home() {
  return (
    <>
      <Hero />
      <CompanyOverview />
      <Capabilities />
      <CompetitiveEdge />
      <InfrastructureReach />
    </>
  );
}
