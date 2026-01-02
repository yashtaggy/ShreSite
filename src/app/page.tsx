import { Capabilities } from '@/components/sections/capabilities';
import { CompetitiveEdge } from '@/components/sections/competitive-edge';
import { Hero } from '@/components/sections/hero';

export default function Home() {
  return (
    <>
      <Hero />
      <Capabilities />
      <CompetitiveEdge />
    </>
  );
}
