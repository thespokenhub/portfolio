// URL paths and per-page metadata. Used by the app for navigation and by vite.config.ts to
// write one HTML file per page, so search engines and link previews see the right title.
import { CASES } from './data';

export type Page =
  | { kind: 'home' }
  | { kind: 'work' }
  | { kind: 'case'; id: string }
  | { kind: 'scope' }
  | { kind: 'about' }
  | { kind: 'contact' }
  | { kind: 'notFound' };

export const PATHS = { home: '/', work: '/work', scope: '/what-i-do', about: '/about', contact: '/contact' } as const;

export const caseHref = (id: string) => `${PATHS.work}/${id}`;

export function parsePath(pathname: string): Page {
  const p = pathname.replace(/\/+$/, '') || '/';
  if (p === PATHS.home) return { kind: 'home' };
  if (p === PATHS.work) return { kind: 'work' };
  if (p === PATHS.scope) return { kind: 'scope' };
  if (p === PATHS.about) return { kind: 'about' };
  if (p === PATHS.contact) return { kind: 'contact' };
  const m = p.match(/^\/work\/([^/]+)$/);
  if (m && CASES.some(c => c.id === m[1])) return { kind: 'case', id: m[1] };
  return { kind: 'notFound' };
}

const LEGACY_CASE_IDS: Record<string, string> = { fintech: 'o8' };

// Links shared before the switch used hashes (#work/roofr, #scope). Map them to the new paths.
export function pathFromLegacyHash(hash: string): string | null {
  const [r, id] = hash.replace(/^#/, '').split('/');
  if (!r) return null;
  if (r === 'home') return PATHS.home;
  if (r === 'work') {
    const caseId = id && (LEGACY_CASE_IDS[id] ?? id);
    return caseId && CASES.some(c => c.id === caseId) ? caseHref(caseId) : PATHS.work;
  }
  if (r === 'scope') return PATHS.scope;
  if (r === 'about') return PATHS.about;
  if (r === 'contact') return PATHS.contact;
  return null;
}

export type PageMeta = { path: string; title: string; description: string };

const SITE = 'Nelson Ansah';
const HOME_DESCRIPTION = 'I build content programs that bring in pipeline for B2B software companies, from strategy and editorial to distribution, design, and automation.';

export function pageMeta(page: Page): PageMeta {
  switch (page.kind) {
    case 'home':
      return { path: PATHS.home, title: `${SITE} · Head of Content`, description: HOME_DESCRIPTION };
    case 'work':
      return { path: PATHS.work, title: `Results · ${SITE}`, description: 'Ten content programs, from a single content cluster to owning a whole category, with the number leadership cared about for each one.' };
    case 'case': {
      const c = CASES.find(x => x.id === page.id)!;
      const title = c.title.includes(c.client) ? c.title : `${c.client}: ${c.title}`;
      return { path: caseHref(c.id), title: `${title} · ${SITE}`, description: c.outcome };
    }
    case 'scope':
      return { path: PATHS.scope, title: `What I do · ${SITE}`, description: 'Strategy, editorial, SEO and AI search, distribution, design, systems, team, measurement, and sales support, plus my plan for the first 90 days.' };
    case 'about':
      return { path: PATHS.about, title: `About · ${SITE}`, description: 'Six years in B2B content, from writing long-form guides to running a content agency. Next, I want to run content inside one company.' };
    case 'contact':
      return { path: PATHS.contact, title: `Book a call · ${SITE}`, description: 'Pick a time for a 30-minute call about your content program.' };
    case 'notFound':
      return { path: '/404', title: `Page not found · ${SITE}`, description: HOME_DESCRIPTION };
  }
}

// Every indexable page, in sitemap order.
export const ALL_PAGES: Page[] = [
  { kind: 'home' }, { kind: 'work' }, ...CASES.map(c => ({ kind: 'case', id: c.id }) as Page),
  { kind: 'scope' }, { kind: 'about' }, { kind: 'contact' },
];
