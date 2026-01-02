'use server';

import { z } from 'zod';

export const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  company: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export const quoteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  company: z.string().min(2, 'Company name is required.'),
  phone: z.string().optional(),
  product: z.string({ required_error: 'Please select a product or service.' }),
  quantity: z.string().min(1, 'Please provide an estimated quantity.'),
  specifications: z.string().min(10, 'Please provide specifications.'),
});

export type FormState = {
  message: string;
  success: boolean;
};

export async function submitInquiry(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = inquirySchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: 'There was an error with your submission. Please check the fields.',
      success: false,
    };
  }

  // In a real application, you would send this data to your backend, email service, or CRM.
  console.log('New Inquiry:', validatedFields.data);

  return {
    message: 'Thank you for your inquiry! We will get back to you shortly.',
    success: true,
  };
}

export async function submitQuote(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = quoteSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: 'There was an error with your submission. Please check the fields.',
      success: false,
    };
  }

  // In a real application, you would send this data to your backend, email service, or CRM.
  console.log('New Quote Request:', validatedFields.data);

  return {
    message: 'Thank you for your quote request! Our team will review it and contact you soon.',
    success: true,
  };
}
