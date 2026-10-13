/* =========================================================
   UNCLE TOM — App bootstrap & hash router
   ========================================================= */

const ROUTES = [
  [/^\/?$/, homePage, 'home'],
  [/^\/explore$/, explorePage, 'explore'],
  [/^\/experiences$/, explorePage, 'experiences'],
  [/^\/experience\/([\w-]+)$/, (p, q) => experiencePage(p, q), 'experiences', ['id']],
  [/^\/observatories$/, observatoriesPage, 'observatories'],
  [/^\/observatory\/([\w-]+)$/, observatoryDetailPage, 'observatories', ['id']],
  [/^\/telescopes$/, telescopesPage, 'telescopes'],
  [/^\/events$/, eventsPage, 'events'],
  [/^\/book\/([\w-]+)$/, bookingPage, 'explore', ['id']],
  [/^\/confirmation\/([\w-]+)$/, confirmationPage, 'explore', ['id']],
  [/^\/bookings$/, bookingsPage, 'bookings'],
  [/^\/partner$/, partnerPage, 'partner'],
  [/^\/admin$/, adminPage, 'admin'],
  [/^\/architecture$/, architecturePage, 'architecture'],
  [/^\/about$/, aboutPage, 'about'],
];

let currentCleanup = null;

function router() {
  let raw = location.hash.slice(1) || '/';
  let anchor = '';
  const second = raw.indexOf('#', 1);
  if (second > -1) { anchor = raw.slice(second + 1); raw = raw.slice(0, second); }
  const [path, qs] = raw.split('?');
  const query = new URLSearchParams(qs || '');

  let match = null;
  for (const [re, fn, nav, keys] of ROUTES) {
    const m = path.match(re);
    if (m) { const params = {}; (keys || []).forEach((k, i) => (params[k] = m[i + 1])); match = { fn, nav, params }; break; }
  }
  if (currentCleanup) { try { currentCleanup(); } catch {} currentCleanup = null; }

  const view = match ? match.fn(match.params, query) : notFoundPage();
  const app = $('#app');
  app.classList.remove('page-enter'); void app.offsetWidth;
  app.innerHTML = view.html;
  app.classList.add('page-enter');
  document.body.dataset.route = match ? match.nav : '404';

  $$('[data-route]').forEach((a) => a.classList.toggle('active', match && a.dataset.route === match.nav));

  // Sync portal switcher (Slide 2 Blueprint)
  const portalMode = match?.nav === 'partner' ? 'partner' : match?.nav === 'admin' ? 'admin' : 'customer';
  $$('.portal-switch .ps-btn, .mobile-portal-switch .ps-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.portal === portalMode);
  });
  closeMobileMenu(); UI.closeSearch(); UI.closeDrawer();
  if (!$('#modalContent').closest('.overlay').classList.contains('open') || !document.querySelector('.modal--locked')) UI.closeModal();

  if (anchor) setTimeout(() => { const el = document.getElementById(anchor); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 120);
  else scrollTo({ top: 0, behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' });

  if (view.mount) view.mount();
  currentCleanup = view.cleanup || null;
  hydrateIcons(app); initReveal(app); syncFavButtons();
  onScroll();
}

/* ---------------- Nav ---------------- */
function onScroll() { $('#nav').classList.toggle('scrolled', scrollY > 30 || document.body.dataset.route !== 'home'); }
function openMobileMenu() { $('#mobileMenu').classList.add('open'); document.body.classList.add('no-scroll'); }
function closeMobileMenu() { $('#mobileMenu').classList.remove('open'); if (!$('.overlay.open') && !$('.drawer.open')) document.body.classList.remove('no-scroll'); }

function openLogin() {
  const u = Store.user;
  if (u) {
    UI.openModal(`<div class="login"><div class="login__avatar">${u.name[0]}</div><h2>Hi, ${u.name}</h2><p class="muted">${u.email}</p>
      <a href="#/bookings" class="btn btn--primary btn--block" data-close-modal>${icon('ticket')} My Bookings</a>
      <button class="btn btn--ghost btn--block" id="logoutBtn">Log out</button></div>`, 'modal--sm');
    $('#logoutBtn').onclick = () => { localStorage.removeItem('ut_user'); updateLogin(); UI.closeModal(); UI.toast('Logged out'); };
    return;
  }
  UI.openModal(`
    <div class="login">
      <span class="brand__mark login__mark">${icon('sparkle')}</span>
      <h2>Welcome to Uncle Tom</h2>
      <p class="muted">Log in to manage bookings and your wishlist.</p>
      <button class="btn btn--glass btn--block" id="gLogin"><b style="font-family:Arial">G</b> Continue with Google</button>
      <div class="divider"><span>or</span></div>
      <form id="loginForm" class="form-grid form-grid--1">
        <label class="field"><span>Email</span><input type="email" required value="althaf.syed@example.com"/></label>
        <label class="field"><span>Password</span><input type="password" required value="demo1234"/></label>
        <button class="btn btn--primary btn--block" type="submit">Log in</button>
      </form>
      <p class="muted small">Demo login — any credentials work.</p>
    </div>`, 'modal--sm');
  const done = () => { Store.set('user', { name: 'Althaf', email: 'althaf.syed@example.com' }); updateLogin(); UI.closeModal(); UI.toast('Welcome back, Althaf ✦', 'success'); };
  $('#loginForm').onsubmit = (e) => { e.preventDefault(); done(); };
  $('#gLogin').onclick = done;
}
function updateLogin() {
  const u = Store.user;
  const btn = $('#loginBtn');
  if (btn) btn.innerHTML = u ? `${icon('user')} ${u.name}` : 'Login';
}

/* ---------------- Demo walkthrough ---------------- */
const DEMO_STEPS = [
  ['home', '1. Customer Discovery', 'Hero, search filters, workflow overview', '#/'],
  ['compass', '2. Explore Experiences', 'Filters, categories, sorting', '#/explore'],
  ['eye', '3. Experience Details', 'Gallery, telescope specs, weather & booking', '#/experience/milky-way-observation'],
  ['ticket', '4. Booking Flow & Checkout', '5-step checkout with instant autofill', '#/book/milky-way-observation'],
  ['check', '5. Confirmed E-Ticket', 'Digital QR ticket & voucher view', '#/bookings'],
  ['dome', '6. Observatory Listings', 'Global dark-sky locations & Bortle ratings', '#/observatories'],
  ['telescope', '7. Telescope Explorer', 'Apertures, optics diagrams & comparison', '#/telescopes'],
  ['calendar', '8. Celestial Events', 'Meteor showers, eclipses & seat inventory', '#/events'],
  ['dome', '9. Observatory Partner Portal', 'Slot roster, telescope fleet & payout (Slide 2 & 4)', '#/partner'],
  ['layers', '10. Admin & Cloud Control', 'AWS EKS health, Kafka live stream (Slide 3 & 6)', '#/admin'],
  ['layers', '11. Architecture Blueprint', 'System diagram, APIs & 12-month roadmap', '#/architecture'],
];
function initDemoGuide() {
  const panel = $('#demoPanel');
  const toggle = $('#demoToggle');
  const guide = $('#demoGuide');
  if (!panel || !toggle || !guide) return;

  panel.innerHTML = `
    <div class="demo-guide__head"><b>${icon('play')} Demo walkthrough</b><small>Suggested presentation order</small></div>
    <ol>${DEMO_STEPS.map(([i, t, d, h], n) => `<li><a href="${h}"><span class="dg-n">${n + 1}</span><span><b>${t}</b><small>${d}</small></span>${icon('arrowRight')}</a></li>`).join('')}</ol>
    <div class="demo-guide__tip">${icon('zap')} Tip: use “Autofill” buttons in checkout for a fast live demo.</div>`;
  toggle.onclick = () => guide.classList.toggle('open');
  panel.addEventListener('click', (e) => { if (e.target.closest('a')) guide.classList.remove('open'); });
}

/* ---------------- AI Assistant Widget (Blueprint Slide 11/12) ---------------- */
function initAiAssistant() {
  const toggleBtn = $('#aiToggleBtn');
  const chatWindow = $('#aiChatWindow');
  const closeBtn = $('#aiCloseBtn');
  const form = $('#aiForm');
  const input = $('#aiInput');
  const body = $('#aiChatBody');
  const suggestions = $('#aiSuggestions');

  if (!toggleBtn || !chatWindow) return;

  const toggle = () => chatWindow.classList.toggle('open');
  toggleBtn.onclick = toggle;
  if (closeBtn) closeBtn.onclick = () => chatWindow.classList.remove('open');

  const appendMsg = (text, isUser = false) => {
    if (!body) return;
    const d = document.createElement('div');
    d.className = `ai-msg ${isUser ? 'ai-msg--user' : 'ai-msg--bot'}`;
    const formatted = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    d.innerHTML = `<p>${formatted}</p>`;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  };

  const respond = (query) => {
    const qLower = query.toLowerCase();
    let answer = '';
    if (qLower.includes('saturn') || qLower.includes('ring')) {
      answer = AI_FAQ[0].a;
    } else if (qLower.includes('ladakh') || qLower.includes('milky way') || qLower.includes('season') || qLower.includes('when')) {
      answer = AI_FAQ[1].a;
    } else if (qLower.includes('bortle') || qLower.includes('dark') || qLower.includes('pollution')) {
      answer = AI_FAQ[2].a;
    } else if (qLower.includes('clear') || qLower.includes('cloud') || qLower.includes('guarantee') || qLower.includes('refund') || qLower.includes('weather')) {
      answer = AI_FAQ[3].a;
    } else if (qLower.includes('telescope') || qLower.includes('scope') || qLower.includes('aperture')) {
      answer = 'We feature high-end telescopes including the **Celestron EdgeHD 14"**, **PlaneWave CDK20**, and **Obsession 30" Dobsonian**! Head over to the **Telescopes** page to compare their focal lengths and specs.';
    } else if (qLower.includes('partner') || qLower.includes('observatory') || qLower.includes('host')) {
      answer = 'Observatory owners can list telescopes and manage booking slots directly via our **Partner Portal**! Visit the 🏢 **Partner Portal** tab in the top navigation.';
    } else if (qLower.includes('admin') || qLower.includes('cloud') || qLower.includes('aws') || qLower.includes('kafka')) {
      answer = 'Our architecture runs on **AWS EKS microservices** with **Apache Kafka event streaming**. You can inspect the real-time cloud health in the 📊 **Admin & Cloud** tab!';
    } else {
      answer = `Great question about "${query}"! In Uncle Tom's astronomy catalog, we curate verified observatories, telescopes, and dark-sky destinations. Explore our **Experiences** page to discover tonight's clear-sky sessions!`;
    }

    setTimeout(() => {
      appendMsg(answer, false);
    }, 320);
  };

  if (form && input) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;
      appendMsg(val, true);
      input.value = '';
      respond(val);
    };
  }

  if (suggestions) {
    suggestions.addEventListener('click', (e) => {
      const chip = e.target.closest('.ai-chip');
      if (!chip) return;
      const idx = +chip.dataset.faq;
      if (AI_FAQ[idx]) {
        appendMsg(AI_FAQ[idx].q, true);
        setTimeout(() => appendMsg(AI_FAQ[idx].a, false), 320);
      }
    });
  }
}

/* ---------------- Global delegated events ---------------- */
function initGlobal() {
  document.addEventListener('click', (e) => {
    const t = e.target;
    const fav = t.closest('[data-fav]');
    if (fav) {
      e.preventDefault(); e.stopPropagation();
      const added = Store.toggleWish(fav.dataset.fav);
      updateWishCount(); syncFavButtons();
      if ($('#wishDrawer')?.classList.contains('open')) renderWishlist();
      UI.toast(added ? 'Saved to your wishlist' : 'Removed from wishlist', added ? 'love' : 'info');
      fav.classList.add('pop'); setTimeout(() => fav.classList.remove('pop'), 400);
      return;
    }
    const tel = t.closest('[data-tel-view]'); if (tel) { e.preventDefault(); return openTelescope(tel.dataset.telView); }
    const ev = t.closest('[data-event-view]'); if (ev) { e.preventDefault(); return openEvent(ev.dataset.eventView); }
    const sc = t.closest('[data-scroll]'); if (sc) { e.preventDefault(); const el = $(sc.dataset.scroll); if (el) el.scrollIntoView({ behavior: 'smooth' }); return; }
    if (t.closest('[data-close-modal]') || (t.id === 'modal' && !$('.modal--locked'))) UI.closeModal();
    if (t.closest('[data-close-drawer]') || t.id === 'wishDrawer') UI.closeDrawer();
    if (t.closest('[data-close-search]') || t.id === 'searchOverlay') UI.closeSearch();
    if (t.closest('[data-action="login"]')) { closeMobileMenu(); openLogin(); }
    if (t.id === 'mobileMenu') closeMobileMenu();
    const guide = $('#demoGuide');
    if (guide && !t.closest('#demoGuide')) guide.classList.remove('open');
  });

  const searchBtn = $('#searchBtn'); if (searchBtn) searchBtn.onclick = UI.openSearch;
  const wishBtn = $('#wishBtn'); if (wishBtn) wishBtn.onclick = UI.openDrawer;
  const loginBtn = $('#loginBtn'); if (loginBtn) loginBtn.onclick = openLogin;
  const burgerBtn = $('#burgerBtn'); if (burgerBtn) burgerBtn.onclick = openMobileMenu;
  const closeMenuBtn = $('#closeMenuBtn'); if (closeMenuBtn) closeMenuBtn.onclick = closeMobileMenu;
  const globalSearch = $('#globalSearch'); if (globalSearch) globalSearch.addEventListener('input', (e) => renderSearch(e.target.value));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { if (!$('.modal--locked')) UI.closeModal(); UI.closeSearch(); UI.closeDrawer(); closeMobileMenu(); }
    if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))) { e.preventDefault(); UI.openSearch(); }
  });
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('hashchange', router);
}

/* ---------------- Boot ---------------- */
try { hydrateIcons(document); } catch (e) { console.warn('hydrateIcons error', e); }
try { initStarfield(); } catch (e) { console.warn('initStarfield error', e); }
try { initGlobal(); } catch (e) { console.warn('initGlobal error', e); }
try { initDemoGuide(); } catch (e) { console.warn('initDemoGuide error', e); }
try { initAiAssistant(); } catch (e) { console.warn('initAiAssistant error', e); }
try { updateWishCount(); } catch (e) { console.warn('updateWishCount error', e); }
try { updateLogin(); } catch (e) { console.warn('updateLogin error', e); }
router();

