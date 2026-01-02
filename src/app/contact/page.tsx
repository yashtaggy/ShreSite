'use client';

import { Suspense } from 'react';
import type { Metadata } from 'next';
import { useSearchParams } from 'next/navigation';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InquiryForm } from '@/components/forms/inquiry-form';
import { QuoteForm } from '@/components/forms/quote-form';

// Metadata can't be used in a client component, but we keep this structure
// for potential future conversion to a server component.
// export const metadata: Metadata = {
//   title: 'Contact Us',
//   description: 'Get in touch for inquiries or request a quote for our products and services.',
// };

function ContactPageContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('form') === 'quote' ? 'quote' : 'inquiry';

  return (
    <div className="bg-secondary">
      <div className="container mx-auto max-w-4xl py-12 px-4 md:px-6 lg:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">Get in Touch</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We're here to help. Whether you have a question about our products or need a quote for a custom solution, our team is ready to assist you.
          </p>
        </div>

        <Tabs defaultValue={defaultTab} className="mt-12 w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inquiry">General Inquiry</TabsTrigger>
            <TabsTrigger value="quote">Request a Quote</TabsTrigger>
          </TabsList>
          <TabsContent value="inquiry">
            <Card>
              <CardHeader>
                <CardTitle>General Inquiry</CardTitle>
                <CardDescription>
                  Have a question? Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InquiryForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="quote">
            <Card>
              <CardHeader>
                <CardTitle>Request a Quote</CardTitle>
                <CardDescription>
                  Provide us with the details of your project, and our team will prepare a quote for you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QuoteForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactPageContent />
    </Suspense>
  );
}

