import content from '../../../data/content.json';

export function initInternalPage() {
  const root = document.querySelector('[data-internal-hero]');
  if (!root) return;

  const page = document.body.dataset.page;
  const settings = content.internalPages?.[page];
  if (!settings) return;

  root.dataset.internalPage = page;
  root.querySelector('[data-internal-hero-eyebrow]').textContent = settings.eyebrow;
  root.querySelector('[data-internal-hero-title]').textContent = settings.title;
  root.querySelector('[data-internal-hero-description]').textContent = settings.description;
  root.querySelector('[data-internal-hero-proof]').textContent = settings.proof;

  const image = root.querySelector('[data-internal-hero-image]');
  image.src = settings.imageUrl;
  image.alt = settings.imageAlt;
}
