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

  // Sidebar drawer (uses floating FAB)
  localStorage.removeItem('ordo-collapsed');
  const collapseBtn = document.getElementById('collapseToggle');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');
  function setSidebarOpen(isOpen){
    document.body.classList.toggle('sidebar-open', isOpen);
    sidebarBackdrop.hidden = !isOpen;
    collapseBtn.setAttribute('aria-expanded', String(isOpen));
    collapseBtn.setAttribute('aria-label', isOpen ? 'Close sidebar' : 'Open sidebar');
    const id = isOpen ? 'Icons/Icons.svg#x' : 'Icons/Icons.svg#arrow-badge-right';
    const useEl = collapseBtn.querySelector('use');
    useEl.setAttribute('href', id);
    useEl.setAttribute('xlink:href', id);
  }
  collapseBtn?.addEventListener('click', ()=>{
    setSidebarOpen(!document.body.classList.contains('sidebar-open'));
  });
  sidebarBackdrop?.addEventListener('click', () => setSidebarOpen(false));
  document.querySelector('.sidebar')?.addEventListener('click', (e) => {
    if (e.target.closest('.nav a')) setSidebarOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setSidebarOpen(false);
  });
  setSidebarOpen(false);

  // Initial route + listener
  window.addEventListener('hashchange', renderRoute);
  await renderRoute();
})();
