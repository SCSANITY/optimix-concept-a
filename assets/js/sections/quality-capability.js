import content from '../../../data/content.json';

export function initQualityCapability() {
  const root = document.querySelector('[data-quality-capability]');
  if (!root) return;
  const section = content.qualityCapability;
  root.querySelector('[data-quality-eyebrow]').textContent = section.eyebrow;
  root.querySelector('[data-quality-title]').textContent = section.title;
  root.querySelector('[data-quality-description]').textContent = section.description;
  root.querySelector('[data-quality-archive-label]').textContent = section.archiveLabel;
  const image = root.querySelector('[data-quality-image]');
  image.src = section.imageUrl;
  image.alt = section.imageAlt;
  const steps = root.querySelector('[data-quality-steps]');
  section.steps.forEach((step) => {
    const article = document.createElement('article');
    article.className = 'quality-step px-0 py-8 md:px-7 lg:px-9 lg:py-10';
    article.innerHTML = `<p class="font-heading text-xs font-bold tracking-[0.14em] text-brand-red">${step.index}</p><h3 class="mt-6 font-heading text-2xl font-bold tracking-[-0.025em] text-ink">${step.title}</h3><p class="mt-4 text-sm leading-[1.7] text-ink/62">${step.description}</p>`;
    steps.append(article);
  });
}
