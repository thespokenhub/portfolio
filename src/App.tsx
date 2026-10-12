import { useEffect, useState, type ReactNode } from 'react';
import {
  CASES, EDITS, FEATURED, LINKS, PLAN, PRINCIPLES, SCOPE, STATS, TIMELINE, TOOLS,
} from './data';
import { caseHref, parsePath, pathFromLegacyHash, pageMeta, PATHS, type Page } from './routes';

type NavKey = 'work' | 'scope' | 'about' | 'contact';
const NAV: [NavKey, string][] = [['work', 'Results'], ['scope', 'What I do'], ['about', 'About'], ['contact', 'Contact']];

const pad = (i: number) => String(i + 1).padStart(2, '0');

function navigate(path: string) {
  if (path === window.location.pathname) return;
  window.history.pushState(null, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}

function usePage(): Page {
  const [page, setPage] = useState<Page>(() => {
    const legacy = pathFromLegacyHash(window.location.hash);
    if (legacy) window.history.replaceState(null, '', legacy);
    return parsePath(window.location.pathname);
  });
  useEffect(() => {
    const onPop = () => setPage(parsePath(window.location.pathname));
    // Handle same-origin links in the app without a full page load.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest('a');
      if (!a || a.target || a.hasAttribute('download') || a.origin !== window.location.origin) return;
      e.preventDefault();
      navigate(a.pathname);
    };
    window.addEventListener('popstate', onPop);
    document.addEventListener('click', onClick);
    return () => { window.removeEventListener('popstate', onPop); document.removeEventListener('click', onClick); };
  }, []);
  return page;
}

function setMeta(selector: string, attr: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value);
}

function External({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener" className={className}>{children}</a>;
}

export default function App() {
  const page = usePage();

  useEffect(() => {
    const m = pageMeta(page);
    const url = window.location.origin + m.path;
    document.title = m.title;
    setMeta('meta[name="description"]', 'content', m.description);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:title"]', 'content', m.title);
    setMeta('meta[property="og:description"]', 'content', m.description);
  }, [page]);

  const active = page.kind === 'case' ? 'work' : page.kind;
  return (
    <div className="page">
      <Header active={active} />
      <main>
        {page.kind === 'home' && <Home />}
        {page.kind === 'work' && <Work />}
        {page.kind === 'case' && <Case id={page.id} />}
        {page.kind === 'scope' && <Scope />}
        {page.kind === 'about' && <About />}
        {page.kind === 'contact' && <Contact />}
        {page.kind === 'notFound' && <NotFound />}
      </main>
      <Footer />
    </div>
  );
}

function Header({ active }: { active: string }) {
  return (
    <header className="header">
      <div className="wrap header-inner">
        <a href={PATHS.home} className="logo" aria-label="Home">N.</a>
        <nav className="nav">
          {NAV.map(([k, l]) => (
            <a key={k} href={PATHS[k]} className={active === k ? 'active' : undefined} aria-current={active === k ? 'page' : undefined}>{l}</a>
          ))}
        </nav>
        <a href={PATHS.contact} className="btn btn-accent header-cta">Book a call</a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span>© 2026 Nelson Ansah</span>
        <div className="footer-links">
          <a href={PATHS.work}>Results</a>
          <a href={PATHS.scope}>What I do</a>
          <External href={LINKS.linkedin}>LinkedIn</External>
          <a href={PATHS.about}>About</a>
          <a href={PATHS.contact}>Book a call</a>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Home ---------- */

function Home() {
  const featured = FEATURED.map(k => CASES.find(c => c.id === k)!);
  return (
    <>
      <section className="hero">
        <div className="wrap hero-inner">
          <div className="hero-tags"><span>Head of content</span><span>B2B SaaS</span><span>Seed to Series C</span></div>
          <h1 className="display">I build content programs that bring in pipeline.</h1>
          <div className="hero-foot">
            <p>For B2B software companies, I own the strategy and the editorial bar, plus the distribution, design, and automation that let a small team publish like a big one.</p>
            <div className="btn-row">
              <a href={PATHS.work} className="btn btn-white">See the results</a>
              <a href={PATHS.scope} className="btn btn-ghost-white">What I do</a>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-band">
        <div className="wrap stats">
          {STATS.map(s => (
            <div key={s.v} className="stat"><span className="num">{s.v}</span><span className="l">{s.l}</span></div>
          ))}
        </div>
      </section>

      <section className="wrap pad section">
        <div className="section-head">
          <h2 className="display h2">What I'll do for you</h2>
          <p>I'll own all nine parts of your content program. On a small team, I do most of it myself. As you grow, I hire for each one and build the system around it.</p>
        </div>
        <div className="grid-box scope-grid">
          {SCOPE.map((a, i) => (
            <a key={a.name} href={PATHS.scope} className="scope-cell">
              <span className="n">{pad(i)}</span>
              <span className="cond name">{a.name}</span>
              <span className="line">{a.line}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="wrap pad section section-tight">
        <div className="section-head" style={{ marginBottom: 28 }}>
          <h2 className="display h2">Results</h2>
          <a href={PATHS.work} className="caps" style={{ fontSize: 14 }}>All ten case studies →</a>
        </div>
        <div className="cards">
          {featured.map(c => (
            <a key={c.id} href={caseHref(c.id)} className="card">
              <span className="label">{c.client}</span>
              <span className="num">{c.metrics[0].v}</span>
              <span className="lead-l">{c.metrics[0].l}</span>
              <span className="title">{c.title}</span>
            </a>
          ))}
        </div>
      </section>

      <TheEdit />

      <section className="wrap pad section">
        <h2 className="display h2" style={{ marginBottom: 28 }}>The stack</h2>
        <div className="stack">
          {TOOLS.map(g => (
            <div key={g.group} className="stack-group">
              <div className="label">{g.group}</div>
              <div className="list">{g.list}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="wrap cta-inner">
          <h2 className="display">Building out content this year?</h2>
          <div className="btn-row">
            <a href={PATHS.contact} className="btn btn-white">Book a 30-minute call</a>
            <External href={LINKS.linkedin} className="btn btn-ghost-white">Message me on LinkedIn ↗</External>
          </div>
        </div>
      </section>
    </>
  );
}

function TheEdit() {
  const [idx, setIdx] = useState(0);
  const [after, setAfter] = useState(false);
  const ed = EDITS[idx];
  const text = after ? ed.after : ed.before;
  const words = text.split(/\s+/).filter(Boolean).length;
  return (
    <section className="edit">
      <div className="wrap pad section">
        <div className="section-head edit-head">
          <h2 className="display h2">The edit</h2>
          <p>Three drafts that came in, and what they looked like when they went out. Pick a sample, then flip it.</p>
        </div>
        <div className="edit-controls">
          <div className="tabs" role="tablist">
            {EDITS.map((e, i) => (
              <button key={e.label} role="tab" aria-selected={i === idx} className={'btn tab' + (i === idx ? ' active' : '')}
                onClick={() => { setIdx(i); setAfter(false); }}>{e.label}</button>
            ))}
          </div>
          <button className="btn btn-accent flip" onClick={() => setAfter(a => !a)}>{after ? 'Show the draft' : 'Show my edit'}</button>
        </div>
        <div className="edit-body">
          <div className="edit-text" aria-live="polite">
            <div className="label edit-meta">{after ? 'After' : 'Before'} · {words} words</div>
            <p className={'edit-copy' + (after ? '' : ' before')}>{text}</p>
          </div>
          <ul className="edit-notes">
            {ed.notes.map(n => <li key={n}><span className="mark" aria-hidden="true">✎</span><span>{n}</span></li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Results ---------- */

function Work() {
  const [filter, setFilter] = useState('All');
  const areas = ['All', ...Array.from(new Set(CASES.flatMap(c => c.areas)))].slice(0, 7);
  const shown = CASES.filter(c => filter === 'All' || c.areas.includes(filter));
  return (
    <section className="wrap pad page-top">
      <h1 className="display h1">Results</h1>
      <p className="intro">Ten programs, from a single content cluster to owning a whole category. The number on the left is the one leadership cared about.</p>
      <div className="filters">
        {areas.map(a => (
          <button key={a} aria-pressed={filter === a} className={'btn filter' + (filter === a ? ' active' : '')} onClick={() => setFilter(a)}>{a}</button>
        ))}
      </div>
      <div className="rows">
        {shown.map(c => (
          <a key={c.id} href={caseHref(c.id)} className="row">
            <span className="row-lead"><span className="num">{c.metrics[0].v}</span><span className="l">{c.metrics[0].l}</span></span>
            <span className="row-main"><span className="label">{c.client}</span><span className="title">{c.title}</span></span>
            <span className="row-areas">{c.areas.join(' · ')}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Case({ id }: { id: string }) {
  const idx = Math.max(0, CASES.findIndex(c => c.id === id));
  const c = CASES[idx];
  const next = CASES[(idx + 1) % CASES.length];
  const max = c.chart ? Math.max(...c.chart.y) : 1;
  return (
    <article>
      <div className="case-hero">
        <div className="wrap case-hero-inner">
          <a href={PATHS.work} className="label nolink">← All results</a>
          <div className="case-meta">{c.client} · {c.sector}</div>
          <h1 className="display">{c.title}</h1>
        </div>
      </div>
      <div className="wrap metrics">
        {c.metrics.map(m => (
          <div key={m.l} className="metric"><span className="num">{m.v}</span><span className="l">{m.l}</span></div>
        ))}
      </div>
      <div className="wrap case-body">
        <div className="case-main">
          <div>
            <h2 className="kicker">The problem</h2>
            <p className="lede">{c.challenge}</p>
          </div>
          <div>
            <h2 className="kicker">What I did</h2>
            <div className="moves">
              {c.moves.map(m => (
                <div key={m.area + m.text} className="move"><span className="move-area">{m.area}</span><span className="move-text">{m.text}</span></div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="kicker">What happened</h2>
            <p className="lede">{c.outcome}</p>
            {c.link && <External href={c.link} className="caps case-link">{c.linkLabel} ↗</External>}
          </div>
        </div>
        <aside className="case-aside">
          {c.link && (
            <External href={c.link} className="see-work">
              <span className="label">See the work</span>
              <span className="cond big"><span>{c.linkLabel}</span><span>↗</span></span>
            </External>
          )}
          {c.chart && (
            <figure className="chart" style={{ margin: 0 }}>
              <figcaption className="label">{c.chart.label}</figcaption>
              <div className="bars" role="img" aria-label={c.chart.x.map((x, i) => `${x}: ${c.chart!.y[i]}`).join(', ')}>
                {c.chart.y.map((y, i) => (
                  <div key={i} className="bar-col">
                    <div className="bar" style={{ height: Math.round(y / max * 100) + '%' }} />
                    <span className="bar-x">{c.chart!.x[i]}</span>
                  </div>
                ))}
              </div>
            </figure>
          )}
          <a href={caseHref(next.id)} className="next">
            <span className="label">Next →</span>
            <span className="title">{next.title}</span>
          </a>
        </aside>
      </div>
    </article>
  );
}

/* ---------- What I do ---------- */

function Scope() {
  return (
    <>
      <section className="wrap pad scope-page">
        <h1 className="display h1" style={{ marginBottom: 12 }}>What I do for you</h1>
        <p className="intro">Here's what you get when I run your content, and the tools I use for each part.</p>
        <div className="rows">
          {SCOPE.map((a, i) => (
            <div key={a.name} className="scope-row">
              <span className="n">{pad(i)}</span>
              <span className="cond name">{a.name}</span>
              <span className="line">{a.line}</span>
              <span className="tools">{a.tools}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="wrap pad plan-section">
        <h2 className="display h2">The first 90 days</h2>
        <div className="plan">
          {PLAN.map(p => (
            <div key={p.when} className="plan-card">
              <span className="num">{p.when}</span>
              <span className="head">{p.head}</span>
              <ul>{p.items.map(i => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ---------- About ---------- */

function About() {
  return (
    <>
      <section className="wrap pad about-top">
        <div className="about-photo">
          <img src={LINKS.photo} alt="Nelson Ansah" />
          <div className="btn-row">
            <External href={LINKS.linkedin} className="btn btn-ink">LinkedIn ↗</External>
            <a href={PATHS.contact} className="btn btn-ghost-ink">Book a call</a>
          </div>
        </div>
        <div className="about-text">
          <div className="eyebrow">About</div>
          <h1 className="display">I started as a writer. Now I run the whole content program.</h1>
          <p>I'm Nelson Ansah. For six years, I've worked on content for B2B software companies, agency side, in-house, and freelance. I started out writing long-form guides for ClickUp, Synthesia, and Skilljar, and I learned early that a great piece nobody sees is a wasted line in the budget.</p>
          <p>Today I run The Other Guys, a content agency for early and growth-stage startups. I set strategy with founders, hire and edit the writers, design the assets, and build the systems that keep fourteen clients shipping every week.</p>
          <p>Next, I want to do that inside one company. I'd own content from the first hire to the board slide, and help take the business from its first $10M to its first $100M.</p>
        </div>
      </section>
      <section className="wrap pad about-section">
        <h2 className="display h2">Where I've been</h2>
        <div className="rows">
          {TIMELINE.map(r => (
            <div key={r.when} className="tl-row">
              <span className="tl-when">{r.when}</span>
              <span className="tl-role"><span className="cond">{r.role}</span><span className="org">{r.org}</span></span>
              <span className="tl-what">{r.what}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="wrap pad about-section">
        <h2 className="display h2">How I work</h2>
        <div className="grid-box principles">
          {PRINCIPLES.map(p => (
            <div key={p.head} className="principle"><span className="cond">{p.head}</span><span className="body">{p.body}</span></div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ---------- Contact ---------- */

function calendlyEmbedUrl() {
  const params = new URLSearchParams({
    embed_type: 'Inline',
    embed_domain: window.location.hostname,
    hide_gdpr_banner: '1',
    primary_color: 'a0441e',
    text_color: '0a0a0a',
    background_color: 'ffffff',
  });
  return LINKS.calendly + '?' + params.toString();
}

function Contact() {
  return (
    <section className="wrap pad contact">
      <div className="contact-intro">
        <h1 className="display">Let's talk about your content program</h1>
        <p>Pick a time for a 30-minute call. Tell me what you're building and where content stands today, and I'll come with a few ideas, including what I'd change in the first month.</p>
        <div className="contact-card">
          <img src={LINKS.photo} alt="Nelson Ansah" />
          <div>
            <strong>Nelson Ansah</strong>
            <External href={LINKS.linkedin}>Message me on LinkedIn ↗</External>
            <External href={LINKS.calendly}>Open Calendly in a new tab ↗</External>
          </div>
        </div>
      </div>
      <div className="booking">
        <iframe src={calendlyEmbedUrl()} title="Book a 30-minute call with Nelson Ansah" loading="lazy" />
      </div>
    </section>
  );
}

/* ---------- Not found ---------- */

function NotFound() {
  return (
    <section className="wrap pad page-top">
      <h1 className="display h1">Page not found</h1>
      <p className="intro">That link doesn't go anywhere on this site. The results are a good place to start.</p>
      <div className="btn-row">
        <a href={PATHS.work} className="btn btn-accent btn-lg">See the results</a>
        <a href={PATHS.home} className="btn btn-ghost-ink btn-lg">Go to the home page</a>
      </div>
    </section>
  );
}
