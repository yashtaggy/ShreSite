import type { Metadata } from 'next';
import { SeoGeneratorForm } from '@/components/forms/seo-generator-form';

export const metadata: Metadata = {
  title: 'SEO Generator',
  description: 'AI-powered SEO metadata generation tool.',
};

export default function SeoAdminPage() {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto max-w-4xl py-12 px-4 md:px-6 lg:py-24">
        <SeoGeneratorForm />
      </div>
    </div>
  );
}
