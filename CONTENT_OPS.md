# Content Operations Guide

This guide outlines how to manage, create, and publish content for TopAIToolRank.com.

## Content Types

1. **Articles (`src/content/articles/`)**
   - Standard blog posts, comparisons, and reviews.
   - Required frontmatter: `title`, `description`, `pubDate`, `author`, `category`, `tags`, `status`.
   - Optional frontmatter: `pillarId` (to link to a parent pillar).

2. **Pillars (`src/content/pillars/`)**
   - Broad topic hubs that act as parents for multiple articles.
   - Required frontmatter: `title`, `description`, `pubDate`, `category`, `status`.

## The Publishing Workflow

### 1. Creating Content
You can write MDX files directly into the content folders.
- Use `draft` status while writing.
- Use `review` status if waiting for editorial checks.
- Use `published` status to make it live.

### 2. Internal Linking Strategy
- Always link up to the parent pillar.
- Link horizontally to related articles in the same category.
- The `generate-related-content-map` script (to be built) will automate internal link suggestions.

### 3. Homepage Automation
The homepage (`src/pages/index.astro`) automatically pulls content based on the `status` flag and `pubDate`. 
- To feature an article, simply publish it.
- To update an article, change the `updatedDate` frontmatter, and it will appear in the "Recently Updated" section.

## Failure Points & Troubleshooting

1. **Missing Frontmatter:**
   - **Error:** Astro build fails with a Zod validation error.
   - **Fix:** Check the error log for the specific file and missing field (e.g., missing `description`), and add it to the MDX file.

2. **Orphan Pages:**
   - **Error:** A page has no inbound internal links.
   - **Fix:** Update a related pillar or article to include a markdown link to the new page.

3. **Deployment Fails:**
   - **Error:** GitHub Actions fails to build.
   - **Fix:** Ensure you run `npm run build` locally before pushing to catch any strict TypeScript or Zod errors.
