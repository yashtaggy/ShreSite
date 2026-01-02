'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { quoteSchema, submitQuote } from '@/app/actions/contact';
import type { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

type QuoteFormValues = z.infer<typeof quoteSchema>;

const productsAndServices = [
  'Potentiometric Sensors',
  'Fluid Level Sensors',
  'Hall-Effect Sensors',
  'Electromechanical Assemblies',
  'Sensor Design Service',
  'Precision Winding Service',
  'Third-Party Inspection',
  'Other',
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Submitting...' : 'Submit Quote Request'}
    </Button>
  );
}

export function QuoteForm() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(submitQuote, { message: '', success: false });

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      quantity: '',
      specifications: '',
    },
  });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Success!',
          description: state.message,
        });
        form.reset();
      } else {
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast, form]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Your Company Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="product"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product/Service of Interest</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {productsAndServices.map((item) => (
                    <SelectItem key={item} value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Quantity</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 1000 units" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specifications & Requirements</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Include details like dimensions, operating environment, electrical characteristics, etc."
                  className="min-h-[120px]"
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
  );
}
