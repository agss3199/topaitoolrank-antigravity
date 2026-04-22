import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(70, "SEO title should be under 70 chars"),
    description: z.string().max(160, "SEO description should be under 160 chars"),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    pillarId: z.string().optional(),
    status: z.enum(['draft', 'review', 'published']).default('draft'),
  })
});

const pillars = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    category: z.string(),
    status: z.enum(['draft', 'review', 'published']).default('draft'),
  })
});

export const collections = {
  articles,
  pillars
};
