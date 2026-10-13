/* =========================================================
   UNCLE TOM — UI toolkit
   icons · helpers · store · overlays · starfield · moon · components
   ========================================================= */

/* ---------------- Icons (inline SVG, lucide-style) ---------------- */
const ICONS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  sparkle: '<path d="M12 3l1.9 5.6 5.6 1.9-5.6 1.9L12 18l-1.9-5.6-5.6-1.9 5.6-1.9z"/><path d="M19 3v4M17 5h4"/>',
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  dome: '<path d="M3 20h18"/><path d="M5 20v-6a7 7 0 0 1 14 0v6"/><path d="M12 7v5"/><path d="M9.5 20v-3h5v3"/>',
  telescope: '<path d="m10.07 11.55-4.5 1.2a1 1 0 0 1-1.22-.7l-.52-1.93a1 1 0 0 1 .7-1.22l4.5-1.2"/><path d="m13.56 11.75 4.33-1.16a1 1 0 0 0 .7-1.22l-1.3-4.83a1 1 0 0 0-1.22-.71l-8.06 2.16"/><path d="m16 21-3.1-6.27"/><path d="m8 21 3.1-6.27"/><circle cx="12" cy="13" r="2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  ticket: '<path d="M3 9a3 3 0 0 0 0 6v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3a3 3 0 0 0 0-6V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1z"/><path d="M14 5v2M14 11v2M14 17v2"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
  pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  star: '<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  cloud: '<path d="M17.5 19H8a5 5 0 1 1 1.4-9.8A6 6 0 0 1 21 11.5 3.5 3.5 0 0 1 17.5 19z"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  thermo: '<path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4 4 0 1 0 4 0z"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  wind: '<path d="M3 8h11a3 3 0 1 0-3-3M3 16h15a3 3 0 1 1-3 3M3 12h7"/>',
  droplet: '<path d="M12 2.7s7 7 7 12a7 7 0 0 1-14 0c0-5 7-12 7-12z"/>',
  waves: '<path d="M2 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>',
  filter: '<path d="M3 5h18l-7 8.5V20l-4-2v-4.5z"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  play: '<path d="M7 4v16l13-8z" fill="currentColor"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  camera: '<path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="4"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  mountain: '<path d="m3 20 6-10 4 6 3-4 5 8z"/>',
  zap: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v9H5v-9M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  compare: '<path d="M8 3v18M16 3v18M3 8h5M16 16h5M3 16h5M16 8h5"/>',
  route: '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H17a3.5 3.5 0 0 0 0-7H7a3.5 3.5 0 0 1 0-7h8.5"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  x: '<path d="M4 4l16 16M20 4 4 20"/>',
  youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  sunset: '<path d="M12 10V2M5 10l1.4 1.4M19 10l-1.4 1.4M2 18h20M7 18a5 5 0 0 1 10 0M8 6l4 4 4-4"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
};

function icon(name, cls = '') {
  const filled = name === 'star';
  return `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="${filled ? 0 : 1.8}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

/* ---------------- Helpers ---------------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
const num = (n) => n.toLocaleString('en-IN');
const parseDate = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const fmtDate = (d, opts = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) =>
  (typeof d === 'string' ? parseDate(d) : d).toLocaleDateString('en-GB', opts);
const isoDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

function hashStr(s) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function seeded(seed) { let a = typeof seed === 'string' ? hashStr(seed) : seed; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

const byId = (arr, id) => arr.find((x) => x.id === id);
const getExp = (id) => byId(EXPERIENCES, id);
const getObs = (id) => byId(OBSERVATORIES, id);
const getTel = (id) => byId(TELESCOPES, id);
const getEvent = (id) => byId(EVENTS, id);
const getDest = (id) => byId(DESTINATIONS, id);

function stars(rating, size = '') {
  const full = Math.round(rating);
  return `<span class="stars ${size}" aria-label="${rating} out of 5">${[1, 2, 3, 4, 5].map((i) => `<span class="${i <= full ? 'on' : ''}">${icon('star')}</span>`).join('')}</span>`;
}

/* ---------------- Store (localStorage) ---------------- */
const Store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem('ut_' + k)) ?? d; } catch { return d; } },
  set(k, v) { localStorage.setItem('ut_' + k, JSON.stringify(v)); },
  get wishlist() { return this.get('wishlist', []); },
  toggleWish(id) {
    const w = this.wishlist; const i = w.indexOf(id);
    if (i >= 0) w.splice(i, 1); else w.push(id);
    this.set('wishlist', w); return i < 0;
  },
  get bookings() { return this.get('bookings', []); },
  addBooking(b) { const all = this.bookings; all.unshift(b); this.set('bookings', all); },
  get user() { return this.get('user', null); },
};

/* ---------------- UI: toast / modal / drawer ---------------- */
const UI = {
  toast(msg, type = 'info') {
    const t = document.createElement('div');
    t.className = `toast toast--${type}`;
    t.innerHTML = `${icon(type === 'success' ? 'check' : type === 'love' ? 'heart' : 'info')}<span>${msg}</span>`;
    $('#toasts').appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 2800);
  },
  openModal(html, cls = '') {
    const m = $('#modalContent');
    m.className = 'modal glass ' + cls;
    m.innerHTML = `<button class="icon-btn modal__close" data-close-modal aria-label="Close">${icon('close')}</button>` + html;
    $('#modal').classList.add('open');
    document.body.classList.add('no-scroll');
  },
  closeModal() { $('#modal').classList.remove('open'); document.body.classList.remove('no-scroll'); },
  openDrawer() { renderWishlist(); $('#wishDrawer').classList.add('open'); document.body.classList.add('no-scroll'); },
  closeDrawer() { $('#wishDrawer').classList.remove('open'); document.body.classList.remove('no-scroll'); },
  openSearch() {
    $('#searchOverlay').classList.add('open'); document.body.classList.add('no-scroll');
    const i = $('#globalSearch'); i.value = ''; renderSearch(''); setTimeout(() => i.focus(), 50);
  },
  closeSearch() { $('#searchOverlay').classList.remove('open'); document.body.classList.remove('no-scroll'); },
};

function hydrateIcons(root = document) {
  $$('[data-icon]', root).forEach((el) => {
    if (el.dataset.hydrated) return;
    el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon));
    el.dataset.hydrated = '1';
  });
}

function updateWishCount() {
  const n = Store.wishlist.length; const b = $('#wishCount');
  b.textContent = n; b.hidden = n === 0;
}

function syncFavButtons() {
  const w = Store.wishlist;
  $$('[data-fav]').forEach((b) => b.classList.toggle('active', w.includes(b.dataset.fav)));
}

/* ---------------- Wishlist drawer ---------------- */
function wishItem(id) {
  const e = getExp(id); if (e) return { title: e.title, sub: e.location, img: e.image, href: `#/experience/${e.id}`, price: e.price };
  const o = getObs(id); if (o) return { title: o.name, sub: o.location, img: o.image, href: `#/observatory/${o.id}`, price: o.priceFrom };
  const ev = getEvent(id); if (ev) return { title: ev.title, sub: fmtDate(ev.date), img: ev.image || IMG.galaxy, href: `#/book/${ev.id}`, price: ev.price };
  return null;
}
function renderWishlist() {
  const list = Store.wishlist.map((id) => [id, wishItem(id)]).filter(([, x]) => x);
  $('#wishList').innerHTML = list.length ? list.map(([id, x]) => `
    <div class="wish-item">
      <img src="${x.img}" alt="" />
      <div><a href="${x.href}" class="wish-item__title" data-close-drawer>${x.title}</a><small>${x.sub}</small><strong>${inr(x.price)}</strong></div>
      <button class="icon-btn icon-btn--sm" data-fav="${id}" aria-label="Remove">${icon('trash')}</button>
    </div>`).join('') : `
    <div class="empty">
      <div class="empty__icon">${icon('heart')}</div>
      <h4>Your wishlist is empty</h4>
      <p>Tap the heart on any experience to save it for later.</p>
      <a href="#/explore" class="btn btn--primary btn--sm" data-close-drawer>Explore Experiences</a>
    </div>`;
}

/* ---------------- Global search ---------------- */
function renderSearch(q) {
  q = q.trim().toLowerCase();
  const match = (s) => s.toLowerCase().includes(q);
  const groups = [
    ['Experiences', EXPERIENCES.filter((e) => !q || match(e.title + e.location + e.category)).slice(0, q ? 6 : 4).map((e) => ({ t: e.title, s: e.location, img: e.image, h: `#/experience/${e.id}`, i: 'sparkle' }))],
    ['Observatories', OBSERVATORIES.filter((o) => q && match(o.name + o.location + o.country)).slice(0, 4).map((o) => ({ t: o.name, s: o.location, img: o.image, h: `#/observatory/${o.id}`, i: 'dome' }))],
    ['Telescopes', TELESCOPES.filter((t) => q && match(t.name + t.type)).slice(0, 4).map((t) => ({ t: t.name, s: t.type, img: t.image, h: `#/telescopes?view=${t.id}`, i: 'telescope' }))],
    ['Events', EVENTS.filter((e) => q && match(e.title + e.location)).slice(0, 4).map((e) => ({ t: e.title, s: fmtDate(e.date) + ' · ' + e.location, img: e.image || IMG.galaxy, h: '#/events', i: 'calendar' }))],
    ['Destinations', DESTINATIONS.filter((d) => q && match(d.name + d.country)).map((d) => ({ t: d.name, s: d.country, img: d.image, h: `#/explore?dest=${d.id}`, i: 'pin' }))],
  ].filter(([, items]) => items.length);

  $('#searchResults').innerHTML = groups.length ? (q ? '' : '<p class="search-hint">Popular right now</p>') + groups.map(([g, items]) => `
    <div class="search-group"><h5>${g}</h5>${items.map((x) => `
      <a href="${x.h}" class="search-item" data-close-search>
        <img src="${x.img}" alt="" /><span><strong>${x.t}</strong><small>${x.s}</small></span>${icon('arrowRight')}
      </a>`).join('')}</div>`).join('') : `<div class="empty"><h4>No results for “${q}”</h4><p>Try “Ladakh”, “galaxy” or “telescope”.</p></div>`;
}

/* ---------------- Starfield canvas ---------------- */
function initStarfield() {
  const c = $('#starfield'); if (!c) return;
  const ctx = c.getContext('2d'); if (!ctx) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w, h, starsArr = [], shooting = null, dpr = Math.min(devicePixelRatio || 1, 2);
  const colors = ['255,255,255', '200,215,255', '220,200,255', '180,240,255', '255,235,200'];
  function resize() {
    w = c.width = innerWidth * dpr; h = c.height = innerHeight * dpr;
    c.style.width = innerWidth + 'px'; c.style.height = innerHeight + 'px';
    const n = Math.min(420, Math.floor((innerWidth * innerHeight) / 4200));
    starsArr = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h * 1.6, r: (Math.random() * 1.1 + 0.2) * dpr,
      a: Math.random(), s: Math.random() * 0.02 + 0.004, d: Math.random() * 0.5 + 0.1,
      c: colors[(Math.random() * colors.length) | 0],
    }));
  }
  function frame() {
    ctx.clearRect(0, 0, w, h);
    const sy = scrollY * dpr;
    for (const s of starsArr) {
      s.a += s.s; const alpha = 0.35 + Math.abs(Math.sin(s.a)) * 0.65;
      const y = ((s.y - sy * s.d) % (h * 1.6) + h * 1.6) % (h * 1.6);
      if (y > h) continue;
      ctx.beginPath(); ctx.fillStyle = `rgba(${s.c},${alpha})`; ctx.arc(s.x, y, s.r, 0, 6.283); ctx.fill();
    }
    if (!shooting && Math.random() < 0.004) {
      shooting = { x: Math.random() * w * 0.7 + w * 0.2, y: Math.random() * h * 0.4, vx: -(6 + Math.random() * 6) * dpr, vy: (2.5 + Math.random() * 2) * dpr, life: 1 };
    }
    if (shooting) {
      const s = shooting; const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 14, s.y - s.vy * 14);
      g.addColorStop(0, `rgba(255,255,255,${s.life})`); g.addColorStop(1, 'rgba(167,139,250,0)');
      ctx.strokeStyle = g; ctx.lineWidth = 1.6 * dpr; ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 14, s.y - s.vy * 14); ctx.stroke();
      s.x += s.vx; s.y += s.vy; s.life -= 0.016; if (s.life <= 0) shooting = null;
    }
    if (!reduce) requestAnimationFrame(frame);
  }
  resize(); addEventListener('resize', resize); frame();
}

/* ---------------- Moon phase (real calculation) ---------------- */
function moonInfo(date = new Date()) {
  const synodic = 29.530588853;
  const ref = Date.UTC(2000, 0, 6, 18, 14); // known new moon
  const age = ((((date.getTime() - ref) / 86400000) % synodic) + synodic) % synodic;
  const f = age / synodic;
  const illum = Math.round(((1 - Math.cos(2 * Math.PI * f)) / 2) * 100);
  const names = [[1.84, 'New Moon'], [5.53, 'Waxing Crescent'], [9.22, 'First Quarter'], [12.91, 'Waxing Gibbous'], [16.61, 'Full Moon'], [20.3, 'Waning Gibbous'], [23.99, 'Last Quarter'], [27.68, 'Waning Crescent'], [99, 'New Moon']];
  const name = names.find(([lim]) => age < lim)[1];
  const nextNew = new Date(date.getTime() + (synodic - age) * 86400000);
  return { age, f, illum, name, nextNew };
}
function moonSVG(f, size = 64) {
  const r = 50, k = Math.cos(2 * Math.PI * f), waxing = f < 0.5, rx = Math.abs(k) * r;
  const limb = waxing ? 1 : 0; const term = waxing ? (k > 0 ? 0 : 1) : (k > 0 ? 1 : 0);
  const lit = f > 0.02 && f < 0.98 ? `<path d="M50 0 A50 50 0 0 ${limb} 50 100 A${rx} 50 0 0 ${term} 50 0Z" fill="url(#moonLit)"/>` : '';
  return `<svg class="moon-svg" width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true">
    <defs><radialGradient id="moonLit" cx="45%" cy="40%" r="65%"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#cfc6b4"/></radialGradient></defs>
    <circle cx="50" cy="50" r="50" fill="#1b1f33"/>${lit}
    <circle cx="34" cy="38" r="7" fill="#000" opacity=".08"/><circle cx="62" cy="62" r="10" fill="#000" opacity=".07"/><circle cx="64" cy="30" r="5" fill="#000" opacity=".07"/>
  </svg>`;
}

/* ---------------- Reveal on scroll ---------------- */
let revealObserver;
function initReveal(root = document) {
  if (typeof IntersectionObserver === 'undefined') {
    $$('.reveal', root).forEach((el) => el.classList.add('in'));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); }
    }), { threshold: 0.01 });
  }
  $$('.reveal:not(.in)', root).forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
    revealObserver.observe(el);
    setTimeout(() => el.classList.add('in'), 300 + (i % 6) * 60);
  });
}

/* =========================================================
   COMPONENTS
   ========================================================= */
const favBtn = (id) => `<button class="fav-btn ${Store.wishlist.includes(id) ? 'active' : ''}" data-fav="${id}" aria-label="Save to wishlist">${icon('heart')}</button>`;

function experienceCard(e) {
  return `
  <article class="card exp-card reveal">
    <a href="#/experience/${e.id}" class="card__media">
      <img src="${e.image}" alt="${e.title}" loading="lazy" />
      <span class="chip chip--glass card__cat">${e.category}</span>
      ${e.badge ? `<span class="chip chip--gold card__badge">${icon('sparkle')}${e.badge}</span>` : ''}
    </a>
    ${favBtn(e.id)}
    <div class="card__body">
      <div class="card__meta">
        <span>${icon('pin')}${e.location}</span>
        <span class="rating">${icon('star')}${e.rating.toFixed(2)} <small>(${num(e.reviews)})</small></span>
      </div>
      <h3 class="card__title"><a href="#/experience/${e.id}">${e.title}</a></h3>
      <p class="card__desc">${e.tagline}</p>
      <div class="card__facts">
        <span>${icon('clock')}${e.duration}</span>
        <span>${icon('users')}Up to ${e.maxGuests}</span>
      </div>
      <div class="card__foot">
        <div class="price"><small>From</small><strong>${inr(e.price)}</strong><small>/ person</small></div>
        <a href="#/experience/${e.id}" class="btn btn--glass btn--sm">View Experience ${icon('arrowRight')}</a>
      </div>
    </div>
  </article>`;
}

function destinationCard(d, i = 0) {
  return `
  <a href="#/explore?dest=${d.id}" class="dest-card reveal ${i === 0 ? 'dest-card--lg' : ''}">
    <img src="${d.image}" alt="${d.name}" loading="lazy" />
    <div class="dest-card__shade"></div>
    <div class="dest-card__top">
      <span class="chip chip--glass">${icon('dome')}${d.observatories} Observatories</span>
      <span class="chip chip--glass sky-score">${icon('star')}${d.skyRating}/10</span>
    </div>
    <div class="dest-card__content">
      <span class="dest-card__country">${icon('pin')}${d.country} · ${d.altitude}</span>
      <h3>${d.name}</h3>
      <p>${d.desc}</p>
      <span class="dest-card__cta">Explore destination ${icon('arrowRight')}</span>
    </div>
  </a>`;
}

const availClass = (a) => (a === 'Available Tonight' ? 'ok' : a === 'Limited Slots' ? 'warn' : 'off');

function observatoryCard(o) {
  return `
  <article class="card obs-card reveal">
    <a href="#/observatory/${o.id}" class="card__media">
      <img src="${o.image}" alt="${o.name}" loading="lazy" />
      <span class="avail avail--${availClass(o.availability)}"><i></i>${o.availability}</span>
    </a>
    ${favBtn(o.id)}
    <div class="card__body">
      <div class="card__meta">
        <span>${icon('pin')}${o.location}, ${o.country}</span>
        <span class="rating">${icon('star')}${o.rating.toFixed(2)} <small>(${num(o.reviews)})</small></span>
      </div>
      <h3 class="card__title"><a href="#/observatory/${o.id}">${o.name}</a></h3>
      <div class="obs-card__info">
        <div>${icon('telescope')}<span>${o.telescopeInfo}</span></div>
        <div>${icon('mountain')}<span>${o.altitude} altitude · Bortle ${o.bortle}</span></div>
      </div>
      <div class="tags">${o.experienceTypes.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="card__foot">
        <div class="price"><small>Starting from</small><strong>${inr(o.priceFrom)}</strong></div>
        <a href="#/observatory/${o.id}" class="btn btn--glass btn--sm">View Details ${icon('arrowRight')}</a>
      </div>
    </div>
  </article>`;
}

function telescopeCard(t, comparing = []) {
  const o = getObs(t.observatoryId);
  const on = comparing.includes(t.id);
  return `
  <article class="card tel-card reveal ${on ? 'is-comparing' : ''}">
    <div class="card__media" data-tel-view="${t.id}">
      <img src="${t.image}" alt="${t.name}" loading="lazy" />
      <span class="chip chip--glass card__cat">${t.type}</span>
      <span class="avail avail--${t.available ? 'ok' : 'warn'}"><i></i>${t.available ? 'Sessions available' : 'Waitlist'}</span>
    </div>
    <div class="card__body">
      <div class="card__meta">
        <span>${icon('dome')}${o.name}</span>
        <span class="rating">${icon('star')}${t.rating.toFixed(1)} <small>(${t.reviews})</small></span>
      </div>
      <h3 class="card__title">${t.name}</h3>
      <div class="spec-mini">
        <div><small>Aperture</small><strong>${t.aperture} mm</strong></div>
        <div><small>Focal ratio</small><strong>f/${t.focalRatio}</strong></div>
        <div><small>Light vs eye</small><strong>${num(t.lightGathering)}×</strong></div>
      </div>
      <div class="card__foot">
        <label class="compare-check"><input type="checkbox" data-compare="${t.id}" ${on ? 'checked' : ''}/><span>${icon('check')}</span>Compare</label>
        <button class="btn btn--glass btn--sm" data-tel-view="${t.id}">View Telescope ${icon('arrowRight')}</button>
      </div>
    </div>
  </article>`;
}

function eventCover(ev) {
  if (ev.art === 'eclipse') return `<div class="art art--eclipse"><div class="art__moon"></div></div>`;
  if (ev.art === 'sun') return `<div class="art art--sun"><div class="art__sun"></div></div>`;
  if (ev.art === 'meteor') return `<img src="${ev.image}" alt="${ev.title}" loading="lazy"/><div class="meteors"><i></i><i></i><i></i><i></i></div>`;
  return `<img src="${ev.image}" alt="${ev.title}" loading="lazy"/>`;
}

function eventCard(ev) {
  const d = parseDate(ev.date); const left = ev.seats - ev.booked; const pct = Math.round((ev.booked / ev.seats) * 100);
  return `
  <article class="card event-card reveal" data-month="${ev.date.slice(0, 7)}">
    <div class="card__media">
      ${eventCover(ev)}
      <div class="date-block"><span>${d.toLocaleDateString('en-GB', { month: 'short' })}</span><strong>${d.getDate()}</strong><small>${d.getFullYear()}</small></div>
      <span class="chip chip--glass card__cat">${ev.category}</span>
    </div>
    ${favBtn(ev.id)}
    <div class="card__body">
      <h3 class="card__title">${ev.title}</h3>
      <p class="card__desc">${ev.desc}</p>
      <div class="event-card__facts">
        <span>${icon('calendar')}${fmtDate(ev.date)}${ev.endDate ? ' – ' + fmtDate(ev.endDate, { day: 'numeric', month: 'short' }) : ''} · ${ev.time}</span>
        <span>${icon('pin')}${ev.location}</span>
        <span>${icon('clock')}${ev.duration}</span>
      </div>
      <div class="seats">
        <div class="seats__row"><span>${left <= 10 ? `<b class="hot">Only ${left} seats left</b>` : `${left} of ${ev.seats} seats available`}</span><span>${pct}% booked</span></div>
        <div class="bar"><i style="width:${pct}%"></i></div>
      </div>
      <div class="card__foot">
        <div class="price"><strong>${inr(ev.price)}</strong><small>/ person</small></div>
        <div class="btn-row">
          <button class="btn btn--ghost btn--sm" data-event-view="${ev.id}">View Event</button>
          <a href="#/book/${ev.id}" class="btn btn--primary btn--sm">Register</a>
        </div>
      </div>
    </div>
  </article>`;
}

/* ---------------- Sky conditions widget ---------------- */
function skyScore(c, moon) {
  let s = 100 - c.cloud * 1.6 - (c.bortle - 1) * 7 - moon.illum * 0.22 - Math.max(0, c.seeing - 0.6) * 12 - Math.max(0, c.humidity - 40) * 0.3;
  s = Math.max(5, Math.min(99, Math.round(s)));
  const label = s >= 85 ? 'Exceptional' : s >= 72 ? 'Excellent' : s >= 58 ? 'Good' : s >= 40 ? 'Fair' : 'Poor';
  return { s, label };
}

function conditionsWidget(destId = 'ladakh', compact = false) {
  const c = CONDITIONS[destId]; const d = getDest(destId); const moon = moonInfo();
  const { s, label } = skyScore(c, moon);
  const rnd = seeded(destId + isoDate(new Date()));
  const hours = ['6PM', '7PM', '8PM', '9PM', '10PM', '11PM', '12AM', '1AM', '2AM', '3AM', '4AM', '5AM'];
  const hourly = hours.map((h, i) => {
    const base = c.cloud + (i < 3 ? 8 : 0);
    return { h, v: Math.max(0, Math.min(100, Math.round(base + (rnd() - 0.45) * 18))) };
  });
  const circ = 2 * Math.PI * 52;
  const bortleRow = Array.from({ length: 9 }, (_, i) => `<i class="${i + 1 === c.bortle ? 'on' : ''}" style="--b:${i}"></i>`).join('');
  const seeingDots = Array.from({ length: 5 }, (_, i) => `<i class="${i < c.seeingScore ? 'on' : ''}"></i>`).join('');

  return `
  <div class="sky ${compact ? 'sky--compact' : ''}">
    <div class="sky__head">
      <div>
        <span class="eyebrow">${icon('moon')} Live sky forecast · ${fmtDate(new Date(), { weekday: 'long', day: 'numeric', month: 'long' })}</span>
        <h3>Tonight's Stargazing Conditions</h3>
        <p class="muted">${d.name}, ${d.country} · Best viewing window <b>10:30 PM – 3:45 AM</b></p>
      </div>
      ${compact ? '' : `<div class="sky__select">
        ${DESTINATIONS.map((x) => `<button class="pill ${x.id === destId ? 'active' : ''}" data-sky="${x.id}">${x.name}</button>`).join('')}
      </div>`}
    </div>
    <div class="sky__grid">
      <div class="sky__score glass-soft">
        <svg viewBox="0 0 120 120" class="ring">
          <defs><linearGradient id="ringG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a78bfa"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs>
          <circle cx="60" cy="60" r="52" class="ring__track"/>
          <circle cx="60" cy="60" r="52" class="ring__val" stroke="url(#ringG)" stroke-dasharray="${circ}" stroke-dashoffset="${circ * (1 - s / 100)}"/>
        </svg>
        <div class="sky__score-val"><strong>${s}</strong><span>/100</span></div>
        <div class="sky__score-label"><span class="stars-text">${'★'.repeat(Math.max(1, Math.round(s / 20)))}${'☆'.repeat(5 - Math.max(1, Math.round(s / 20)))}</span><b>${label}</b><small>Stargazing index</small></div>
      </div>

      <div class="sky__metrics">
        <div class="metric glass-soft">${icon('cloud')}<small>Cloud coverage</small><strong>${c.cloud}%</strong><div class="bar bar--sm"><i style="width:${c.cloud}%"></i></div></div>
        <div class="metric glass-soft">${icon('eye')}<small>Visibility</small><strong>${c.visibility} km</strong><span class="metric__note">${c.transparency} transparency</span></div>
        <div class="metric glass-soft">${icon('thermo')}<small>Temperature</small><strong>${c.temp}°C</strong><span class="metric__note">${icon('droplet')}${c.humidity}% · ${icon('wind')}${c.wind} km/h</span></div>
        <div class="metric metric--moon glass-soft">${moonSVG(moon.f, 46)}<small>Moon phase</small><strong>${moon.name}</strong><span class="metric__note">Day ${moon.age.toFixed(1)} of 29.5</span></div>
        <div class="metric glass-soft">${icon('sun')}<small>Moon illumination</small><strong>${moon.illum}%</strong><div class="bar bar--sm bar--gold"><i style="width:${moon.illum}%"></i></div></div>
        <div class="metric glass-soft">${icon('waves')}<small>Seeing conditions</small><strong>${c.seeing}″</strong><span class="dots">${seeingDots}</span></div>
        <div class="metric metric--wide glass-soft">${icon('target')}<small>Darkness level</small><strong>Bortle Class ${c.bortle} <em>· ${c.bortle === 1 ? 'Excellent dark-sky site' : 'Truly dark site'}</em></strong><div class="bortle">${bortleRow}</div><div class="bortle__legend"><span>Pristine</span><span>City sky</span></div></div>
      </div>
    </div>

    ${compact ? '' : `
    <div class="sky__bottom">
      <div class="hourly glass-soft">
        <div class="hourly__head"><b>${icon('cloud')} Hourly cloud cover</b><small>Lower is better</small></div>
        <div class="hourly__bars">${hourly.map((x) => `<div class="hourly__col" title="${x.h}: ${x.v}% cloud"><span class="hourly__v">${x.v}%</span><div class="hourly__bar"><i style="height:${Math.max(4, x.v)}%" class="${x.v < 15 ? 'good' : x.v < 35 ? 'ok' : 'bad'}"></i></div><small>${x.h}</small></div>`).join('')}</div>
      </div>
      <div class="timeline glass-soft">
        <div class="tl"><span>${icon('sunset')}</span><div><small>Sunset</small><b>6:12 PM</b></div></div>
        <div class="tl"><span>${icon('moon')}</span><div><small>Astronomical dark</small><b>7:31 PM</b></div></div>
        <div class="tl"><span>${icon('star')}</span><div><small>Milky Way core sets</small><b>10:05 PM</b></div></div>
        <div class="tl"><span>${icon('sun')}</span><div><small>Next new moon</small><b>${fmtDate(moon.nextNew, { day: 'numeric', month: 'short' })}</b></div></div>
      </div>
    </div>`}
  </div>`;
}

/* ---------------- Telescope optical diagrams (animated SVG) ---------------- */
function opticsSVG(type) {
  const ray = (d, delay = 0) => `<path class="ray" d="${d}" style="animation-delay:${delay}s"/>`;
  let body = '';
  if (type === 'refractor') {
    body = `<rect class="tube" x="50" y="44" width="250" height="52" rx="6"/><rect class="tube" x="300" y="60" width="34" height="20" rx="3"/>
      <ellipse class="lens" cx="58" cy="70" rx="6" ry="25"/><ellipse class="lens" cx="70" cy="70" rx="4" ry="22"/>
      ${ray('M0 52 H58 L318 70')}${ray('M0 70 H318', 0.2)}${ray('M0 88 H58 L318 70', 0.4)}`;
  } else if (type === 'newtonian') {
    body = `<rect class="tube" x="20" y="40" width="300" height="60" rx="6"/><rect class="tube" x="70" y="6" width="20" height="34" rx="3"/>
      <path class="mirror" d="M316 44 Q306 70 316 96"/><path class="mirror" d="M70 60 L90 80"/>
      ${ray('M0 50 H311 L80 66 V8')}${ray('M0 90 H311 L80 74 V8', 0.3)}`;
  } else if (type === 'cdk') {
    body = `<path class="truss" d="M40 42 L120 98 L200 42 L280 98 M40 98 L120 42 L200 98 L280 42"/><rect class="tube" x="30" y="40" width="20" height="60" rx="3"/><rect class="tube" x="280" y="40" width="22" height="60" rx="3"/><rect class="tube" x="302" y="60" width="34" height="20" rx="3"/>
      <path class="mirror" d="M296 44 Q290 70 296 96" /><path class="mirror" d="M42 60 Q46 70 42 80"/><ellipse class="lens" cx="318" cy="70" rx="3" ry="9"/>
      ${ray('M0 52 H292 L44 64 L336 70')}${ray('M0 88 H292 L44 76 L336 70', 0.35)}`;
  } else {
    body = `<rect class="tube" x="40" y="40" width="260" height="60" rx="8"/><rect class="tube" x="300" y="60" width="36" height="20" rx="3"/>
      <rect class="lens" x="44" y="42" width="4" height="56" rx="2"/><path class="mirror" d="M296 44 Q288 70 296 96"/><path class="mirror" d="M62 62 Q66 70 62 78"/>
      ${ray('M0 52 H291 L64 64 L336 70')}${ray('M0 88 H291 L64 76 L336 70', 0.35)}`;
  }
  return `<svg class="optics" viewBox="0 0 340 110" aria-label="Optical path diagram">${body}</svg>`;
}

/* ---------------- Map placeholder (stylised) ---------------- */
function miniMap(label) {
  return `<div class="mini-map">
    <svg viewBox="0 0 400 200" preserveAspectRatio="none">
      <defs><pattern id="mmg" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="rgba(148,163,255,.08)"/></pattern></defs>
      <rect width="400" height="200" fill="url(#mmg)"/>
      <path d="M0 140 C80 120 120 160 200 130 S320 90 400 110" stroke="rgba(167,139,250,.35)" stroke-width="2" fill="none"/>
      <path d="M40 0 C60 60 140 80 160 200" stroke="rgba(34,211,238,.25)" stroke-width="1.5" fill="none" stroke-dasharray="4 4"/>
      <path d="M260 0 C250 70 300 120 380 200" stroke="rgba(148,163,255,.18)" stroke-width="6" fill="none"/>
    </svg>
    <div class="mini-map__pin">${icon('pin')}<span>${label}</span></div>
  </div>`;
}
