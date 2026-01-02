'use server';

import { generateSEOMetadata } from '@/ai/flows/generate-seo-metadata';
import { z } from 'zod';

export const seoFormSchema = z.object({
  content: z.string().min(50, 'Content must be at least 50 characters long.'),
  pageType: z.enum(['product', 'service']),
});

export type SeoFormValues = z.infer<typeof seoFormSchema>;

type SeoState = {
  success: boolean;
  message?: string;
  data?: {
    title: string;
    description: string;
    keywords: string;
  };
};

export async function generateSeoAction(
  prevState: SeoState,
  formData: FormData
): Promise<SeoState> {
  const validatedFields = seoFormSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid form data. Please check your inputs.',
    };
  }

  try {
    const result = await generateSEOMetadata(validatedFields.data);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('Error generating SEO metadata:', error);
    return {
      success: false,
      message: 'An unexpected error occurred while generating SEO metadata.',
    };
  }
}
