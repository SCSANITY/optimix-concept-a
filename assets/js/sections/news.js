import content from '../../../data/content.json';

function formatDate(value) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
}

export function initNews() {
  const root = document.querySelector('[data-news]');
  if (!root) return;

  const section = content.newsSection;
  root.querySelector('[data-news-eyebrow]').textContent = section.eyebrow;
  root.querySelector('[data-news-title]').textContent = section.title;
  root.querySelector('[data-news-description]').textContent = section.description;

  const archiveLink = root.querySelector('[data-news-archive-link]');
  archiveLink.href = section.ctaUrl;
  root.querySelector('[data-news-archive-label]').textContent = section.ctaLabel;

  const list = root.querySelector('[data-news-list]');
  content.news.forEach((article) => {
    const link = document.createElement('a');
    link.href = article.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'group grid gap-4 border-b border-ink/20 py-7 transition-colors duration-300 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-blue sm:py-8 lg:grid-cols-12 lg:items-center lg:gap-6';

    const date = document.createElement('time');
    date.dateTime = article.date;
    date.className = 'text-xs font-semibold uppercase tracking-[0.12em] text-ink/45 lg:col-span-2';
    date.textContent = formatDate(article.date);

    const title = document.createElement('h3');
    title.className = 'max-w-[780px] font-heading text-xl font-semibold leading-[1.35] tracking-[-0.015em] text-ink transition-colors group-hover:text-brand-blue sm:text-2xl lg:col-span-8';
    title.textContent = article.title;

    const meta = document.createElement('span');
    meta.className = 'flex items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/40 lg:col-span-2';
    meta.innerHTML = '<span>News &amp; Events</span><span class="text-lg text-brand-blue transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">↗</span>';

    link.append(date, title, meta);
    list.append(link);
  });
}
