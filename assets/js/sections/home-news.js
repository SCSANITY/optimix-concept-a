import content from '../../../data/content.json';

function formatDate(value) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
}

function createStory(article, isFeature = false) {
  const link = document.createElement('a');
  link.href = article.url;
  link.className = isFeature ? 'home-news-card home-news-card--feature group' : 'home-news-card group';
  link.setAttribute('aria-label', `Read on the Optimix website: ${article.title}`);

  const image = document.createElement('img');
  image.className = 'home-news-card__image';
  image.src = article.imageUrl;
  image.alt = article.imageAlt;
  image.loading = 'lazy';
  image.decoding = 'async';

  const grade = document.createElement('span');
  grade.className = 'home-news-card__grade';
  grade.setAttribute('aria-hidden', 'true');

  const meta = document.createElement('span');
  meta.className = 'home-news-card__meta';

  const category = document.createElement('span');
  category.textContent = article.category;

  const date = document.createElement('time');
  date.dateTime = article.date;
  date.textContent = formatDate(article.date);
  meta.append(category, date);

  const body = document.createElement('span');
  body.className = 'home-news-card__body';

  const title = document.createElement('span');
  title.className = 'home-news-card__headline font-heading';
  title.textContent = article.title;

  const excerpt = document.createElement('span');
  excerpt.className = 'home-news-card__excerpt';
  excerpt.textContent = article.excerpt;

  const action = document.createElement('span');
  action.className = 'home-news-card__action';
  action.innerHTML = '<span>Read story</span><span aria-hidden="true">↗</span>';

  body.append(title, excerpt, action);
  link.append(image, grade, meta, body);
  return link;
}

export function initHomeNews() {
  const root = document.querySelector('[data-home-news]');
  if (!root) return;

  const section = content.newsSection;
  root.querySelector('[data-home-news-eyebrow]').textContent = section.eyebrow;
  root.querySelector('[data-home-news-title]').textContent = section.title;
  root.querySelector('[data-home-news-description]').textContent = section.description;

  const archiveLink = root.querySelector('[data-home-news-archive]');
  archiveLink.href = section.ctaUrl;
  root.querySelector('[data-home-news-archive-label]').textContent = section.ctaLabel;

  const list = root.querySelector('[data-home-news-list]');
  content.news.slice(0, 3).forEach((article, index) => {
    list.append(createStory(article, index === 0));
  });
}
