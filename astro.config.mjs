import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://agss3199.github.io/topaitoolrank-antigravity',
  base: '/topaitoolrank-antigravity',
  integrations: [tailwind()],
});
