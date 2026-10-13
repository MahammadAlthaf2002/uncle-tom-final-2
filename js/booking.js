/* =========================================================
   UNCLE TOM — Booking flow (demo, no real payments)
   Experience → Schedule → Guest Details → Payment → Confirmation
   ========================================================= */

const STEPS = ['Experience', 'Schedule', 'Guest Details', 'Payment', 'Confirmation'];
const ADDONS = [
  { id: 'kit', icon: 'gift', t: 'Premium comfort kit', d: 'Heated blanket, hot cocoa flask & red torch', price: 599, per: 'guest' },
  { id: 'dinner', icon: 'sparkle', t: 'Dinner under the stars', d: 'Three-course chef\'s dinner on the observation deck', price: 1999, per: 'guest' },
  { id: 'photo', icon: 'camera', t: 'Astro portrait package', d: 'Pro photo of your group under the Milky Way', price: 1499, per: 'booking' },
  { id: 'transfer', icon: 'route', t: 'Private hotel transfer', d: 'Return 4×4 transfer from your hotel', price: 2499, per: 'booking' },
];

/* Normalise experiences & events into one "bookable" shape */
function bookable(id) {
  const e = getExp(id);
  if (e) return { ...e, kind: 'experience', obs: getObs(e.observatoryId), tel: getTel(e.telescopeId) };
  const ev = getEvent(id);
  if (ev) {
    const o = getObs(ev.observatoryId);
    return {
      id: ev.id, kind: 'event', title: ev.title, image: ev.image || IMG.galaxy, event: ev, location: ev.location,
      price: ev.price, duration: ev.duration, maxGuests: Math.min(10, ev.seats - ev.booked), rating: o.rating, reviews: o.reviews,
      obs: o, tel: getTel(o.telescopes[0]), fixedDate: ev.date, fixedTime: ev.time, category: ev.category, tagline: ev.desc,
    };
  }
  return null;
}

const Booking = {
  draft: null,
  load() { try { this.draft = JSON.parse(sessionStorage.getItem('ut_draft')); } catch { this.draft = null; } return this.draft; },
  save() { sessionStorage.setItem('ut_draft', JSON.stringify(this.draft)); },
  start(itemId, sched = {}) {
    const item = bookable(itemId);
    let date = sched.date, time = sched.time;
    if (item.fixedDate) { date = item.fixedDate; time = item.fixedTime; }
    if (!date) {
      for (const d of getDates(14).slice(1)) { const s = getSlots(item, isoDate(d)).find((x) => x.left > 0); if (s) { date = isoDate(d); time = s.time; break; } }
    }
    this.draft = {
      itemId, step: 1, date, time, guests: sched.guests || 2, addons: ['kit'],
      guest: { first: '', last: '', email: '', phone: '', country: 'India', requests: '' },
      pay: { method: 'card', number: '', name: '', exp: '', cvv: '', address: '', city: '', zip: '', agree: false },
    };
    this.save();
  },
  totals(item, d = this.draft) {
    const base = item.price * d.guests;
    const addons = d.addons.map((id) => ADDONS.find((a) => a.id === id)).filter(Boolean)
      .map((a) => ({ ...a, total: a.per === 'guest' ? a.price * d.guests : a.price }));
    const addonSum = addons.reduce((s, a) => s + a.total, 0);
    const sub = base + addonSum; const tax = Math.round(sub * 0.18);
    return { base, addons, addonSum, sub, tax, total: sub + tax };
  },
};

function stepper(current) {
  return `<ol class="stepper-bar">${STEPS.map((s, i) => {
    const n = i + 1; const state = n < current ? 'done' : n === current ? 'current' : '';
    return `<li class="${state}" ${n < current && n < 5 ? `data-goto="${n}"` : ''}><span class="stepper-bar__dot">${n < current ? icon('check') : n}</span><span class="stepper-bar__label">${s}</span></li>`;
  }).join('')}</ol>`;
}

function orderSummary(item, d) {
  const T = Booking.totals(item, d);
  return `
  <div class="summary glass">
    <div class="summary__item">
      <img src="${item.image}" alt=""/>
      <div><small>${item.kind === 'event' ? 'Event' : item.category}</small><b>${item.title}</b><span>${icon('pin')}${item.location}</span></div>
    </div>
    <ul class="summary__meta">
      <li>${icon('calendar')}<span>${d.date ? fmtDate(d.date) : '—'}</span></li>
      <li>${icon('clock')}<span>${d.time || '—'}</span></li>
      <li>${icon('users')}<span>${d.guests} guest${d.guests > 1 ? 's' : ''}</span></li>
    </ul>
    <div class="price-summary">
      <div><span>Experience price</span><b>${inr(item.price)}</b></div>
      <div><span>Guests</span><b>× ${d.guests}</b></div>
      ${T.addons.map((a) => `<div><span>${a.t}</span><b>${inr(a.total)}</b></div>`).join('')}
      <div><span>Taxes (18% GST)</span><b>${inr(T.tax)}</b></div>
      <div class="total"><span>Total</span><b>${inr(T.total)}</b></div>
    </div>
    <div class="summary__trust">${icon('shield')}<span>Clear-Sky Guarantee · Free cancellation up to 48h before</span></div>
  </div>`;
}

/* ---------------- Step views ---------------- */
function stepExperience(item, d) {
  return `
  <div class="step">
    <h2>Review your experience</h2>
    <p class="muted">Confirm the experience and personalise your night with optional add-ons.</p>
    <div class="exp-review glass-soft">
      <img src="${item.image}" alt=""/>
      <div>
        <div class="tags"><span class="tag tag--accent">${item.kind === 'event' ? item.category : item.category}</span><span class="tag">${icon('star')} ${item.rating}</span></div>
        <h3>${item.title}</h3>
        <p class="muted">${item.tagline || ''}</p>
        <ul class="kv kv--inline">
          <li><span>${icon('dome')}Observatory</span><b>${item.obs.name}</b></li>
          <li><span>${icon('telescope')}Telescope</span><b>${item.tel.name}</b></li>
          <li><span>${icon('clock')}Duration</span><b>${item.duration}</b></li>
        </ul>
      </div>
    </div>
    <h4 class="mini-title">Enhance your experience</h4>
    <div class="addons">${ADDONS.map((a) => `
      <label class="addon ${d.addons.includes(a.id) ? 'active' : ''}">
        <input type="checkbox" data-addon="${a.id}" ${d.addons.includes(a.id) ? 'checked' : ''}/>
        <span class="addon__icon">${icon(a.icon)}</span>
        <span class="addon__body"><b>${a.t}</b><small>${a.d}</small></span>
        <span class="addon__price">+${inr(a.price)}<small>/${a.per}</small></span>
        <span class="addon__check">${icon('check')}</span>
      </label>`).join('')}</div>
  </div>`;
}

function stepSchedule(item, d) {
  if (item.fixedDate) {
    return `
    <div class="step">
      <h2>Event schedule</h2>
      <p class="muted">This is a fixed-date event. Choose the number of guests.</p>
      <div class="fixed-date glass-soft">
        <div class="date-block date-block--static"><span>${parseDate(d.date).toLocaleDateString('en-GB', { month: 'short' })}</span><strong>${parseDate(d.date).getDate()}</strong><small>${parseDate(d.date).getFullYear()}</small></div>
        <div><b>${fmtDate(d.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</b><p class="muted">Starts ${d.time} · ${item.duration} · ${item.location}</p>
        <span class="tag tag--ok">${icon('check')} ${item.maxGuests}+ seats available</span></div>
      </div>
      ${guestStepper(d)}
    </div>`;
  }
  const dates = getDates(14);
  const slots = getSlots(item, d.date);
  const q = dayQuality(item, d.date);
  const moon = moonInfo(parseDate(d.date));
  return `
  <div class="step">
    <h2>Choose date & time</h2>
    <p class="muted">Dots indicate the forecast sky quality for each night.</p>
    <h4 class="mini-title">${icon('calendar')} Select date</h4>
    <div class="date-scroller date-scroller--wide" id="bkDates">${dates.map((dt) => {
      const iso = isoDate(dt); const avail = getSlots(item, iso).some((s) => s.left > 0); const dq = dayQuality(item, iso);
      return `<button class="date-chip ${iso === d.date ? 'active' : ''}" data-date="${iso}" ${avail ? '' : 'disabled'}><small>${dt.toLocaleDateString('en-GB', { weekday: 'short' })}</small><b>${dt.getDate()}</b><small>${dt.toLocaleDateString('en-GB', { month: 'short' })}</small><i class="q q--${avail ? dq.k : 'off'}"></i></button>`;
    }).join('')}</div>
    <div class="legend"><span><i class="q q--great"></i>Excellent</span><span><i class="q q--good"></i>Clear</span><span><i class="q q--fair"></i>Partly cloudy</span><span><i class="q q--off"></i>Sold out</span></div>

    <div class="night-forecast glass-soft">
      ${moonSVG(moon.f, 44)}
      <div><small>Forecast for ${fmtDate(d.date, { weekday: 'long', day: 'numeric', month: 'short' })}</small><b>${q.t} skies · ${moon.name} (${moon.illum}% lit)</b></div>
      <span class="tag tag--${q.k === 'fair' ? 'warn' : 'ok'}">${q.k === 'fair' ? 'Weather guarantee applies' : 'Great night to observe'}</span>
    </div>

    <h4 class="mini-title">${icon('clock')} Select time · <span class="muted">${slots.filter((s) => s.left).length} slots available</span></h4>
    <div class="slots slots--wide" id="bkSlots">${slots.map((s) => `<button class="slot ${s.time === d.time ? 'active' : ''}" data-time="${s.time}" ${s.left ? '' : 'disabled'}><b>${s.time}</b><small>${s.left ? (s.left <= 3 ? `<span class="hot">Only ${s.left} left</span>` : `${s.left} spots left`) : 'Sold out'}</small></button>`).join('')}</div>
    ${guestStepper(d)}
  </div>`;
}

function guestStepper(d) {
  return `<h4 class="mini-title">${icon('users')} Guests</h4>
    <div class="guest-row glass-soft"><div><b>Adults & children 8+</b><small class="muted">Children under 8 are not permitted for safety at altitude</small></div>
      <div class="stepper" id="bkGuests"><button data-g="-1" aria-label="Fewer">${icon('minus')}</button><span>${d.guests}</span><button data-g="1" aria-label="More">${icon('plus')}</button></div></div>`;
}

function stepGuest(d) {
  const g = d.guest;
  const f = (name, label, type = 'text', ph = '', full = false) => `<label class="field ${full ? 'field--full' : ''}"><span>${label}</span><input name="${name}" type="${type}" placeholder="${ph}" value="${g[name] || ''}" data-guest="${name}"/></label>`;
  return `
  <div class="step">
    <div class="step__head"><div><h2>Guest details</h2><p class="muted">We'll send your e-ticket and sky forecast to this contact.</p></div>
      <button class="btn btn--ghost btn--sm" id="autofillGuest">${icon('zap')} Autofill demo details</button></div>
    <form class="form-grid" id="guestForm" novalidate>
      ${f('first', 'First name *', 'text', 'Althaf')}
      ${f('last', 'Last name *', 'text', 'Syed')}
      ${f('email', 'Email address *', 'email', 'you@example.com')}
      ${f('phone', 'Phone number *', 'tel', '+91 98765 43210')}
      <label class="field"><span>Country</span><select data-guest="country">${['India', 'United States', 'United Kingdom', 'UAE', 'Singapore', 'Australia'].map((c) => `<option ${c === g.country ? 'selected' : ''}>${c}</option>`).join('')}</select></label>
      <label class="field"><span>Occasion (optional)</span><select data-guest="occasion"><option>None</option><option>Birthday</option><option>Anniversary</option><option>Proposal 💍</option><option>Corporate</option></select></label>
      <label class="field field--full"><span>Special requests</span><textarea data-guest="requests" rows="3" placeholder="Dietary needs, accessibility, celebrations…">${g.requests || ''}</textarea></label>
    </form>
    <div class="note glass-soft">${icon('info')}<span>For high-altitude experiences, guests should be in good health. Warm clothing is provided on site.</span></div>
  </div>`;
}

function cardBrand(n) { n = n.replace(/\s/g, ''); return /^4/.test(n) ? 'VISA' : /^5[1-5]/.test(n) ? 'Mastercard' : /^6/.test(n) ? 'RuPay' : /^3[47]/.test(n) ? 'AMEX' : ''; }

function stepPayment(item, d) {
  const p = d.pay; const T = Booking.totals(item, d);
  const f = (name, label, ph, extra = '', full = false) => `<label class="field ${full ? 'field--full' : ''}"><span>${label}</span><input data-pay="${name}" value="${p[name] || ''}" placeholder="${ph}" ${extra}/></label>`;
  return `
  <div class="step">
    <div class="step__head"><div><h2>Secure payment</h2><p class="muted">${icon('lock')} Demo checkout — no real payment will be processed.</p></div>
      <button class="btn btn--ghost btn--sm" id="autofillPay">${icon('zap')} Use test card</button></div>
    <div class="pay-tabs" id="payTabs">
      ${[['card', 'card', 'Card'], ['upi', 'zap', 'UPI'], ['net', 'globe', 'Net Banking']].map(([k, i, l]) => `<button class="pay-tab ${p.method === k ? 'active' : ''}" data-method="${k}">${icon(i)}${l}</button>`).join('')}
    </div>

    <div class="pay-body ${p.method === 'card' ? '' : 'hidden'}" data-panel="card">
      <div class="card-preview" id="cardPreview">
        <div class="card-preview__inner">
          <div class="card-face card-face--front">
            <div class="cf-top"><span class="cf-chip"></span><span class="cf-brand" id="cfBrand">${cardBrand(p.number) || 'UNCLE TOM'}</span></div>
            <div class="cf-number" id="cfNumber">${p.number || '•••• •••• •••• ••••'}</div>
            <div class="cf-bottom"><div><small>Card holder</small><b id="cfName">${p.name || 'YOUR NAME'}</b></div><div><small>Expires</small><b id="cfExp">${p.exp || 'MM/YY'}</b></div></div>
          </div>
          <div class="card-face card-face--back"><div class="cf-strip"></div><div class="cf-cvv"><small>CVV</small><b id="cfCvv">${p.cvv ? '•'.repeat(p.cvv.length) : '•••'}</b></div></div>
        </div>
      </div>
      <div class="form-grid">
        ${f('number', 'Card number', '4242 4242 4242 4242', 'inputmode="numeric" maxlength="19" autocomplete="cc-number"', true)}
        ${f('name', 'Name on card', 'ALTHAF SYED', 'autocomplete="cc-name"', true)}
        ${f('exp', 'Expiry', 'MM/YY', 'inputmode="numeric" maxlength="5" autocomplete="cc-exp"')}
        ${f('cvv', 'CVV', '•••', 'inputmode="numeric" maxlength="4" type="password" autocomplete="cc-csc"')}
      </div>
    </div>
    <div class="pay-body ${p.method === 'upi' ? '' : 'hidden'}" data-panel="upi">
      <div class="upi glass-soft"><div class="qr">${qrSVG('UPI' + d.itemId, 140)}</div><div><b>Scan to pay with any UPI app</b><p class="muted">Or enter your UPI ID</p><label class="field"><input placeholder="name@okbank" /></label><div class="tags"><span class="tag">GPay</span><span class="tag">PhonePe</span><span class="tag">Paytm</span><span class="tag">BHIM</span></div></div></div>
    </div>
    <div class="pay-body ${p.method === 'net' ? '' : 'hidden'}" data-panel="net">
      <div class="banks">${['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak', 'Yes Bank'].map((b, i) => `<label class="radio radio--card"><input type="radio" name="bank" ${i === 0 ? 'checked' : ''}/><span></span>${b}</label>`).join('')}</div>
    </div>

    <h4 class="mini-title">${icon('home')} Billing information</h4>
    <div class="form-grid">
      ${f('address', 'Address', '221B Residency Road', '', true)}
      ${f('city', 'City', 'Bengaluru')}
      ${f('zip', 'PIN / ZIP code', '560025', 'inputmode="numeric"')}
    </div>
    <label class="check check--terms"><input type="checkbox" id="agree" ${p.agree ? 'checked' : ''}/><span>${icon('check')}</span>I agree to the <a href="#/about">terms</a>, cancellation policy and Clear-Sky Guarantee conditions.</label>
    <button class="btn btn--gold btn--block btn--lg" id="payBtn">${icon('lock')} Pay & Confirm · ${inr(T.total)}</button>
    <div class="secure-row">${icon('shield')}<span>256-bit SSL encryption</span><span>PCI-DSS compliant</span><span>3-D Secure</span></div>
  </div>`;
}

/* Pseudo QR code (visual only) */
function qrSVG(seed, size = 120) {
  const n = 25, rnd = seeded(seed); let cells = '';
  const finder = (x, y) => (x >= 0 && x < 7 && y >= 0 && y < 7);
  const isFinder = (x, y) => finder(x, y) || finder(x - (n - 7), y) || finder(x, y - (n - 7));
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    let on;
    if (isFinder(x, y)) {
      const lx = x >= n - 7 ? x - (n - 7) : x, ly = y >= n - 7 ? y - (n - 7) : y;
      on = lx === 0 || ly === 0 || lx === 6 || ly === 6 || (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4);
    } else on = rnd() > 0.52;
    if (on) cells += `<rect x="${x}" y="${y}" width="1.02" height="1.02"/>`;
  }
  return `<svg width="${size}" height="${size}" viewBox="-1 -1 ${n + 2} ${n + 2}" class="qr-svg"><rect x="-1" y="-1" width="${n + 2}" height="${n + 2}" fill="#fff" rx="1.5"/><g fill="#0b0d1f">${cells}</g></svg>`;
}

/* ---------------- Booking page ---------------- */
function bookingPage({ id }) {
  const item = bookable(id); if (!item) return notFoundPage();
  Booking.load();
  if (!Booking.draft || Booking.draft.itemId !== id) Booking.start(id);
  const d = Booking.draft;

  const html = `
  <section class="section section--first booking">
    <div class="container">
      <div class="booking__top">
        <a href="${item.kind === 'event' ? '#/events' : `#/experience/${item.id}`}" class="back-link">${icon('arrowLeft')} Back to ${item.kind === 'event' ? 'events' : 'experience'}</a>
        <span class="secure-pill">${icon('lock')} Secure checkout</span>
      </div>
      <div id="stepperWrap">${stepper(d.step)}</div>
      <div class="booking__layout">
        <div class="booking__main glass" id="stepWrap"></div>
        <aside class="booking__side" id="summaryWrap"></aside>
      </div>
    </div>
  </section>`;

  const renderStep = (scroll = false) => {
    $('#stepperWrap').innerHTML = stepper(d.step);
    const views = { 1: () => stepExperience(item, d), 2: () => stepSchedule(item, d), 3: () => stepGuest(d), 4: () => stepPayment(item, d) };
    const nav = d.step < 4 ? `<div class="step-nav">
        ${d.step > 1 ? `<button class="btn btn--ghost" id="prevStep">${icon('arrowLeft')} Back</button>` : '<span></span>'}
        <button class="btn btn--primary" id="nextStep">Continue to ${STEPS[d.step]} ${icon('arrowRight')}</button></div>`
      : `<div class="step-nav"><button class="btn btn--ghost" id="prevStep">${icon('arrowLeft')} Back</button><span></span></div>`;
    const w = $('#stepWrap'); w.innerHTML = views[d.step]() + nav; w.classList.remove('fade-in'); void w.offsetWidth; w.classList.add('fade-in');
    renderSummary();
    bindStep();
    if (scroll) scrollTo({ top: 0, behavior: 'smooth' });
  };
  const renderSummary = () => { $('#summaryWrap').innerHTML = orderSummary(item, d); };
  const go = (n) => { d.step = n; Booking.save(); renderStep(true); };

  function validateGuest() {
    const g = d.guest; const errs = [];
    if (!g.first.trim()) errs.push('first'); if (!g.last.trim()) errs.push('last');
    if (!/^\S+@\S+\.\S+$/.test(g.email)) errs.push('email');
    if (g.phone.replace(/\D/g, '').length < 10) errs.push('phone');
    $$('[data-guest]').forEach((i) => i.closest('.field').classList.toggle('invalid', errs.includes(i.dataset.guest)));
    if (errs.length) UI.toast('Please complete the highlighted fields');
    return !errs.length;
  }
  function validatePay() {
    const p = d.pay; const errs = [];
    if (p.method === 'card') {
      if (p.number.replace(/\s/g, '').length < 15) errs.push('number');
      if (!p.name.trim()) errs.push('name');
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(p.exp)) errs.push('exp');
      if (p.cvv.length < 3) errs.push('cvv');
    }
    if (!p.address.trim()) errs.push('address'); if (!p.city.trim()) errs.push('city'); if (!p.zip.trim()) errs.push('zip');
    $$('[data-pay]').forEach((i) => i.closest('.field').classList.toggle('invalid', errs.includes(i.dataset.pay)));
    if (!p.agree) { errs.push('agree'); $('#agree').closest('.check').classList.add('invalid'); }
    if (errs.length) UI.toast(errs.length === 1 && errs[0] === 'agree' ? 'Please accept the terms to continue' : 'Please check your payment details');
    return !errs.length;
  }

  function bindStep() {
    const next = $('#nextStep'); const prev = $('#prevStep');
    if (prev) prev.onclick = () => go(d.step - 1);
    if (next) next.onclick = () => {
      if (d.step === 2 && !d.time) return UI.toast('Please select a time slot');
      if (d.step === 3 && !validateGuest()) return;
      go(d.step + 1);
    };
    $('#stepperWrap').onclick = (e) => { const li = e.target.closest('[data-goto]'); if (li) go(+li.dataset.goto); };

    // Step 1: add-ons
    $$('[data-addon]').forEach((c) => (c.onchange = () => {
      const id = c.dataset.addon; d.addons = c.checked ? [...d.addons, id] : d.addons.filter((x) => x !== id);
      c.closest('.addon').classList.toggle('active', c.checked); Booking.save(); renderSummary();
    }));
    // Step 2: schedule
    const dates = $('#bkDates');
    if (dates) {
      const a = $('.active', dates); if (a) a.scrollIntoView({ block: 'nearest', inline: 'center' });
      dates.onclick = (e) => {
        const b = e.target.closest('[data-date]'); if (!b) return;
        d.date = b.dataset.date; const s = getSlots(item, d.date); const keep = s.find((x) => x.time === d.time && x.left > 0) || s.find((x) => x.left > 0);
        d.time = keep ? keep.time : null; Booking.save(); renderStep();
      };
    }
    const slots = $('#bkSlots');
    if (slots) slots.onclick = (e) => { const b = e.target.closest('[data-time]'); if (!b) return; d.time = b.dataset.time; Booking.save(); renderStep(); };
    const gs = $('#bkGuests');
    if (gs) gs.onclick = (e) => {
      const b = e.target.closest('[data-g]'); if (!b) return;
      const slot = item.fixedDate ? null : getSlots(item, d.date).find((s) => s.time === d.time);
      const max = Math.min(item.maxGuests, slot ? slot.left : item.maxGuests);
      const n = d.guests + +b.dataset.g;
      if (n > max) return UI.toast(`Maximum ${max} guests for this slot`);
      d.guests = Math.max(1, n); Booking.save(); $('span', gs).textContent = d.guests; renderSummary();
    };
    // Step 3: guest
    $$('[data-guest]').forEach((i) => (i.oninput = i.onchange = () => { d.guest[i.dataset.guest] = i.value; i.closest('.field').classList.remove('invalid'); Booking.save(); }));
    const ag = $('#autofillGuest');
    if (ag) ag.onclick = () => {
      Object.assign(d.guest, { first: 'Althaf', last: 'Syed', email: 'althaf.syed@example.com', phone: '+91 98765 43210', requests: 'Celebrating a birthday — would love a constellation story!' });
      Booking.save(); renderStep(); UI.toast('Demo details filled', 'success');
    };
    // Step 4: payment
    const tabs = $('#payTabs');
    if (tabs) tabs.onclick = (e) => {
      const b = e.target.closest('[data-method]'); if (!b) return; d.pay.method = b.dataset.method; Booking.save();
      $$('.pay-tab').forEach((t) => t.classList.toggle('active', t === b));
      $$('[data-panel]').forEach((p) => p.classList.toggle('hidden', p.dataset.panel !== d.pay.method));
    };
    $$('[data-pay]').forEach((i) => {
      i.oninput = () => {
        let v = i.value; const k = i.dataset.pay;
        if (k === 'number') { v = v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim(); $('#cfNumber').textContent = v || '•••• •••• •••• ••••'; $('#cfBrand').textContent = cardBrand(v) || 'UNCLE TOM'; }
        if (k === 'exp') { v = v.replace(/\D/g, '').slice(0, 4); if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2); $('#cfExp').textContent = v || 'MM/YY'; }
        if (k === 'cvv') { v = v.replace(/\D/g, '').slice(0, 4); $('#cfCvv').textContent = v ? '•'.repeat(v.length) : '•••'; }
        if (k === 'name') { v = v.toUpperCase(); $('#cfName').textContent = v || 'YOUR NAME'; }
        i.value = v; d.pay[k] = v; i.closest('.field').classList.remove('invalid'); Booking.save();
      };
      if (i.dataset.pay === 'cvv') { i.onfocus = () => $('#cardPreview').classList.add('flip'); i.onblur = () => $('#cardPreview').classList.remove('flip'); }
    });
    const agree = $('#agree'); if (agree) agree.onchange = () => { d.pay.agree = agree.checked; agree.closest('.check').classList.remove('invalid'); Booking.save(); };
    const ap = $('#autofillPay');
    if (ap) ap.onclick = () => {
      Object.assign(d.pay, { method: 'card', number: '4242 4242 4242 4242', name: ((d.guest.first || 'Althaf') + ' ' + (d.guest.last || 'Syed')).toUpperCase(), exp: '12/29', cvv: '123', address: '221B Residency Road', city: 'Bengaluru', zip: '560025', agree: true });
      Booking.save(); renderStep(); UI.toast('Test card applied — no real charge', 'success');
    };
    const pay = $('#payBtn');
    if (pay) pay.onclick = () => { if (validatePay()) processPayment(item, d); };
  }

  return { html, mount: () => renderStep() };
}

function processPayment(item, d) {
  const T = Booking.totals(item, d);
  const steps = ['Encrypting payment details…', 'Authorising with your bank…', 'Reserving your seats with the observatory…', 'Generating your e-ticket…'];
  UI.openModal(`<div class="processing"><div class="orbit"><span></span><span></span><span></span></div><h3>Processing payment</h3><p class="muted" id="procText">${steps[0]}</p><div class="bar bar--proc"><i id="procBar"></i></div><b class="proc-amount">${inr(T.total)}</b></div>`, 'modal--sm modal--locked');
  let i = 0;
  const iv = setInterval(() => {
    i++; const t = $('#procText'); const b = $('#procBar');
    if (b) b.style.width = Math.min(100, (i / steps.length) * 100) + '%';
    if (i < steps.length) { if (t) t.textContent = steps[i]; return; }
    clearInterval(iv);
    const id = 'UT-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    const booking = {
      id, itemId: item.id, title: item.title, image: item.image, kind: item.kind, location: item.location,
      date: d.date, time: d.time, guests: d.guests, total: T.total, tax: T.tax, sub: T.sub, addons: T.addons.map((a) => a.t),
      observatory: item.obs.name, telescope: item.tel.name, duration: item.duration,
      guest: { ...d.guest }, method: d.pay.method === 'card' ? `${cardBrand(d.pay.number) || 'Card'} •••• ${d.pay.number.slice(-4)}` : d.pay.method === 'upi' ? 'UPI' : 'Net Banking',
      createdAt: new Date().toISOString(),
    };
    Store.addBooking(booking);
    sessionStorage.removeItem('ut_draft'); Booking.draft = null;
    setTimeout(() => { UI.closeModal(); location.hash = `#/confirmation/${id}`; }, 350);
  }, 750);
}

/* ---------------- Confirmation ---------------- */
function confirmationPage({ id }) {
  const b = Store.bookings.find((x) => x.id === id); if (!b) return notFoundPage();
  const rows = [
    ['ticket', 'Booking ID', b.id], ['sparkle', 'Experience', b.title], ['calendar', 'Date', fmtDate(b.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })],
    ['clock', 'Time', b.time], ['pin', 'Location', b.location], ['users', 'Guests', `${b.guests} guest${b.guests > 1 ? 's' : ''}`],
    ['card', 'Amount paid', `${inr(b.total)} <small class="muted">via ${b.method}</small>`], ['dome', 'Observatory', b.observatory], ['telescope', 'Telescope', b.telescope],
  ];
  const html = `
  <section class="section section--first confirm">
    <div class="confetti" id="confetti"></div>
    <div class="container">
      <div id="stepperWrap">${stepper(6)}</div>
      <div class="confirm__head">
        <div class="confirm__check"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="36"/><path d="M24 41l11 11 22-24"/></svg></div>
        <span class="eyebrow">${icon('sparkle')} Booking confirmed</span>
        <h1>Your Stargazing Experience <span class="grad">is Confirmed</span></h1>
        <p class="lead">A confirmation and e-ticket have been sent to <b>${b.guest.email || 'your email'}</b>. Clear skies, ${b.guest.first || 'stargazer'}!</p>
      </div>

      <div class="ticket">
        <div class="ticket__main">
          <div class="ticket__banner"><img src="${b.image}" alt=""/><div><span class="chip chip--glass">${icon('check')} Confirmed</span><h3>${b.title}</h3><p>${b.location}</p></div></div>
          <div class="ticket__grid">${rows.map(([i, l, v]) => `<div class="ticket__row">${icon(i)}<div><small>${l}</small><b>${v}</b></div></div>`).join('')}</div>
        </div>
        <div class="ticket__stub">
          <div class="qr">${qrSVG(b.id, 150)}</div>
          <b class="ticket__id">${b.id}</b>
          <small>Show this QR at the visitor centre</small>
        </div>
      </div>

      <div class="confirm__actions">
        <a href="#/bookings?id=${b.id}" class="btn btn--glass btn--lg">${icon('ticket')} View Booking</a>
        <button class="btn btn--primary btn--lg" id="dlBtn">${icon('download')} Download Confirmation</button>
        <a href="#/explore" class="btn btn--ghost btn--lg">${icon('compass')} Back to Explore</a>
      </div>
      <div class="confirm__extra"><button class="link-btn" id="icsBtn">${icon('calendar')} Add to calendar</button></div>

      <div class="next-steps">
        ${[['mail', 'Confirmation sent', 'E-ticket & receipt delivered to your inbox.'], ['moon', 'Sky forecast · 24h before', 'We\'ll alert you with tonight\'s viewing conditions.'], ['pin', 'Meet your astronomer', 'Arrive 30 min early at the visitor centre.'], ['star', 'Enjoy the universe', 'Look up — and leave a review afterwards!']]
          .map(([i, t, d], n) => `<div class="ns glass-soft reveal"><span class="ns__n">${n + 1}</span>${icon(i)}<b>${t}</b><small>${d}</small></div>`).join('')}
      </div>
    </div>
  </section>`;

  const mount = () => {
    const c = $('#confetti');
    c.innerHTML = Array.from({ length: 60 }, () => `<i style="left:${Math.random() * 100}%;animation-delay:${Math.random() * 1.2}s;animation-duration:${2.5 + Math.random() * 2.5}s;--c:${['#a78bfa', '#22d3ee', '#f5d48a', '#fff', '#f0abfc'][Math.floor(Math.random() * 5)]};--s:${4 + Math.random() * 6}px"></i>`).join('');
    $('#dlBtn').onclick = () => downloadConfirmation(b);
    $('#icsBtn').onclick = () => downloadICS(b);
  };
  return { html, mount };
}

function downloadFile(name, content, type) {
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([content], { type })); a.download = name;
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}

function downloadConfirmation(b) {
  const row = (l, v) => `<tr><td style="padding:10px 0;color:#8b90b3;font-size:13px">${l}</td><td style="padding:10px 0;text-align:right;font-weight:600">${v}</td></tr>`;
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Uncle Tom — Booking ${b.id}</title></head>
  <body style="margin:0;background:#05060f;font-family:Segoe UI,Arial,sans-serif;color:#eef0ff;padding:40px">
  <div style="max-width:640px;margin:auto;background:linear-gradient(160deg,#141833,#0b0d1f);border:1px solid rgba(167,139,250,.3);border-radius:24px;overflow:hidden">
    <div style="padding:32px;background:linear-gradient(120deg,#6d28d9,#0891b2)">
      <div style="letter-spacing:4px;font-weight:800;font-size:14px">UNCLE TOM</div>
      <div style="font-size:11px;opacity:.8;letter-spacing:1px">PREMIUM STARGAZING EXPERIENCES</div>
      <h1 style="margin:24px 0 4px;font-size:26px">Your Stargazing Experience is Confirmed ✦</h1>
      <div style="opacity:.9">Booking ID <b>${b.id}</b></div>
    </div>
    <div style="padding:28px 32px">
      <table style="width:100%;border-collapse:collapse;color:#eef0ff">
        ${row('Experience', b.title)}${row('Date', fmtDate(b.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }))}${row('Time', b.time)}
        ${row('Location', b.location)}${row('Observatory', b.observatory)}${row('Telescope', b.telescope)}${row('Guests', b.guests)}
        ${b.addons.length ? row('Add-ons', b.addons.join(', ')) : ''}${row('Lead guest', `${b.guest.first} ${b.guest.last}`)}${row('Payment', b.method)}
        <tr><td colspan="2" style="border-top:1px solid rgba(255,255,255,.12);padding-top:14px"></td></tr>
        ${row('Subtotal', inr(b.sub))}${row('Taxes (18% GST)', inr(b.tax))}
        <tr><td style="padding:12px 0;font-size:18px;font-weight:700">Total paid</td><td style="text-align:right;font-size:22px;font-weight:800;color:#f5d48a">${inr(b.total)}</td></tr>
      </table>
      <div style="text-align:center;margin-top:20px">${qrSVG(b.id, 140)}<div style="font-size:12px;color:#8b90b3;margin-top:8px">Show this QR code at the visitor centre</div></div>
    </div>
    <div style="padding:18px 32px;font-size:11px;color:#8b90b3;border-top:1px solid rgba(255,255,255,.08)">Demo confirmation generated by the Uncle Tom frontend prototype · Free cancellation up to 48h before · Clear-Sky Guarantee applies.</div>
  </div></body></html>`;
  downloadFile(`UncleTom-Booking-${b.id}.html`, html, 'text/html');
  UI.toast('Confirmation downloaded', 'success');
}

function downloadICS(b) {
  const d = parseDate(b.date); const stamp = (x) => x.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const start = new Date(d); start.setHours(20, 0); const end = new Date(start.getTime() + 3 * 3600000);
  const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Uncle Tom//EN\r\nBEGIN:VEVENT\r\nUID:${b.id}@uncletom.demo\r\nDTSTAMP:${stamp(new Date())}\r\nDTSTART:${stamp(start)}\r\nDTEND:${stamp(end)}\r\nSUMMARY:${b.title} (Uncle Tom)\r\nLOCATION:${b.observatory}, ${b.location}\r\nDESCRIPTION:Booking ${b.id} · ${b.guests} guests · ${b.time}\r\nEND:VEVENT\r\nEND:VCALENDAR`;
  downloadFile(`UncleTom-${b.id}.ics`, ics, 'text/calendar');
}
