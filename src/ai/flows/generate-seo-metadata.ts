'use server';

/**
 * @fileOverview Flow for generating SEO metadata (title, description, keywords) based on product/service content.
 *
 * generateSEOMetadata - A function that generates SEO metadata for a given content.
 * SEOMetadataInput - The input type for the generateSEOMetadata function.
 * SEOMetadataOutput - The return type for the generateSEOMetadata function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SEOMetadataInputSchema = z.object({
  content: z.string().describe('The content of the product or service page.'),
  pageType: z
    .enum(['product', 'service'])
    .describe('The type of the page: product or service.'),
});
export type SEOMetadataInput = z.infer<typeof SEOMetadataInputSchema>;

const SEOMetadataOutputSchema = z.object({
  title: z.string().describe('The SEO-friendly title for the page.'),
  description: z.string().describe('The SEO-friendly description for the page.'),
  keywords: z.string().describe('Comma-separated SEO-friendly keywords for the page.'),
});
export type SEOMetadataOutput = z.infer<typeof SEOMetadataOutputSchema>;

export async function generateSEOMetadata(
  input: SEOMetadataInput
): Promise<SEOMetadataOutput> {
  return generateSEOMetadataFlow(input);
}

const seoMetadataPrompt = ai.definePrompt({
  name: 'seoMetadataPrompt',
  input: {schema: SEOMetadataInputSchema},
  output: {schema: SEOMetadataOutputSchema},
  prompt: `You are an SEO expert. Generate SEO-friendly metadata for a {{{pageType}}} page with the following content:\n\nContent: {{{content}}}\n\nTitle:  # An SEO title, fewer than 60 characters.\nDescription: # An SEO description, fewer than 160 characters. Use sentence case and active voice. Do not start with 'This page is about'.\nKeywords: # A comma separated list of SEO keywords. Limit to 10 keywords.\n`,
});

const generateSEOMetadataFlow = ai.defineFlow(
  {
    name: 'generateSEOMetadataFlow',
    inputSchema: SEOMetadataInputSchema,
    outputSchema: SEOMetadataOutputSchema,
  },
  async input => {
    const {output} = await seoMetadataPrompt(input);
    return output!;
  }
);
