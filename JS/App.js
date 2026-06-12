const HELP_DATA = window.ORDO_HELP_DATA || { categories: [] };

const FEATURE_FILTERS = [
  { value: 'setup', label: 'Setup' },
  { value: 'staff', label: 'Staff' },
  { value: 'messaging', label: 'Messaging' },
  { value: 'moderation', label: 'Moderation' },
  { value: 'community', label: 'Community' },
  { value: 'utility', label: 'Utility' },
];

const CATEGORY_PRESENTATION = {
  'getting-started': { meta: 'Setup', tags: ['setup', 'utility'], featured: true, railLabel: 'Start' },
  utilities: { meta: 'Utility', tags: ['utility', 'setup'], railLabel: 'Utilities' },
  settings: { meta: 'Setup', tags: ['setup', 'staff'] },
  notifications: { meta: 'Automation', tags: ['staff', 'community'], railLabel: 'Notices' },
  'messaging-embeds': { meta: 'Messaging', tags: ['messaging', 'staff'], railLabel: 'Messages' },
  components: { meta: 'Messaging', tags: ['messaging', 'staff'] },
  docs: { meta: 'Knowledge', tags: ['messaging', 'staff', 'utility'], featured: true },
  moderation: { meta: 'Moderation', tags: ['moderation', 'staff'], highlighted: true },
  records: { meta: 'Moderation', tags: ['moderation', 'staff'] },
  giveaways: { meta: 'Community', tags: ['community', 'staff'] },
  sticky: { meta: 'Messaging', tags: ['messaging', 'staff'], railLabel: 'Sticky' },
  profiles: { meta: 'Profiles', tags: ['community', 'utility'] },
  games: { meta: 'Community', tags: ['community', 'utility'] },
  voice: { meta: 'Voice', tags: ['utility', 'community'] },
  suggestions: { meta: 'Community', tags: ['community', 'staff'] },
};

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

function publicHelpCategories() {
  return Array.isArray(HELP_DATA.categories) ? HELP_DATA.categories : [];
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatInlineText(value) {
  return escapeHtml(value).replace(/`([^`]+)`/g, '<code>$1</code>');
}

function normalize(value) {
  return String(value || '').toLowerCase().trim();
}

function commandUsage(command) {
  return command.usage || `/${command.path}`;
}

function categoryPresentation(category) {
  return CATEGORY_PRESENTATION[category.key] || {
    meta: category.label,
    tags: ['utility'],
    railLabel: category.label,
  };
}

function categoryAnchor(category) {
  return `commands-${category.key}`;
}

function renderFeatureFilters() {
  const popover = document.querySelector('[data-feature-filters]');
  if (!popover) return;

  popover.innerHTML = FEATURE_FILTERS.map((filter) => `
    <label><input type="checkbox" value="${escapeHtml(filter.value)}" checked> ${escapeHtml(filter.label)}</label>
  `).join('');
}

function renderFeatureCards() {
  const grid = document.querySelector('[data-features-grid]');
  if (!grid) return;

  grid.innerHTML = publicHelpCategories().map((category) => {
    const presentation = categoryPresentation(category);
    const classes = ['feature-card'];
    if (presentation.featured) classes.push('feature-card--primary');
    if (presentation.highlighted) classes.push('feature-card--support');

    const notes = category.featureNotes.length
      ? category.featureNotes
      : category.commands.slice(0, 3).map((command) => `${commandUsage(command)}: ${command.summary}`);

    const commandPreview = category.commands.slice(0, 3).map((command) => `
      <li><strong>${escapeHtml(commandUsage(command))}:</strong> ${formatInlineText(command.summary)}</li>
    `).join('');

    return `
      <article class="${classes.join(' ')}" data-tags="${escapeHtml(presentation.tags.join(','))}">
        <div class="card-actions">
          <button class="icon-btn" type="button" data-modal aria-label="More details" title="More">+</button>
        </div>
        <div class="feature-meta">${escapeHtml(presentation.meta)}</div>
        <h4>${escapeHtml(category.label)}</h4>
        <p class="muted">${formatInlineText(category.overview)}</p>
        <template data-modal-content>
          <ul class="stack">
            ${notes.slice(0, 3).map((note) => `<li>${formatInlineText(note)}</li>`).join('')}
            ${commandPreview}
          </ul>
        </template>
      </article>
    `;
  }).join('');
}

function initFeaturesInteractions() {
  renderFeatureFilters();
  renderFeatureCards();

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

function renderDocsReference() {
  const rail = document.querySelector('[data-docs-rail]');
  const select = document.getElementById('docsCategoryFilter');
  const reference = document.querySelector('[data-docs-reference]');
  if (!rail || !select || !reference) return;

  const categories = publicHelpCategories();

  rail.innerHTML = [
    '<button type="button" class="active" data-doc-target="setup">Setup</button>',
    ...categories.map((category) => {
      const presentation = categoryPresentation(category);
      return `<button type="button" data-doc-target="${escapeHtml(categoryAnchor(category))}">${escapeHtml(presentation.railLabel || category.label)}</button>`;
    }),
  ].join('');

  select.innerHTML = [
    '<option value="all">All public categories</option>',
    ...categories.map((category) => `<option value="${escapeHtml(category.key)}">${escapeHtml(category.label)}</option>`),
  ].join('');

  reference.innerHTML = categories.map((category) => `
    <section class="docs-command-section" id="${escapeHtml(categoryAnchor(category))}" data-doc-section="${escapeHtml(category.key)}">
      <div class="docs-section-heading">
        <span class="card-kicker">${escapeHtml(category.label)}</span>
        <h4>${escapeHtml(category.label)}</h4>
        <p>${formatInlineText(category.overview)}</p>
      </div>
      ${category.commands.map((command) => `
        <div class="command-card" data-doc-command="${escapeHtml([category.label, command.path, command.summary, command.details, command.usage, ...command.notes].join(' '))}">
          <code>${escapeHtml(commandUsage(command))}</code>
          <strong>${formatInlineText(command.summary)}</strong>
          <p>${formatInlineText(command.details)}</p>
          ${command.notes.length ? `<ul class="command-notes">${command.notes.map((note) => `<li>${formatInlineText(note)}</li>`).join('')}</ul>` : ''}
        </div>
      `).join('')}
    </section>
  `).join('');
}

function initDocsReference() {
  renderDocsReference();

  const search = document.getElementById('docsSearch');
  const category = document.getElementById('docsCategoryFilter');
  const sections = Array.from(document.querySelectorAll('.docs-command-section'));
  const trackedSections = [document.getElementById('setup'), ...sections].filter(Boolean);
  const empty = document.getElementById('docsEmptyState');
  const rail = document.querySelector('.docs-rail');
  if (!sections.length) return;

  function setActiveDocTarget(targetId, scrollRail = true) {
    if (!targetId || !rail) return;
    const activeButton = Array.from(rail.querySelectorAll('[data-doc-target]'))
      .find((item) => item.dataset.docTarget === targetId);
    if (!activeButton) return;

    rail.querySelectorAll('[data-doc-target]').forEach((item) => {
      item.classList.toggle('active', item === activeButton);
    });

    if (scrollRail && rail.scrollWidth > rail.clientWidth) {
      const left = activeButton.offsetLeft - ((rail.clientWidth - activeButton.offsetWidth) / 2);
      rail.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
    }
  }

  function visibleTrackedSection() {
    const headerOffset = 120;
    return trackedSections
      .filter((section) => !section.hidden)
      .map((section) => ({
        id: section.id,
        distance: Math.abs(section.getBoundingClientRect().top - headerOffset),
      }))
      .sort((a, b) => a.distance - b.distance)[0]?.id;
  }

  function applyDocsFilters() {
    const query = normalize(search?.value);
    const selected = category?.value || 'all';
    let visibleCards = 0;

    sections.forEach((section) => {
      const inCategory = selected === 'all' || section.dataset.docSection === selected;
      let sectionVisibleCards = 0;

      section.querySelectorAll('.command-card').forEach((card) => {
        const haystack = normalize(`${card.textContent} ${card.dataset.docCommand || ''}`);
        const matches = inCategory && (!query || haystack.includes(query));
        card.hidden = !matches;
        if (matches) sectionVisibleCards += 1;
      });

      section.hidden = sectionVisibleCards === 0;
      visibleCards += sectionVisibleCards;
    });

    if (empty) empty.hidden = visibleCards > 0;
    setActiveDocTarget(visibleTrackedSection() || 'setup', false);
  }

  search?.addEventListener('input', applyDocsFilters);
  category?.addEventListener('change', applyDocsFilters);

  rail?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-doc-target]');
    if (!button) return;

    setActiveDocTarget(button.dataset.docTarget);
    const target = document.getElementById(button.dataset.docTarget);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting && !entry.target.hidden)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target?.id) {
        setActiveDocTarget(visible.target.id);
      }
    }, {
      rootMargin: '-24% 0px -58% 0px',
      threshold: [0.08, 0.18, 0.32, 0.48],
    });

    trackedSections.forEach((section) => observer.observe(section));
  } else {
    document.addEventListener('scroll', () => {
      setActiveDocTarget(visibleTrackedSection(), false);
    }, { passive: true });
  }

  applyDocsFilters();
}

const routes = {
  '/': { partial: 'Partials/Home.html', active: '/' },
  '/features': { partial: 'Partials/Features.html', active: '/features', init: [initFeaturesInteractions, initFeaturesFilters] },
  '/docs': { partial: 'Partials/Docs.html', active: '/docs', init: [initDocsReference] },
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
  await loadPartial('#siteFooter', 'Partials/Footer.html');
  initMobileNav();
  window.addEventListener('hashchange', renderRoute);
  await renderRoute();
})();
