// -----------------------------
// Load a partial into a container
// -----------------------------
async function loadPartial(selector, url) {
  const el = document.querySelector(selector);
  const res = await fetch(url, { cache: 'no-store' });
  el.innerHTML = await res.text();
}

// -----------------------------
// Set active nav link by route
// -----------------------------
function setActive(route) {
  document.querySelectorAll('.nav a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('data-route') === route);
  });
}

// -----------------------------
// Collapsed tooltips for sidebar (show only when collapsed)
// -----------------------------
function enableCollapsedTooltips(){
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  const links = sidebar.querySelectorAll('.nav a');
  let tipEl = null;

  function showTip(e){
    if (!document.body.classList.contains('sidebar-collapsed')) return;
    const link = e.currentTarget;
    const label =
      link.getAttribute('title') ||
      link.dataset.tooltip ||
      (link.querySelector('.nav__label')?.textContent || '').trim();

    if (!label) return;

    // Suppress native title while our custom tooltip is visible
    if (!link.dataset._title && link.hasAttribute('title')) {
      link.dataset._title = link.getAttribute('title');
      link.removeAttribute('title');
    }

    if (!tipEl){
      tipEl = document.createElement('div');
      tipEl.className = 'sidebar-tooltip';
      document.body.appendChild(tipEl);
    }
    tipEl.textContent = label;

    const rect = link.getBoundingClientRect();
    const left = rect.right + 12;
    const top  = rect.top + rect.height/2;

    tipEl.style.left = left + 'px';
    tipEl.style.top  = top  + 'px';
    tipEl.style.opacity = '1';
  }

  function hideTip(e){
    if (tipEl) tipEl.style.opacity = '0';
    const link = e.currentTarget;
    if (link.dataset._title){
      link.setAttribute('title', link.dataset._title);
      delete link.dataset._title;
    }
  }

  links.forEach(link=>{
    link.addEventListener('mouseenter', showTip);
    link.addEventListener('mouseleave', hideTip);
    link.addEventListener('focus', showTip);
    link.addEventListener('blur', hideTip);
  });

  window.addEventListener('hashchange', ()=>{
    if (tipEl){ tipEl.remove(); tipEl = null; }
  });
}

// -----------------------------
// Features: modal (opens from card action button)
// -----------------------------
function initFeaturesInteractions(){
  const grid = document.querySelector('.features-grid');
  if(!grid) return;

  const backdrop  = document.getElementById('featureModalBackdrop');
  const modalBody = document.getElementById('featureModalBody');
  const modalTitle= document.getElementById('featureModalTitle');
  const closeBtn  = document.getElementById('featureModalClose');

  function openModal(title, html){
    modalTitle.textContent = title || 'Details';
    modalBody.innerHTML = html || '';
    backdrop.classList.remove('is-hidden');
    backdrop.style.display = 'flex';
    closeBtn?.focus();
  }
  function closeModal(){
    backdrop.classList.add('is-hidden');
    backdrop.style.display = 'none';
  }

  backdrop?.addEventListener('click', (e)=>{ if(e.target === backdrop) closeModal(); });
  closeBtn?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });

  grid.addEventListener('click', (e)=>{
    const btn = e.target.closest('[data-modal]');
    if(!btn) return;
    const card = btn.closest('.feature-card');
    const title = card?.querySelector('h4')?.textContent?.trim();
    const tpl = card?.querySelector('template[data-modal-content]');
    openModal(title, tpl ? tpl.innerHTML : '<p class="muted">No additional info.</p>');
  });
}

// -----------------------------
// Features: filters (popover + live filtering)
// -----------------------------
function initFeaturesFilters(){
  const grid    = document.querySelector('.features-grid');
  const btn     = document.getElementById('filterBtn');
  const popover = document.getElementById('filterPopover');
  if(!grid || !btn || !popover) return;

  function togglePopover(show){
    const next = (typeof show === 'boolean') ? show : popover.style.display === 'none';
    popover.style.display = next ? 'block' : 'none';
  }
  btn.addEventListener('click', (e)=>{
    e.stopPropagation();
    togglePopover();
  });
  document.addEventListener('click', (e)=>{
    if(popover.style.display === 'block' && !popover.contains(e.target) && e.target !== btn){
      togglePopover(false);
    }
  });
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') togglePopover(false);
  });

  const checks = Array.from(popover.querySelectorAll('input[type="checkbox"]'));
  function applyFilters(){
    const active = new Set(checks.filter(c=>c.checked).map(c=>c.value));
    const cards = grid.querySelectorAll('.feature-card');
    cards.forEach(card=>{
      const tags = (card.getAttribute('data-tags') || '').split(',').map(t=>t.trim()).filter(Boolean);
      const show = tags.some(t => active.has(t));
      card.style.display = show ? '' : 'none';
    });
  }
  checks.forEach(c => c.addEventListener('change', applyFilters));
  applyFilters();
}

// -----------------------------
// Router: load partials by hash
// -----------------------------
async function renderRoute() {
  const hash = location.hash || '#/';
  const route = hash.replace('#', '');
  switch (route) {
    case '/':
      await loadPartial('#content', 'Partials/Home.html');
      setActive('/');
      break;
    case '/features':
      await loadPartial('#content', 'Partials/Features.html');
      setActive('/features');
      // wire up Features page behavior AFTER the partial is in the DOM
      initFeaturesInteractions();
      initFeaturesFilters();
      break;
    default:
      await loadPartial('#content', 'Partials/Home.html');
      setActive('/');
  }
}

// -----------------------------
// Boot
// -----------------------------
(async function boot() {
  // 1) Load the sidebar partial first (needed for theme/collapse wiring)
  await loadPartial('#sidebar', 'Partials/Navbar.html');

  // Theme (dark by default)
  const THEME_KEY = 'ordo-theme';
  const savedTheme = localStorage.getItem(THEME_KEY);
  document.body.classList.toggle('dark', savedTheme !== 'light');
  const themeBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  function syncThemeIcon() {
    const isDark = document.body.classList.contains('dark');
    const id = isDark ? 'Icons/Icons.svg#moon' : 'Icons/Icons.svg#sun';
    const useEl = themeIcon.querySelector('use');
    useEl.setAttribute('href', id);
    useEl.setAttribute('xlink:href', id);
  }
  themeBtn?.addEventListener('click', () => {
    const isNowDark = !document.body.classList.contains('dark');
    document.body.classList.toggle('dark', isNowDark);
    localStorage.setItem(THEME_KEY, isNowDark ? 'dark' : 'light');
    syncThemeIcon();
  });
  syncThemeIcon();

  // Sidebar collapse (uses floating FAB)
  const COLLAPSE_KEY = 'ordo-collapsed';
  document.body.classList.toggle('sidebar-collapsed', localStorage.getItem(COLLAPSE_KEY) === 'true');
  const collapseBtn = document.getElementById('collapseToggle');
  function syncCollapseIcon(){
    const isCollapsed = document.body.classList.contains('sidebar-collapsed');
    const id = isCollapsed
      ? 'Icons/Icons.svg#arrow-badge-right'
      : 'Icons/Icons.svg#arrow-badge-left';
    const useEl = collapseBtn.querySelector('use');
    useEl.setAttribute('href', id);
    useEl.setAttribute('xlink:href', id);
  }
  collapseBtn?.addEventListener('click', ()=>{
    const makeCollapsed = !document.body.classList.contains('sidebar-collapsed');
    document.body.classList.toggle('sidebar-collapsed', makeCollapsed);
    localStorage.setItem(COLLAPSE_KEY, String(makeCollapsed));
    syncCollapseIcon();
  });
  syncCollapseIcon();

  // Sidebar tooltips (when collapsed)
  enableCollapsedTooltips();

  // Initial route + listener
  window.addEventListener('hashchange', renderRoute);
  await renderRoute();
})();
