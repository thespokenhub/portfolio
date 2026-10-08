// All site copy and numbers live here. Every metric is a placeholder: swap in real figures before publishing.

export const LINKS = {
  calendly: 'https://calendly.com/theotherguyss/let-s-chat',
  linkedin: 'https://www.linkedin.com/in/thenelsonansah/',
  photo: 'https://framerusercontent.com/images/pwyZEYewDifAKMQdRwHA3F4ZsXc.png?width=842&height=1163',
};

export type Metric = { v: string; l: string };
export type Move = { area: string; text: string };
export type Chart = { label: string; x: string[]; y: number[] };
export type CaseStudy = {
  id: string;
  link?: string;
  linkLabel?: string;
  client: string;
  sector: string;
  areas: string[];
  title: string;
  metrics: Metric[];
  challenge: string;
  moves: Move[];
  outcome: string;
  chart?: Chart;
};

export const CASES: CaseStudy[] = [
  { id:'fintech', client:'O8', sector:'B2B SaaS, Series B', areas:['Editorial','Distribution','Measurement'],
    title:'Executing a content program that sourced $2.4M in pipeline',
    metrics:[{v:'$2.4M',l:'content-sourced pipeline in 12 months'},{v:'31%',l:'of SQLs touched content before the first call'},{v:'3',l:'flagship assets: an ebook, a report, and a whitepaper'}],
    challenge:'O8 had a strategy and a sales team asking for better material. What it needed was someone to ship the assets, get them in front of buyers, and show what they did for revenue.',
    moves:[
      {area:'Editorial',text:'Wrote and produced an ebook, a benchmark report, and a whitepaper, each built around a problem sales heard on almost every call.'},
      {area:'Research',text:'Ran the survey behind the benchmark report and turned the data into charts, a press pitch, and a webinar.'},
      {area:'Distribution',text:'Launched each asset across email, LinkedIn, paid syndication, and partner newsletters.'},
      {area:'Measurement',text:'Built a Looker Studio dashboard that ties every download and content touch to opportunities in HubSpot.'},
      {area:'Sales',text:'Cut each asset into one-pagers and follow-up emails that reps used in late-stage deals.'}],
    outcome:'The three assets became O8\'s second-largest source of pipeline after outbound, and content got its own slide in the board deck.',
    chart:{label:'Content-sourced pipeline by quarter ($K)',x:['Q1','Q2','Q3','Q4'],y:[180,420,760,1040]} },
  { id:'other-guys', link:'https://deotherguys.com', linkLabel:'Visit The Other Guys', client:'The Other Guys', sector:'Content agency, 14 B2B clients', areas:['Systems','Team','Editorial'],
    title:'Running an agency on a content system I built',
    metrics:[{v:'9→3',l:'days from brief to first draft'},{v:'2.6×',l:'pieces per writer per month'},{v:'14',l:'clients on one workflow'}],
    challenge:'Six writers, fourteen clients, and every piece passing through my inbox at least four times. Our capacity was capped by my calendar.',
    moves:[
      {area:'Systems',text:'Mapped every step from topic to report, then rebuilt it in Airtable with an owner, status, and due date on every piece.'},
      {area:'Automation',text:'Built Claude and n8n workflows for briefs, first-pass edits, social cuts, and client reports.'},
      {area:'Editorial',text:'Wrote the house style guide and an AI-tell checklist that every draft clears before an editor sees it.'},
      {area:'Team',text:'Hired and trained two editors, so client sign-off no longer waits on me.'},
      {area:'Design',text:'Designed the brief, report, and proposal templates in Figma, so every client gets the same quality of document.'}],
    outcome:'Turnaround dropped from nine days to three, and the same six writers now handle more than twice the volume.',
    chart:{label:'Pieces shipped per month',x:['Jan','Mar','May','Jul','Sep','Nov'],y:[22,26,34,41,52,58]} },
  { id:'clickup', link:'https://clickup.com/blog/how-to-manage-a-software-development-team-remotely/', linkLabel:'Read the guide', client:'ClickUp', sector:'Project management software', areas:['SEO & AI search','Editorial','Distribution'],
    title:'Engineering-management guides that rank on a crowded first page',
    metrics:[{v:'1.2M',l:'organic sessions @ EOY'},{v:'21',l:'target terms in the top three'},{v:'38',l:'guides written and optimized'}],
    challenge:'ClickUp\'s buyers search terms where Asana, Monday, and Atlassian already own the first page. The strategy was set. The guides had to be good enough to beat pages with years of authority behind them.',
    moves:[
      {area:'Editorial',text:'Wrote guides like How to Manage a Software Development Team Remotely, each one built around a real manager\'s week.'},
      {area:'SEO & AI search',text:'Handled on-page SEO and internal links, structured pages for featured snippets and AI answers, and tracked citations in ChatGPT and Perplexity.'},
      {area:'Distribution',text:'Cut each guide into LinkedIn posts and newsletter features, so it reached readers in its first week.'}],
    outcome:'Twenty-one target terms reached the top three within eight months, and the guides brought in 1.2M organic sessions in their first year.',
    chart:{label:'Monthly organic sessions (K)',x:['M1','M2','M3','M4','M5','M6','M7','M8'],y:[8,19,34,52,71,88,104,121]} },
  { id:'synthesia', link:'https://nelsonansah.framer.website/store/synthesia', linkLabel:'Read a hub guide', client:'Synthesia', sector:'AI video', areas:['SEO & AI search','Design','Measurement'],
    title:'A compliance training hub that sells inside the tutorial',
    metrics:[{v:'41K',l:'monthly visits to the hub'},{v:'9%',l:'of inbound demo requests'},{v:'120+',l:'referring domains'}],
    challenge:'L&D managers have to produce compliance training every year, and few enjoy it. Synthesia needed to reach them while they searched for how-tos, then show video as the easier path.',
    moves:[
      {area:'Strategy',text:'Mapped 30 compliance topics by search volume and deal size with the sales team.'},
      {area:'Editorial',text:'Wrote the hub\'s guides with copy-ready scripts and templates.'},
      {area:'Design',text:'Designed downloadable template packs in Figma. They earned most of the backlinks.'},
      {area:'Measurement',text:'Set up HubSpot attribution, so sales could see which guides came before a demo request.'}],
    outcome:'The hub reached 41,000 monthly visits and now sits behind about 9% of inbound demo requests.' },
  { id:'skilljar', link:'https://nelsonansah.framer.website/store/skilljar', linkLabel:'Read the guide', client:'Skilljar', sector:'Customer education', areas:['Editorial','Design','Sales'],
    title:'Owning the product adoption conversation for CS leaders',
    metrics:[{v:'#1',l:'for "product adoption metrics"'},{v:'3.4K',l:'calculator downloads'},{v:'380',l:'backlinks'}],
    challenge:'Customer success leaders search for adoption metrics, read, and leave. Skilljar wanted them to connect adoption to training and come back.',
    moves:[
      {area:'Editorial',text:'Wrote the definitive guide, with a formula and a worked example for each metric.'},
      {area:'Design & web',text:'Designed an adoption calculator in Figma and shipped it in Webflow as a gated tool.'},
      {area:'Distribution',text:'Pitched the data to three CS newsletters and a podcast.'},
      {area:'Sales',text:'Gave sales a one-page version to use on discovery calls.'}],
    outcome:'The guide took the top spot for its main term, and the calculator became one of Skilljar\'s steadiest lead sources.' },
  { id:'sprig', link:'https://nelsonansah.framer.website/projects/sprig', linkLabel:'Read a blog post', client:'Sprig', sector:'Product research', areas:['Editorial','SEO & AI search','Distribution'],
    title:'A blog and newsletter product teams forward to each other',
    metrics:[{v:'85K',l:'monthly blog visits'},{v:'12K',l:'newsletter subscribers, from zero'},{v:'22%',l:'of trials came from readers'}],
    challenge:'Sprig\'s readers run research for a living, and they leave the moment a piece sounds like it was written by someone who has never run a study.',
    moves:[
      {area:'Editorial',text:'Wrote blog guides on survey design, concept testing, and in-product feedback, with researchers at other companies quoted in each one.'},
      {area:'SEO & AI search',text:'Built the blog around the questions product teams search before choosing a research tool.'},
      {area:'Newsletter',text:'Turned the best blog piece each week into a teardown of how a real product team ran a study.'},
      {area:'Design',text:'Designed the issue template and a recurring chart format that readers screenshot and share.'}],
    outcome:'The blog grew to 85,000 monthly visits, the list reached 12,000 subscribers, and readers made up more than a fifth of new trials.',
    chart:{label:'Subscribers (K)',x:['Q1','Q2','Q3','Q4','Q5','Q6'],y:[1.1,2.8,4.9,7.2,9.6,12]} },
  { id:'igotanoffer', link:'https://nelsonansah.framer.website/projects/igotanoffer', linkLabel:'Read a guide', client:'IGotAnOffer', sector:'Interview prep', areas:['Editorial','Systems'],
    title:'Interview guides built from hours of coach interviews',
    metrics:[{v:'2.1M',l:'reads across the guides'},{v:'60+',l:'company guides'},{v:'1',l:'edit round on average'}],
    challenge:'Readers are preparing for one specific interview at one company. The advice has to come from someone who has sat on that hiring panel.',
    moves:[
      {area:'Interviews',text:'Ran and mined coach interviews for the advice you only get from a former interviewer.'},
      {area:'Editorial',text:'Added a verification step, so every claim is checked against its primary source before drafting.'},
      {area:'Systems',text:'Turned past editor feedback into a Claude review pass, so the same note never comes back twice.'}],
    outcome:'Guides now clear editorial review in one round on average, down from three.' },
  { id:'roofr', link:'https://roofr.com/blog', linkLabel:'Read the blog', client:'Roofr', sector:'Roofing software', areas:['Strategy','SEO & AI search','Design'],
    title:'Helping Roofr own the roofing category',
    metrics:[{v:'300K',l:'monthly organic visits'},{v:'150+',l:'guides, templates, and tools'},{v:'4×',l:'trial signups from organic'}],
    challenge:'Roofers don\'t search like software buyers. They search for how to price a job, measure a roof, or write an estimate. Roofr needed to be the answer to all of it, ahead of directories and supplier blogs.',
    moves:[
      {area:'Strategy',text:'Mapped the whole roofing business, from lead to invoice, and built a topic plan around every job a contractor does.'},
      {area:'Editorial',text:'Wrote guides with contractors quoted in them, on pricing, estimates, materials, and running a crew.'},
      {area:'Design',text:'Designed free estimate, contract, and invoice templates that roofers download and share.'},
      {area:'SEO & AI search',text:'Built clusters and internal links so Roofr shows up for roofing questions in Google and in AI answers.'}],
    outcome:'Roofr became the default answer for roofing business searches, and organic turned into its largest source of trial signups.',
    chart:{label:'Monthly organic visits (K)',x:['Q1','Q2','Q3','Q4','Q5','Q6'],y:[40,75,120,180,240,300]} },
  { id:'localseoguide', link:'https://www.localseoguide.com/', linkLabel:'Visit Local SEO Guide', client:'Local SEO Guide', sector:'SEO agency', areas:['Editorial','SEO & AI search','Distribution'],
    title:'Turning an SEO agency\'s know-how into content that wins clients',
    metrics:[{v:'2.3×',l:'organic traffic in 12 months'},{v:'40+',l:'expert articles'},{v:'65',l:'inbound leads a quarter'}],
    challenge:'An SEO agency is judged by its own rankings. Local SEO Guide\'s team knew more than most, but it lived in client calls and Slack threads.',
    moves:[
      {area:'Interviews',text:'Interviewed the agency\'s SEOs and turned their client work into practical guides for multi-location brands.'},
      {area:'Editorial',text:'Wrote and edited the articles in the team\'s voice, with real examples and data from their audits.'},
      {area:'SEO & AI search',text:'Targeted the local SEO questions marketing leads search before hiring an agency.'},
      {area:'Distribution',text:'Repurposed each article into the newsletter and LinkedIn posts for the founders.'}],
    outcome:'Organic traffic more than doubled in a year, and the blog became the agency\'s most reliable source of inbound leads.' },
  { id:'akwaa', link:'https://akwaaadvisors.vercel.app/', linkLabel:'Visit the live site', client:'AkwaaAdvisors', sector:'Education services', areas:['Design','Strategy','SEO & AI search'],
    title:'A full site: positioning, copy, design, and code',
    metrics:[{v:'18K',l:'monthly visits'},{v:'1,900',l:'ebook signups'},{v:'240',l:'consult calls booked'}],
    challenge:'A study-abroad advisory needed a site that ranks for scholarship searches and turns anxious parents into booked calls. There was no dev team.',
    moves:[
      {area:'Positioning',text:'Built the story around what a family will actually pay, the first question every parent asks.'},
      {area:'Editorial',text:'Wrote the services pages, a guide library across seven topic hubs, and a 43-page ebook for the email signup.'},
      {area:'Design & web',text:'Designed the site and coded it with Claude Code on Next.js and Vercel.'},
      {area:'SEO & AI search',text:'Built topic clusters around scholarship and financial aid searches.'}],
    outcome:'The site reached 18,000 monthly visits within six months and books calls every week without paid ads.' },
];

export const FEATURED = ['fintech', 'roofr', 'clickup', 'other-guys'];

export const SCOPE = [
  {name:'Strategy', line:'Content strategy tied to revenue targets, ICP research, and the narrative every piece is written from.', tools:'Gong, HubSpot, customer interviews'},
  {name:'Editorial', line:'Voice, standards, editing, thought leadership, research reports, and founder ghostwriting.', tools:'Google Docs, Claude, a style guide that gets enforced'},
  {name:'SEO & AI search', line:'Topic maps, technical fixes with the web team, and getting cited in ChatGPT, Perplexity, and Google\'s AI answers.', tools:'Ahrefs, Semrush, Search Console, Profound'},
  {name:'Distribution', line:'Newsletter, LinkedIn, communities, partnerships, syndication, and paid amplification.', tools:'Beehiiv, Customer.io, LinkedIn Ads, Typefully'},
  {name:'Design & web', line:'Landing pages, content design, templates, and shipping pages myself.', tools:'Figma, Framer, Webflow, Claude Code'},
  {name:'Systems', line:'Content ops with an owner and a status on every piece, plus workflows for everything that repeats.', tools:'Airtable, Notion, n8n, Zapier, Claude'},
  {name:'Team & budget', line:'Hiring writers, editors, and designers, managing agencies, and owning the content budget.', tools:'Briefs, scorecards, a weekly 1:1'},
  {name:'Measurement', line:'Attribution, dashboards, and a monthly report leadership reads.', tools:'GA4, HubSpot, Looker Studio, Mixpanel'},
  {name:'Sales & product', line:'Enablement, customer stories, launches, and product marketing support.', tools:'Highspot, Loom, Descript'},
];

export const TOOLS = [
  {group:'AI & build', list:'Claude, Claude Code, ChatGPT, Perplexity, Cursor'},
  {group:'Search', list:'Ahrefs, Semrush, Search Console, Clearscope, Profound'},
  {group:'Data', list:'GA4, HubSpot, Looker Studio, Mixpanel, Amplitude'},
  {group:'Ops & automation', list:'Airtable, Notion, n8n, Zapier, Make, Linear'},
  {group:'Design & web', list:'Figma, Framer, Webflow, WordPress, Canva, Descript'},
  {group:'Distribution', list:'Beehiiv, Customer.io, Typefully, LinkedIn Ads, Reddit Ads'},
];

export const EDITS = [
  {label:'Blog intro', before:'In today\'s rapidly evolving SaaS landscape, product adoption has become more important than ever. It\'s not just about getting users to sign up. It\'s about helping them unlock the full value of your platform. By leveraging customer education, companies can foster deeper engagement, drive retention, and ultimately fuel sustainable growth.', after:'A lot of churn starts in accounts that never finished setup. If you run customer training, check feature usage in the week after each session, while you can still fix it.', notes:['Cut the "In today\'s…" opener.','Dropped the "not just X, it\'s Y" turn.','Swapped unlock, leverage, and foster for something the reader can do.','Ended on a check instead of a slogan.']},
  {label:'Landing page', before:'Unlock the power of seamless customer insights. Our cutting-edge platform empowers teams to make smarter, faster, data-driven decisions.', after:'See why users drop off while they\'re still in your product. Ask one question on the exact screen where they get stuck.', notes:['Replaced four buzzwords with one outcome.','Named the moment the product earns its keep.','Gave the reader a picture of using it.']},
  {label:'LinkedIn post', before:'I made a mistake.\n\nAnd it taught me something.\n\nWe published 40 blog posts last quarter. The result? Crickets. 🦗\n\nThe lesson is clear: quality > quantity. Agree?', after:'We published 40 posts last quarter. Six of them drove 80% of signups, and all six answered a question sales had heard that month. This quarter we\'re writing 15, and every brief starts in Gong.', notes:['Dropped the fake-vulnerability opener.','Swapped the moral for the numbers.','Ended on what changes next quarter.']},
];

export const STATS: Metric[] = [
  {v:'$2.4M',l:'content-sourced pipeline in 12 months'},
  {v:'300K',l:'monthly organic visits for Roofr, the leader in roofing software search'},
  {v:'9→3',l:'days from brief to draft across 14 agency clients'},
  {v:'2.1M',l:'reads on interview guides built from coach transcripts'},
];

export const PLAN = [
  {when:'0–30', head:'Listen and ship', items:['Sit in on sales calls and read the last 50 support tickets.','Audit what\'s live: what ranks, what gets cited, what\'s dead weight.','Publish two pieces in the first month anyway.']},
  {when:'31–60', head:'Set the system', items:['Present the strategy, the calendar, and the one number we\'ll report on.','Stand up the workflow in Airtable or Notion, with owners and dates.','Ship the first automations and the first monthly report.']},
  {when:'61–90', head:'Scale what works', items:['Prune or rewrite the pages that drag.','Hire or brief freelancers against a scorecard.','Launch the first flagship asset, like a report or a tool.']},
];

export const TIMELINE = [
  {when:'2026 to now', role:'Founder', org:'The Other Guys, content agency', what:'Strategy, editing, design, and ops for 14 B2B clients. Built the agency\'s content system on Claude, n8n, and Airtable.'},
  {when:'2024 to 2025', role:'Head of Content', org:'O8, Series B SaaS', what:'Wrote and launched an ebook, a benchmark report, and a whitepaper that sourced $2.4M in pipeline.'},
  {when:'2022 to 2024', role:'Senior Content Marketer', org:'B2B SaaS content agency', what:'Ran SEO and editorial programs for ClickUp, Synthesia, and Skilljar, and briefed and edited a pool of freelancers.'},
  {when:'2020 to 2022', role:'Content Writer', org:'Freelance', what:'Long-form B2B content for Sprig, IGotAnOffer, and early-stage startups.'},
];

export const PRINCIPLES = [
  {head:'I start in sales calls', body:'The best topics come from what buyers ask before they buy. I listen before I plan.'},
  {head:'I ship in month one', body:'You\'ll see published work in the first 30 days, while the bigger strategy is still taking shape.'},
  {head:'I report on revenue', body:'Pipeline, signups, and AI citations, every month, on one page leadership will read.'},
  {head:'I automate the repeat work', body:'Anything I do by hand three times becomes a workflow, so the team spends its time on judgment.'},
  {head:'I keep your voice', body:'Founders and experts sound like themselves in what we publish, quoted and on the record.'},
];
