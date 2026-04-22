# TopAIToolRank.com

A premium, SEO-first AI tools directory and content platform built with Astro, Tailwind CSS, and MDX.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Integrations Setup

### GitHub Pages Deployment
This project is configured to be deployed to GitHub pages using GitHub Actions.
1. Go to your GitHub repository settings.
2. Under "Pages", set the source to "GitHub Actions".
3. The `.github/workflows/deploy.yml` (to be configured) will handle the rest.

### Custom Domain
1. In your domain registrar (e.g., Namecheap, Cloudflare), point the A records to GitHub's IPs.
2. In the GitHub repo settings -> Pages, add `topaitoolrank.com` as the custom domain.
3. Enforce HTTPS.

### Google Analytics 4 (GA4)
1. Create a GA4 property in your Google Analytics account.
2. Copy the Measurement ID (G-XXXXXXXXXX).
3. Add the tracking script to `src/layouts/BaseLayout.astro` within the `<head>` tag.

### Google Search Console (GSC)
1. Go to Google Search Console and add a new property for `https://topaitoolrank.com`.
2. Use the Domain name provider method (DNS TXT record) for verification.
3. Once the site is live, submit the auto-generated sitemap at `https://topaitoolrank.com/sitemap-index.xml`.

## Architecture Overview
- **Astro**: Static site generator prioritizing fast load times.
- **Content Collections**: Stored in `src/content/` with Zod validation.
- **Tailwind CSS**: Utility-first styling with a custom `brand` color palette.
