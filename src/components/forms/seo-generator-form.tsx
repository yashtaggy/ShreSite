'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateSeoAction, seoFormSchema } from '@/app/actions/seo';
import type { SeoFormValues } from '@/app/actions/seo';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Terminal } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Generating...' : 'Generate Metadata'}
    </Button>
  );
}

export function SeoGeneratorForm() {
  const [state, formAction] = useFormState(generateSeoAction, { success: false });

  const form = useForm<SeoFormValues>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: {
      content: '',
      pageType: 'product',
    },
  });

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>SEO Metadata Generator</CardTitle>
          <CardDescription>
            Enter your product or service content below to generate optimized SEO title, description, and keywords.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={formAction} className="space-y-6">
              <FormField
                control={form.control}
                name="pageType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a page type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="service">Service</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste your full product or service description here..."
                        className="min-h-[250px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton />
            </form>
          </Form>
        </CardContent>
      </Card>

      {state.success && state.data && (
        <Card>
          <CardHeader>
            <CardTitle>Generated SEO Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Title</h3>
              <p className="mt-1 rounded-md bg-muted p-3 text-sm">{state.data.title}</p>
            </div>
            <div>
              <h3 className="font-semibold">Description</h3>
              <p className="mt-1 rounded-md bg-muted p-3 text-sm">{state.data.description}</p>
            </div>
            <div>
              <h3 className="font-semibold">Keywords</h3>
              <p className="mt-1 rounded-md bg-muted p-3 text-sm">{state.data.keywords}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {!state.success && state.message && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
