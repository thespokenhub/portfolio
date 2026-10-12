# Nelson Ansah: portfolio site

This site implements the `V2 A - Poster -Rust-` design from Claude Design. It uses Vite, React, and TypeScript, and has no other runtime dependencies.

```
npm install
npm run dev      # local dev server
npm run build    # static build in dist/, deployable to Vercel, Netlify, or any static host
```

- **Copy and numbers:** everything is in `src/data.ts`. All metrics are placeholders, so swap in real figures before publishing.
- **Colors:** the tokens are at the top of `src/styles.css`. Change `--accent` to switch the rust to green (`#1E7B57`) or blue (`#3B54FF`).
- **Pages:** normal URLs (`/work`, `/work/<case-id>`, `/what-i-do`, `/about`, `/contact`), defined in `src/routes.ts` along with each page's title and description. The build writes one HTML file per page, so search engines and link previews see the right title, plus `sitemap.xml`, `robots.txt`, and a `404.html`. Old `#` links forward to the new URLs.
- **Booking:** the contact page embeds Calendly (`LINKS.calendly` in `src/data.ts`), so visitors book straight into your calendar. Every "Book a call" button goes to that page.

## Deploy to Vercel

1. In Vercel, go to **Add New → Project**, and import this repo. Vercel detects Vite on its own (build `npm run build`, output `dist`).
2. Deploy. Every push to the main branch redeploys.

Or, from your own machine: `npx vercel --prod`.
