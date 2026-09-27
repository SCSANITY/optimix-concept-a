import content from '../../../data/content.json';

function formatDate(value) {
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`));
}

export function initNewsDetail() {
  const root = document.querySelector('[data-news-detail]');
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('article');
  const article = content.news.find((item) => item.slug === requested) || content.news[0];
  if (requested !== article.slug) {
    const url = new URL(window.location.href);
    url.searchParams.set('article', article.slug);
    window.history.replaceState({}, '', url);
  }
  document.title = `${article.title} — Optimix`;
  root.querySelector('[data-news-detail-category]').textContent = article.category;
  const date = root.querySelector('[data-news-detail-date]');
  date.dateTime = article.date;
  date.textContent = formatDate(article.date);
  root.querySelector('[data-news-detail-title]').textContent = article.title;
  root.querySelector('[data-news-detail-lede]').textContent = article.lede;
  const image = root.querySelector('[data-news-detail-image]');
  image.src = article.imageUrl;
  image.alt = article.imageAlt;

  const body = root.querySelector('[data-news-detail-body]');
  article.body.forEach((paragraph) => {
    const element = document.createElement('p');
    element.textContent = paragraph;
    body.append(element);
  });
  const highlights = root.querySelector('[data-news-detail-highlights]');
  article.highlights.forEach((highlight, index) => {
    const item = document.createElement('li');
    item.className = 'flex gap-4 py-4 text-sm leading-[1.55] text-ink/72';
    const number = document.createElement('span');
    number.className = 'font-heading text-xs font-bold text-brand-red';
    number.textContent = String(index + 1).padStart(2, '0');
    const copy = document.createElement('span');
    copy.textContent = highlight;
    item.append(number, copy);
    highlights.append(item);
  });
  root.querySelector('[data-news-detail-source]').href = article.sourceUrl;

  const related = root.querySelector('[data-news-related]');
  content.news.filter((item) => item.slug !== article.slug).slice(0, 2).forEach((item) => {
    const link = document.createElement('a');
    link.href = item.url;
    link.className = 'group grid min-h-64 overflow-hidden bg-deep-blue text-white sm:grid-cols-2';
    link.innerHTML = `<img class="h-full min-h-52 w-full object-cover opacity-80 transition duration-500 group-hover:opacity-100" src="${item.imageUrl}" alt="${item.imageAlt}" loading="lazy"><span class="flex flex-col justify-between p-6"><span class="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">${item.category} · ${formatDate(item.date)}</span><strong class="mt-8 font-heading text-xl leading-[1.3]">${item.title}</strong><span class="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-sky-300">Read story →</span></span>`;
    related.append(link);
  });
}
