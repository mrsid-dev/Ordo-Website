function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderInline(value) {
  const escaped = escapeHtml(value);
  return escaped.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" rel="noopener">$1</a>');
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const html = [];
  let paragraph = [];
  let inList = false;
  let title = '';

  function flushParagraph() {
    if (!paragraph.length) return;
    const text = paragraph.join(' ');
    const className = /^(Effective date|Last updated):/.test(text) ? ' class="legal-date"' : '';
    html.push(`<p${className}>${renderInline(text)}</p>`);
    paragraph = [];
  }

  function closeList() {
    if (!inList) return;
    html.push('</ul>');
    inList = false;
  }

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      closeList();
      return;
    }

    if (trimmed.startsWith('# ')) {
      flushParagraph();
      closeList();
      title = trimmed.slice(2).trim();
      html.push(`<h1>${renderInline(title)}</h1>`);
      return;
    }

    if (trimmed.startsWith('## ')) {
      flushParagraph();
      closeList();
      html.push(`<h2>${renderInline(trimmed.slice(3).trim())}</h2>`);
      return;
    }

    if (trimmed.startsWith('- ')) {
      flushParagraph();
      if (!inList) {
        html.push('<ul>');
        inList = true;
      }
      html.push(`<li>${renderInline(trimmed.slice(2).trim())}</li>`);
      return;
    }

    paragraph.push(trimmed);
  });

  flushParagraph();
  closeList();

  return { title, html: html.join('\n') };
}

async function loadPartial(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Unable to load ${url}`);
  el.innerHTML = await response.text();
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

async function loadLegalPage() {
  const page = document.querySelector('[data-legal-source]');
  if (!page) return;

  await Promise.all([
    loadPartial('#siteHeader', '/Partials/Navbar.html'),
    loadPartial('#siteFooter', '/Partials/Footer.html'),
  ]);

  document.querySelector('.brand')?.setAttribute('href', '/');
  document.querySelectorAll('.nav-link[data-route]').forEach((link) => {
    link.setAttribute('href', link.dataset.route);
    link.classList.remove('active');
  });
  initMobileNav();

  const response = await fetch(page.dataset.legalSource, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Unable to load ${page.dataset.legalSource}`);

  const rendered = renderMarkdown(await response.text());
  page.innerHTML = rendered.html;

  if (rendered.title) {
    document.title = `${rendered.title} - Ordo`;
  }
}

loadLegalPage().catch((error) => {
  const page = document.querySelector('[data-legal-source]');
  if (page) {
    page.innerHTML = '<h1>Legal page unavailable</h1><p>Please try again later.</p>';
  }
  console.error(error);
});
