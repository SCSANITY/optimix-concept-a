import content from '../../../data/content.json';

function formatIndex(index) {
  return String(index + 1).padStart(2, '0');
}

export function initDownloads() {
  const root = document.querySelector('[data-downloads]');
  if (!root) return;

  const section = content.downloadsSection;
  root.querySelector('[data-downloads-eyebrow]').textContent = section.eyebrow;
  root.querySelector('[data-downloads-title]').textContent = section.title;
  root.querySelector('[data-downloads-description]').textContent = section.description;
  root.querySelector('[data-downloads-access-label]').textContent = section.accessLabel;
  root.querySelector('[data-downloads-portal-title]').textContent = section.portalTitle;
  root.querySelector('[data-downloads-portal-description]').textContent = section.portalDescription;

  const cta = root.querySelector('[data-downloads-cta]');
  cta.href = section.portalUrl;
  root.querySelector('[data-downloads-cta-label]').textContent = section.ctaLabel;

  const list = root.querySelector('[data-resource-types]');
  section.resourceTypes.forEach((resource, index) => {
    const item = document.createElement('li');
    item.className = 'grid grid-cols-[3rem_1fr] items-center border-b border-ink/15 py-5 sm:grid-cols-[4rem_1fr]';

    const number = document.createElement('span');
    number.className = 'font-heading text-xs font-bold tracking-[0.1em] text-brand-red';
    number.textContent = formatIndex(index);

    const label = document.createElement('span');
    label.className = 'font-heading text-lg font-semibold tracking-[-0.015em] text-ink sm:text-xl';
    label.textContent = resource;

    item.append(number, label);
    list.append(item);
  });
}
