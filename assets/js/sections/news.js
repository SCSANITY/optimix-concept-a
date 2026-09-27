import content from '../../../data/content.json';

function formatDate(value) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
}

function createArticleCard(article, index) {
  const link = document.createElement('a');
  link.href = article.url;
  link.className = 'news-archive-card group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-4';
  link.dataset.category = article.category;
  link.innerHTML = `
    <div class="news-archive-card__media relative aspect-[4/3] overflow-hidden bg-mist">
      <img class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" src="${article.imageUrl}" alt="${article.imageAlt}" loading="${index === 0 ? 'eager' : 'lazy'}">
      <span class="absolute left-4 top-4 bg-deep-blue/86 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md">${article.category}</span>
      <span class="news-archive-card__index absolute bottom-3 right-4 font-heading text-5xl font-bold text-white/65" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
    </div>
    <div class="border-x border-b border-ink/14 px-5 pb-6 pt-5 sm:px-6">
      <time class="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/45" datetime="${article.date}">${formatDate(article.date)}</time>
      <h3 class="mt-4 font-heading text-xl font-bold leading-[1.28] tracking-[-0.02em] text-ink transition-colors group-hover:text-brand-blue sm:text-2xl">${article.title}</h3>
      <p class="mt-4 text-sm leading-[1.7] text-ink/62">${article.excerpt}</p>
      <span class="mt-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-brand-blue">Read story <span aria-hidden="true">→</span></span>
    </div>`;
  return link;
}

export function initNews() {
  const root = document.querySelector('[data-news]');
  if (!root) return;
  const section = content.newsSection;
  const list = root.querySelector('[data-news-list]');
  const filterRoot = root.querySelector('[data-news-filters]');
  const count = root.querySelector('[data-news-count]');
  const categories = ['All', ...new Set(content.news.map((article) => article.category))];
  root.querySelector('[data-news-eyebrow]').textContent = section.eyebrow;
  root.querySelector('[data-news-title]').textContent = section.title;
  root.querySelector('[data-news-description]').textContent = section.description;

  const cards = content.news.map((article, index) => {
    const card = createArticleCard(article, index);
    list.append(card);
    return card;
  });

  const setFilter = (category) => {
    let visibleCount = 0;
    cards.forEach((card) => {
      const visible = category === 'All' || card.dataset.category === category;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    count.textContent = visibleCount;
    filterRoot.querySelectorAll('button').forEach((button) => {
      const active = button.dataset.category === category;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  };

  categories.forEach((category) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.category = category;
    button.className = 'news-filter';
    button.textContent = category;
    button.addEventListener('click', () => setFilter(category));
    filterRoot.append(button);
  });
  setFilter('All');
}
