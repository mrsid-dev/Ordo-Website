async function loadPartial(selector, url) {
  const el = document.querySelector(selector);
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Unable to load ${url}`);
  el.innerHTML = await res.text();
}

function setActive(route) {
  document.querySelectorAll('.nav-link[data-route]').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('data-route') === route);
  });
}

function closeMobileNav() {
  document.body.classList.remove('mobile-nav-open');
  const button = document.getElementById('mobileMenuButton');
  button?.setAttribute('aria-expanded', 'false');
  button?.setAttribute('aria-label', 'Open menu');
}

function initMobileNav() {
  const button = document.getElementById('mobileMenuButton');
  const nav = document.getElementById('primaryNav');
  if (!button || !nav) return;

  button.addEventListener('click', () => {
    const isOpen = !document.body.classList.contains('mobile-nav-open');
    document.body.classList.toggle('mobile-nav-open', isOpen);
    button.setAttribute('aria-expanded', String(isOpen));
    button.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMobileNav();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobileNav();
  });
}

function initFeaturesInteractions() {
  const grid = document.querySelector('.features-grid');
  if (!grid) return;

  const backdrop = document.getElementById('featureModalBackdrop');
  const modalBody = document.getElementById('featureModalBody');
  const modalTitle = document.getElementById('featureModalTitle');
  const closeBtn = document.getElementById('featureModalClose');

  function openModal(title, html) {
    modalTitle.textContent = title || 'Details';
    modalBody.innerHTML = html || '<p class="muted">No additional info.</p>';
    backdrop.classList.remove('is-hidden');
    backdrop.style.display = 'flex';
    closeBtn?.focus();
  }

  function closeModal() {
    backdrop.classList.add('is-hidden');
    backdrop.style.display = 'none';
  }

  backdrop?.addEventListener('click', (event) => {
    if (event.target === backdrop) closeModal();
  });
  closeBtn?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });

  grid.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-modal]');
    if (!btn) return;
    const card = btn.closest('.feature-card');
    const title = card?.querySelector('h4')?.textContent?.trim();
    const tpl = card?.querySelector('template[data-modal-content]');
    openModal(title, tpl ? tpl.innerHTML : '');
  });
}

function initFeaturesFilters() {
  const grid = document.querySelector('.features-grid');
  const btn = document.getElementById('filterBtn');
  const popover = document.getElementById('filterPopover');
  if (!grid || !btn || !popover) return;

  function togglePopover(show) {
    const next = typeof show === 'boolean' ? show : popover.style.display === 'none';
    popover.style.display = next ? 'block' : 'none';
  }

  btn.addEventListener('click', (event) => {
    event.stopPropagation();
    togglePopover();
  });

  document.addEventListener('click', (event) => {
    if (popover.style.display === 'block' && !popover.contains(event.target) && event.target !== btn) {
      togglePopover(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') togglePopover(false);
  });

  const checks = Array.from(popover.querySelectorAll('input[type="checkbox"]'));
  function applyFilters() {
    const active = new Set(checks.filter((check) => check.checked).map((check) => check.value));
    grid.querySelectorAll('.feature-card').forEach((card) => {
      const tags = (card.getAttribute('data-tags') || '').split(',').map((tag) => tag.trim()).filter(Boolean);
      card.style.display = tags.some((tag) => active.has(tag)) ? '' : 'none';
    });
  }

  checks.forEach((check) => check.addEventListener('change', applyFilters));
  applyFilters();
}

const routes = {
  '/': { partial: 'Partials/Home.html', active: '/' },
  '/features': { partial: 'Partials/Features.html', active: '/features', init: [initFeaturesInteractions, initFeaturesFilters] },
  '/docs': { partial: 'Partials/Docs.html', active: '/docs' },
  '/support': { partial: 'Partials/Support.html', active: '/support' },
};

async function renderRoute() {
  const route = (location.hash || '#/').replace('#', '');
  const config = routes[route] || routes['/'];
  await loadPartial('#content', config.partial);
  setActive(config.active);
  closeMobileNav();
  config.init?.forEach((init) => init());
  document.getElementById('content')?.focus({ preventScroll: true });
}

(async function boot() {
  await loadPartial('#siteHeader', 'Partials/Navbar.html');
  initMobileNav();
  window.addEventListener('hashchange', renderRoute);
  await renderRoute();
})();
