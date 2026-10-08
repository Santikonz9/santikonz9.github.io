(() => {
  'use strict';
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const canHover = matchMedia('(hover:hover)').matches;

  const plFill = $('#pl-fill'), plNum = $('#pl-num');
  let pct = 0;
  const plTimer = setInterval(() => {
    pct += Math.max(2, (100 - pct) * 0.12);
    if (pct >= 100) { pct = 100; clearInterval(plTimer); }
    plFill.style.width = pct + '%';
    plNum.textContent = Math.round(pct);
  }, 60);
  const finishPreload = () => {
    pct = 100; clearInterval(plTimer);
    plFill.style.width = '100%'; plNum.textContent = '100';
    setTimeout(() => $('#preloader').classList.add('done'), 350);
  };
  window.addEventListener('load', () => setTimeout(finishPreload, 400));
  setTimeout(finishPreload, 2600);

  $('#year').textContent = new Date().getFullYear();

  const SKILLS = [
    { n:'JavaScript', d:'Language',        i:'JS', c:'#f7df1e' },
    { n:'TypeScript', d:'Language',        i:'TS', c:'#3178c6' },
    { n:'Python',     d:'AI · Quant · ML', i:'Py', c:'#ffd43b' },
    { n:'React',      d:'UI Framework',    i:'⚛', c:'#61dafb' },
    { n:'Next.js',    d:'Full-Stack',      i:'N',  c:'#e5e7eb' },
    { n:'Node.js',    d:'Runtime',         i:'⬢',  c:'#83cd29' },
    { n:'Claude API', d:'LLM / Agents',    i:'✦',  c:'#d97757' },
    { n:'FastAPI',    d:'Backend',         i:'⚡', c:'#05998b' },
    { n:'MetaTrader5',d:'Market Data',     i:'₮',  c:'#f59e0b' },
    { n:'Supabase',   d:'DB / Realtime',   i:'◧',  c:'#3ecf8e' },
    { n:'Prisma',     d:'ORM',             i:'△',  c:'#5a67d8' },
    { n:'Tailwind',   d:'Styling',         i:'≈',  c:'#38bdf8' },
    { n:'Luau',       d:'Roblox Game Dev', i:'◆',  c:'#ff3b3b' },
    { n:'Vite',       d:'Build Tool',      i:'⚡', c:'#a855f7' },
    { n:'Figma',      d:'Design',          i:'✦',  c:'#f24e1e' },
    { n:'Git',        d:'Version Control', i:'⎇',  c:'#f05133' },
  ];

  const MARQUEE = ['AI / LLM','Quant Trading','Full-Stack','React','Next.js','Python','Node.js',
    'Claude','FastAPI','SMC','Machine Learning','PWA','Realtime','UI / UX','Motion'];

  const PROJECTS = [
    { t:'ThaiVScan — AI Phishing Scanner', tag:'AI / ML Security', cat:'ai', e:'🛡️', feat:true, badge:'~99% F1',
      logo:'assets/thaivscan-logo.svg', url:'https://thaivscan.com/',
      shot:'assets/shot-thaivscan.webp', urlLabel:'thaivscan.com',
      d:'A client-side phishing scanner and installable PWA powered by a pure-JavaScript machine-learning classifier — trained on real threat feeds (Majestic, Phishing.Database, URLhaus) and running entirely in the browser with zero server calls.',
      s:['JavaScript','Machine Learning','PWA','Logistic Reg.'],
      hl:['Pure-JS inference — 311 engineered + hashed features','~99% macro-F1 on real held-out URLs','Installable PWA, fully offline & private'],
      c:'linear-gradient(135deg,#0b2a6b,#0269F4)' },

    { t:'6×9 — Pre-Order OS', tag:'Platform · Commerce · UX', cat:'web', e:'👟', feat:true, badge:'41 screens',
      logo:'assets/6x9-logo.webp', logoTile:'#ffffff',
      shot:'assets/shot-6x9.webp', urlLabel:'6x9store · concierge', real:true,
      d:'A Thai sneaker & streetwear pre-order concierge platform — not a marketplace, but an operating system for the whole buy-abroad-deliver-home flow, with a rigorous order lifecycle and a real pricing brain.',
      s:['HTML','FX Engine','State Machine','UX Design'],
      hl:['11-state order lifecycle machine','FX + pricing engine — VAT on CIF+duty, fee gross-up','Dark-luxury customer app + Bloomberg-style admin'],
      c:'linear-gradient(135deg,#a855f7,#ec4899)' },

    { t:'KaraokeType', tag:'Realtime Game', cat:'app', e:'🎤', pv:'keys',
      shot:'assets/shot-karaoketype.webp', url:'https://karaoketype.vercel.app/', urlLabel:'karaoketype.vercel.app',
      d:'A Thai karaoke-typing game with a per-code-point typing engine and a Supabase realtime backend — shipped live on Vercel.',
      s:['HTML','Supabase','Game Engine'],
      hl:['Per-code-point Thai typing engine','Supabase realtime backend & leaderboards','Live in production on Vercel'],
      c:'linear-gradient(135deg,#ec4899,#8b5cf6)' },

    { t:'AURUM — Gold Trading Terminal', tag:'AI · Trading', cat:'quant', e:'🥇', pv:'chart',
      shot:'assets/shot-aurum.webp', urlLabel:'aurum · terminal', real:true,
      d:'Zero-dependency live XAU (gold) trading terminal with a backend signal engine and paper-trading desk — streaming prices, structure analysis, and actionable signals in a Bloomberg-style UI.',
      s:['Node.js','WebSocket','Signal Engine','Canvas'],
      hl:['Live streaming XAU price + structure analysis','Backend signal engine with paper-trading desk','Zero-dependency Bloomberg-style UI'],
      c:'linear-gradient(135deg,#f59e0b,#b45309)' },

    { t:'RuamMeu — Public-Good Hub', tag:'Civic Platform', cat:'web', e:'🌊', pv:'tiles',
      shot:'assets/shot-ruammeu.webp', urlLabel:'ruammeu · hub', real:true,
      d:'A single bilingual (TH/EN) hub hosting sub-tools for societal problems — oil, flood, air quality — driven by a central project registry.',
      s:['React','Vite','TypeScript'],
      hl:['One hub for civic problems (oil / flood / air)','Registry-driven sub-tools','Bilingual TH / EN'],
      c:'linear-gradient(135deg,#0ea5e9,#2dd4bf)' },

    { t:'TRELLIS Studio', tag:'SaaS · 3D', cat:'web', e:'🧊', pv:'cube',
      shot:'assets/shot-trellis.webp', urlLabel:'trellis.studio', real:true,
      d:'A Next.js SaaS wrapping an image-to-3D model with auth and Stripe / Omise subscriptions, plus a GPU-free demo mode.',
      s:['Next.js','Stripe','3D','Auth'],
      hl:['Image-to-3D SaaS wrapper','Auth + Stripe / Omise subscriptions','GPU-free demo mode'],
      c:'linear-gradient(135deg,#6366f1,#22d3ee)' },

    { t:'DataDash — Digital Workforce Dashboard', tag:'Data Dashboard · depa', cat:'web', depa:true, badge:'depa', pv:'info',
      shot:'assets/shot-depa-exec.webp', urlLabel:'datadash · depa', real:true,
      d:'An executive dashboard visualising Thailand\'s digital-workforce data for depa — skill gaps, in-demand roles, regional breakdowns and trend analysis in a dark, data-dense UI.',
      s:['JavaScript','Charts','Dashboard','depa'],
      hl:['Executive view of national digital-workforce data','Skill-gap, in-demand roles & regional breakdowns','Dark, data-dense UI with deep-dive stats'],
      c:'linear-gradient(135deg,#0ea5e9,#0b2a6b)' },

    { t:'Recruitment / Interview System', tag:'HR System · depa', cat:'app', depa:true, badge:'depa', pv:'check',
      shot:'assets/shot-depa-interview.webp', urlLabel:'recruit · depa', real:true,
      d:'An internal recruitment & interview-management system built for depa — secure staff login, candidate pipeline and interview scheduling.',
      s:['JavaScript','Auth','HR','depa'],
      hl:['Secure staff login & role-based access','Candidate & interview management','Built for depa internal HR'],
      c:'linear-gradient(135deg,#f59e0b,#8b5cf6)' },

    { t:'Room Booking System', tag:'Booking System · depa', cat:'app', depa:true, badge:'depa', pv:'tiles',
      shot:'assets/shot-depa-booking.webp', urlLabel:'booking · depa', real:true,
      d:'A meeting-room booking system for depa — a 4-step wizard (building → floor → room → confirm) with live floor plans and availability.',
      s:['JavaScript','PWA','Booking','depa'],
      hl:['4-step booking wizard with floor plans','Live room availability by building & floor','Installable PWA'],
      c:'linear-gradient(135deg,#f59e0b,#b45309)' },

    { t:'OneBot OneBrain', tag:'AI Knowledge Base · depa', cat:'ai', depa:true, badge:'depa', pv:'hud',
      shot:'assets/shot-depa-onebot.webp', urlLabel:'onebot · depa', real:true,
      d:'An AI office knowledge-base assistant for depa — ingests, analyses and searches internal documents with LLM power to answer questions and summarise content fast.',
      s:['Vite','LLM','RAG','depa'],
      hl:['AI knowledge base over internal documents','Summarises regulations, meeting minutes & reports','RAG-powered Q&A with quick shortcuts'],
      c:'linear-gradient(135deg,#f59e0b,#1e3a8a)' },

    { t:'XAUUSD Ultra Quant', tag:'Quant Engine', cat:'quant', e:'📈', pv:'chart',
      d:'Gold-only AI decision engine with a NO-TRADE-first philosophy: deterministic risk gating plus SMC, market structure and confluence scoring on live MT5 data.',
      s:['Python','MT5','SMC','Risk'],
      hl:['NO-TRADE-first deterministic risk gating','SMC + market-structure confluence scoring','Runs on live MT5 gold data'],
      c:'linear-gradient(135deg,#10b981,#065f46)' },

    { t:'MT5 Analysis Engine', tag:'Backtest · Paper', cat:'quant', e:'⚙️', pv:'terminal',
      d:'FastAPI + MetaTrader5 multi-layer analysis, backtest and paper-trade pipeline with a 30-section spec and a PWA dashboard.',
      s:['Python','FastAPI','PWA','MT5'],
      hl:['30-section analysis + backtest pipeline','FastAPI backend + installable PWA dashboard','Paper-trading on live MetaTrader5 data'],
      c:'linear-gradient(135deg,#0ea5e9,#1e3a8a)' },

    { t:'JARVIS — AI Assistant', tag:'LLM Agent', cat:'ai', e:'🤖', pv:'hud',
      d:'Claude-powered Iron-Man-style assistant with an animated HUD, voice + text input and real Windows control — your own desktop co-pilot.',
      s:['Node','Express','Claude API','Voice'],
      hl:['Claude-powered voice + text assistant','Animated Iron-Man-style HUD','Real Windows control from the desktop'],
      c:'linear-gradient(135deg,#22d3ee,#6366f1)' },

    { t:'CareGuard — Robot Safety', tag:'AI · Hackathon', cat:'ai', e:'🦾', pv:'safety',
      d:'Near-miss safety layer for humanoid robots (team NEXTERAC). A 5th data layer with a Gemini + rule-based classifier, plus a baseline security fix — built at the HRI hackathon.',
      s:['Next.js','Prisma','Gemini'],
      hl:['5th near-miss safety data layer','Gemini + rule-based classifier','Built at the HRI hackathon (team NEXTERAC)'],
      c:'linear-gradient(135deg,#8b5cf6,#2dd4bf)' },

    { t:'Procurement Flowchart Gen', tag:'Doc Automation · depa', cat:'app', depa:true, e:'📊', badge:'depa', pv:'flow',
      d:'A tool built during my depa internship that turns official procurement .doc specs (PM-CM series) into draw.io swimlane flowcharts — two visual styles × concise/full, generated programmatically.',
      s:['Node','draw.io','Word COM','depa'],
      hl:['Parses depa PM-CM procurement specs','Auto-generates draw.io swimlanes','Two visual styles × concise / full'],
      c:'linear-gradient(135deg,#14b8a6,#0ea5e9)' },

    { t:'HERO CLASH', tag:'Roblox Game', cat:'game', e:'🦸', badge:'27 modules', pv:'arena',
      d:'A server-authoritative superhero PvP arena for Roblox: 19 services + 8 controllers via a registry pattern, fully code-built UI and procedurally generated maps.',
      s:['Roblox','Luau','Rojo','Server-Auth'],
      hl:['Server-authoritative Roblox PvP arena','19 services + 8 controllers (registry pattern)','Procedurally generated maps'],
      c:'linear-gradient(135deg,#ef4444,#f59e0b)' },

    { t:'Edura Auto-Bot', tag:'Automation', cat:'app', e:'⚡', pv:'check',
      d:'A Tampermonkey userscript that auto-completes edura.me / MyEnglish exercises by reading answers embedded in the DOM.',
      s:['JavaScript','Userscript','DOM'],
      hl:['Tampermonkey userscript automation','Reads answers embedded in the DOM','Auto-completes edura.me exercises'],
      c:'linear-gradient(135deg,#f59e0b,#ef4444)' },

    { t:'Thai Subtitle Renderer', tag:'Media Tool', cat:'app', pv:'check',
      d:'A pipeline that auto-transcribes video with faster-whisper and burns pixel-perfect Thai subtitles — rendering each line as a WPF PNG overlay to fix libass dropping Thai tone marks.',
      s:['Python','faster-whisper','ffmpeg','WPF'],
      hl:['Auto-transcribe with faster-whisper','Pixel-perfect Thai tone-mark rendering','WPF PNG overlay burned via ffmpeg'],
      c:'linear-gradient(135deg,#8b5cf6,#ec4899)' },

    { t:'Infographic Studio', tag:'Design · Web', cat:'web', e:'🎨', pv:'info',
      d:'Self-contained HTML infographics with real embedded imagery and precise CSS pin layouts — educational Thai design pieces built pixel-perfect.',
      s:['HTML','CSS','Design'],
      hl:['Self-contained HTML infographics','Real embedded imagery + CSS pin layouts','Pixel-perfect educational Thai design'],
      c:'linear-gradient(135deg,#8b5cf6,#22d3ee)' },
  ];

  const PV = {
    frame: inner => `<svg class="pv" viewBox="0 0 340 190" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><g class="pv-win">`
      + `<rect width="340" height="190" fill="rgba(7,10,18,.42)"/>`
      + `<rect width="340" height="30" fill="rgba(255,255,255,.07)"/>`
      + `<circle cx="22" cy="15" r="5" fill="var(--ac)"/>`
      + `<rect x="34" y="11" width="46" height="8" rx="4" fill="rgba(255,255,255,.55)"/>`
      + `<rect x="214" y="10" width="40" height="10" rx="5" fill="rgba(255,255,255,.14)"/>`
      + `<rect x="262" y="10" width="54" height="10" rx="5" fill="var(--ac)" opacity=".9"/>`
      + inner + `</g></svg>`,
    chart() {
      let candles = '';
      const xs = [92,118,144,170,196,222,248,274];
      const hi = [70,64,78,60,72,56,66,52], lo = [120,112,118,104,110,96,104,90];
      xs.forEach((x,i) => {
        const up = i % 2 === 0;
        candles += `<line x1="${x}" y1="${hi[i]-8}" x2="${x}" y2="${lo[i]+8}" stroke="rgba(255,255,255,.55)"/>`
          + `<rect x="${x-5}" y="${hi[i]}" width="10" height="${lo[i]-hi[i]}" rx="2" fill="${up?'rgba(255,255,255,.85)':'rgba(255,255,255,.3)'}" stroke="rgba(255,255,255,.7)"/>`;
      });
      const pts = '40,118 70,104 100,110 130,86 160,96 190,70 220,80 252,58 282,66 300,54';
      const area = `<polygon points="40,118 70,104 100,110 130,86 160,96 190,70 220,80 252,58 282,66 300,54 300,150 40,150" fill="var(--ac)" opacity=".16"/>`;
      const line = `<polyline class="pv-line" points="${pts}" fill="none" stroke="var(--ac)" stroke-width="2.5"/>`;
      return this.frame(`<g opacity=".97">${candles}${area}${line}<line x1="40" y1="150" x2="300" y2="150" stroke="rgba(255,255,255,.3)"/></g>`);
    },
    terminal() {
      let rows = '';
      [64,80,96,112,128,144].forEach((y,i) => {
        const w = [120,180,90,150,70,160][i];
        rows += `<rect x="40" y="${y-7}" width="8" height="8" rx="2" fill="rgba(255,255,255,.7)"/>`
          + `<rect x="56" y="${y-6}" width="${w}" height="6" rx="3" fill="rgba(255,255,255,${i%2?.35:.6})"/>`;
      });
      rows += `<polyline class="pv-line" points="230,150 246,120 262,132 278,96 294,108" fill="none" stroke="var(--ac)" stroke-width="2.5"/>`;
      return this.frame(`<g>${rows}</g>`);
    },
    hud() {
      return this.frame(`<g transform="translate(170,107)" class="pv-hud">`
        + `<circle r="46" fill="none" stroke="rgba(255,255,255,.28)"/>`
        + `<circle class="pv-spin" r="34" fill="none" stroke="var(--ac)" stroke-width="2.5" stroke-dasharray="42 16"/>`
        + `<circle class="pv-spin2" r="22" fill="none" stroke="rgba(255,255,255,.85)" stroke-dasharray="24 10"/>`
        + `<circle r="6" fill="var(--ac)"/>`
        + `<line x1="-58" y1="0" x2="-48" y2="0" stroke="rgba(255,255,255,.7)" stroke-width="2"/><line x1="48" y1="0" x2="58" y2="0" stroke="rgba(255,255,255,.7)" stroke-width="2"/>`
        + `<line x1="0" y1="-58" x2="0" y2="-48" stroke="rgba(255,255,255,.7)" stroke-width="2"/><line x1="0" y1="48" x2="0" y2="58" stroke="rgba(255,255,255,.7)" stroke-width="2"/></g>`);
    },
    shieldPath: 'M170 60 l36 13 v24 c0 29 -20 44 -36 52 c-16 -8 -36 -23 -36 -52 v-24 z',
    safety() {
      return this.frame(`<g><path class="pv-pop" d="${this.shieldPath}" fill="var(--ac)" fill-opacity=".28" stroke="var(--ac)" stroke-width="2.5"/>`
        + `<line x1="170" y1="92" x2="170" y2="116" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`
        + `<circle cx="170" cy="128" r="3" fill="#fff"/></g>`);
    },
    arena() {
      return this.frame(`<g><path class="pv-pop" d="${this.shieldPath}" fill="var(--ac)" fill-opacity=".28" stroke="var(--ac)" stroke-width="2.5"/>`
        + `<path d="M176 86 l-20 30 h12 l-6 24 24 -34 h-12 z" fill="#fff"/></g>`);
    },
    tiles() {
      let g = '';
      const xs = [48,128,208], ys = [60,112];
      ys.forEach((y,r) => xs.forEach((x,c) => {
        g += `<rect class="pv-tile" x="${x}" y="${y}" width="84" height="44" rx="8" fill="rgba(255,255,255,${(r+c)%2?.1:.16})" stroke="rgba(255,255,255,.5)" style="animation-delay:${(r*3+c)*0.08}s"/>`
          + `<circle cx="${x+16}" cy="${y+22}" r="7" fill="var(--ac)"/>`
          + `<rect x="${x+30}" y="${y+14}" width="42" height="5" rx="2.5" fill="rgba(255,255,255,.6)"/>`
          + `<rect x="${x+30}" y="${y+26}" width="30" height="5" rx="2.5" fill="rgba(255,255,255,.4)"/>`;
      }));
      return this.frame(g);
    },
    cube() {
      return this.frame(`<g transform="translate(170,108)" class="pv-cube"><g class="pv-spin3">`
        + `<polygon points="0,-46 40,-23 0,0 -40,-23" fill="var(--ac)" stroke="#fff"/>`
        + `<polygon points="0,0 40,-23 40,24 0,47" fill="var(--ac)" fill-opacity=".45" stroke="#fff"/>`
        + `<polygon points="0,0 -40,-23 -40,24 0,47" fill="rgba(255,255,255,.22)" stroke="#fff"/></g></g>`);
    },
    keys() {
      let k = '';
      [0,1,2].forEach(r => { for (let c=0;c<7;c++){ const x=46+c*36+(r*10); const hot=(r*7+c)%4===0; k += `<rect class="pv-key" x="${x}" y="${66+r*24}" width="28" height="18" rx="4" fill="${hot?'var(--ac)':'rgba(255,255,255,.16)'}" stroke="rgba(255,255,255,.5)" style="animation-delay:${(r*7+c)*0.05}s"/>`; } });
      k += `<polyline points="46,150 70,150 84,134 104,162 124,140 150,150 300,150" fill="none" stroke="var(--ac)" stroke-width="2.5" opacity=".9"/>`;
      return this.frame(k);
    },
    check() {
      let rows = '';
      [64,92,120,148].forEach((y,i) => {
        rows += `<rect x="44" y="${y-12}" width="18" height="18" rx="4" fill="var(--ac)" fill-opacity=".25" stroke="var(--ac)"/>`
          + `<path class="pv-check" d="M47 ${y-3} l4 4 l7 -9" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation-delay:${i*0.14}s"/>`
          + `<rect x="74" y="${y-7}" width="${[200,150,180,120][i]}" height="7" rx="3.5" fill="rgba(255,255,255,${i%2?.35:.55})"/>`;
      });
      return this.frame(rows);
    },
    flow() {
      const box = (x,y,w) => `<rect x="${x}" y="${y}" width="${w}" height="30" rx="7" fill="rgba(255,255,255,.16)" stroke="#fff"/>`;
      const arr = (x1,y1,x2,y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(255,255,255,.7)" stroke-width="2" marker-end="url(#ah)"/>`;
      return this.frame(`<defs><marker id="ah" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#fff"/></marker></defs>`
        + box(46,62,72) + arr(118,77,146,77) + box(146,62,72) + arr(182,92,182,116) + box(146,116,72)
        + arr(146,131,118,131) + box(46,116,72) + `<circle cx="276" cy="92" r="20" fill="var(--ac)" fill-opacity=".3" stroke="var(--ac)"/><path d="M269 92 l5 5 l9 -11" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`);
    },
    info() {
      let bars = '';
      [70,120,95,150].forEach((h,i) => { bars += `<rect class="pv-bar" x="${210+i*26}" y="${150-h}" width="16" height="${h}" rx="4" fill="${i%2?'var(--ac2)':'var(--ac)'}" style="animation-delay:${i*0.1}s"/>`; });
      return this.frame(`<g><circle cx="106" cy="104" r="40" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="14"/>`
        + `<circle class="pv-donut" cx="106" cy="104" r="40" fill="none" stroke="var(--ac)" stroke-width="14" stroke-dasharray="180 251" stroke-linecap="round" transform="rotate(-90 106 104)"/>`
        + `<line x1="200" y1="150" x2="300" y2="150" stroke="rgba(255,255,255,.3)"/>${bars}</g>`);
    },
  };
  function renderPreview(type) {
    return (type && PV[type]) ? PV[type]() : '';
  }
  function extractColors(grad) {
    const m = (grad || '').match(/#([0-9a-fA-F]{6})/g) || ['#2dd4bf', '#8b5cf6'];
    return [m[0], m[1] || m[0]];
  }
  function urlLabelFor(p) {
    return p.urlLabel || (p.t.split(/[\s—·-]+/)[0].toLowerCase().replace(/[^a-z0-9]/g, '') + '.app');
  }

  function previewHTML(p, big) {
    const [c1, c2] = extractColors(p.c);
    const screen = p.shot
      ? `<img class="br-shot" src="${p.shot}" alt="${p.t} preview" loading="lazy" />`
      : `<div class="br-mock">${renderPreview(p.pv)}</div>`;
    return `<div class="browser${big ? ' browser-lg' : ''}" style="--ac:${c1};--ac2:${c2}">`
      + `<div class="br-bar"><i></i><i></i><i></i><span class="br-url">🔒 ${urlLabelFor(p)}</span></div>`
      + `<div class="br-screen">${screen}</div></div>`;
  }

  const modal = $('#pj-modal');
  function modalVisual(p) {
    const [c1, c2] = extractColors(p.c);
    if (p.shot) {
      return `<div class="browser browser-modal" style="--ac:${c1};--ac2:${c2}">`
        + `<div class="br-bar"><i></i><i></i><i></i><span class="br-url">🔒 ${urlLabelFor(p)}</span></div>`
        + `<div class="br-scroll"><img src="${p.shot}" alt="${p.t} preview" /></div></div>`;
    }
    return previewHTML(p, true);
  }
  function openModal(p) {
    modal._p = p;
    const th = root.dataset.lang === 'th';
    const live = !!p.url;
    const realShot = !live && !!p.shot;
    const mv = $('#modal-visual');
    mv.innerHTML = modalVisual(p);
    mv.style.setProperty('--pjc', p.c);
    const kind = $('#modal-kind');
    kind.textContent = live ? (th ? '● เว็บออนไลน์จริง' : '● Live site')
      : realShot ? (th ? '● ภาพหน้าจอจริง' : '● Real screenshot')
      : (th ? '● ตัวอย่าง (Demo)' : '● Demo preview');
    kind.className = 'modal-kind ' + (live ? 'is-live' : realShot ? 'is-real' : 'is-demo');
    $('#modal-tag').textContent = trTag(p);
    $('#modal-title').textContent = p.t;
    $('#modal-desc').textContent = trDesc(p);
    const hl = $('#modal-hl');
    const hls = trHl(p);
    hl.innerHTML = hls.map(h => `<li>${h}</li>`).join('');
    hl.style.display = hls.length ? '' : 'none';
    $('#modal-stack').innerHTML = p.s.map(x => `<span>${x}</span>`).join('');
    $('#modal-note').textContent = live
      ? (th ? 'พรีวิวนี้เป็นภาพหน้าจอจริงของเว็บ กดปุ่มด้านล่างเพื่อเปิดเว็บจริงได้เลย' : 'This preview is a real screenshot — open the live site below.')
      : realShot
        ? (th ? 'ภาพหน้าจอจริงจากแอปที่รันได้จริง (ยังไม่ได้ deploy สาธารณะ)' : 'A real screenshot of the actual working app (not publicly deployed yet).')
        : (th ? 'ตัวอย่างนี้เป็น mockup จำลองหน้าตาเท่านั้น ยังไม่ใช่ UI จริงของโปรเจกต์' : 'This is an illustrative demo mockup — not the project\'s actual UI.');
    const visit = $('#modal-visit');
    if (live) { visit.href = p.url; visit.style.display = ''; } else { visit.style.display = 'none'; }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }
  document.addEventListener('click', e => {
    if (e.target.closest('[data-close]')) { closeModal(); return; }
    const card = e.target.closest('[data-pid]');
    if (card && !e.target.closest('a[href]')) {
      const p = PROJECTS[+card.dataset.pid];
      if (p) openModal(p);
    }
  });
  addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  const TIMELINE = {
    en: [
      { y:'Foundations', t:'Full-stack web & UI/UX', p:'Started building responsive sites, design systems and front-end apps — React, Next.js and a love for clean, fast interfaces.' },
      { y:'AI / LLM', t:'Agents & intelligent tools', p:'Shipped Claude-powered assistants, a client-side ML phishing scanner, and a robot-safety classifier — bringing models into real products.' },
      { y:'Quant', t:'Trading engines on live data', p:'Built deterministic, risk-first gold trading systems on live MT5 data — signal engines, backtesting and paper-trading terminals.' },
      { y:'depa · Internship', t:'Digital Economy Promotion Agency', p:'Interning at depa — Thailand\'s Digital Economy Promotion Agency — building digital tooling and process automation, such as turning official procurement specs into generated flowcharts.' },
      { y:'Now', t:'Platforms, games & polish', p:'Blending it all: pre-order platforms, realtime games, Roblox worlds and high-polish motion-driven web experiences.' },
    ],
    th: [
      { y:'จุดเริ่มต้น', t:'เว็บ Full-stack & UI/UX', p:'เริ่มจากสร้างเว็บ responsive, design system และแอปฝั่งหน้าบ้าน — React, Next.js พร้อมความหลงใหลในอินเทอร์เฟซที่สะอาดและเร็ว' },
      { y:'AI / LLM', t:'Agent และเครื่องมืออัจฉริยะ', p:'ปล่อยผู้ช่วยที่ขับเคลื่อนด้วย Claude, สแกนเนอร์ฟิชชิ่งด้วย ML ฝั่งผู้ใช้ และตัวจำแนกความปลอดภัยของหุ่นยนต์ — นำโมเดลมาใช้ในผลิตภัณฑ์จริง' },
      { y:'Quant', t:'ระบบเทรดบนข้อมูลจริง', p:'สร้างระบบเทรดทองแบบ deterministic ที่เน้นความเสี่ยงบนข้อมูล MT5 สด — signal engine, backtest และเทอร์มินัล paper-trade' },
      { y:'depa · ฝึกงาน', t:'สำนักงานส่งเสริมเศรษฐกิจดิจิทัล', p:'ฝึกงานที่ depa — สำนักงานส่งเสริมเศรษฐกิจดิจิทัลของไทย — สร้างเครื่องมือดิจิทัลและระบบอัตโนมัติ เช่น แปลงสเปกจัดซื้อจัดจ้างเป็นผังงานอัตโนมัติ' },
      { y:'ปัจจุบัน', t:'แพลตฟอร์ม เกม และความเนียน', p:'ผสานทุกอย่างเข้าด้วยกัน: แพลตฟอร์มพรีออเดอร์, เกมเรียลไทม์, โลกใน Roblox และเว็บที่ขับเคลื่อนด้วย motion อย่างพิถีพิถัน' },
    ]
  };

  $('#skills-grid').innerHTML = SKILLS.map((s,i) => `
    <div class="skill reveal" style="transition-delay:${i*35}ms;--skc:${s.c}">
      <span class="sk-ic" style="background:${s.c}">${s.i || s.n[0]}</span>
      <span><b>${s.n}</b><small>${s.d}</small></span>
    </div>`).join('');

  $$('.skill').forEach(el => el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--sx', (e.clientX - r.left) + 'px');
    el.style.setProperty('--sy', (e.clientY - r.top) + 'px');
  }));

  const mk = MARQUEE.map(t => `<span>${t}</span>`).join('');
  $('#marquee-track').innerHTML = mk + mk;

  function renderTimeline() {
    const lang = root.dataset.lang;
    $('#timeline').innerHTML = TIMELINE[lang].map((it,i) => `
      <div class="tl-item reveal" style="transition-delay:${i*90}ms">
        <span class="tl-dot"></span>
        <span class="tl-year">${it.y}</span>
        <h4>${it.t}</h4>
        <p>${it.p}</p>
      </div>`).join('');
    observeReveals();
  }

  const TH = {
    'ThaiVScan — AI Phishing Scanner': { tag:'ความปลอดภัย AI / ML',
      d:'เครื่องสแกนฟิชชิงฝั่งผู้ใช้และ PWA ติดตั้งได้ ขับเคลื่อนด้วยตัวจำแนก Machine Learning ที่เขียนด้วย JavaScript ล้วน เทรนด้วยชุดข้อมูลภัยคุกคามจริง และทำงานในเบราว์เซอร์ทั้งหมดโดยไม่เรียกเซิร์ฟเวอร์',
      hl:['อนุมานด้วย JS ล้วน — 311 ฟีเจอร์','~99% macro-F1 บน URL จริงที่กันไว้ทดสอบ','PWA ติดตั้งได้ ทำงานออฟไลน์และเป็นส่วนตัว'] },
    '6×9 — Pre-Order OS': { tag:'แพลตฟอร์ม · คอมเมิร์ซ · UX',
      d:'แพลตฟอร์มพรีออเดอร์สนีกเกอร์และสตรีทแวร์แบบ concierge ของไทย ไม่ใช่มาร์เก็ตเพลส แต่เป็นระบบจัดการทั้งกระบวนการซื้อจากต่างประเทศแล้วส่งถึงมือ พร้อม order lifecycle ที่รัดกุมและเครื่องคิดราคาจริง',
      hl:['เครื่องจัดการสถานะออเดอร์ 11 สถานะ','เครื่องคิดราคา + FX — VAT บน CIF+อากร, gross-up ค่าธรรมเนียม','แอปลูกค้าดาร์กลักชัวรี + แอดมินสไตล์ Bloomberg'] },
    'KaraokeType': { tag:'เกมเรียลไทม์',
      d:'เกมพิมพ์คาราโอเกะภาษาไทย ด้วยเอนจินพิมพ์ระดับ code-point และแบ็กเอนด์เรียลไทม์ Supabase ออนไลน์จริงบน Vercel',
      hl:['เอนจินพิมพ์ไทยระดับ code-point','แบ็กเอนด์เรียลไทม์ + ลีดเดอร์บอร์ด Supabase','ใช้งานจริงบน production (Vercel)'] },
    'AURUM — Gold Trading Terminal': { tag:'AI · เทรด',
      d:'เทอร์มินัลเทรดทอง (XAU) แบบเรียลไทม์ zero-dependency พร้อม signal engine ฝั่งเซิร์ฟเวอร์และโต๊ะ paper-trade ราคาสตรีมสด วิเคราะห์โครงสร้าง และสัญญาณที่ใช้งานได้ในดีไซน์สไตล์ Bloomberg',
      hl:['สตรีมราคา XAU สด + วิเคราะห์โครงสร้าง','signal engine + โต๊ะ paper-trade','UI สไตล์ Bloomberg แบบ zero-dependency'] },
    'RuamMeu — Public-Good Hub': { tag:'แพลตฟอร์มสาธารณะ',
      d:'ศูนย์รวมสองภาษา (ไทย/อังกฤษ) ที่รวมเครื่องมือย่อยสำหรับปัญหาสังคม น้ำมัน น้ำท่วม คุณภาพอากาศ ขับเคลื่อนด้วย registry กลาง',
      hl:['ศูนย์รวมปัญหาสังคม (น้ำมัน/น้ำท่วม/อากาศ)','เครื่องมือย่อยขับเคลื่อนด้วย registry','สองภาษา ไทย / อังกฤษ'] },
    'TRELLIS Studio': { tag:'SaaS · 3D',
      d:'SaaS ด้วย Next.js ที่ห่อโมเดลแปลงรูปเป็น 3D พร้อมระบบล็อกอินและสมาชิก Stripe / Omise และโหมดเดโมที่ไม่ต้องใช้ GPU',
      hl:['SaaS แปลงรูปภาพเป็นโมเดล 3D','ล็อกอิน + สมาชิก Stripe / Omise','โหมดเดโมไม่ต้องใช้ GPU'] },
    'DataDash — Digital Workforce Dashboard': { tag:'แดชบอร์ดข้อมูล · depa',
      d:'แดชบอร์ดผู้บริหารที่แสดงข้อมูลกำลังคนดิจิทัลของประเทศไทยให้ depa ทักษะที่ขาด สายงานที่ต้องการ ข้อมูลรายภูมิภาคและแนวโน้ม ในดีไซน์มืดข้อมูลแน่น',
      hl:['ภาพรวมข้อมูลกำลังคนดิจิทัลระดับประเทศ','ทักษะที่ขาด สายงานที่ต้องการ และรายภูมิภาค','UI มืดข้อมูลแน่น เจาะลึกสถิติได้'] },
    'Recruitment / Interview System': { tag:'ระบบ HR · depa',
      d:'ระบบสรรหาและจัดการสัมภาษณ์ภายในองค์กรสำหรับ depa ล็อกอินปลอดภัย จัดการผู้สมัครและนัดสัมภาษณ์',
      hl:['ล็อกอินพนักงานปลอดภัย + สิทธิ์ตามบทบาท','จัดการผู้สมัครและการสัมภาษณ์','สร้างให้ฝ่าย HR ภายใน depa'] },
    'Room Booking System': { tag:'ระบบจองห้อง · depa',
      d:'ระบบจองห้องประชุมสำหรับ depa ตัวช่วย 4 ขั้นตอน (ตึก → ชั้น → ห้อง → ยืนยัน) พร้อมผังพื้นและสถานะว่างแบบสด',
      hl:['ตัวช่วยจอง 4 ขั้นตอนพร้อมผังพื้น','สถานะห้องว่างตามตึกและชั้น','PWA ติดตั้งได้'] },
    'XAUUSD Ultra Quant': { tag:'เอนจิน Quant',
      d:'เอนจินตัดสินใจ AI สำหรับทองโดยเฉพาะ ยึดหลัก NO-TRADE มาก่อน: กรองความเสี่ยงแบบ deterministic พร้อมให้คะแนน SMC โครงสร้างตลาด และ confluence บนข้อมูล MT5 สด',
      hl:['กรองความเสี่ยงแบบ deterministic ยึด NO-TRADE ก่อน','ให้คะแนน SMC + โครงสร้างตลาด + confluence','ทำงานบนข้อมูลทอง MT5 สด'] },
    'MT5 Analysis Engine': { tag:'Backtest · Paper',
      d:'ไปป์ไลน์วิเคราะห์ backtest และ paper-trade หลายชั้นด้วย FastAPI + MetaTrader5 พร้อมสเปก 30 ส่วนและแดชบอร์ด PWA',
      hl:['ไปป์ไลน์วิเคราะห์ + backtest 30 ส่วน','แบ็กเอนด์ FastAPI + แดชบอร์ด PWA','paper-trade บนข้อมูล MetaTrader5 สด'] },
    'JARVIS — AI Assistant': { tag:'LLM Agent',
      d:'ผู้ช่วยสไตล์ไอรอนแมนที่ขับเคลื่อนด้วย Claude พร้อม HUD เคลื่อนไหว รับคำสั่งเสียงและข้อความ และควบคุม Windows ได้จริง',
      hl:['ผู้ช่วยด้วย Claude รับทั้งเสียงและข้อความ','HUD สไตล์ไอรอนแมนเคลื่อนไหว','ควบคุม Windows ได้จริงจากเดสก์ท็อป'] },
    'CareGuard — Robot Safety': { tag:'AI · แฮกกาธอน',
      d:'ชั้นความปลอดภัย near-miss สำหรับหุ่นยนต์ฮิวแมนนอยด์ (ทีม NEXTERAC) ชั้นข้อมูลที่ 5 ด้วยตัวจำแนก Gemini + กฎ พร้อมแก้ช่องโหว่ความปลอดภัยพื้นฐาน สร้างในงาน HRI hackathon',
      hl:['ชั้นข้อมูลความปลอดภัย near-miss ชั้นที่ 5','ตัวจำแนก Gemini + กฎ','สร้างในงาน HRI hackathon (ทีม NEXTERAC)'] },
    'Procurement Flowchart Gen': { tag:'ระบบอัตโนมัติเอกสาร · depa',
      d:'เครื่องมือที่สร้างระหว่างฝึกงาน depa แปลงสเปกจัดซื้อจัดจ้างทางการ (ชุด PM-CM) เป็นผังงาน swimlane ของ draw.io สองสไตล์ × ย่อ/เต็ม สร้างอัตโนมัติ',
      hl:['อ่านสเปกจัดซื้อ PM-CM ของ depa','สร้างผัง swimlane draw.io อัตโนมัติ','สองสไตล์ × ย่อ / เต็ม'] },
    'HERO CLASH': { tag:'เกม Roblox',
      d:'สนาม PvP ซูเปอร์ฮีโร่แบบ server-authoritative บน Roblox: 19 services + 8 controllers ด้วยรูปแบบ registry, UI สร้างด้วยโค้ดทั้งหมด และแผนที่สร้างแบบ procedural',
      hl:['สนาม PvP Roblox แบบ server-authoritative','19 services + 8 controllers (รูปแบบ registry)','แผนที่สร้างแบบ procedural'] },
    'Edura Auto-Bot': { tag:'ระบบอัตโนมัติ',
      d:'ยูสเซอร์สคริปต์ Tampermonkey ที่ทำแบบฝึกหัด edura.me / MyEnglish อัตโนมัติ โดยอ่านคำตอบที่ฝังอยู่ใน DOM',
      hl:['ยูสเซอร์สคริปต์ Tampermonkey อัตโนมัติ','อ่านคำตอบที่ฝังอยู่ใน DOM','ทำแบบฝึกหัด edura.me อัตโนมัติ'] },
    'OneBot OneBrain': { tag:'คลังสมอง AI · depa',
      d:'ผู้ช่วยคลังสมองอัจฉริยะสำหรับ depa รวบรวม วิเคราะห์ และค้นหาเอกสารภายในด้วยพลัง LLM เพื่อตอบคำถามและสรุปเนื้อหาได้อย่างรวดเร็ว',
      hl:['คลังสมอง AI เหนือเอกสารภายในองค์กร','สรุประเบียบ มติที่ประชุม และรายงาน','ถาม-ตอบด้วย RAG พร้อมคำสั่งลัด'] },
    'Thai Subtitle Renderer': { tag:'เครื่องมือสื่อ',
      d:'ไปป์ไลน์ถอดเสียงวิดีโออัตโนมัติด้วย faster-whisper และฝังซับไตเติลไทยแบบเป๊ะทุกพิกเซล โดยเรนเดอร์แต่ละบรรทัดเป็น PNG ซ้อนด้วย WPF เพื่อแก้ปัญหา libass ทำวรรณยุกต์ไทยหาย',
      hl:['ถอดเสียงอัตโนมัติด้วย faster-whisper','เรนเดอร์วรรณยุกต์ไทยเป๊ะทุกพิกเซล','ฝังซับด้วย PNG overlay (WPF) ผ่าน ffmpeg'] },
    'Infographic Studio': { tag:'ดีไซน์ · เว็บ',
      d:'อินโฟกราฟิก HTML แบบ self-contained พร้อมรูปจริงฝังในไฟล์และเลย์เอาต์ปักหมุดด้วย CSS งานออกแบบเพื่อการศึกษาภาษาไทยที่เป๊ะทุกพิกเซล',
      hl:['อินโฟกราฟิก HTML แบบ self-contained','ฝังรูปจริง + เลย์เอาต์ปักหมุด CSS','งานออกแบบเพื่อการศึกษาไทยเป๊ะทุกพิกเซล'] },
  };
  const isTH = () => root.dataset.lang === 'th';
  const trTag  = p => (isTH() && TH[p.t] && TH[p.t].tag) ? TH[p.t].tag : p.tag;
  const trDesc = p => (isTH() && TH[p.t] && TH[p.t].d)   ? TH[p.t].d   : p.d;
  const trHl   = p => (isTH() && TH[p.t] && TH[p.t].hl)  ? TH[p.t].hl  : (p.hl || []);

  function renderFeatured() {
  $('#featured-wrap').innerHTML = PROJECTS.filter(p => p.feat).map((p,i) => `
    <article class="feat-card reveal" style="transition-delay:${i*120}ms" data-tilt data-tilt-max="5" data-pid="${PROJECTS.indexOf(p)}">
      <div class="fc-visual${p.shot ? ' has-shot' : ''}" style="--pjc:${p.c}">
        ${p.shot
          ? previewHTML(p, true)
          : (p.logo
            ? (p.logoTile
              ? `<span class="fc-logo-tile" style="background:${p.logoTile}"><img src="${p.logo}" alt="${p.t} logo" /></span>`
              : `<img class="fc-logo" src="${p.logo}" alt="${p.t} logo" />`)
            : `<span class="fc-emoji">${p.e}</span>`)}
        ${p.badge ? `<span class="pj-badge">${p.badge}</span>` : ''}
        <span class="view-cue">⤢ <span data-en="Preview" data-th="พรีวิว">Preview</span></span>
      </div>
      <div class="fc-body">
        <span class="fc-star">★ <span data-en="Featured" data-th="ผลงานเด่น">Featured</span></span>
        <span class="pj-tag">${trTag(p)}</span>
        <h3>${p.url ? `<a href="${p.url}" target="_blank" rel="noopener">${p.t}</a>` : p.t}</h3>
        <p>${trDesc(p)}</p>
        ${trHl(p).length ? `<ul class="fc-highlights">${trHl(p).map(h=>`<li>${h}</li>`).join('')}</ul>` : ''}
        <div class="pj-stack">${p.s.map(x=>`<span>${x}</span>`).join('')}</div>
        ${p.url ? `<a class="fc-link" href="${p.url}" target="_blank" rel="noopener"><span data-en="Visit live site" data-th="เข้าชมเว็บจริง">Visit live site</span> <span class="fc-arrow">↗</span></a>` : ''}
      </div>
    </article>`).join('');
  }
  renderFeatured();

  const grid = $('#projects-grid');
  const featWrap = $('#featured-wrap');
  const moreLabel = $('.more-label');
  let currentFilter = 'all';
  function renderProjects(filter = currentFilter) {
    currentFilter = filter;
    const all = filter === 'all';
    if (featWrap) featWrap.style.display = all ? '' : 'none';
    if (moreLabel) moreLabel.style.display = all ? '' : 'none';
    grid.innerHTML = PROJECTS
      .filter(p => all ? !p.feat : (filter === 'depa' ? p.depa : p.cat === filter))
      .map(p => `
        <article class="project" data-cat="${p.cat}" data-tilt data-tilt-max="7" data-pid="${PROJECTS.indexOf(p)}">
          <div class="pj-thumb" style="--pjc:${p.c}">
            ${p.badge ? `<span class="pj-badge">${p.badge}</span>` : ''}
            ${(p.shot || p.pv) ? `<div class="pj-preview">${previewHTML(p)}</div>` : `<span class="pj-emoji">${p.e}</span>`}
            <span class="view-cue">⤢ <span data-en="Preview" data-th="พรีวิว">Preview</span></span>
          </div>
          <div class="pj-body">
            <span class="pj-tag">${trTag(p)}</span>
            <h3>${p.t}</h3>
            <p>${trDesc(p)}</p>
            <div class="pj-stack">${p.s.map(x=>`<span>${x}</span>`).join('')}</div>
          </div>
        </article>`).join('');
    bindTilt();
    requestAnimationFrame(() => $$('.project', grid).forEach((el,i) =>
      setTimeout(() => el.classList.add('show'), i*60)));
  }

  $$('.filter').forEach(b => b.addEventListener('click', () => {
    $$('.filter').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    renderProjects(b.dataset.filter);
  }));

  const ROLES = {
    en:['AI-driven trading systems.','LLM agents & assistants.','fast, clean web apps.','playful real-time games.','things that feel alive.'],
    th:['ระบบเทรดที่ขับเคลื่อนด้วย AI','ผู้ช่วยและ Agent อัจฉริยะ','เว็บแอปที่เร็วและลื่นไหล','เกมเรียลไทม์สนุก ๆ','งานที่มีชีวิตชีวา']
  };
  let rIdx = 0, cIdx = 0, deleting = false, typeTimer = null;
  const typedEl = $('#typed');
  function type() {
    const lang = root.dataset.lang;
    const word = ROLES[lang][rIdx % ROLES[lang].length];
    typedEl.textContent = word.slice(0, cIdx);
    if (!deleting && cIdx < word.length) cIdx++;
    else if (deleting && cIdx > 0) cIdx--;
    else if (!deleting) { deleting = true; typeTimer = setTimeout(type, 1500); return; }
    else { deleting = false; rIdx++; }
    typeTimer = setTimeout(type, deleting ? 42 : 90);
  }
  type();

  const heroName = $('#hero-name');
  function applyNameGradient() {
    if (!heroName || !heroName._chars) return;
    const base = heroName.getBoundingClientRect();
    const total = base.width || 1;
    heroName._chars.forEach(c => {
      const r = c.getBoundingClientRect();
      c.style.backgroundSize = total + 'px 100%';
      c.style.backgroundPosition = (-(r.left - base.left)) + 'px 0';
    });
  }
  function fitName() {
    if (!heroName) return;
    const parent = heroName.closest('.hero-title') || heroName.parentElement;
    if (!parent) return;
    heroName.style.fontSize = '';
    const avail = parent.clientWidth;
    const w = heroName.scrollWidth;
    if (w > avail) {
      const fs = parseFloat(getComputedStyle(heroName).fontSize) * (avail / w) * 0.985;
      heroName.style.fontSize = fs + 'px';
    }
    applyNameGradient();
  }
  (function splitName() {
    if (!heroName) return;
    const txt = heroName.textContent.trim();
    heroName.textContent = '';
    const chars = [];
    [...txt].forEach((ch, i) => {
      const s = document.createElement('span');
      if (ch === ' ') { s.className = 'char space'; }
      else { s.className = 'char'; s.textContent = ch; chars.push(s); }
      s.style.animationDelay = (reduce ? 0 : 0.25 + i * 0.045) + 's';
      heroName.appendChild(s);
    });
    heroName._chars = chars;
    fitName();
  })();
  addEventListener('resize', fitName);
  addEventListener('load', fitName);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitName);

  function runCounter(el) {
    const target = +el.dataset.target, suffix = el.dataset.suffix || '';
    let n = 0; const step = Math.max(1, target / 45);
    const tick = () => {
      n += step;
      if (n >= target) { el.textContent = target + suffix; return; }
      el.textContent = Math.floor(n) + suffix;
      requestAnimationFrame(tick);
    };
    tick();
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        $$('.counter', e.target).forEach(runCounter);
        if (e.target.classList.contains('counter')) runCounter(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.14 });
  function observeReveals() { $$('.reveal:not(.in)').forEach(el => io.observe(el)); }
  observeReveals();

  renderProjects();
  renderTimeline();

  const nav = $('#nav'), toTop = $('#to-top'), bar = $('#scroll-bar');
  const sections = $$('main section');
  const navLinks = $$('.nav-links a');
  let docH = 1, secOffsets = [], scrollQueued = false;
  function measure() {
    docH = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    secOffsets = sections.map(s => ({ id: s.id, top: s.offsetTop }));
  }
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    toTop.classList.toggle('show', y > 600);
    bar.style.transform = 'scaleX(' + (y / docH) + ')';
    let cur = 'home';
    for (const s of secOffsets) { if (y >= s.top - 160) cur = s.id; }
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  }
  addEventListener('scroll', () => {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(() => { onScroll(); scrollQueued = false; }); }
  }, { passive: true });
  addEventListener('resize', measure, { passive: true });
  addEventListener('load', measure);
  measure(); onScroll();

  const links = $('#nav-links');
  $('#burger').addEventListener('click', () => links.classList.toggle('open'));
  navLinks.forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

  $('#theme-toggle').addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  });

  const langBtn = $('#lang-toggle');
  function applyLang(lang) {
    root.dataset.lang = lang;
    root.lang = lang;
    langBtn.textContent = lang.toUpperCase();
    renderFeatured();
    renderProjects(currentFilter);
    renderTimeline();
    $$('[data-en]').forEach(el => { el.textContent = el.dataset[lang]; });
    $$('[data-ph-en]').forEach(el => { el.placeholder = el.dataset['ph' + (lang === 'en' ? 'En' : 'Th')]; });
    clearTimeout(typeTimer); rIdx = 0; cIdx = 0; deleting = false; typedEl.textContent = ''; type();
    if (modal.classList.contains('open') && modal._p) openModal(modal._p);
  }
  langBtn.addEventListener('click', () => applyLang(root.dataset.lang === 'en' ? 'th' : 'en'));

  const toast = $('#toast');
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  $('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target, ok = [...f.elements].filter(el => el.required).every(el => {
      const valid = el.value.trim() && (el.type !== 'email' || /.+@.+\..+/.test(el.value));
      el.classList.toggle('err', !valid);
      return valid;
    });
    const th = root.dataset.lang === 'th';
    if (!ok) return showToast(th ? 'กรุณากรอกข้อมูลให้ครบ' : 'Please fill in all fields correctly.');
    showToast(th ? 'ส่งข้อความเรียบร้อย! 🎉' : 'Message sent! I\'ll reply soon 🎉');
    f.reset();
  });

  const glow = $('#cursor-glow');
  if (canHover) {
    let gx = 0, gy = 0, gQueued = false;
    addEventListener('pointermove', (e) => {
      gx = e.clientX; gy = e.clientY;
      if (!gQueued) {
        gQueued = true;
        requestAnimationFrame(() => { glow.style.transform = `translate3d(${gx}px,${gy}px,0) translate(-50%,-50%)`; gQueued = false; });
      }
    }, { passive: true });
  }

  if (canHover && !reduce) {
    $$('[data-magnetic].btn').forEach(el => {
      const strength = 0.32; let r = null;
      el.addEventListener('pointerenter', () => { r = el.getBoundingClientRect(); });
      el.addEventListener('pointermove', e => {
        if (!r) r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX-(r.left+r.width/2))*strength}px,${(e.clientY-(r.top+r.height/2))*strength}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; r = null; });
    });
  }

  function bindTilt() {
    if (!canHover || reduce) return;
    $$('[data-tilt]:not([data-tilt-bound])').forEach(el => {
      el.setAttribute('data-tilt-bound', '');
      const max = +(el.dataset.tiltMax || 14); let r = null;
      el.addEventListener('pointerenter', () => { r = el.getBoundingClientRect(); });
      el.addEventListener('pointermove', e => {
        if (!r) r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        el.style.transform = `perspective(900px) rotateY(${(px-.5)*max}deg) rotateX(${(.5-py)*max}deg)`;
        el.style.setProperty('--mx', px*100 + '%');
        el.style.setProperty('--my', py*100 + '%');
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; r = null; });
    });
  }
  bindTilt();

  const cv = $('#bg-canvas'), ctx = cv.getContext('2d');
  let W, H, parts = [];
  const mouse = { x: -999, y: -999 };
  function resize() {
    W = cv.width = innerWidth; H = cv.height = innerHeight;
    const count = Math.min(56, Math.floor(W * H / 27000));
    parts = Array.from({ length: count }, (_, i) => ({
      x: (i * 97 % W), y: (i * 131 % H),
      vx: ((i % 7) - 3) * .12, vy: ((i % 5) - 2) * .12
    }));
  }
  resize();
  addEventListener('resize', resize);
  addEventListener('pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      const dx = p.x - mouse.x, dy = p.y - mouse.y, dm = dx*dx + dy*dy;
      if (dm < 16000) { p.x += dx / 800; p.y += dy / 800; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, 6.283);
      ctx.fillStyle = 'rgba(45,212,191,.42)';
      ctx.fill();
    }
    for (let i = 0; i < parts.length; i++)
      for (let j = i + 1; j < parts.length; j++) {
        const a = parts[i], b = parts[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 104) {
          ctx.globalAlpha = (1 - d / 104) * .28;
          ctx.strokeStyle = 'rgba(130,140,200,.5)';
          ctx.lineWidth = .6;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    if (!reduce) requestAnimationFrame(draw);
  }
  draw();

  setTimeout(observeReveals, 120);
})();
