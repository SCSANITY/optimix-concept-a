import content from '../../../data/content.json';

function appendAddress(root, lines) {
  lines.forEach((line, index) => {
    if (index > 0) root.append(document.createElement('br'));
    root.append(document.createTextNode(line));
  });
}

function appendContactItems(root, items) {
  items.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'grid grid-cols-[7rem_1fr] gap-3 text-sm';

    const label = document.createElement('dt');
    label.className = 'text-white/55';
    label.textContent = item.label;

    const value = document.createElement('dd');
    const link = document.createElement('a');
    link.href = item.href;
    link.className = 'text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white';
    link.textContent = item.value;

    value.append(link);
    row.append(label, value);
    root.append(row);
  });
}

function appendNavigation(root, items) {
  items.forEach((item) => {
    const link = document.createElement('a');
    link.href = item.href;
    link.className = 'w-fit text-sm text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white';
    link.textContent = item.label;
    root.append(link);
  });
}

export function initFooter() {
  const root = document.querySelector('[data-footer]');
  if (!root) return;

  const footer = content.footer;
  root.querySelector('[data-footer-eyebrow]').textContent = footer.eyebrow;
  root.querySelector('[data-footer-title]').textContent = footer.title;
  root.querySelector('[data-footer-description]').textContent = footer.description;
  root.querySelector('[data-footer-office-label]').textContent = content.contact.officeLabel;
  root.querySelector('[data-footer-navigation-label]').textContent = footer.navigationLabel;
  root.querySelector('[data-footer-legal-name]').textContent = content.site.legalName;

  const cta = root.querySelector('[data-footer-cta]');
  cta.href = content.contact.methods.find((method) => method.type === 'email').href;
  root.querySelector('[data-footer-cta-label]').textContent = footer.ctaLabel;

  appendAddress(root.querySelector('[data-footer-address]'), content.contact.address);
  appendContactItems(root.querySelector('[data-footer-contact-list]'), content.contact.methods);
  appendNavigation(root.querySelector('[data-footer-navigation]'), footer.navigation);

  const locationsLink = root.querySelector('[data-footer-locations-link]');
  locationsLink.href = content.contact.locationsUrl;
  root.querySelector('[data-footer-locations-label]').textContent = footer.locationsLabel;

  root.querySelector('[data-footer-copyright]').textContent = `© ${new Date().getFullYear()} ${content.site.legalName}`;
}
