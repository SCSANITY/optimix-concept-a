import content from '../../../data/content.json';

export function initSystems() {
  const root = document.querySelector('[data-systems]');
  if (!root) return;
  const settings = content.systemsSection;
  root.querySelector('[data-systems-eyebrow]').textContent = settings.eyebrow;
  root.querySelector('[data-systems-title]').textContent = settings.title;
  root.querySelector('[data-systems-description]').textContent = settings.description;
  root.querySelector('[data-systems-disclaimer]').textContent = settings.disclaimer;

  const list = root.querySelector('[data-system-list]');
  content.systems.forEach((system) => {
    const link = document.createElement('a');
    link.href = `./system-detail.html?system=${system.slug}`;
    link.className = 'system-card group relative isolate min-h-[440px] overflow-hidden bg-deep-blue text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-4';
    link.innerHTML = `
      <img class="system-card__image absolute inset-0 h-full w-full object-cover" src="${system.imageUrl}" alt="${system.imageAlt}" loading="lazy">
      <span class="system-card__grade absolute inset-0" aria-hidden="true"></span>
      <span class="system-card__grid absolute inset-0" aria-hidden="true"></span>
      <span class="relative z-10 flex min-h-[440px] flex-col justify-between p-6 sm:p-7">
        <span class="flex items-start justify-between gap-4">
          <span class="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/58">Application system</span>
          <span class="font-heading text-sm font-bold tracking-[0.14em] text-white/72">${system.index}</span>
        </span>
        <span>
          <strong class="block max-w-[420px] font-heading text-[1.7rem] font-bold leading-[1.08] tracking-[-0.025em] sm:text-3xl">${system.name}</strong>
          <span class="mt-4 block max-w-[410px] text-sm leading-[1.65] text-white/68">${system.summary}</span>
          <span class="mt-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-300">${settings.detailLabel} <span aria-hidden="true">→</span></span>
        </span>
      </span>`;
    list.append(link);
  });
}
