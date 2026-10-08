import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Link previews need absolute URLs. Vercel sets VERCEL_PROJECT_PRODUCTION_URL at build time
// (your custom domain once one is added); SITE_URL overrides it for other hosts.
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL : '')
).replace(/\/$/, '');

const siteUrlPlugin = (): Plugin => ({
  name: 'site-url',
  transformIndexHtml: html => html.replaceAll('%SITE_URL%', siteUrl),
});

export default defineConfig({
  plugins: [react(), siteUrlPlugin()],
});
