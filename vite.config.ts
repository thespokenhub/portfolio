import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { ALL_PAGES, pageMeta, type PageMeta } from './src/routes';

// Link previews, canonical tags, and the sitemap need absolute URLs. Vercel sets
// VERCEL_PROJECT_PRODUCTION_URL at build time (your custom domain once one is added);
// SITE_URL overrides it for other hosts.
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL : '')
).replace(/\/$/, '');

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const fillHead = (html: string, m: PageMeta) =>
  html
    .replaceAll('%PAGE_TITLE%', escapeHtml(m.title))
    .replaceAll('%PAGE_DESCRIPTION%', escapeHtml(m.description))
    .replaceAll('%PAGE_URL%', siteUrl + m.path);

// In dev, index.html gets the home page's tags. In a build, the placeholders are kept and
// pagesPlugin writes one HTML file per page from the built template.
const headPlugin = (): Plugin => ({
  name: 'page-head',
  transformIndexHtml: (html, ctx) => {
    const withSite = html.replaceAll('%SITE_URL%', siteUrl);
    return ctx.server ? fillHead(withSite, pageMeta({ kind: 'home' })) : withSite;
  },
});

// Writes /work.html, /work/roofr.html and so on (served at /work and /work/roofr through
// cleanUrls in vercel.json), a 404.html, sitemap.xml, and robots.txt.
const pagesPlugin = (): Plugin => {
  let outDir = 'dist';
  return {
    name: 'static-pages',
    apply: 'build',
    configResolved: config => { outDir = resolve(config.root, config.build.outDir); },
    closeBundle() {
      const template = readFileSync(resolve(outDir, 'index.html'), 'utf8');
      const write = (file: string, content: string) => {
        const full = resolve(outDir, file);
        mkdirSync(dirname(full), { recursive: true });
        writeFileSync(full, content);
      };

      const metas = ALL_PAGES.map(pageMeta);
      for (const m of metas) write(m.path === '/' ? 'index.html' : m.path.slice(1) + '.html', fillHead(template, m));

      const notFound = fillHead(template, pageMeta({ kind: 'notFound' }))
        .replace(/\s*<link rel="canonical"[^>]*>/, '')
        .replace('</head>', '  <meta name="robots" content="noindex" />\n  </head>');
      write('404.html', notFound);

      const robots = ['User-agent: *', 'Allow: /'];
      if (siteUrl) {
        robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`);
        const lastmod = new Date().toISOString().slice(0, 10);
        const urls = metas.map(m => `  <url>\n    <loc>${siteUrl}${m.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`);
        write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
      }
      write('robots.txt', robots.join('\n') + '\n');
    },
  };
};

export default defineConfig({
  plugins: [react(), headPlugin(), pagesPlugin()],
});
