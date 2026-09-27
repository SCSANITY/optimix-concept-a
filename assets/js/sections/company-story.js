import content from '../../../data/content.json';

export function initCompanyStory() {
  const root = document.querySelector('[data-company-story]');
  if (!root) return;
  const section = content.companyStory;
  root.querySelector('[data-company-story-eyebrow]').textContent = section.eyebrow;
  root.querySelector('[data-company-story-title]').textContent = section.title;
  root.querySelector('[data-company-story-description]').textContent = section.description;
  root.querySelector('[data-company-story-source]').textContent = section.sourceNote;
  const chapters = root.querySelector('[data-company-story-chapters]');
  section.chapters.forEach((chapter, index) => {
    const article = document.createElement('article');
    article.className = `company-story-card grid overflow-hidden border border-white/14 lg:grid-cols-12 ${index % 2 ? 'company-story-card--reverse' : ''}`;
    article.dataset.reveal = '';
    article.innerHTML = `
      <div class="company-story-card__media relative min-h-[320px] lg:col-span-7 lg:min-h-[520px]">
        <img class="absolute inset-0 h-full w-full object-cover" src="${chapter.imageUrl}" alt="${chapter.imageAlt}" loading="lazy">
        <span class="absolute inset-0 bg-gradient-to-t from-deep-blue/55 via-transparent to-transparent"></span>
        <span class="absolute left-5 top-5 bg-white/10 px-3 py-2 font-heading text-xs font-bold tracking-[0.15em] text-white backdrop-blur-md">${chapter.index}</span>
      </div>
      <div class="company-story-card__copy flex flex-col justify-between bg-white/[0.055] p-6 sm:p-9 lg:col-span-5 lg:p-10">
        <div><p class="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300">${chapter.label}</p><h3 class="mt-5 font-heading text-3xl font-bold leading-[1.08] tracking-[-0.03em] sm:text-4xl">${chapter.title}</h3><p class="mt-6 text-base leading-[1.75] text-white/68">${chapter.description}</p></div>
        <ul class="mt-10 divide-y divide-white/14 border-y border-white/14">${chapter.facts.map((fact) => `<li class="flex items-center gap-3 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white/65"><span class="h-1.5 w-1.5 bg-brand-red"></span>${fact}</li>`).join('')}</ul>
      </div>`;
    chapters.append(article);
  });
}
