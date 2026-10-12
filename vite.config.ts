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

// robots.txt and sitemap.xml are generated at build time so they carry the absolute site URL.
// Pages are hash routes (#work, #about), which search engines treat as one page, so the sitemap lists the root.
const seoFilesPlugin = (): Plugin => ({
  name: 'seo-files',
  apply: 'build',
  generateBundle() {
    const robots = ['User-agent: *', 'Allow: /'];
    if (siteUrl) {
      robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`);
      const lastmod = new Date().toISOString().slice(0, 10);
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`,
      });
    }
    this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' });
  },
});

export default defineConfig({
  plugins: [react(), siteUrlPlugin(), seoFilesPlugin()],
});
