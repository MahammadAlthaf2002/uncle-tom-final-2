/* =========================================================
   UNCLE TOM — Page views
   Each page returns { html, mount?, cleanup? }
   ========================================================= */

const TIMES = ['7:30 PM', '9:00 PM', '10:30 PM', '12:00 AM'];

/* Mock availability: deterministic per item + date */
function getDates(n = 14) {
  const out = []; const t = new Date(); t.setHours(0, 0, 0, 0);
  for (let i = 0; i < n; i++) { const d = new Date(t); d.setDate(t.getDate() + i); out.push(d); }
  return out;
}
function getSlots(item, iso) {
  const rnd = seeded(item.id + iso); const max = item.maxGuests || 20;
  return TIMES.map((time) => { const r = rnd(); return { time, left: r < 0.15 ? 0 : Math.max(1, Math.round(r * max)) }; });
}
function dayQuality(item, iso) {
  const r = seeded('sky' + item.id + iso)();
  return r > 0.75 ? { k: 'fair', t: 'Partly cloudy' } : r > 0.35 ? { k: 'good', t: 'Clear' } : { k: 'great', t: 'Excellent' };
}

function pageHeader({ eyebrow, title, sub, image, extra = '' }) {
  return `
  <section class="page-hero">
    <div class="page-hero__bg" style="background-image:url('${image}')"></div>
    <div class="container page-hero__inner">
      <span class="eyebrow reveal">${eyebrow}</span>
      <h1 class="reveal">${title}</h1>
      <p class="lead reveal">${sub}</p>
      ${extra}
    </div>
  </section>`;
}

function sectionHead(eyebrow, title, sub, action = '') {
  return `<div class="section-head reveal">
    <div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2>${sub ? `<p class="lead">${sub}</p>` : ''}</div>
    ${action}
  </div>`;
}

const WORKFLOW = [
  { icon: 'compass', t: 'Discover', d: 'Search experiences, observatories & events by destination and date.', href: '#/explore' },
  { icon: 'eye', t: 'View Details', d: 'Gallery, telescope specs, what\'s included and live sky conditions.', href: '#/experience/milky-way-observation' },
  { icon: 'calendar', t: 'Check Availability', d: 'Real-time dates, time slots and seats — with sky-quality hints.', href: '#/experience/milky-way-observation#booking' },
  { icon: 'ticket', t: 'Book', d: 'Choose guests and add-ons, enter guest details in a guided flow.', href: '#/book/milky-way-observation' },
  { icon: 'lock', t: 'Pay', d: 'Secure checkout with card / UPI and a transparent price summary.', href: '#/book/milky-way-observation' },
  { icon: 'check', t: 'Confirmation', d: 'Instant e-ticket with booking ID, QR code and downloadable receipt.', href: '#/bookings' },
];

function workflowSteps() {
  return `<div class="flow">${WORKFLOW.map((s, i) => `
    <a href="${s.href}" class="flow__step reveal">
      <div class="flow__icon">${icon(s.icon)}<span class="flow__num">${i + 1}</span></div>
      <h4>${s.t}</h4><p>${s.d}</p>
    </a>`).join('')}</div>`;
}

/* =========================================================
   HOME
   ========================================================= */
let homeSky = 'ladakh';
function homePage() {
  const today = isoDate(new Date());
  const next = EVENTS.find((e) => parseDate(e.date) >= new Date()) || EVENTS[0];
  const html = `
  <section class="hero">
    <div class="hero__bg"><img src="${IMG.hero}" alt="Observatory under the Milky Way" /></div>
    <div class="hero__glow"></div>
    <div class="container hero__inner">
      <span class="eyebrow eyebrow--pill hero__eyebrow">${icon('sparkle')} Now booking the 2026–27 dark-sky season</span>
      <h1 class="hero__title">Discover the Universe <span class="grad">Like Never Before</span></h1>
      <p class="hero__lead">Explore premium observatories, powerful telescopes, and unforgettable astronomy experiences under the world's clearest skies.</p>
      <div class="hero__ctas">
        <a href="#/explore" class="btn btn--primary btn--lg">${icon('sparkle')}Explore Experiences</a>
        <a href="#/observatories" class="btn btn--glass btn--lg">${icon('dome')}Find an Observatory</a>
      </div>
      <div class="hero__trust">
        <div class="avatars"><span>AR</span><span>DK</span><span>MS</span><span>JL</span></div>
        <div><div class="stars-gold">★★★★★</div><small><b>4.9/5</b> from 12,400+ stargazers</small></div>
        <div class="hero__divider"></div>
        <div><b>120+</b><small>Partner observatories</small></div>
        <div class="hero__divider"></div>
        <div><b>38</b><small>Countries</small></div>
      </div>

      <form class="search-panel glass" id="heroSearch">
        <label class="sp-field">
          <span class="sp-label">${icon('pin')}Destination</span>
          <select name="dest"><option value="">Anywhere</option>${DESTINATIONS.map((d) => `<option value="${d.id}">${d.name}, ${d.country}</option>`).join('')}</select>
        </label>
        <label class="sp-field">
          <span class="sp-label">${icon('calendar')}Date</span>
          <input type="date" name="date" min="${today}" value="${today}" />
        </label>
        <label class="sp-field">
          <span class="sp-label">${icon('sparkle')}Experience</span>
          <select name="cat">${EXP_CATEGORIES.map((c) => `<option value="${c === 'All' ? '' : c}">${c === 'All' ? 'All experiences' : c}</option>`).join('')}</select>
        </label>
        <label class="sp-field">
          <span class="sp-label">${icon('users')}Guests</span>
          <select name="guests">${[1, 2, 3, 4, 5, 6, 8, 10].map((g) => `<option ${g === 2 ? 'selected' : ''} value="${g}">${g} ${g === 1 ? 'guest' : 'guests'}</option>`).join('')}</select>
        </label>
        <button class="btn btn--primary sp-btn" type="submit">${icon('search')}Explore</button>
      </form>
    </div>
    <a href="#how" class="scroll-cue" data-scroll="#how" aria-label="Scroll"><span></span></a>
  </section>

  <section class="stats-strip">
    <div class="container stats">
      <div class="stat reveal"><strong data-count="120">0</strong><span>+ Partner observatories</span></div>
      <div class="stat reveal"><strong data-count="450">0</strong><span>+ Curated experiences</span></div>
      <div class="stat reveal"><strong data-count="85">0</strong><span>K Happy stargazers</span></div>
      <div class="stat reveal"><strong data-count="270">0</strong><span>Clear nights / year*</span></div>
    </div>
  </section>

  <section class="section" id="how">
    <div class="container">
      ${sectionHead('How it works', 'From discovery to <span class="grad">confirmation</span> in minutes', 'Uncle Tom connects curious travellers with the world\'s best dark-sky observatories. Here is the complete booking journey — click any step to try it live.')}
      ${workflowSteps()}
    </div>
  </section>

  <section class="section">
    <div class="container">
      ${sectionHead('Featured', 'Explore Extraordinary Experiences', 'Handpicked astronomy experiences designed for curious minds and passionate stargazers.', `<a href="#/explore" class="btn btn--ghost">View all ${icon('arrowRight')}</a>`)}
      <div class="pills reveal" id="homeCats">${EXP_CATEGORIES.map((c, i) => `<button class="pill ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('')}</div>
      <div class="grid grid--cards" id="homeExp">${EXPERIENCES.slice(0, 6).map(experienceCard).join('')}</div>
    </div>
  </section>

  <section class="section section--sky" id="sky">
    <div class="container" id="skyWrap">${conditionsWidget(homeSky)}</div>
  </section>

  <section class="section">
    <div class="container">
      ${sectionHead('Destinations', 'Explore the World\'s Best <span class="grad">Stargazing Destinations</span>', 'Certified dark-sky reserves at altitude — where the air is thin, dry and impossibly clear.')}
      <div class="dest-grid">${DESTINATIONS.map(destinationCard).join('')}</div>
    </div>
  </section>

  <section class="section">
    <div class="container split">
      <div class="split__text reveal">
        <span class="eyebrow">Telescope Explorer</span>
        <h2>Look through <span class="grad">world-class telescopes</span></h2>
        <p class="lead">From legendary Takahashi refractors to research-grade PlaneWave observatories. Compare aperture, light-gathering power and what you'll actually see — then book a session.</p>
        <ul class="checklist">
          <li>${icon('check')}Up to 11,800× more light than the human eye</li>
          <li>${icon('check')}Side-by-side technical comparison</li>
          <li>${icon('check')}Live optical path diagrams</li>
        </ul>
        <a href="#/telescopes" class="btn btn--primary">${icon('telescope')}Explore Telescopes</a>
      </div>
      <div class="tel-stack reveal">
        ${TELESCOPES.slice(0, 3).map((t, i) => `
        <a href="#/telescopes?view=${t.id}" class="tel-stack__item glass" style="--i:${i}">
          <img src="${t.image}" alt="" />
          <div><small>${t.type}</small><strong>${t.name}</strong><span>${t.aperture} mm · f/${t.focalRatio} · ${num(t.lightGathering)}× light</span></div>
          ${icon('arrowRight')}
        </a>`).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      ${sectionHead('Events', 'Upcoming Astronomy Events', 'Meteor showers, eclipses and dark-sky weekends — reserve your seat before they sell out.', `<a href="#/events" class="btn btn--ghost">All events ${icon('arrowRight')}</a>`)}
      <div class="next-event glass reveal">
        <div><span class="eyebrow">${icon('zap')} Next celestial event</span><h3>${next.title}</h3><p class="muted">${fmtDate(next.date)} · ${next.location}</p></div>
        <div class="countdown" data-countdown="${next.date}"></div>
        <a href="#/book/${next.id}" class="btn btn--primary">Reserve seat</a>
      </div>
      <div class="grid grid--cards">${EVENTS.slice(0, 3).map(eventCard).join('')}</div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      ${sectionHead('Why Uncle Tom', 'A premium experience, end to end', '')}
      <div class="features">
        ${[
          ['shield', 'Clear-Sky Guarantee', 'If clouds roll in, reschedule for free or get a full refund. No questions asked.'],
          ['users', 'Expert Astronomers', 'Every session is led by a certified astronomer or astro-photographer.'],
          ['telescope', 'Premium Equipment', 'Research-grade telescopes you would never get access to on your own.'],
          ['moon', 'Smart Sky Forecasts', 'Cloud, seeing and moon-phase data help you pick the perfect night.'],
          ['lock', 'Secure Booking', 'Encrypted checkout with cards, UPI and wallets. Instant confirmation.'],
          ['gift', 'Gift Experiences', 'Send a night under the stars — perfect for birthdays and anniversaries.'],
        ].map(([i, t, d]) => `<div class="feature glass-soft reveal"><div class="feature__icon">${icon(i)}</div><h4>${t}</h4><p>${d}</p></div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      ${sectionHead('Stories', 'Loved by stargazers worldwide', '')}
      <div class="reviews">${REVIEWS.map((r) => `
        <figure class="review glass-soft reveal">
          <div class="stars-gold">★★★★★</div>
          <blockquote>“${r.text}”</blockquote>
          <figcaption><span class="avatar">${r.name[0]}</span><div><b>${r.name}</b><small>${r.city} · ${r.date}</small></div></figcaption>
        </figure>`).join('')}</div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="cta-banner reveal">
        <img src="${IMG.ladakh}" alt="" />
        <div class="cta-banner__content">
          <span class="eyebrow">${icon('sparkle')} Your night awaits</span>
          <h2>The universe is waiting.<br/>Book your night under the stars.</h2>
          <div class="btn-row">
            <a href="#/explore" class="btn btn--primary btn--lg">Book an Experience</a>
            <a href="#/about" class="btn btn--glass btn--lg">Partner with Uncle Tom</a>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  let timer;
  const mount = () => {
    $('#heroSearch').addEventListener('submit', (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const qs = new URLSearchParams([...f.entries()].filter(([, v]) => v)).toString();
      location.hash = '#/explore' + (qs ? '?' + qs : '');
    });
    $('#homeCats').addEventListener('click', (e) => {
      const b = e.target.closest('[data-cat]'); if (!b) return;
      $$('#homeCats .pill').forEach((p) => p.classList.toggle('active', p === b));
      const c = b.dataset.cat;
      const list = (c === 'All' ? EXPERIENCES : EXPERIENCES.filter((x) => x.category === c)).slice(0, 6);
      $('#homeExp').innerHTML = list.map(experienceCard).join('') || `<div class="empty"><p>No experiences in this category yet.</p></div>`;
      initReveal($('#homeExp'));
    });
    bindSky();
    timer = startCountdowns();
    countUp();
  };
  return { html, mount, cleanup: () => clearInterval(timer) };
}

function bindSky() {
  const wrap = $('#skyWrap'); if (!wrap) return;
  wrap.addEventListener('click', (e) => {
    const b = e.target.closest('[data-sky]'); if (!b) return;
    homeSky = b.dataset.sky; wrap.innerHTML = conditionsWidget(homeSky);
  });
}

function startCountdowns() {
  const tick = () => $$('[data-countdown]').forEach((el) => {
    const diff = Math.max(0, parseDate(el.dataset.countdown).getTime() + 20 * 3600000 - Date.now());
    const d = Math.floor(diff / 86400000), h = Math.floor(diff / 3600000) % 24, m = Math.floor(diff / 60000) % 60, s = Math.floor(diff / 1000) % 60;
    el.innerHTML = [[d, 'Days'], [h, 'Hours'], [m, 'Mins'], [s, 'Secs']].map(([v, l]) => `<div><strong>${String(v).padStart(2, '0')}</strong><small>${l}</small></div>`).join('');
  });
  tick(); return setInterval(tick, 1000);
}

function countUp() {
  if (typeof IntersectionObserver === 'undefined') return;
  const io = new IntersectionObserver((ents) => ents.forEach((en) => {
    if (!en.isIntersecting) return; io.unobserve(en.target);
    const el = en.target, end = +el.dataset.count, t0 = performance.now();
    const step = (t) => { const p = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }), { threshold: 0.5 });
  $$('[data-count]').forEach((el) => io.observe(el));
}

/* =========================================================
   EXPLORE / EXPERIENCES
   ========================================================= */
function explorePage(params, query) {
  const st = { q: query.get('q') || '', dest: query.get('dest') || '', cat: query.get('cat') || 'All', sort: 'recommended', guests: query.get('guests'), date: query.get('date') };
  const destName = st.dest && getDest(st.dest) ? getDest(st.dest).name : '';
  const html = `
  ${pageHeader({
    eyebrow: `${icon('compass')} Explore`,
    title: destName ? `Experiences in <span class="grad">${destName}</span>` : 'Explore <span class="grad">Experiences</span>',
    sub: 'Guided tours, private telescope sessions, astrophotography nights and high-altitude adventures — curated by astronomers.',
    image: destName ? getDest(st.dest).image : IMG.milky,
  })}
  <section class="section section--tight">
    <div class="container">
      <div class="toolbar glass reveal">
        <label class="toolbar__search">${icon('search')}<input id="exQ" type="text" placeholder="Search experiences or places…" value="${st.q}"/></label>
        <select id="exDest" aria-label="Destination"><option value="">All destinations</option>${DESTINATIONS.map((d) => `<option value="${d.id}" ${d.id === st.dest ? 'selected' : ''}>${d.name}</option>`).join('')}</select>
        <select id="exSort" aria-label="Sort">
          <option value="recommended">Recommended</option><option value="rating">Highest rated</option>
          <option value="low">Price: Low to High</option><option value="high">Price: High to Low</option>
        </select>
      </div>
      ${st.guests || st.date ? `<div class="search-summary reveal">${icon('calendar')} Showing availability ${st.date ? `for <b>${fmtDate(st.date)}</b>` : ''} ${st.guests ? `· <b>${st.guests} guests</b>` : ''}</div>` : ''}
      <div class="pills reveal" id="exCats">${EXP_CATEGORIES.map((c) => `<button class="pill ${c === st.cat ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('')}</div>
      <p class="result-count" id="exCount"></p>
      <div class="grid grid--cards" id="exGrid"></div>
    </div>
  </section>`;

  const render = () => {
    let list = EXPERIENCES.filter((e) =>
      (st.cat === 'All' || e.category === st.cat) &&
      (!st.dest || e.destination === st.dest) &&
      (!st.q || (e.title + e.location + e.category + e.tagline).toLowerCase().includes(st.q.toLowerCase())));
    if (st.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    if (st.sort === 'low') list.sort((a, b) => a.price - b.price);
    if (st.sort === 'high') list.sort((a, b) => b.price - a.price);
    $('#exCount').innerHTML = `<b>${list.length}</b> experience${list.length === 1 ? '' : 's'} found`;
    $('#exGrid').innerHTML = list.length ? list.map(experienceCard).join('') : `
      <div class="empty empty--wide"><div class="empty__icon">${icon('telescope')}</div><h4>No experiences match your filters</h4><p>Try a different destination or category.</p><button class="btn btn--ghost btn--sm" id="exReset">Reset filters</button></div>`;
    initReveal($('#exGrid'));
    const r = $('#exReset'); if (r) r.onclick = () => { st.q = ''; st.dest = ''; st.cat = 'All'; $('#exQ').value = ''; $('#exDest').value = ''; $$('#exCats .pill').forEach((p) => p.classList.toggle('active', p.dataset.cat === 'All')); render(); };
  };
  const mount = () => {
    render();
    $('#exQ').addEventListener('input', (e) => { st.q = e.target.value; render(); });
    $('#exDest').addEventListener('change', (e) => { st.dest = e.target.value; render(); });
    $('#exSort').addEventListener('change', (e) => { st.sort = e.target.value; render(); });
    $('#exCats').addEventListener('click', (e) => {
      const b = e.target.closest('[data-cat]'); if (!b) return;
      st.cat = b.dataset.cat; $$('#exCats .pill').forEach((p) => p.classList.toggle('active', p === b)); render();
    });
  };
  return { html, mount };
}

/* =========================================================
   OBSERVATORIES
   ========================================================= */
function observatoriesPage() {
  const regions = [...new Set(OBSERVATORIES.map((o) => o.country))];
  const telTypes = [...new Set(OBSERVATORIES.flatMap((o) => o.telescopeTypes))];
  const expTypes = [...new Set(OBSERVATORIES.flatMap((o) => o.experienceTypes))];
  const st = { loc: new Set(), rating: 0, price: 20000, avail: 'any', tel: new Set(), exp: new Set(), sort: 'recommended' };
  const check = (group, v) => `<label class="check"><input type="checkbox" data-group="${group}" value="${v}"/><span>${icon('check')}</span>${v}</label>`;

  const html = `
  ${pageHeader({ eyebrow: `${icon('dome')} Observatories`, title: 'Premium <span class="grad">Observatories</span>', sub: 'Hand-verified observatories at the world\'s darkest, highest and clearest sites — each with professional-grade telescopes and expert guides.', image: IMG.canary })}
  <section class="section section--tight">
    <div class="container listing">
      <aside class="filters glass" id="filters">
        <div class="filters__head"><h4>${icon('filter')} Filters</h4><button class="link-btn" id="fReset">Reset all</button></div>
        <div class="fgroup"><h5>Location</h5>${regions.map((r) => check('loc', r)).join('')}</div>
        <div class="fgroup"><h5>Rating</h5>
          ${[[0, 'Any rating'], [4.9, '4.9+ Exceptional'], [4.95, '4.95+ World-class']].map(([v, l]) => `<label class="radio"><input type="radio" name="rating" value="${v}" ${v === 0 ? 'checked' : ''}/><span></span>${l}</label>`).join('')}
        </div>
        <div class="fgroup"><h5>Price <span class="muted" id="fPriceVal">up to ${inr(20000)}</span></h5>
          <input type="range" min="2000" max="20000" step="500" value="20000" id="fPrice" class="range"/>
          <div class="range__labels"><span>${inr(2000)}</span><span>${inr(20000)}</span></div>
        </div>
        <div class="fgroup"><h5>Availability</h5>
          ${[['any', 'Any'], ['Available Tonight', 'Available tonight'], ['Limited Slots', 'Limited slots']].map(([v, l]) => `<label class="radio"><input type="radio" name="avail" value="${v}" ${v === 'any' ? 'checked' : ''}/><span></span>${l}</label>`).join('')}
        </div>
        <div class="fgroup"><h5>Telescope Type</h5>${telTypes.map((r) => check('tel', r)).join('')}</div>
        <div class="fgroup"><h5>Experience Type</h5>${expTypes.map((r) => check('exp', r)).join('')}</div>
        <button class="btn btn--primary btn--block filters__apply" id="fApply">Show results</button>
      </aside>
      <div class="listing__main">
        <div class="listing__bar">
          <button class="btn btn--ghost btn--sm filters-toggle" id="fToggle">${icon('filter')}Filters</button>
          <p class="result-count" id="oCount"></p>
          <label class="sort">Sort by
            <select id="oSort"><option value="recommended">Recommended</option><option value="rating">Highest Rated</option><option value="low">Price Low to High</option><option value="high">Price High to Low</option></select>
          </label>
        </div>
        <div class="grid grid--obs" id="oGrid"></div>
      </div>
    </div>
  </section>`;

  const render = () => {
    let list = OBSERVATORIES.filter((o) =>
      (!st.loc.size || st.loc.has(o.country)) && o.rating >= st.rating && o.priceFrom <= st.price &&
      (st.avail === 'any' || o.availability === st.avail) &&
      (!st.tel.size || o.telescopeTypes.some((t) => st.tel.has(t))) &&
      (!st.exp.size || o.experienceTypes.some((t) => st.exp.has(t))));
    if (st.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    if (st.sort === 'low') list.sort((a, b) => a.priceFrom - b.priceFrom);
    if (st.sort === 'high') list.sort((a, b) => b.priceFrom - a.priceFrom);
    $('#oCount').innerHTML = `<b>${list.length}</b> of ${OBSERVATORIES.length} observatories`;
    $('#oGrid').innerHTML = list.length ? list.map(observatoryCard).join('') : `<div class="empty empty--wide"><div class="empty__icon">${icon('dome')}</div><h4>No observatories match</h4><p>Loosen a filter or two to see more results.</p></div>`;
    initReveal($('#oGrid'));
  };
  const mount = () => {
    render();
    const f = $('#filters');
    f.addEventListener('change', (e) => {
      const t = e.target;
      if (t.dataset.group) { const s = st[t.dataset.group]; t.checked ? s.add(t.value) : s.delete(t.value); }
      if (t.name === 'rating') st.rating = +t.value;
      if (t.name === 'avail') st.avail = t.value;
      render();
    });
    $('#fPrice').addEventListener('input', (e) => { st.price = +e.target.value; $('#fPriceVal').textContent = 'up to ' + inr(st.price); render(); });
    $('#oSort').addEventListener('change', (e) => { st.sort = e.target.value; render(); });
    $('#fReset').addEventListener('click', () => {
      st.loc.clear(); st.tel.clear(); st.exp.clear(); st.rating = 0; st.price = 20000; st.avail = 'any';
      $$('input[type=checkbox]', f).forEach((i) => (i.checked = false));
      $$('input[type=radio]', f).forEach((i) => (i.checked = i.value === '0' || i.value === 'any'));
      $('#fPrice').value = 20000; $('#fPriceVal').textContent = 'up to ' + inr(20000); render();
    });
    $('#fToggle').addEventListener('click', () => { f.classList.add('open'); document.body.classList.add('no-scroll'); });
    $('#fApply').addEventListener('click', () => { f.classList.remove('open'); document.body.classList.remove('no-scroll'); });
  };
  return { html, mount };
}

/* ---------------- Observatory detail ---------------- */
function observatoryDetailPage({ id }) {
  const o = getObs(id); if (!o) return notFoundPage();
  const exps = EXPERIENCES.filter((e) => e.observatoryId === o.id);
  const related = exps.length ? exps : EXPERIENCES.filter((e) => e.destination === o.destination);
  const tels = o.telescopes.map(getTel);
  const firstExp = related[0] || EXPERIENCES[0];
  const html = `
  <section class="detail-hero">
    <img src="${o.image}" alt="${o.name}" />
    <div class="detail-hero__shade"></div>
    <div class="container detail-hero__content">
      <a href="#/observatories" class="back-link">${icon('arrowLeft')} All observatories</a>
      <span class="avail avail--${availClass(o.availability)} avail--static"><i></i>${o.availability}</span>
      <h1>${o.name}</h1>
      <div class="detail-meta">
        <span>${icon('pin')}${o.location}, ${o.country}</span>
        <span>${icon('star')}<b>${o.rating}</b> (${num(o.reviews)} reviews)</span>
        <span>${icon('mountain')}${o.altitude}</span>
        <span>${icon('target')}Bortle ${o.bortle}</span>
      </div>
    </div>
  </section>
  <section class="section section--tight">
    <div class="container detail-layout">
      <div class="detail-main">
        <div class="info-tiles reveal">
          <div class="glass-soft">${icon('telescope')}<small>Telescopes</small><b>${o.telescopeInfo}</b></div>
          <div class="glass-soft">${icon('sparkle')}<small>Experiences</small><b>${o.experienceTypes.join(' · ')}</b></div>
          <div class="glass-soft">${icon('ticket')}<small>Starting from</small><b>${inr(o.priceFrom)} / person</b></div>
        </div>
        <h2 class="h-sm reveal">About this observatory</h2>
        <p class="prose reveal">${o.name} sits at ${o.altitude} in one of the darkest skies on the planet (Bortle class ${o.bortle}). Visitors get guided access to professional instruments, a heated observation deck and a team of resident astronomers. The site is a certified dark-sky location with strict light-pollution controls, making it ideal for both first-time stargazers and serious astro-photographers.</p>
        <h2 class="h-sm reveal">Telescopes on site</h2>
        <div class="grid grid--2">${tels.map((t) => telescopeCard(t)).join('')}</div>
        <h2 class="h-sm reveal">Experiences at this observatory</h2>
        <div class="grid grid--2">${related.map(experienceCard).join('')}</div>
        <div class="reveal" style="margin-top:2.5rem">${conditionsWidget(o.destination, true)}</div>
      </div>
      <aside class="side-card glass reveal">
        <small class="muted">Experiences from</small>
        <div class="side-card__price">${inr(o.priceFrom)}<small> / person</small></div>
        <ul class="checklist checklist--sm">
          <li>${icon('check')}Free cancellation up to 48h</li>
          <li>${icon('check')}Clear-Sky Guarantee</li>
          <li>${icon('check')}Instant confirmation</li>
        </ul>
        <a href="#/experience/${firstExp.id}" class="btn btn--primary btn--block">Check Availability</a>
        <button class="btn btn--ghost btn--block" data-fav="${o.id}">${icon('heart')} Save observatory</button>
      </aside>
    </div>
  </section>`;
  return { html };
}

/* =========================================================
   TELESCOPES
   ========================================================= */
let comparing = [];
let spotlightId = TELESCOPES[0].id;

function specBars(t) {
  const max = { aperture: 762, light: 11850, mag: 1524, lim: 17 };
  const rows = [
    ['Aperture', `${t.aperture} mm`, t.aperture / max.aperture],
    ['Light gathering', `${num(t.lightGathering)}× eye`, Math.sqrt(t.lightGathering / max.light)],
    ['Max useful magnification', `${t.maxMag}×`, t.maxMag / max.mag],
    ['Limiting magnitude', `${t.limitingMag}`, (t.limitingMag - 10) / (max.lim - 10)],
  ];
  return rows.map(([l, v, p]) => `<div class="specbar"><div class="specbar__row"><span>${l}</span><b>${v}</b></div><div class="bar"><i style="width:${Math.max(6, Math.min(100, p * 100))}%"></i></div></div>`).join('');
}

function spotlight(t) {
  const o = getObs(t.observatoryId);
  return `
  <div class="spot__media"><img src="${t.image}" alt="${t.name}"/><span class="chip chip--glass">${t.type}</span></div>
  <div class="spot__body">
    <div class="spot__title"><div><small class="muted">${t.brand}</small><h3>${t.name}</h3></div><span class="rating rating--lg">${icon('star')}${t.rating.toFixed(1)}</span></div>
    <p class="muted">${t.blurb}</p>
    <div class="optics-wrap"><div class="optics-wrap__label">${icon('zap')} Optical light path</div>${opticsSVG(t.optics)}</div>
    <div class="specbars">${specBars(t)}</div>
    <div class="spec-grid">
      <div><small>Focal length</small><b>${num(t.focalLength)} mm</b></div>
      <div><small>Focal ratio</small><b>f/${t.focalRatio}</b></div>
      <div><small>Resolution</small><b>${t.resolution}″</b></div>
      <div><small>Mount</small><b>${t.mount}</b></div>
    </div>
    <div class="spot__foot">
      <span>${icon('dome')}<a href="#/observatory/${o.id}">${o.name}</a></span>
      <button class="btn btn--primary btn--sm" data-tel-view="${t.id}">View Telescope ${icon('arrowRight')}</button>
    </div>
  </div>`;
}

function telescopesPage(params, query) {
  const types = ['All', ...new Set(TELESCOPES.map((t) => t.type.split(' (')[0]))];
  let typeF = 'All';
  const html = `
  ${pageHeader({ eyebrow: `${icon('telescope')} Telescope Explorer`, title: 'Explore <span class="grad">Telescopes</span>', sub: 'Look through instruments normally reserved for professional astronomers. Compare specs, understand the optics, and book a session.', image: IMG.interior })}
  <section class="section section--tight">
    <div class="container">
      <div class="spot glass reveal">
        <div class="spot__tabs" id="spotTabs">${TELESCOPES.map((t) => `<button class="spot__tab ${t.id === spotlightId ? 'active' : ''}" data-spot="${t.id}"><img src="${t.image}" alt=""/><span><b>${t.name}</b><small>${t.aperture} mm · ${t.type.split(' (')[0]}</small></span></button>`).join('')}</div>
        <div class="spot__panel" id="spotPanel">${spotlight(getTel(spotlightId))}</div>
      </div>

      ${sectionHead('All instruments', 'Choose your telescope', 'Select up to 3 telescopes to compare them side-by-side.')}
      <div class="pills reveal" id="telTypes">${types.map((c, i) => `<button class="pill ${i === 0 ? 'active' : ''}" data-type="${c}">${c}</button>`).join('')}</div>
      <div class="grid grid--cards" id="telGrid"></div>
    </div>
  </section>
  <div class="compare-tray glass" id="compareTray"></div>`;

  const renderGrid = () => {
    const list = TELESCOPES.filter((t) => typeF === 'All' || t.type.startsWith(typeF));
    $('#telGrid').innerHTML = list.map((t) => telescopeCard(t, comparing)).join('');
    initReveal($('#telGrid'));
  };
  const mount = () => {
    renderGrid(); renderTray();
    $('#spotTabs').addEventListener('click', (e) => {
      const b = e.target.closest('[data-spot]'); if (!b) return;
      spotlightId = b.dataset.spot;
      $$('.spot__tab').forEach((x) => x.classList.toggle('active', x === b));
      const p = $('#spotPanel'); p.classList.remove('fade-in'); void p.offsetWidth; p.innerHTML = spotlight(getTel(spotlightId)); p.classList.add('fade-in');
    });
    $('#telTypes').addEventListener('click', (e) => {
      const b = e.target.closest('[data-type]'); if (!b) return;
      typeF = b.dataset.type; $$('#telTypes .pill').forEach((p) => p.classList.toggle('active', p === b)); renderGrid();
    });
    $('#telGrid').addEventListener('change', (e) => {
      const id = e.target.dataset.compare; if (!id) return;
      if (e.target.checked) {
        if (comparing.length >= 3) { e.target.checked = false; return UI.toast('You can compare up to 3 telescopes'); }
        comparing.push(id);
      } else comparing = comparing.filter((x) => x !== id);
      e.target.closest('.tel-card').classList.toggle('is-comparing', e.target.checked);
      renderTray();
    });
    const v = query.get('view'); if (v && getTel(v)) setTimeout(() => openTelescope(v), 250);
  };
  return { html, mount, cleanup: () => {} };
}

function renderTray() {
  const tray = $('#compareTray'); if (!tray) return;
  tray.classList.toggle('show', comparing.length > 0);
  tray.innerHTML = `
    <div class="compare-tray__items">${comparing.map((id) => { const t = getTel(id); return `<div class="ct-item"><img src="${t.image}" alt=""/><span>${t.name}</span><button data-uncompare="${id}" aria-label="Remove">${icon('close')}</button></div>`; }).join('')}
    ${Array.from({ length: 3 - comparing.length }, () => '<div class="ct-item ct-item--empty">+ Add telescope</div>').join('')}</div>
    <button class="btn btn--primary btn--sm" id="doCompare" ${comparing.length < 2 ? 'disabled' : ''}>${icon('compare')} Compare (${comparing.length})</button>`;
  tray.onclick = (e) => {
    const r = e.target.closest('[data-uncompare]');
    if (r) { comparing = comparing.filter((x) => x !== r.dataset.uncompare); const cb = $(`[data-compare="${r.dataset.uncompare}"]`); if (cb) { cb.checked = false; cb.closest('.tel-card').classList.remove('is-comparing'); } renderTray(); }
    if (e.target.closest('#doCompare')) openCompare();
  };
}

function openCompare() {
  const ts = comparing.map(getTel);
  const best = (key, low = false) => { const vals = ts.map((t) => +t[key]); return low ? Math.min(...vals) : Math.max(...vals); };
  const row = (label, key, fmt = (v) => v, low = false) => `<tr><th>${label}</th>${ts.map((t) => `<td class="${+t[key] === best(key, low) && ts.length > 1 ? 'best' : ''}">${fmt(t[key])}</td>`).join('')}</tr>`;
  UI.openModal(`
    <div class="compare">
      <span class="eyebrow">${icon('compare')} Side-by-side</span>
      <h2>Telescope Comparison</h2>
      <div class="table-wrap"><table class="compare-table">
        <thead><tr><th></th>${ts.map((t) => `<th><img src="${t.image}" alt=""/><b>${t.name}</b><small>${t.type}</small></th>`).join('')}</tr></thead>
        <tbody>
          <tr><th>Optical design</th>${ts.map((t) => `<td>${opticsSVG(t.optics)}</td>`).join('')}</tr>
          ${row('Aperture', 'aperture', (v) => v + ' mm')}
          ${row('Focal length', 'focalLength', (v) => num(v) + ' mm')}
          ${row('Focal ratio', 'focalRatio', (v) => 'f/' + v, true)}
          ${row('Light gathering', 'lightGathering', (v) => num(v) + '× eye')}
          ${row('Max magnification', 'maxMag', (v) => v + '×')}
          ${row('Limiting magnitude', 'limitingMag')}
          ${row('Resolution (Dawes)', 'resolution', (v) => v + '″', true)}
          ${row('Rating', 'rating', (v) => '★ ' + v)}
          <tr><th>Mount</th>${ts.map((t) => `<td>${t.mount}</td>`).join('')}</tr>
          <tr><th>Best for</th>${ts.map((t) => `<td>${t.bestFor.join(', ')}</td>`).join('')}</tr>
          <tr><th>Session from</th>${ts.map((t) => `<td><b>${inr(t.sessionPrice)}</b></td>`).join('')}</tr>
          <tr><th></th>${ts.map((t) => `<td><button class="btn btn--primary btn--sm" data-tel-view="${t.id}">Details</button></td>`).join('')}</tr>
        </tbody>
      </table></div>
      <p class="muted small">Highlighted cells indicate the best value in each row.</p>
    </div>`, 'modal--wide');
}

function openTelescope(id) {
  const t = getTel(id); const o = getObs(t.observatoryId);
  const exp = EXPERIENCES.find((e) => e.telescopeId === t.id) || EXPERIENCES[0];
  UI.openModal(`
    <div class="tel-modal">
      <div class="tel-modal__media"><img src="${t.image}" alt="${t.name}"/></div>
      <div class="tel-modal__body">
        <span class="chip chip--glass">${t.type}</span>
        <h2>${t.name}</h2>
        <div class="detail-meta"><span>${icon('star')}<b>${t.rating}</b> (${t.reviews})</span><span>${icon('dome')}${o.name}</span><span class="avail avail--${t.available ? 'ok' : 'warn'} avail--static"><i></i>${t.available ? 'Sessions available' : 'Waitlist only'}</span></div>
        <p class="muted">${t.blurb}</p>
        <div class="optics-wrap">${opticsSVG(t.optics)}</div>
        <div class="spec-grid spec-grid--4">
          <div><small>Aperture</small><b>${t.aperture} mm</b></div><div><small>Focal length</small><b>${num(t.focalLength)} mm</b></div>
          <div><small>Focal ratio</small><b>f/${t.focalRatio}</b></div><div><small>Weight</small><b>${t.weight}</b></div>
          <div><small>Light vs eye</small><b>${num(t.lightGathering)}×</b></div><div><small>Max mag.</small><b>${t.maxMag}×</b></div>
          <div><small>Limiting mag.</small><b>${t.limitingMag}</b></div><div><small>Resolution</small><b>${t.resolution}″</b></div>
        </div>
        <h5 class="mini-title">Best for</h5>
        <div class="tags">${t.bestFor.map((b) => `<span class="tag">${b}</span>`).join('')}</div>
        <div class="tel-modal__foot">
          <div class="price"><small>Session from</small><strong>${inr(t.sessionPrice)}</strong></div>
          <a href="#/experience/${exp.id}" class="btn btn--primary" data-close-modal>Book a session ${icon('arrowRight')}</a>
        </div>
      </div>
    </div>`, 'modal--wide');
}

/* =========================================================
   EVENTS
   ========================================================= */
let calMonth = null;
function moonCalendar(year, month) {
  const first = new Date(year, month, 1); const days = new Date(year, month + 1, 0).getDate();
  const offset = (first.getDay() + 6) % 7; // Monday start
  const evDays = EVENTS.filter((e) => { const d = parseDate(e.date); return d.getFullYear() === year && d.getMonth() === month; });
  const today = isoDate(new Date());
  let cells = '';
  for (let i = 0; i < offset; i++) cells += '<div class="cal__cell cal__cell--empty"></div>';
  for (let d = 1; d <= days; d++) {
    const date = new Date(year, month, d, 21); const iso = isoDate(date);
    const ev = evDays.find((e) => e.date === iso);
    const m = moonInfo(date);
    cells += `<div class="cal__cell ${ev ? 'has-event' : ''} ${iso === today ? 'today' : ''}" ${ev ? `data-event-view="${ev.id}" title="${ev.title}"` : `title="${m.name} · ${m.illum}%"`}>
      <span class="cal__d">${d}</span>${moonSVG(m.f, 18)}${ev ? `<span class="cal__ev">${ev.title.split(' ')[0]}</span>` : ''}</div>`;
  }
  return `
    <div class="cal__head">
      <button class="icon-btn icon-btn--sm" data-cal="-1" aria-label="Previous month">${icon('arrowLeft')}</button>
      <b>${first.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</b>
      <button class="icon-btn icon-btn--sm" data-cal="1" aria-label="Next month">${icon('arrowRight')}</button>
    </div>
    <div class="cal__dow">${['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => `<span>${d}</span>`).join('')}</div>
    <div class="cal__grid">${cells}</div>
    <div class="cal__legend"><span><i class="lg-ev"></i>Event</span><span>${moonSVG(0.5, 12)} Moon phase</span></div>`;
}

function eventsPage() {
  const next = EVENTS.find((e) => parseDate(e.date) >= new Date()) || EVENTS[0];
  const nd = parseDate(next.date);
  if (!calMonth) calMonth = { y: nd.getFullYear(), m: nd.getMonth() };
  const months = [...new Set(EVENTS.map((e) => e.date.slice(0, 7)))];
  const html = `
  ${pageHeader({ eyebrow: `${icon('calendar')} Sky calendar`, title: 'Upcoming <span class="grad">Astronomy Events</span>', sub: 'Meteor showers, eclipses, new-moon nights and workshops — limited seats at the world\'s best observing sites.', image: IMG.galaxy })}
  <section class="section section--tight">
    <div class="container">
      <div class="events-top">
        <div class="featured-event glass reveal">
          <div class="featured-event__media">${eventCover(next)}</div>
          <div class="featured-event__body">
            <span class="eyebrow">${icon('zap')} Next event · ${next.category}</span>
            <h2>${next.title}</h2>
            <p class="muted">${next.desc}</p>
            <div class="event-card__facts"><span>${icon('calendar')}${fmtDate(next.date)} · ${next.time}</span><span>${icon('pin')}${next.location}</span></div>
            <div class="countdown countdown--lg" data-countdown="${next.date}"></div>
            <div class="btn-row"><a href="#/book/${next.id}" class="btn btn--primary">Register · ${inr(next.price)}</a><button class="btn btn--ghost" data-event-view="${next.id}">Details</button></div>
          </div>
        </div>
        <div class="cal glass reveal" id="cal">${moonCalendar(calMonth.y, calMonth.m)}</div>
      </div>

      <div class="month-strip reveal" id="monthStrip">
        <button class="pill active" data-month="all">All events <span class="pill__n">${EVENTS.length}</span></button>
        ${months.map((m) => `<button class="pill" data-month="${m}">${parseDate(m + '-01').toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })} <span class="pill__n">${EVENTS.filter((e) => e.date.startsWith(m)).length}</span></button>`).join('')}
      </div>
      <div class="grid grid--cards" id="evGrid">${EVENTS.map(eventCard).join('')}</div>
    </div>
  </section>`;

  let timer;
  const mount = () => {
    timer = startCountdowns();
    $('#cal').addEventListener('click', (e) => {
      const b = e.target.closest('[data-cal]'); if (!b) return;
      const d = new Date(calMonth.y, calMonth.m + +b.dataset.cal, 1); calMonth = { y: d.getFullYear(), m: d.getMonth() };
      $('#cal').innerHTML = moonCalendar(calMonth.y, calMonth.m);
    });
    $('#monthStrip').addEventListener('click', (e) => {
      const b = e.target.closest('[data-month]'); if (!b) return;
      $$('#monthStrip .pill').forEach((p) => p.classList.toggle('active', p === b));
      const m = b.dataset.month;
      $('#evGrid').innerHTML = (m === 'all' ? EVENTS : EVENTS.filter((x) => x.date.startsWith(m))).map(eventCard).join('');
      initReveal($('#evGrid'));
      if (m !== 'all') { const d = parseDate(m + '-01'); calMonth = { y: d.getFullYear(), m: d.getMonth() }; $('#cal').innerHTML = moonCalendar(calMonth.y, calMonth.m); }
    });
  };
  return { html, mount, cleanup: () => clearInterval(timer) };
}

function openEvent(id) {
  const ev = getEvent(id); const o = getObs(ev.observatoryId); const left = ev.seats - ev.booked;
  UI.openModal(`
    <div class="tel-modal">
      <div class="tel-modal__media event-modal__media">${eventCover(ev)}</div>
      <div class="tel-modal__body">
        <span class="chip chip--glass">${ev.category}</span>
        <h2>${ev.title}</h2>
        <p class="muted">${ev.desc}</p>
        <div class="spec-grid">
          <div><small>Date</small><b>${fmtDate(ev.date)}</b></div><div><small>Time</small><b>${ev.time}</b></div>
          <div><small>Duration</small><b>${ev.duration}</b></div><div><small>Seats left</small><b>${left} / ${ev.seats}</b></div>
          <div><small>Location</small><b>${ev.location}</b></div><div><small>Host</small><b>${o.name}</b></div>
        </div>
        <h5 class="mini-title">Included</h5>
        <ul class="checklist checklist--sm">${INCLUDED.slice(0, 4).map((i) => `<li>${icon('check')}${i}</li>`).join('')}</ul>
        <div class="tel-modal__foot">
          <div class="price"><small>Per person</small><strong>${inr(ev.price)}</strong></div>
          <a href="#/book/${ev.id}" class="btn btn--primary" data-close-modal>Register now ${icon('arrowRight')}</a>
        </div>
      </div>
    </div>`, 'modal--wide');
}

/* =========================================================
   EXPERIENCE DETAILS
   ========================================================= */
function experiencePage({ id }) {
  const e = getExp(id); if (!e) return notFoundPage();
  const o = getObs(e.observatoryId); const t = getTel(e.telescopeId); const dest = getDest(e.destination);
  const c = CONDITIONS[e.destination]; const moon = moonInfo();
  const dates = getDates(14);
  const draft = { date: isoDate(dates[1]), time: null, guests: 2 };
  const firstSlot = getSlots(e, draft.date).find((s) => s.left > 0); draft.time = firstSlot ? firstSlot.time : null;

  const html = `
  <section class="section section--first">
    <div class="container">
      <nav class="crumbs reveal"><a href="#/">Home</a>${icon('arrowRight')}<a href="#/explore">Experiences</a>${icon('arrowRight')}<span>${e.title}</span></nav>
      <div class="exp-head reveal">
        <div>
          <div class="tags"><span class="tag tag--accent">${e.category}</span>${e.badge ? `<span class="tag tag--gold">${e.badge}</span>` : ''}</div>
          <h1>${e.title}</h1>
          <div class="detail-meta">
            <span class="rating">${icon('star')}<b>${e.rating}</b>&nbsp;(${num(e.reviews)} reviews)</span>
            <span>${icon('pin')}${e.location}</span>
            <span>${icon('clock')}${e.duration}</span>
            <span>${icon('users')}Max ${e.maxGuests} guests</span>
          </div>
        </div>
        <div class="btn-row">
          <button class="btn btn--ghost btn--sm" onclick="navigator.clipboard && navigator.clipboard.writeText(location.href); UI.toast('Link copied to clipboard','success')">${icon('share')}Share</button>
          <button class="btn btn--ghost btn--sm ${Store.wishlist.includes(e.id) ? 'active' : ''}" data-fav="${e.id}">${icon('heart')}Save</button>
        </div>
      </div>

      <div class="gallery reveal" id="gallery">
        <button class="gallery__main" data-lightbox="0"><img src="${e.gallery[0]}" alt="${e.title}" id="galMain"/></button>
        ${e.gallery.slice(1, 5).map((g, i) => `<button class="gallery__thumb" data-lightbox="${i + 1}"><img src="${g}" alt="" loading="lazy"/>${i === 3 ? `<span class="gallery__more">${icon('grid')} View all photos</span>` : ''}</button>`).join('')}
      </div>

      <div class="detail-layout">
        <div class="detail-main">
          <div class="info-tiles reveal">
            <div class="glass-soft">${icon('clock')}<small>Duration</small><b>${e.duration}</b></div>
            <div class="glass-soft">${icon('users')}<small>Group size</small><b>Max ${e.maxGuests} guests</b></div>
            <div class="glass-soft">${icon('globe')}<small>Language</small><b>English, Hindi</b></div>
            <div class="glass-soft">${icon('shield')}<small>Cancellation</small><b>Free up to 48h</b></div>
          </div>

          <h2 class="h-sm reveal">About this experience</h2>
          <p class="prose lead-sm reveal"><b>${e.tagline}</b></p>
          <p class="prose reveal">${e.description}</p>

          <h2 class="h-sm reveal">What you'll see tonight</h2>
          <div class="targets reveal">${e.targets.map((x, i) => `<div class="target glass-soft"><span class="target__n">0${i + 1}</span>${icon('target')}<b>${x}</b></div>`).join('')}</div>

          <h2 class="h-sm reveal">Telescope & Observatory</h2>
          <div class="grid grid--2 reveal">
            <div class="info-card glass-soft">
              <div class="info-card__head"><img src="${t.image}" alt=""/><div><small>${t.type}</small><b>${t.name}</b></div></div>
              <div class="optics-wrap optics-wrap--sm">${opticsSVG(t.optics)}</div>
              <div class="spec-grid"><div><small>Aperture</small><b>${t.aperture} mm</b></div><div><small>Light vs eye</small><b>${num(t.lightGathering)}×</b></div><div><small>Focal ratio</small><b>f/${t.focalRatio}</b></div><div><small>Max mag.</small><b>${t.maxMag}×</b></div></div>
              <button class="link-btn" data-tel-view="${t.id}">Full telescope specs ${icon('arrowRight')}</button>
            </div>
            <div class="info-card glass-soft">
              <div class="info-card__head"><img src="${o.image}" alt=""/><div><small>${o.location}</small><b>${o.name}</b></div></div>
              <ul class="kv">
                <li><span>Altitude</span><b>${o.altitude}</b></li>
                <li><span>Sky darkness</span><b>Bortle ${o.bortle}</b></li>
                <li><span>Rating</span><b>★ ${o.rating} (${num(o.reviews)})</b></li>
                <li><span>Facilities</span><b>Heated lounge, café, restrooms</b></li>
              </ul>
              <a class="link-btn" href="#/observatory/${o.id}">View observatory ${icon('arrowRight')}</a>
            </div>
          </div>

          <div class="grid grid--2 reveal">
            <div><h2 class="h-sm">What's included</h2><ul class="checklist">${INCLUDED.map((i) => `<li>${icon('check')}${i}</li>`).join('')}</ul></div>
            <div><h2 class="h-sm">What to bring</h2><ul class="checklist checklist--muted">${BRING.map((i) => `<li>${icon('info')}${i}</li>`).join('')}</ul></div>
          </div>

          <h2 class="h-sm reveal">Meeting point</h2>
          <div class="meeting glass-soft reveal">
            ${miniMap(o.name)}
            <div class="meeting__info">
              <b>${o.name} — Visitor Centre</b>
              <p class="muted">${o.location}, ${o.country}. Arrive 30 minutes before your slot. Complimentary shuttle from ${dest.name} town centre at 6:00 PM.</p>
              <div class="tags"><span class="tag">${icon('route')} Shuttle included</span><span class="tag">${icon('pin')} GPS shared after booking</span></div>
            </div>
          </div>

          <h2 class="h-sm reveal">Weather & astronomy visibility</h2>
          <div class="reveal">${conditionsWidget(e.destination, true)}</div>
          <div class="visibility glass-soft reveal">
            <div><small>Milky Way visibility</small><b>${c.bortle <= 2 ? 'Core visible to naked eye' : 'Visible'}</b></div>
            <div><small>Limiting magnitude (eye)</small><b>${(7.6 - (c.bortle - 1) * 0.5).toFixed(1)}</b></div>
            <div><small>Moon impact</small><b>${moon.illum < 30 ? 'Minimal' : moon.illum < 70 ? 'Moderate' : 'Bright moon'}</b></div>
            <div><small>Planets tonight</small><b>Saturn, Jupiter</b></div>
          </div>

          <h2 class="h-sm reveal">Guest reviews <span class="muted">★ ${e.rating} · ${num(e.reviews)} reviews</span></h2>
          <div class="reviews reviews--compact">${REVIEWS.map((r) => `<figure class="review glass-soft reveal"><div class="stars-gold">★★★★★</div><blockquote>“${r.text}”</blockquote><figcaption><span class="avatar">${r.name[0]}</span><div><b>${r.name}</b><small>${r.city} · ${r.date}</small></div></figcaption></figure>`).join('')}</div>
        </div>

        <aside class="booking-panel glass" id="booking">
          <div class="booking-panel__price"><div><small>From</small><strong>${inr(e.price)}</strong><small>/ person</small></div><span class="rating">${icon('star')}${e.rating}</span></div>
          <div class="bp-section"><h5>${icon('calendar')} Select Date</h5><div class="date-scroller" id="bpDates"></div></div>
          <div class="bp-section"><h5>${icon('clock')} Select Time <span class="muted" id="bpSlotsInfo"></span></h5><div class="slots" id="bpSlots"></div></div>
          <div class="bp-section bp-guests"><h5>${icon('users')} Guests</h5>
            <div class="stepper"><button data-g="-1" aria-label="Fewer guests">${icon('minus')}</button><span id="bpGuests">2</span><button data-g="1" aria-label="More guests">${icon('plus')}</button></div>
          </div>
          <div class="price-summary" id="bpSummary"></div>
          <button class="btn btn--primary btn--block btn--lg" id="bpReserve">${icon('ticket')} Reserve Experience</button>
          <p class="bp-note">${icon('shield')} You won't be charged yet · Free cancellation up to 48h</p>
        </aside>
      </div>
    </div>
  </section>
  <div class="mobile-book glass"><div><small>From</small><b>${inr(e.price)}</b><small>/ person</small></div><a href="#booking" class="btn btn--primary" data-scroll="#booking">Check availability</a></div>`;

  const render = () => {
    $('#bpDates').innerHTML = dates.map((d) => {
      const iso = isoDate(d); const slots = getSlots(e, iso); const avail = slots.some((s) => s.left > 0); const q = dayQuality(e, iso);
      return `<button class="date-chip ${iso === draft.date ? 'active' : ''}" data-date="${iso}" ${avail ? '' : 'disabled'}>
        <small>${d.toLocaleDateString('en-GB', { weekday: 'short' })}</small><b>${d.getDate()}</b><small>${d.toLocaleDateString('en-GB', { month: 'short' })}</small>
        <i class="q q--${avail ? q.k : 'off'}" title="${avail ? q.t : 'Sold out'}"></i></button>`;
    }).join('');
    const slots = getSlots(e, draft.date);
    $('#bpSlotsInfo').textContent = `· ${slots.filter((s) => s.left > 0).length} available`;
    $('#bpSlots').innerHTML = slots.map((s) => `<button class="slot ${s.time === draft.time ? 'active' : ''}" data-time="${s.time}" ${s.left ? '' : 'disabled'}><b>${s.time}</b><small>${s.left ? (s.left <= 3 ? `<span class="hot">${s.left} left</span>` : `${s.left} spots`) : 'Sold out'}</small></button>`).join('');
    $('#bpGuests').textContent = draft.guests;
    const sub = e.price * draft.guests; const tax = Math.round(sub * 0.18);
    $('#bpSummary').innerHTML = `
      <div><span>Experience price</span><b>${inr(e.price)}</b></div>
      <div><span>Guests</span><b>× ${draft.guests}</b></div>
      <div><span>Subtotal</span><b>${inr(sub)}</b></div>
      <div><span>Taxes (18% GST)</span><b>${inr(tax)}</b></div>
      <div class="total"><span>Total</span><b>${inr(sub + tax)}</b></div>`;
    $('#bpReserve').disabled = !draft.time;
    const q = dayQuality(e, draft.date);
    $('#bpDates').title = q.t;
  };

  const mount = () => {
    render();
    const ac = $('#bpDates .active'); if (ac) ac.scrollIntoView({ block: 'nearest', inline: 'center' });
    $('#bpDates').addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-date]'); if (!b) return;
      draft.date = b.dataset.date; const s = getSlots(e, draft.date).find((x) => x.left > 0 && x.time === draft.time) || getSlots(e, draft.date).find((x) => x.left > 0);
      draft.time = s ? s.time : null; render();
    });
    $('#bpSlots').addEventListener('click', (ev) => { const b = ev.target.closest('[data-time]'); if (!b) return; draft.time = b.dataset.time; render(); });
    $('.stepper').addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-g]'); if (!b) return;
      const slot = getSlots(e, draft.date).find((s) => s.time === draft.time);
      const max = Math.min(e.maxGuests, slot ? slot.left : e.maxGuests);
      const n = draft.guests + +b.dataset.g;
      if (n > max) return UI.toast(`Only ${max} spots available for this slot`);
      draft.guests = Math.max(1, n); render();
    });
    $('#bpReserve').addEventListener('click', () => {
      Booking.start(e.id, { date: draft.date, time: draft.time, guests: draft.guests });
      location.hash = `#/book/${e.id}`;
    });
    $('#gallery').addEventListener('click', (ev) => { const b = ev.target.closest('[data-lightbox]'); if (b) openLightbox(e.gallery, +b.dataset.lightbox); });
    if (location.hash.includes('#booking')) setTimeout(() => $('#booking').scrollIntoView({ behavior: 'smooth' }), 300);
  };
  return { html, mount };
}

function openLightbox(imgs, i) {
  const draw = () => {
    UI.openModal(`<div class="lightbox"><img src="${imgs[i]}" alt=""/>
      <button class="lightbox__nav lightbox__prev" data-lb="-1">${icon('arrowLeft')}</button>
      <button class="lightbox__nav lightbox__next" data-lb="1">${icon('arrowRight')}</button>
      <div class="lightbox__count">${i + 1} / ${imgs.length}</div></div>`, 'modal--lightbox');
    $$('[data-lb]').forEach((b) => (b.onclick = () => { i = (i + +b.dataset.lb + imgs.length) % imgs.length; draw(); }));
  };
  draw();
}

/* =========================================================
   MY BOOKINGS
   ========================================================= */
function bookingsPage(params, query) {
  const list = Store.bookings; const hl = query.get('id');
  const html = `
  ${pageHeader({ eyebrow: `${icon('ticket')} My trips`, title: 'My <span class="grad">Bookings</span>', sub: 'All your confirmed stargazing experiences in one place.', image: IMG.mountain })}
  <section class="section section--tight">
    <div class="container">
      ${list.length ? `<div class="bookings">${list.map((b) => `
        <article class="booking-row glass ${b.id === hl ? 'highlight' : ''} reveal">
          <img src="${b.image}" alt=""/>
          <div class="booking-row__main">
            <div class="tags"><span class="tag tag--ok">${icon('check')} Confirmed</span><span class="tag">${b.id}</span></div>
            <h3>${b.title}</h3>
            <div class="detail-meta"><span>${icon('calendar')}${fmtDate(b.date)} · ${b.time}</span><span>${icon('pin')}${b.location}</span><span>${icon('users')}${b.guests} guest${b.guests > 1 ? 's' : ''}</span></div>
          </div>
          <div class="booking-row__side"><strong>${inr(b.total)}</strong><a href="#/confirmation/${b.id}" class="btn btn--glass btn--sm">View ticket ${icon('arrowRight')}</a></div>
        </article>`).join('')}</div>` : `
        <div class="empty empty--wide glass"><div class="empty__icon">${icon('ticket')}</div><h4>No bookings yet</h4><p>Your confirmed experiences will appear here.</p><a href="#/explore" class="btn btn--primary">Find an experience</a></div>`}
    </div>
  </section>`;
  return { html };
}

/* =========================================================
   ABOUT (project overview for stakeholders)
   ========================================================= */
function aboutPage() {
  const modules = [
    ['compass', 'Experience Marketplace', 'Searchable catalogue of guided tours, private sessions, workshops and adventures with filters & sorting.', '#/explore'],
    ['dome', 'Observatory Listings', 'Verified partner observatories with location, telescopes, pricing and real-time availability.', '#/observatories'],
    ['telescope', 'Telescope Explorer', 'Interactive spec explorer, optical path diagrams and side-by-side comparison.', '#/telescopes'],
    ['calendar', 'Events & Sky Calendar', 'Celestial events with seat inventory, countdowns and a moon-phase calendar.', '#/events'],
    ['moon', 'Sky Conditions Engine', 'Cloud cover, seeing, darkness and real moon-phase calculation for every destination.', '#/#sky'],
    ['ticket', 'Booking & Payments', 'Multi-step booking flow, demo checkout, e-ticket confirmation and booking history.', '#/book/milky-way-observation'],
  ];
  const roadmap = [
    ['Phase 1', 'Frontend Demo', 'Now', 'Complete UI/UX prototype with mock data, responsive design and full booking flow.', true],
    ['Phase 2', 'Backend & Auth', 'Q1 2027', 'REST/GraphQL API, database, user accounts, partner onboarding, real inventory.'],
    ['Phase 3', 'Payments & Partner Portal', 'Q2 2027', 'Razorpay/Stripe integration, invoices, observatory dashboard for slots & pricing.'],
    ['Phase 4', 'Live Sky Data & Mobile', 'Q3 2027', 'Weather/seeing APIs, push alerts for clear nights, iOS & Android apps.'],
  ];
  const html = `
  ${pageHeader({ eyebrow: `${icon('info')} About the project`, title: 'Uncle Tom — <span class="grad">Project Overview</span>', sub: 'A premium marketplace that makes discovering and booking world-class astronomy experiences as simple as booking a hotel.', image: IMG.hero })}
  <section class="section section--tight">
    <div class="container">
      <div class="about-intro">
        <div class="glass-soft about-card reveal"><span class="about-card__icon">${icon('zap')}</span><h4>The problem</h4><p>Astronomy tourism is booming, but observatories are scattered, information is fragmented, availability is unclear, and nothing tells you whether the sky will actually be clear.</p></div>
        <div class="glass-soft about-card reveal"><span class="about-card__icon">${icon('sparkle')}</span><h4>Our solution</h4><p>One premium platform to discover observatories, telescopes, events and guided experiences — with live sky conditions, transparent pricing and instant booking.</p></div>
        <div class="glass-soft about-card reveal"><span class="about-card__icon">${icon('users')}</span><h4>Who it serves</h4><p><b>Stargazers</b> & travellers, <b>observatories</b> & dark-sky resorts, and <b>astronomer guides</b> & astrophotographers who host experiences.</p></div>
      </div>

      ${sectionHead('User journey', 'The core booking workflow', 'Every screen in this demo maps to a step in the customer journey. Click a step to jump straight to it.')}
      ${workflowSteps()}

      ${sectionHead('Platform modules', 'What\'s in this demo', '')}
      <div class="features">${modules.map(([i, t, d, h]) => `<a href="${h}" class="feature glass-soft reveal"><div class="feature__icon">${icon(i)}</div><h4>${t}</h4><p>${d}</p><span class="link-btn">Open ${icon('arrowRight')}</span></a>`).join('')}</div>

      ${sectionHead('Roadmap', 'From prototype to platform', '')}
      <div class="roadmap">${roadmap.map(([p, t, w, d, now]) => `<div class="road glass-soft reveal ${now ? 'road--now' : ''}"><div class="road__dot"></div><small>${p} · ${w}</small><h4>${t}</h4><p>${d}</p>${now ? '<span class="tag tag--ok">● Current demo</span>' : ''}</div>`).join('')}</div>

      <div class="tech glass reveal">
        <div><span class="eyebrow">Tech notes</span><h3>Built as a lightweight, production-style frontend</h3><p class="muted">Vanilla HTML/CSS/JS single-page app with hash routing, componentised rendering, localStorage persistence (wishlist, bookings) and a zero-dependency Node dev server. Designed to port directly to React/Next.js when the backend is ready.</p></div>
        <div class="tags">${['Responsive (mobile → 4K)', 'SPA routing', 'Mock data layer', 'Real moon-phase maths', 'Canvas starfield', 'Accessible markup', 'No build step'].map((t) => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
    </div>
  </section>`;
  return { html };
}

/* =========================================================
   OBSERVATORY PARTNER PORTAL (Blueprint Slide 2 & 4)
   ========================================================= */
function partnerPage() {
  const p = PARTNER_DATA;
  const html = `
  ${pageHeader({
    eyebrow: `${icon('dome')} Partner Portal · Blueprint Slide 2 & 4`,
    title: 'Observatory <span class="grad">Partner Operations</span>',
    sub: `Live operations dashboard for ${p.observatory.name}. Manage tonight’s observation slots, telescope telemetry, and visitor revenue.`,
    image: IMG.observatory
  })}
  <section class="section section--tight">
    <div class="container">
      <!-- High-level Facility Status Cards -->
      <div class="stats-row reveal">
        <div class="stat-card glass-soft">
          <div class="stat-card__head"><span>Facility Status</span><span class="tag tag--ok">● Active</span></div>
          <h3>${p.observatory.status.split('·')[0].trim()}</h3>
          <small class="muted">${p.observatory.location}</small>
        </div>
        <div class="stat-card glass-soft">
          <div class="stat-card__head"><span>Bortle Dark Sky</span><span class="tag tag--gold">★ Class ${p.observatory.bortle}</span></div>
          <h3>Pristine Dark Sky</h3>
          <small class="muted">Zero artificial light pollution</small>
        </div>
        <div class="stat-card glass-soft">
          <div class="stat-card__head"><span>Fleet Readiness</span><span class="tag tag--ok">4 / 4 Scopes</span></div>
          <h3>100% Operational</h3>
          <small class="muted">All optical trains calibrated</small>
        </div>
        <div class="stat-card glass-soft">
          <div class="stat-card__head"><span>Monthly Payout</span><span class="tag tag--ok">Auto-settled</span></div>
          <h3 class="grad">${inr(p.observatory.revenueMonth)}</h3>
          <small class="muted">${p.observatory.totalBookingsMonth} confirmed stargazers</small>
        </div>
      </div>

      <!-- Slots Management -->
      <div class="card glass reveal" style="margin-top: 2rem;">
        <div class="card__head-flex">
          <div>
            <span class="eyebrow">${icon('calendar')} Session Roster</span>
            <h3 style="margin-top: 0.3rem;">Tonight & Upcoming Telescope Slots</h3>
            <p class="muted small">Booked via Uncle Tom marketplace with instant guest check-in.</p>
          </div>
          <button class="btn btn--primary btn--sm" id="partnerAddSlotBtn">${icon('sparkle')} + Add New Time Slot</button>
        </div>

        <div class="table-responsive" style="margin-top: 1.2rem;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Slot ID</th>
                <th>Schedule</th>
                <th>Experience Track</th>
                <th>Capacity / Booked</th>
                <th>Status</th>
                <th>Slot Revenue</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${p.upcomingSlots.map(s => `
                <tr>
                  <td><code>${s.id}</code></td>
                  <td><b>${s.time}</b></td>
                  <td>${s.exp}</td>
                  <td><span class="tag ${s.guests.includes('Sold Out') ? 'tag--warn' : 'tag--glass'}">${s.guests}</span></td>
                  <td><span class="tag tag--ok">● ${s.status}</span></td>
                  <td><strong style="color: var(--cyan);">${s.revenue}</strong></td>
                  <td><button class="btn btn--glass btn--xs" data-slot-action="${s.id}">Manage</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Telescope Fleet Telemetry -->
      <div class="card glass reveal" style="margin-top: 2rem;">
        <div class="card__head-flex">
          <div>
            <span class="eyebrow">${icon('telescope')} Fleet Diagnostics</span>
            <h3 style="margin-top: 0.3rem;">Telescope & Dome Health Status</h3>
            <p class="muted small">Real-time collimation, motor drive tracking and optics diagnostic reports.</p>
          </div>
          <button class="btn btn--ghost btn--sm" id="runDiagBtn">${icon('zap')} Run Diagnostic Scan</button>
        </div>

        <div class="fleet-grid" style="margin-top: 1.4rem;">
          ${p.telescopeFleet.map(t => `
            <div class="fleet-card glass-soft">
              <div class="fleet-card__head">
                <b>${t.name}</b>
                <span class="tag ${t.status === 'Online' ? 'tag--ok' : 'tag--warn'}">● ${t.status}</span>
              </div>
              <p class="muted small">${t.type}</p>
              <div class="fleet-card__metrics">
                <div><small class="muted">Health</small><strong>${t.health}</strong></div>
                <div><small class="muted">Last Calibrated</small><span>${t.calibDate}</span></div>
              </div>
              <div class="health-bar"><div class="health-bar__fill" style="width: ${t.health}"></div></div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Partner Value Prop -->
      <div class="partner-callout glass-soft reveal" style="margin-top: 2rem;">
        <div>
          <h4>Partner with Uncle Tom</h4>
          <p class="muted">Are you an observatory director, dark-sky retreat, or certified astrophotography host? List your facility on Uncle Tom to access 12,000+ enthusiastic astronomy travelers worldwide.</p>
        </div>
        <a href="#/explore" class="btn btn--primary">${icon('sparkle')} View Marketplace Experience</a>
      </div>
    </div>
  </section>`;

  const mount = () => {
    const addBtn = $('#partnerAddSlotBtn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        UI.openModal(`
          <div style="padding: 1.5rem;">
            <span class="eyebrow">${icon('calendar')} New Slot</span>
            <h2 style="margin: 0.5rem 0 1rem;">Add Stargazing Slot</h2>
            <form id="newSlotForm" class="form-grid form-grid--1">
              <label class="field"><span>Experience</span>
                <select><option>Milky Way Observation</option><option>Deep Sky Galaxy Tour</option><option>Private Telescope Session</option></select>
              </label>
              <label class="field"><span>Date & Start Time</span><input type="text" value="Tonight 09:30 PM" required /></label>
              <label class="field"><span>Max Guest Capacity</span><input type="number" value="10" min="1" max="25" required /></label>
              <label class="field"><span>Base Price per Guest (INR)</span><input type="number" value="4499" required /></label>
              <button type="submit" class="btn btn--primary btn--block">${icon('check')} Publish Slot to Marketplace</button>
            </form>
          </div>
        `, 'modal--sm');
        const form = $('#newSlotForm');
        if (form) {
          form.onsubmit = (ev) => {
            ev.preventDefault();
            UI.closeModal();
            UI.toast('New slot published to marketplace with instant booking enabled!', 'success');
          };
        }
      });
    }

    const diagBtn = $('#runDiagBtn');
    if (diagBtn) {
      diagBtn.addEventListener('click', () => {
        UI.toast('Running remote collimation & dome azimuth diagnostic...', 'info');
        setTimeout(() => {
          UI.toast('All 4 optical trains aligned. Fleet health: 100% nominal.', 'success');
        }, 900);
      });
    }

    $$('[data-slot-action]').forEach(btn => {
      btn.onclick = () => {
        UI.toast(`Opening configuration for slot ${btn.dataset.slotAction}`, 'info');
      };
    });
  };

  return { html, mount };
}

/* =========================================================
   ENTERPRISE ADMIN & CLOUD MONITOR (Blueprint Slide 2, 3, 6 & 13)
   ========================================================= */
function adminPage() {
  const adm = ADMIN_DATA;
  const html = `
  ${pageHeader({
    eyebrow: `${icon('layers')} Enterprise Admin · Blueprint Slides 2, 3, 6 & 13`,
    title: 'Platform Infrastructure <span class="grad">& Cloud Control</span>',
    sub: 'Real-time telemetry of AWS EKS microservices, Apache Kafka event streaming, and marketplace operations.',
    image: IMG.hero
  })}
  <section class="section section--tight">
    <div class="container">
      <!-- Business KPIs -->
      <div class="stats-row reveal">
        <div class="stat-card glass-soft">
          <div class="stat-card__head"><span>Gross Marketplace Volume</span><span class="tag tag--ok">+34% MoM</span></div>
          <h3 class="grad">${adm.kpis.totalRevenue}</h3>
          <small class="muted">Processed via Razorpay & Stripe</small>
        </div>
        <div class="stat-card glass-soft">
          <div class="stat-card__head"><span>Total Bookings</span><span class="tag tag--gold">Verified</span></div>
          <h3>${adm.kpis.totalBookings}</h3>
          <small class="muted">Instant digital QR e-tickets</small>
        </div>
        <div class="stat-card glass-soft">
          <div class="stat-card__head"><span>Partner Facilities</span><span class="tag tag--ok">Global</span></div>
          <h3>${adm.kpis.partnerObservatories}</h3>
          <small class="muted">Across 6 dark-sky territories</small>
        </div>
        <div class="stat-card glass-soft">
          <div class="stat-card__head"><span>Customer Rating</span><span class="tag tag--gold">★ 99.2%</span></div>
          <h3>${adm.kpis.avgRating}</h3>
          <small class="muted">From 12,400+ traveler reviews</small>
        </div>
      </div>

      <!-- Microservice Topology Grid -->
      <div class="card glass reveal" style="margin-top: 2rem;">
        <div class="card__head-flex">
          <div>
            <span class="eyebrow">${icon('zap')} AWS EKS Cluster</span>
            <h3 style="margin-top: 0.3rem;">Microservices Topology & Latency</h3>
            <p class="muted small">High-availability Spring Boot & Node services running on multi-AZ Amazon EKS.</p>
          </div>
          <div class="tag tag--ok">● All 6 Services Operational (99.99% SLA)</div>
        </div>

        <div class="service-grid" style="margin-top: 1.4rem;">
          ${adm.microservices.map(s => `
            <div class="service-card glass-soft">
              <div class="service-card__top">
                <span class="service-card__name">${s.name}</span>
                <span class="tag tag--ok">● ${s.status}</span>
              </div>
              <div class="service-card__stats">
                <div><small class="muted">p50 Latency</small><strong>${s.latency}</strong></div>
                <div><small class="muted">p99</small><span>${s.p99}</span></div>
                <div><small class="muted">Throughput</small><span>${s.traffic}</span></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Live Kafka Event Bus Stream -->
      <div class="card glass reveal" style="margin-top: 2rem;">
        <div class="card__head-flex">
          <div>
            <span class="eyebrow">${icon('sparkle')} Amazon MSK Event Bus</span>
            <h3 style="margin-top: 0.3rem;">Live Apache Kafka Stream</h3>
            <p class="muted small">Real-time asynchronous event pipeline connecting Bookings, Payments, Weather, and Push Notifications.</p>
          </div>
          <button class="btn btn--primary btn--sm" id="adminEmitEventBtn">${icon('zap')} Emit Test Booking Event</button>
        </div>

        <div class="kafka-stream" id="kafkaStream" style="margin-top: 1.2rem;">
          ${adm.liveKafkaEvents.map(e => `
            <div class="kafka-row">
              <span class="kafka-topic"><code>${e.topic}</code></span>
              <span class="kafka-payload">${e.payload}</span>
              <span class="kafka-time muted small">${e.time}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Quick Platform Actions -->
      <div class="admin-actions-bar glass-soft reveal" style="margin-top: 2rem;">
        <div>
          <h4>System Maintenance & Controls</h4>
          <p class="muted small">Perform administrative maintenance on cache clusters and external data synchronization.</p>
        </div>
        <div class="btn-row">
          <button class="btn btn--ghost btn--sm" id="purgeRedisBtn">Purge Redis Cache</button>
          <button class="btn btn--ghost btn--sm" id="syncNasaBtn">Sync NASA APOD API</button>
          <a href="#/architecture" class="btn btn--primary btn--sm">View Architecture Slides</a>
        </div>
      </div>
    </div>
  </section>`;

  const mount = () => {
    const emitBtn = $('#adminEmitEventBtn');
    if (emitBtn) {
      emitBtn.addEventListener('click', () => {
        const code = 'UT-' + Math.floor(100000 + Math.random() * 900000);
        const row = document.createElement('div');
        row.className = 'kafka-row kafka-row--new';
        row.innerHTML = `
          <span class="kafka-topic"><code>booking.created</code></span>
          <span class="kafka-payload">${code} · Private Telescope Session · Hanle Observatory</span>
          <span class="kafka-time muted small">Just now</span>
        `;
        const stream = $('#kafkaStream');
        if (stream) stream.insertBefore(row, stream.firstChild);
        UI.toast(`Kafka Event Emitted: [booking.created] -> ${code}`, 'success');
      });
    }

    const redisBtn = $('#purgeRedisBtn');
    if (redisBtn) {
      redisBtn.addEventListener('click', () => {
        UI.toast('Flushing Redis memory cache...', 'info');
        setTimeout(() => UI.toast('Redis cache cleared. 0 stale keys.', 'success'), 600);
      });
    }

    const nasaBtn = $('#syncNasaBtn');
    if (nasaBtn) {
      nasaBtn.addEventListener('click', () => {
        UI.toast('Syncing NASA APOD & NeoWs orbital telemetry...', 'info');
        setTimeout(() => UI.toast('NASA API Sync Complete: 24 new celestial objects indexed.', 'success'), 800);
      });
    }
  };

  return { html, mount };
}

/* =========================================================
   ARCHITECTURE BLUEPRINT (Slides 1–20 Presentation Guide)
   ========================================================= */
function architecturePage() {
  const html = `
  ${pageHeader({
    eyebrow: `${icon('layers')} Enterprise Architecture & Implementation Blueprint`,
    title: 'Uncle Tom — <span class="grad">System Blueprint</span>',
    sub: 'Comprehensive architecture walkthrough for stakeholders and leadership: multi-portal model, AWS microservices, real-time data pipelines, and 12-month delivery roadmap.',
    image: IMG.hero
  })}
  <section class="section section--tight">
    <div class="container">

      <!-- Executive Overview Card -->
      <div class="card glass reveal">
        <span class="eyebrow">${icon('sparkle')} Executive Vision (Slide 1 & 2)</span>
        <h2 style="margin: 0.5rem 0 1rem;">The First Digital Aggregator for Astronomy Tourism</h2>
        <p class="lead" style="margin-bottom: 1.5rem;">
          Astronomical tourism is a high-growth premium travel sector, but remains highly fragmented. Observatories lack modern booking infrastructure, travelers struggle to find verified dark-sky locations, and unpredictable weather leads to cancellations. <b>Uncle Tom</b> solves this by unifying travelers, observatories, and astrophotographers into a trusted digital marketplace backed by live weather data and a Clear-Sky Guarantee.
        </p>

        <div class="features features--3">
          <div class="feature glass-soft">
            <div class="feature__icon">${icon('compass')}</div>
            <h4>1. Customer Experience Portal</h4>
            <p>Discovery, search by celestial events, high-res astrophotography galleries, instant seat reservations, and verified digital e-tickets.</p>
            <a href="#/explore" class="btn btn--glass btn--xs" style="margin-top: 0.8rem;">Open Customer Portal →</a>
          </div>
          <div class="feature glass-soft">
            <div class="feature__icon">${icon('dome')}</div>
            <h4>2. Observatory Partner Portal</h4>
            <p>Observatory onboarding, telescope fleet status, capacity & slot management, custom experience pricing, and automated direct payouts.</p>
            <a href="#/partner" class="btn btn--glass btn--xs" style="margin-top: 0.8rem;">Open Partner Portal →</a>
          </div>
          <div class="feature glass-soft">
            <div class="feature__icon">${icon('layers')}</div>
            <h4>3. Enterprise Admin & Cloud</h4>
            <p>Global platform analytics, AWS microservice health monitoring, Apache Kafka event streaming telemetry, and policy management.</p>
            <a href="#/admin" class="btn btn--glass btn--xs" style="margin-top: 0.8rem;">Open Admin Dashboard →</a>
          </div>
        </div>
      </div>

      <!-- Cloud Infrastructure & Architecture Diagram (Slide 3 & 6) -->
      <div class="card glass reveal" style="margin-top: 2.5rem;">
        <span class="eyebrow">${icon('zap')} Cloud Architecture (Slide 3 & 6)</span>
        <h2 style="margin: 0.5rem 0 0.8rem;">AWS Cloud-Native Microservices Topology</h2>
        <p class="muted" style="margin-bottom: 1.5rem;">Designed for ultra-low latency, multi-region dark-sky travelers, and high-concurrency event drops (meteor showers, solar eclipses).</p>

        <div class="arch-flow">
          <div class="arch-layer">
            <span class="arch-layer__title">Edge & CDN Layer</span>
            <div class="arch-layer__cards">
              <div class="arch-box"><b>Route 53</b><small>Global Latency-based DNS</small></div>
              <div class="arch-box"><b>AWS CloudFront CDN</b><small>Edge caching (assets & API)</small></div>
              <div class="arch-box"><b>AWS WAF & Shield</b><small>DDoS mitigation & rate limit</small></div>
            </div>
          </div>

          <div class="arch-connector">↓ API Requests & Real-time WebSockets</div>

          <div class="arch-layer">
            <span class="arch-layer__title">Microservices (Amazon EKS Kubernetes Cluster)</span>
            <div class="arch-layer__cards">
              <div class="arch-box arch-box--highlight"><b>Booking & Inventory</b><small>Spring Boot · Slot lock</small></div>
              <div class="arch-box arch-box--highlight"><b>Weather & Seeing Engine</b><small>NASA API / Open-Meteo</small></div>
              <div class="arch-box arch-box--highlight"><b>Payments & Payouts</b><small>Razorpay / Stripe Escrow</small></div>
              <div class="arch-box arch-box--highlight"><b>Stargazer AI Assistant</b><small>OpenAI Astronomy Engine</small></div>
            </div>
          </div>

          <div class="arch-connector">↓ Asynchronous Event Streaming via Kafka</div>

          <div class="arch-layer">
            <span class="arch-layer__title">Data Tier & Event Bus</span>
            <div class="arch-layer__cards">
              <div class="arch-box"><b>Amazon MSK (Kafka)</b><small>High-throughput event bus</small></div>
              <div class="arch-box"><b>Amazon Aurora PostgreSQL</b><small>ACID bookings & transactions</small></div>
              <div class="arch-box"><b>Redis Cluster (ElastiCache)</b><small>Sub-millisecond slot cache</small></div>
              <div class="arch-box"><b>Amazon S3 Glacier</b><small>Astronomical telemetry & photos</small></div>
            </div>
          </div>
        </div>
      </div>

      <!-- External Integrations (Slide 10-12) -->
      <div class="card glass reveal" style="margin-top: 2.5rem;">
        <span class="eyebrow">${icon('sparkle')} External API Integrations (Slide 10–12)</span>
        <h2 style="margin: 0.5rem 0 1.2rem;">Connected Astronomy & Enterprise APIs</h2>

        <div class="features features--4">
          <div class="feature glass-soft">
            <div class="feature__icon">🚀</div>
            <h4>NASA Open APIs</h4>
            <p class="small muted">APOD (Astronomy Picture of the Day) & NeoWs (Near Earth Object Web Service) orbital trajectory data.</p>
          </div>
          <div class="feature glass-soft">
            <div class="feature__icon">☁️</div>
            <h4>Open-Meteo & Seeing APIs</h4>
            <p class="small muted">High-altitude seeing index (arcseconds), cloud cover, transparency, and dew point for Bortle sites.</p>
          </div>
          <div class="feature glass-soft">
            <div class="feature__icon">💳</div>
            <h4>Razorpay & Stripe</h4>
            <p class="small muted">Escrow payment processing, UPI, multi-currency cards, and automated split-payouts to partner observatories.</p>
          </div>
          <div class="feature glass-soft">
            <div class="feature__icon">🤖</div>
            <h4>OpenAI Astronomy Model</h4>
            <p class="small muted">Natural-language celestial guide assisting travelers with telescope selection and night sky tips.</p>
          </div>
        </div>
      </div>

      <!-- 12-Month Implementation Roadmap (Slide 18 & 19) -->
      <div class="card glass reveal" style="margin-top: 2.5rem;">
        <span class="eyebrow">${icon('calendar')} Delivery Plan (Slide 18 & 19)</span>
        <h2 style="margin: 0.5rem 0 1.2rem;">12-Month Enterprise Implementation Roadmap</h2>

        <div class="roadmap-grid">
          <div class="road-card glass-soft road-card--done">
            <div class="road-card__phase">Phase 1 (Months 1–3)</div>
            <h4>Interactive Prototype & UX Validation</h4>
            <span class="tag tag--ok">● Completed in this Demo</span>
            <ul class="road-list">
              <li>Comprehensive marketplace browsing & filters</li>
              <li>Realistic multi-step booking checkout flow</li>
              <li>Observatory partner & enterprise admin screens</li>
              <li>Interactive Stargazer AI Assistant</li>
            </ul>
          </div>

          <div class="road-card glass-soft">
            <div class="road-card__phase">Phase 2 (Months 4–6)</div>
            <h4>Core Microservices & Payment Escrow</h4>
            <span class="tag tag--glass">Upcoming</span>
            <ul class="road-list">
              <li>Spring Boot microservices deployment on AWS EKS</li>
              <li>PostgreSQL schema with Aurora Multi-AZ replication</li>
              <li>Stripe Connect & Razorpay Route split payments</li>
              <li>Partner self-service portal onboarding</li>
            </ul>
          </div>

          <div class="road-card glass-soft">
            <div class="road-card__phase">Phase 3 (Months 7–9)</div>
            <h4>IoT Telescope & Live Weather Engine</h4>
            <span class="tag tag--glass">Planned</span>
            <ul class="road-list">
              <li>Live seeing index API integration with automated weather alerts</li>
              <li>Automated Clear-Sky Guarantee rescheduling engine</li>
              <li>ASCOM / INDI telescope driver remote queueing</li>
              <li>Kafka event-driven push notifications via WhatsApp/SMS</li>
            </ul>
          </div>

          <div class="road-card glass-soft">
            <div class="road-card__phase">Phase 4 (Months 10–12)</div>
            <h4>Global Scale & Mobile Applications</h4>
            <span class="tag tag--glass">Planned</span>
            <ul class="road-list">
              <li>Native iOS and Android mobile apps with AR star maps</li>
              <li>Multi-currency and multi-language internationalization</li>
              <li>Enterprise SOC2 / ISO-27001 data compliance</li>
              <li>Commercial dark-sky tourism partnerships across 20+ countries</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Presentation Helper for Team Leader -->
      <div class="lead-tip-card glass reveal" style="margin-top: 2.5rem;">
        <div class="lead-tip-card__icon">${icon('sparkle')}</div>
        <div>
          <h3>Ready to Present to Your Team Leader?</h3>
          <p class="muted">You can guide your team leader or client through the 3 perspectives using the top portal switch:</p>
          <div class="btn-row" style="margin-top: 1rem;">
            <a href="#/" class="btn btn--primary btn--sm">1. Customer Journey (Discovery → Booking)</a>
            <a href="#/partner" class="btn btn--glass btn--sm">2. Partner Operations (Hanle Observatory)</a>
            <a href="#/admin" class="btn btn--ghost btn--sm">3. Cloud Admin (AWS EKS & Kafka)</a>
          </div>
        </div>
      </div>

    </div>
  </section>`;

  return { html };
}

function notFoundPage() {
  return { html: `<section class="section section--first"><div class="container empty empty--wide"><div class="empty__icon">${icon('moon')}</div><h2>Lost in space</h2><p>We couldn't find that page.</p><a href="#/" class="btn btn--primary">Back to Earth</a></div></section>` };
}
