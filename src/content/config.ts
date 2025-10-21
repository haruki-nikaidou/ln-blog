import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Review collection schema
const reviewCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/review' }),
  schema: z.object({
    novelId: z.string(),
    title: z.string(),
    sortNumber: z.number(),
    publishedAt: z.date(),
    updatedAt: z.date().nullable().optional(),
    level: z.enum(['spoilerSafe', 'spoilerAlert', 'techniqueReview']).default('spoilerAlert'),
  }),
});

// Tag collection schema
const tagCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/tag' }),
  schema: z.object({
    id: z.string(),
    category: z.enum([
      'majorCategory',
      'minorCategory',
      'character',
      'technique',
      'pattern',
      'publisher',
      'review',
    ]),
    name: z.string(),
  }),
});

// Blog collection schema
const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.date(),
    updatedAt: z.date().nullable().optional(),
    isPinned: z.boolean().default(false),
  }),
});

export const collections = {
  review: reviewCollection,
  tag: tagCollection,
  blog: blogCollection,
};

