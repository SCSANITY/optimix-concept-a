import content from '../../../data/content.json';

function createNavigationLink(item, mobile = false) {
  const link = document.createElement('a');
  link.href = item.href;
  link.textContent = item.label;
  link.dataset.headerNavLink = '';
  link.className = mobile
    ? 'border-b border-ink/10 py-4 text-base font-semibold text-ink transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:text-brand-blue'
    : 'py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-4';

  return link;
}

function populateNavigation(container, mobile = false) {
  if (!container) return;

  content.header.navigation.forEach((item) => {
    container.append(createNavigationLink(item, mobile));
  });
}

function populateContactLink(link) {
  if (!link) return;

  const email = content.contact.methods.find((method) => method.type === 'email');
  link.href = email.href;
  link.textContent = content.header.contactCta.label;
}

export function initHeader() {
  const header = document.querySelector('[data-site-header]');
  if (!header) return;

  const menuButton = header.querySelector('[data-menu-toggle]');
  const mobileMenu = header.querySelector('[data-mobile-menu]');
  const openIcon = header.querySelector('[data-menu-icon-open]');
  const closeIcon = header.querySelector('[data-menu-icon-close]');

  populateNavigation(header.querySelector('[data-desktop-navigation]'));
  populateNavigation(header.querySelector('[data-mobile-navigation]'), true);
  populateContactLink(header.querySelector('[data-contact-link]'));
  populateContactLink(header.querySelector('[data-mobile-contact-link]'));

  const hero = document.querySelector('[data-hero]');
  let headerThemeFrame = null;

  const updateHeaderTheme = () => {
    headerThemeFrame = null;
    const isOverHero = hero && hero.getBoundingClientRect().bottom > header.offsetHeight + 24;
    header.classList.toggle('is-over-hero', Boolean(isOverHero));
  };

  const requestHeaderThemeUpdate = () => {
    if (headerThemeFrame) return;
    headerThemeFrame = window.requestAnimationFrame(updateHeaderTheme);
  };

  updateHeaderTheme();
  window.addEventListener('scroll', requestHeaderThemeUpdate, { passive: true });
  window.addEventListener('resize', requestHeaderThemeUpdate);

  if (!menuButton || !mobileMenu) return;

  const setMenuState = (isOpen) => {
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    header.classList.toggle('is-menu-open', isOpen);
    mobileMenu.classList.toggle('hidden', !isOpen);
    openIcon?.classList.toggle('hidden', isOpen);
    closeIcon?.classList.toggle('hidden', !isOpen);
  };

  menuButton.addEventListener('click', () => {
    setMenuState(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  mobileMenu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuState(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuState(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) setMenuState(false);
  });
}
