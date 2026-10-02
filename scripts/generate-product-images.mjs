/**
 * Renders original placeholder screenshots for every demonstration product,
 * plus blog covers and the default Open Graph image, using Playwright.
 *
 *   npm run images            # all
 *   npm run images -- aurum   # one product
 *
 * Each product is a small, self-contained HTML mock-site (see templates
 * below). They are PDThemes originals, not copies of any existing website,
 * and exist only until real product screenshots are available.
 */
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("public/images");
const only = process.argv[2];

const palettes = {
  aurum: { bg: "#f3efe7", ink: "#1c1a16", accent: "#b5673a", soft: "#e8dccb", font: "'Fraunces', Georgia, serif", ui: "Geist, system-ui" },
  kontor: { bg: "#f7f6f2", ink: "#121212", accent: "#2f4a7a", soft: "#dfe4ea", font: "Geist, system-ui", ui: "Geist, system-ui" },
  nordlicht: { bg: "#101113", ink: "#f2f1ec", accent: "#9fd1c7", soft: "#1c1f24", font: "'Fraunces', Georgia, serif", ui: "Geist, system-ui" },
  gazette: { bg: "#fbfaf6", ink: "#141414", accent: "#c0262c", soft: "#e9e5d8", font: "'Fraunces', Georgia, serif", ui: "Geist, system-ui" },
  lumen: { bg: "#fffdf8", ink: "#1a1915", accent: "#5b6b4a", soft: "#efeadc", font: "'Fraunces', Georgia, serif", ui: "Geist, system-ui" },
  formwerk: { bg: "#f6f7f7", ink: "#1e1f21", accent: "#3858e9", soft: "#e2e6f6", font: "Geist, system-ui", ui: "Geist, system-ui" },
  tempo: { bg: "#f4f6f4", ink: "#161a17", accent: "#1f8a5c", soft: "#dcebe2", font: "Geist, system-ui", ui: "Geist, system-ui" },
  gridwerk: { bg: "#f8f5f0", ink: "#191714", accent: "#e4572e", soft: "#f0e6d8", font: "Geist, system-ui", ui: "Geist, system-ui" },
};

const fontCss = `
@font-face{font-family:"Fraunces";font-style:normal;font-weight:300 900;src:url("file://${path.resolve("public/fonts/fraunces-normal-latin.woff2")}") format("woff2");}
@font-face{font-family:"Fraunces";font-style:italic;font-weight:300 900;src:url("file://${path.resolve("public/fonts/fraunces-italic-latin.woff2")}") format("woff2");}
@font-face{font-family:"Geist";font-style:normal;font-weight:300 800;src:url("file://${path.resolve("public/fonts/geist-normal-latin.woff2")}") format("woff2");}
`;

const base = (p) => `
${fontCss}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:${p.bg};color:${p.ink};font-family:${p.ui};-webkit-font-smoothing:antialiased}
.wrap{padding:0 clamp(16px,4vw,56px);max-width:1440px;margin:0 auto}
nav{display:flex;align-items:center;justify-content:space-between;height:72px}
nav .logo{font-family:${p.font};font-weight:600;font-size:22px;letter-spacing:-0.02em}
nav ul{display:flex;gap:28px;list-style:none;font-size:14px;opacity:.8}
nav .cta{border:1px solid currentColor;border-radius:999px;padding:8px 16px;font-size:13px}
.eyebrow{font-size:11px;letter-spacing:.14em;text-transform:uppercase;opacity:.6}
.art{position:relative;overflow:hidden;background:${p.soft};border-radius:14px}
.art::before{content:"";position:absolute;inset:0;background:
  radial-gradient(circle at 30% 30%, ${p.accent}55, transparent 45%),
  radial-gradient(circle at 75% 70%, ${p.ink}22, transparent 40%),
  linear-gradient(160deg, transparent 0 60%, ${p.accent}22 60% 100%)}
.art.alt::before{background:
  conic-gradient(from 210deg at 60% 40%, ${p.accent}44, transparent 30%, ${p.ink}18 60%, transparent 70%),
  radial-gradient(circle at 20% 80%, ${p.accent}33, transparent 40%)}
.art.alt2::before{background:
  linear-gradient(120deg, ${p.accent}33 0 35%, transparent 35% 65%, ${p.ink}14 65% 100%),
  radial-gradient(circle at 70% 25%, ${p.ink}1f, transparent 35%)}
.grid{display:grid;gap:24px}
h1,h2,h3{font-family:${p.font};font-weight:500;letter-spacing:-0.03em;line-height:.98}
.btn{display:inline-block;background:${p.ink};color:${p.bg};padding:14px 22px;border-radius:999px;font-size:14px}
.btn.ghost{background:transparent;color:inherit;border:1px solid currentColor}
footer{margin-top:80px;padding:40px 0;border-top:1px solid ${p.ink}22;display:flex;justify-content:space-between;font-size:13px;opacity:.7}
@media (max-width:900px){nav ul{display:none}}
`;

const T = {
  store(p, inner) {
    return `<style>${base(p)}
.hero{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center;padding:48px 0 72px}
.hero h1{font-size:clamp(44px,6.5vw,104px)}
.hero .art{aspect-ratio:4/5}
.products{grid-template-columns:repeat(4,1fr)}
.card .art{aspect-ratio:4/5;margin-bottom:12px}
.card h3{font-size:18px;font-family:${p.ui};letter-spacing:0;font-weight:500}
.card .price{font-size:14px;opacity:.7}
.band{background:${p.ink};color:${p.bg};padding:64px 0;margin-top:72px}
.band h2{font-size:clamp(32px,4vw,56px);max-width:16ch}
@media (max-width:900px){.hero{grid-template-columns:1fr}.products{grid-template-columns:repeat(2,1fr)}}
</style>
<div class="wrap"><nav><span class="logo">Maison Doré</span><ul><li>New in</li><li>Objects</li><li>Textiles</li><li>Journal</li></ul><span class="cta">Bag (2)</span></nav>
${inner ? `
<section style="padding:40px 0"><p class="eyebrow">Objects / Ceramics</p><div class="grid" style="grid-template-columns:1.2fr .8fr;gap:48px;margin-top:20px"><div class="art alt" style="aspect-ratio:4/5"></div><div><h1 style="font-size:clamp(36px,4vw,64px)">Stoneware carafe, ash glaze</h1><p style="margin:20px 0;max-width:40ch;line-height:1.6;opacity:.8">Hand-thrown in small batches. Each piece carries the marks of the wheel and the kiln; no two are alike.</p><p style="font-size:22px;margin-bottom:20px">€ 84</p><span class="btn">Add to bag</span> <span class="btn ghost">Details</span></div></div></section>
<section style="margin-top:56px"><h2 style="font-size:32px;margin-bottom:24px">You may also like</h2><div class="grid products">${[1,2,3,4].map(i=>`<div class="card"><div class="art ${i%2?'alt2':''}"></div><h3>Object No. ${i+6}</h3><p class="price">€ ${40+i*12}</p></div>`).join('')}</div></section>` : `
<section class="hero"><div><p class="eyebrow">Autumn collection</p><h1 style="margin:16px 0 24px">Objects for a slower home.</h1><p style="max-width:44ch;line-height:1.6;font-size:17px;opacity:.8;margin-bottom:28px">Ceramics, linen and brass from small European workshops. Made to be used every day and kept for decades.</p><span class="btn">Shop the collection</span> <span class="btn ghost">Our makers</span></div><div class="art"></div></section>
<section><div style="display:flex;justify-content:space-between;align-items:end;margin-bottom:24px"><h2 style="font-size:40px">New arrivals</h2><span style="font-size:14px;opacity:.7">View all 48 →</span></div><div class="grid products">${[1,2,3,4].map(i=>`<div class="card"><div class="art ${i%2?'alt':'alt2'}"></div><h3>Object No. ${i}</h3><p class="price">€ ${38+i*14}</p></div>`).join('')}</div></section>
<section class="band"><div class="wrap"><p class="eyebrow" style="opacity:.6">Lookbook</p><h2>Set the table for a long evening.</h2></div></section>
<section style="margin-top:72px"><div class="grid products">${[5,6,7,8].map(i=>`<div class="card"><div class="art ${i%2?'alt2':''}"></div><h3>Object No. ${i}</h3><p class="price">€ ${30+i*9}</p></div>`).join('')}</div></section>`}
<footer><span>© Maison Doré</span><span>Shipping · Returns · Journal</span></footer></div>`;
  },
  agency(p, inner) {
    return `<style>${base(p)}
.hero{padding:72px 0 56px}.hero h1{font-size:clamp(44px,7.5vw,120px);max-width:12ch}
.services{grid-template-columns:repeat(3,1fr);border-top:1px solid ${p.ink}22}
.services div{padding:32px 24px 32px 0;border-right:1px solid ${p.ink}22}.services div:last-child{border:0}
.services h3{font-size:22px;margin:12px 0;font-family:${p.ui};letter-spacing:-0.01em}
.cases{grid-template-columns:1fr 1fr;margin-top:64px}.cases .art{aspect-ratio:16/11;margin-bottom:14px}
.cases h3{font-size:26px}
.num{font-family:${p.font};font-size:56px;line-height:1}
@media (max-width:900px){.services,.cases{grid-template-columns:1fr}.services div{border-right:0;border-bottom:1px solid ${p.ink}22}}
</style>
<div class="wrap"><nav><span class="logo">Brandt & Partner</span><ul><li>Work</li><li>Services</li><li>Studio</li><li>Journal</li></ul><span class="cta">Start a project</span></nav>
${inner ? `
<section style="padding:56px 0 24px"><p class="eyebrow">Case study — Fintech</p><h1 style="font-size:clamp(40px,5.5vw,80px);max-width:16ch;margin:16px 0">Rebuilding trust for a lending platform.</h1></section>
<div class="art" style="aspect-ratio:21/9"></div>
<section class="grid" style="grid-template-columns:1fr 2fr;gap:48px;margin-top:56px"><div><p class="eyebrow">Challenge</p><p class="num">01</p></div><div style="font-size:20px;line-height:1.6;max-width:56ch;opacity:.85">The client's product was sound but the brand read as cold. We rebuilt the identity, the website and the onboarding flow around one idea: clarity is kindness.</div></section>
<section class="grid cases"><div><div class="art alt"></div><h3>Identity system</h3></div><div><div class="art alt2"></div><h3>Onboarding flow</h3></div></section>` : `
<section class="hero"><p class="eyebrow">Design & technology studio, Hamburg</p><h1 style="margin:16px 0 28px">We build brands that behave well.</h1><p style="max-width:48ch;font-size:18px;line-height:1.6;opacity:.8">Strategy, identity and digital products for companies that would rather be clear than loud.</p></section>
<section class="grid services"><div><p class="num">01</p><h3>Strategy</h3><p style="opacity:.75;line-height:1.6">Positioning, naming and the questions nobody asked yet.</p></div><div><p class="num">02</p><h3>Identity</h3><p style="opacity:.75;line-height:1.6">Logotypes, type systems and guidelines that survive real use.</p></div><div><p class="num">03</p><h3>Digital</h3><p style="opacity:.75;line-height:1.6">Websites and products built on open standards.</p></div></section>
<section class="grid cases"><div><div class="art"></div><h3>Nordbank — identity and app</h3></div><div><div class="art alt"></div><h3>Verein Grün — campaign</h3></div><div><div class="art alt2"></div><h3>Hafen Logistik — platform</h3></div><div><div class="art"></div><h3>Atlas Books — storefront</h3></div></section>`}
<footer><span>© Brandt & Partner</span><span>Hamburg · Berlin</span></footer></div>`;
  },
  portfolio(p, inner) {
    return `<style>${base(p)}
.hero{height:76vh;min-height:520px;display:flex;align-items:end;padding-bottom:40px}
.hero h1{font-size:clamp(48px,9vw,150px);font-style:italic;font-weight:400}
.index{list-style:none;border-top:1px solid ${p.ink}22;margin-top:40px}
.index li{display:grid;grid-template-columns:60px 1fr 160px 100px;align-items:center;padding:22px 0;border-bottom:1px solid ${p.ink}22;font-size:15px}
.index li .t{font-family:${p.font};font-size:30px;letter-spacing:-0.02em}
.index li:nth-child(2){background:${p.soft}}
.strip{display:flex;gap:20px;overflow:hidden;margin-top:64px}.strip .art{flex:0 0 32%;aspect-ratio:4/3}
@media (max-width:900px){.index li{grid-template-columns:40px 1fr 80px}.index li span:last-child{display:none}.strip .art{flex-basis:70%}}
</style>
<div class="wrap"><nav><span class="logo">Mara Vinter</span><ul><li>Work</li><li>About</li><li>Contact</li></ul><span class="cta">Available 2027</span></nav>
${inner ? `
<section style="padding:48px 0 24px"><p class="eyebrow">Project 04 — Editorial</p><h1 style="font-size:clamp(40px,6vw,96px);font-style:italic;font-weight:400">Quiet Hours</h1><p style="opacity:.7;margin-top:12px">Photography · Art direction · 2026</p></section>
<div class="art alt" style="aspect-ratio:16/9"></div>
<div class="grid" style="grid-template-columns:1fr 1fr;margin-top:24px"><div class="art" style="aspect-ratio:4/5"></div><div class="art alt2" style="aspect-ratio:4/5"></div></div>
<p style="max-width:52ch;margin:48px 0;font-size:19px;line-height:1.6;opacity:.85">A series on the hour after closing time, shot across four cities over one winter. Commissioned for a print quarterly.</p>` : `
<section class="hero"><div><p class="eyebrow">Photographer & art director</p><h1>Light, mostly.</h1></div></section>
<div class="art" style="aspect-ratio:21/9"></div>
<ul class="index"><li><span>01</span><span class="t">Quiet Hours</span><span>Editorial</span><span>2026</span></li><li><span>02</span><span class="t">Salt &amp; Iron</span><span>Campaign</span><span>2026</span></li><li><span>03</span><span class="t">The Long Table</span><span>Book</span><span>2025</span></li><li><span>04</span><span class="t">Nordlicht</span><span>Personal</span><span>2025</span></li></ul>
<div class="strip"><div class="art alt"></div><div class="art alt2"></div><div class="art"></div><div class="art alt"></div></div>`}
<footer><span>© Mara Vinter</span><span>Instagram · Email</span></footer></div>`;
  },
  magazine(p, inner) {
    return `<style>${base(p)}
.mast{text-align:center;padding:28px 0 16px;border-bottom:3px double ${p.ink}}
.mast .logo{font-family:${p.font};font-size:clamp(40px,6vw,84px);letter-spacing:-0.03em;font-weight:600}
.sections{display:flex;justify-content:center;gap:24px;font-size:13px;padding:12px 0;border-bottom:1px solid ${p.ink}33;text-transform:uppercase;letter-spacing:.08em}
.front{grid-template-columns:2fr 1fr 1fr;margin-top:28px}
.lead .art{aspect-ratio:3/2;margin-bottom:16px}.lead h2{font-size:clamp(28px,3.4vw,52px)}
.col h3{font-size:20px;line-height:1.15;margin-bottom:8px}.col p{font-size:14px;line-height:1.55;opacity:.8}
.col > div{padding:16px 0;border-bottom:1px solid ${p.ink}22}.col .art{aspect-ratio:4/3;margin-bottom:10px}
.kicker{color:${p.accent};font-size:11px;text-transform:uppercase;letter-spacing:.12em;font-weight:600}
.article{max-width:680px;margin:40px auto;font-size:19px;line-height:1.65}
.article p+p{margin-top:1.2em}.article p:first-of-type::first-letter{font-family:${p.font};font-size:4.4em;float:left;line-height:.8;padding:6px 10px 0 0}
@media (max-width:900px){.front{grid-template-columns:1fr}}
</style>
<div class="wrap"><div class="mast"><div class="logo">The Weekend Ledger</div><p style="font-size:12px;opacity:.7;margin-top:6px">Saturday edition · № 214</p></div>
<div class="sections"><span>Politics</span><span>Culture</span><span>Science</span><span>Cities</span><span>Opinion</span><span>Food</span></div>
${inner ? `
<div class="article"><p class="kicker">Cities</p><h1 style="font-size:clamp(36px,5vw,64px);margin:12px 0 20px">What a city sounds like at 4 a.m.</h1><p style="font-size:15px;opacity:.7;margin-bottom:28px">By J. Hartmann · 14 min read</p><div class="art alt" style="aspect-ratio:3/2;margin-bottom:28px"></div><p>There is an hour when the night shift and the morning shift pass each other without speaking. Delivery vans idle. A bakery exhaust fan starts. Somewhere a tram tests its bell.</p><p>We spent six weeks recording that hour in four districts. What follows is less a report than a listening guide.</p><p>The first thing you notice is how much of the sound is mechanical and how little of it is human. The second is how quickly that changes.</p></div>` : `
<div class="grid front"><div class="lead"><div class="art"></div><p class="kicker">Cities</p><h2 style="margin:8px 0 12px">What a city sounds like at 4 a.m.</h2><p style="font-size:16px;line-height:1.55;opacity:.8;max-width:60ch">Six weeks of recordings from four districts, and a listening guide to the hour nobody owns.</p></div>
<div class="col"><div><p class="kicker">Science</p><h3>The slow return of the river otter</h3><p>Thirty years after the last sighting, a rewilding project reports its first litter.</p></div><div><p class="kicker">Culture</p><h3>Reading in public, again</h3><p>Why bookshop-bars are the new third place.</p></div><div><p class="kicker">Opinion</p><h3>On waiting rooms</h3><p>A short defence of boredom.</p></div></div>
<div class="col"><div><div class="art alt2"></div><p class="kicker">Food</p><h3>A winter stew, unhurried</h3></div><div><p class="kicker">Politics</p><h3>The quiet reform nobody is talking about</h3><p>And why it matters more than the loud one.</p></div></div></div>`}
<footer><span>© The Weekend Ledger</span><span>Subscribe · Newsletter · Archive</span></footer></div>`;
  },
  blog(p, inner) {
    return `<style>${base(p)}
.col{max-width:680px;margin:0 auto}
.post{padding:28px 0;border-bottom:1px solid ${p.ink}22}.post h2{font-size:30px;margin:8px 0}
.post p{line-height:1.6;opacity:.8}
.about{padding:72px 0 40px}.about h1{font-size:clamp(40px,6vw,76px)}
.art{aspect-ratio:3/2}
.article{font-size:19px;line-height:1.7}.article p+p{margin-top:1.2em}
</style>
<div class="wrap"><nav><span class="logo">notes.</span><ul><li>Writing</li><li>About</li><li>Now</li></ul><span class="cta">Subscribe</span></nav>
<div class="col">${inner ? `
<p class="eyebrow" style="margin-top:56px">12 September 2026</p><h1 style="font-size:clamp(36px,5vw,60px);margin:12px 0 28px">On keeping a notebook</h1><div class="art" style="margin-bottom:32px"></div><div class="article"><p>I have kept the same kind of notebook for eleven years: plain, unlined, cheap enough to ruin. The cheapness matters. An expensive notebook asks to be filled with good thoughts.</p><p>A cheap one accepts bad ones, which is where the good ones come from.</p><p>This site is the typed-up version of those pages, lightly edited, occasionally regretted.</p></div>` : `
<section class="about"><p class="eyebrow">Writing by Anna Lindqvist</p><h1 style="margin:14px 0 20px">Notes on making things slowly.</h1><p style="font-size:18px;line-height:1.6;opacity:.8">Essays on craft, attention and the occasional recipe. New notes most Sundays.</p></section>
<div class="art" style="margin-bottom:12px"></div>
<article class="post"><p class="eyebrow">12 September 2026</p><h2>On keeping a notebook</h2><p>Eleven years, one kind of notebook, and why cheapness matters.</p></article>
<article class="post"><p class="eyebrow">31 August 2026</p><h2>A defence of the second draft</h2><p>The first draft is for finding out what you think. The second is for the reader.</p></article>
<article class="post"><p class="eyebrow">17 August 2026</p><h2>Bread, again</h2><p>Notes on a loaf that finally worked, and what changed.</p></article>`}</div>
<footer><span>© Anna Lindqvist</span><span>RSS · Email</span></footer></div>`;
  },
  admin(p, inner, variant) {
    const side = `<aside><div class="brand">W</div><ul><li>Dashboard</li><li>Posts</li><li>Media</li><li>Pages</li><li class="on">${variant.menu}</li><li>Appearance</li><li>Plugins</li><li>Settings</li></ul></aside>`;
    return `<style>${base(p)}
body{background:#f0f0f1;color:#1d2327}
.shell{display:grid;grid-template-columns:200px 1fr;min-height:100vh}
aside{background:#1d2327;color:#f0f0f1;padding:14px 0}aside .brand{width:28px;height:28px;border-radius:50%;background:${p.accent};margin:0 0 18px 16px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px}
aside ul{list-style:none;font-size:13px}aside li{padding:9px 16px;opacity:.85}aside li.on{background:${p.accent};opacity:1}
main{padding:28px 32px}
.top{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}.top h1{font-family:${p.ui};font-size:24px;font-weight:600;letter-spacing:-0.01em}
.panel{background:#fff;border:1px solid #dcdcde;border-radius:10px;padding:22px}
.row{display:grid;gap:18px}
.field{border:1px solid #c3c4c7;border-radius:6px;padding:10px 12px;font-size:14px;color:#50575e;background:#fff}
.label{font-size:12px;font-weight:600;margin-bottom:6px;display:block;color:#1d2327}
.stat{padding:18px}.stat .v{font-size:36px;font-weight:600;letter-spacing:-0.02em;font-family:${p.ui}}.stat .k{font-size:12px;color:#646970;text-transform:uppercase;letter-spacing:.08em}
.bar{height:10px;border-radius:999px;background:#e5e7e9;overflow:hidden}.bar i{display:block;height:100%;background:${p.accent}}
.chip{display:inline-block;padding:4px 10px;border-radius:999px;font-size:12px;background:${p.soft};color:${p.ink}}
.btn{background:${p.accent};color:#fff;border-radius:6px;padding:10px 16px;font-size:13px;font-weight:600}
.blocks{display:grid;gap:12px}.block{border:1px dashed #c3c4c7;border-radius:8px;padding:14px;font-size:13px;background:#fafafa}
.block.sel{border:2px solid ${p.accent};background:#fff}
.gw{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.gw div{background:${p.soft};border-radius:8px;aspect-ratio:1}.gw div:nth-child(1){grid-column:span 2;grid-row:span 2;aspect-ratio:auto}.gw div:nth-child(6){grid-column:span 2;aspect-ratio:auto}
@media (max-width:900px){.shell{grid-template-columns:1fr}aside{display:none}main{padding:20px}}
</style>
<div class="shell">${side}<main>${variant.body(p, inner)}</main></div>`;
  },
};

const adminVariants = {
  formwerk: {
    menu: "Formwerk",
    body: (p, inner) => inner
      ? `<div class="top"><h1>Submissions — Contact form</h1><span class="btn">Export CSV</span></div><div class="panel"><table style="width:100%;border-collapse:collapse;font-size:14px">${["Lena M.","Jonas K.","S. Okafor","Studio Rund","Ines W."].map((n,i)=>`<tr style="border-bottom:1px solid #eee"><td style="padding:12px 0;width:40%">${n}</td><td style="color:#646970">${i+2} Oct 2026</td><td><span class="chip">${i%2?'New':'Read'}</span></td><td style="text-align:right;color:#646970">View →</td></tr>`).join('')}</table></div>`
      : `<div class="top"><h1>Edit form — Contact</h1><span class="btn">Update</span></div><div class="row" style="grid-template-columns:1fr 300px"><div class="panel blocks"><div class="block">Heading — <b>Say hello</b></div><div class="row" style="grid-template-columns:1fr 1fr"><div class="block"><span class="label">Name</span><div class="field">Text field · required</div></div><div class="block"><span class="label">Email</span><div class="field">Email field · required</div></div></div><div class="block sel"><span class="label">Message</span><div class="field" style="min-height:90px">Textarea · min 20 characters</div></div><div class="block"><span class="label">Topic</span><div class="field">Select · Sales / Support / Press</div></div><div class="block">Submit button — <b>Send message</b></div></div><div class="panel"><p class="label">Block</p><p style="font-size:13px;color:#646970;margin-bottom:14px">Textarea field</p><span class="label">Validation</span><div class="field">Required · min 20</div><span class="label" style="margin-top:12px">Error message</span><div class="field">Please tell us a little more.</div><span class="label" style="margin-top:12px">Conditional logic</span><span class="chip">Pro</span></div></div>`,
  },
  tempo: {
    menu: "Tempo",
    body: (p, inner) => inner
      ? `<div class="top"><h1>Change report</h1><span class="btn">Export PDF</span></div><div class="panel"><table style="width:100%;border-collapse:collapse;font-size:14px">${[["Page cache enabled","LCP 2.9s → 1.4s"],["Critical CSS (home)","FCP 1.8s → 0.9s"],["Defer 6 scripts","TBT 480ms → 90ms"],["Image size hints","CLS 0.18 → 0.02"]].map(([a,b])=>`<tr style="border-bottom:1px solid #eee"><td style="padding:12px 0">${a}</td><td style="color:#646970">${b}</td><td style="text-align:right"><span class="chip">Roll back</span></td></tr>`).join('')}</table></div>`
      : `<div class="top"><h1>Performance overview</h1><span class="btn">Run audit</span></div><div class="row" style="grid-template-columns:repeat(4,1fr);margin-bottom:18px"><div class="panel stat"><p class="k">LCP</p><p class="v">1.4s</p></div><div class="panel stat"><p class="k">CLS</p><p class="v">0.02</p></div><div class="panel stat"><p class="k">INP</p><p class="v">96ms</p></div><div class="panel stat"><p class="k">Score</p><p class="v">97</p></div></div><div class="row" style="grid-template-columns:2fr 1fr"><div class="panel"><p class="label">Applied optimisations</p>${["Page cache","Critical CSS","Script deferral","Image policies","Font preloading"].map((n,i)=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #eee;font-size:14px"><span>${n}</span><div class="bar" style="width:40%"><i style="width:${95-i*12}%"></i></div></div>`).join('')}</div><div class="panel"><p class="label">Cache</p><p style="font-size:14px;color:#646970">1,284 pages cached · purged 12 min ago</p><p class="label" style="margin-top:16px">Next audit</p><p style="font-size:14px;color:#646970">Tonight, 03:00</p></div></div>`,
  },
  gridwerk: {
    menu: "Gridwerk",
    body: (p, inner) => inner
      ? `<div class="top"><h1>Presets</h1><span class="chip">Pro</span></div><div class="row" style="grid-template-columns:repeat(3,1fr)">${["Bento 2×3","Masonry 4 col","Strip 32%","Sticky 40/60","Bento 3×3","Masonry 3 col"].map(n=>`<div class="panel"><div class="gw" style="margin-bottom:10px"><div></div><div></div><div></div><div></div><div></div><div></div></div><p style="font-size:13px;font-weight:600">${n}</p></div>`).join('')}</div>`
      : `<div class="top"><h1>Edit page — Work</h1><span class="btn">Update</span></div><div class="row" style="grid-template-columns:1fr 300px"><div class="panel blocks"><div class="block">Heading — <b>Selected work</b></div><div class="block sel"><span class="label">Gridwerk / Bento</span><div class="gw"><div></div><div></div><div></div><div></div><div></div><div></div></div></div><div class="block">Paragraph — Short intro…</div></div><div class="panel"><p class="label">Bento</p><span class="label">Columns</span><div class="field">4</div><span class="label" style="margin-top:12px">Gap</span><div class="field">Theme spacing · medium</div><span class="label" style="margin-top:12px">Areas (tablet)</span><div class="field">"a a b" "c d d"</div></div></div>`,
  },
};

const productTemplates = {
  aurum: (p, inner) => T.store(p, inner),
  kontor: (p, inner) => T.agency(p, inner),
  nordlicht: (p, inner) => T.portfolio(p, inner),
  gazette: (p, inner) => T.magazine(p, inner),
  lumen: (p, inner) => T.blog(p, inner),
  formwerk: (p, inner) => T.admin(p, inner, adminVariants.formwerk),
  tempo: (p, inner) => T.admin(p, inner, adminVariants.tempo),
  gridwerk: (p, inner) => T.admin(p, inner, adminVariants.gridwerk),
};

function html(body) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>${body}</body></html>`;
}

async function shoot(page, body, file, { width, height, fullPage = false, maxHeight }) {
  await page.setViewportSize({ width, height });
  await page.setContent(html(body), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  if (fullPage && maxHeight) {
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.screenshot({ path: file, type: "jpeg", quality: 82, clip: { x: 0, y: 0, width, height: Math.min(h, maxHeight) }, fullPage: true });
  } else {
    await page.screenshot({ path: file, type: "jpeg", quality: 82, fullPage: false });
  }
  console.log("  ✓", path.relative(process.cwd(), file));
}

const blogCovers = {
  "block-themes-in-practice": { a: "#e4572e", b: "#f5f2ec", c: "#141311" },
  "licensing-explained": { a: "#5b6b4a", b: "#ece7de", c: "#141311" },
  "performance-budget": { a: "#2f4a7a", b: "#f5f2ec", c: "#141311" },
  "changelog-autumn-2026": { a: "#f2c14e", b: "#141311", c: "#f5f2ec" },
  "accessible-by-default": { a: "#9fd1c7", b: "#141311", c: "#f5f2ec" },
  "studio-notes-01": { a: "#b5673a", b: "#f5f2ec", c: "#141311" },
};

function cover({ a, b, c }, seed) {
  const r = (n) => ((seed * 9301 + n * 49297) % 233280) / 233280;
  return `<style>${fontCss}html,body{margin:0;background:${b};width:1600px;height:1000px;overflow:hidden;font-family:Fraunces,Georgia,serif}
  .s{position:absolute;border-radius:50%}
  .t{position:absolute;left:80px;bottom:72px;color:${c};font-size:140px;letter-spacing:-0.04em;line-height:.9;font-style:italic;font-weight:400}
  </style>
  <div class="s" style="width:${600+r(1)*400}px;height:${600+r(1)*400}px;left:${700+r(2)*400}px;top:${-200+r(3)*300}px;background:${a}"></div>
  <div class="s" style="width:${300+r(4)*200}px;height:${300+r(4)*200}px;left:${200+r(5)*300}px;top:${300+r(6)*300}px;background:${c};opacity:.9"></div>
  <div style="position:absolute;left:0;top:0;width:1600px;height:1000px;background:linear-gradient(${90+r(7)*180}deg, transparent 55%, ${a}33 55% 100%)"></div>
  <div class="t">${["Notes","Craft","Tempo","Ledger","Access","Studio"][seed % 6]}</div>`;
}

function og() {
  return `<style>${fontCss}html,body{margin:0;background:#141311;color:#f5f2ec;width:1200px;height:630px;overflow:hidden;font-family:Geist,system-ui}
  h1{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:84px;letter-spacing:-0.035em;line-height:.95;margin:0}
  em{font-style:italic;font-weight:400;color:#e4572e}
  </style>
  <div style="position:absolute;left:72px;top:64px;font-size:26px;font-weight:600;letter-spacing:-0.01em">PDThemes<span style="color:#e4572e">.</span></div>
  <div style="position:absolute;left:72px;top:200px;max-width:900px"><h1>Premium WordPress products.<br><em>Built beyond expectations.</em></h1></div>
  <div style="position:absolute;left:72px;bottom:64px;font-size:20px;opacity:.7">Themes · Plugins · Documentation · Support — pdthemes.de</div>
  <div style="position:absolute;right:-120px;bottom:-200px;width:520px;height:520px;border-radius:50%;background:#e4572e;opacity:.9"></div>`;
}

const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined });
const page = await browser.newPage({ deviceScaleFactor: 1 });

for (const [slug, tpl] of Object.entries(productTemplates)) {
  if (only && only !== slug && only !== "products") continue;
  const dir = path.join(OUT, "products", slug);
  await mkdir(dir, { recursive: true });
  const p = palettes[slug];
  console.log(slug);
  await shoot(page, tpl(p, false), path.join(dir, "desktop.jpg"), { width: 1440, height: 900 });
  await shoot(page, tpl(p, true), path.join(dir, "desktop-2.jpg"), { width: 1440, height: 900 });
  await shoot(page, tpl(p, false), path.join(dir, "tablet.jpg"), { width: 834, height: 1112 });
  await shoot(page, tpl(p, false), path.join(dir, "mobile.jpg"), { width: 390, height: 844 });
  await shoot(page, tpl(p, false), path.join(dir, "full.jpg"), { width: 1440, height: 900, fullPage: true, maxHeight: 2600 });
}

if (!only || only === "blog") {
  const dir = path.join(OUT, "blog");
  await mkdir(dir, { recursive: true });
  let i = 0;
  for (const [slug, c] of Object.entries(blogCovers)) {
    await shoot(page, cover(c, i++), path.join(dir, `${slug}.jpg`), { width: 1600, height: 1000 });
  }
}
if (!only || only === "og") {
  await mkdir(path.join(OUT, "brand"), { recursive: true });
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(html(og()), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(OUT, "brand", "og-default.png"), type: "png" });
  console.log("  ✓ public/images/brand/og-default.png");
}

await browser.close();
