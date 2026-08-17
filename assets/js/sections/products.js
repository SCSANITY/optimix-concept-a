import content from '../../../data/content.json';

function formatIndex(index) {
  return String(index + 1).padStart(2, '0');
}

function createHighlightList(items) {
  const list = document.createElement('ul');
  list.className = 'mt-6 grid gap-3 text-sm leading-[1.5] text-ink/70 sm:grid-cols-2';

  items.forEach((text) => {
    const item = document.createElement('li');
    item.className = 'flex gap-3';

    const marker = document.createElement('span');
    marker.className = 'mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red';
    marker.setAttribute('aria-hidden', 'true');

    const label = document.createElement('span');
    label.textContent = text;
    item.append(marker, label);
    list.append(item);
  });

  return list;
}

function createFeaturedProduct(product, index, dataSheetLabel) {
  const article = document.createElement('article');
  article.className = 'featured-product grid gap-8 border-t border-ink/20 py-11 first:border-t-0 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-16';
  article.dataset.featuredProduct = formatIndex(index);
  article.dataset.reveal = '';

  const identity = document.createElement('div');
  identity.className = 'featured-product__identity lg:col-span-2 lg:self-start lg:pt-3';

  const number = document.createElement('p');
  number.className = 'font-heading text-xs font-bold tracking-[0.12em] text-brand-red';
  number.textContent = formatIndex(index);

  const code = document.createElement('p');
  code.className = 'mt-3 font-heading text-3xl font-bold tracking-[-0.025em] text-brand-blue lg:text-[2.5rem]';
  code.textContent = product.code;
  identity.append(number, code);

  const visual = document.createElement('div');
  visual.className = 'product-visual-frame lg:col-span-4';

  const figure = document.createElement('figure');
  figure.className = 'product-visual relative overflow-hidden bg-mist';

  const image = document.createElement('img');
  image.className = 'aspect-[4/3] h-full w-full object-cover';
  image.src = product.imageUrl;
  image.alt = product.imageAlt;
  image.loading = 'lazy';
  image.decoding = 'async';
  figure.append(image);
  visual.append(figure);

  const body = document.createElement('div');
  body.className = 'lg:col-span-6 lg:pl-6';

  const standard = document.createElement('p');
  standard.className = 'text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-blue';
  standard.textContent = product.standard;

  const title = document.createElement('h4');
  title.className = 'mt-3 max-w-[620px] font-heading text-2xl font-bold leading-[1.2] tracking-[-0.02em] text-ink sm:text-3xl';
  title.textContent = product.name;

  const description = document.createElement('p');
  description.className = 'mt-4 max-w-[640px] text-base leading-[1.7] text-ink/70';
  description.textContent = product.description;

  const link = document.createElement('a');
  link.href = product.dataSheetUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'product-data-link mt-7 inline-flex min-h-11 items-center gap-3 pb-1 text-sm font-semibold text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-4';

  const linkLabel = document.createElement('span');
  linkLabel.textContent = dataSheetLabel;

  const linkArrow = document.createElement('span');
  linkArrow.setAttribute('aria-hidden', 'true');
  linkArrow.textContent = '↗';
  link.append(linkLabel, linkArrow);

  body.append(standard, title, description, createHighlightList(product.highlights), link);
  article.append(identity, visual, body);
  return article;
}

function initFeaturedProgress(root, articles) {
  const current = root.querySelector('[data-featured-progress-current]');
  const total = root.querySelector('[data-featured-progress-total]');
  const fill = root.querySelector('[data-featured-progress-fill]');
  if (!current || !total || !fill || !articles.length) return;

  total.textContent = formatIndex(articles.length - 1);

  const setActive = (index) => {
    current.textContent = formatIndex(index);
    fill.style.setProperty('--featured-progress', (index + 1) / articles.length);
    articles.forEach((article, articleIndex) => {
      article.classList.toggle('is-current', articleIndex === index);
    });
  };

  setActive(0);
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
    if (!visible) return;
    setActive(articles.indexOf(visible.target));
  }, {
    rootMargin: '-28% 0px -42% 0px',
    threshold: [0, 0.25, 0.5, 0.75],
  });

  articles.forEach((article) => observer.observe(article));
}

export function initProducts() {
  const root = document.querySelector('[data-products]');
  if (!root) return;

  const settings = content.productsSection;
  const list = root.querySelector('[data-product-list]');

  root.querySelector('[data-products-eyebrow]').textContent = settings.eyebrow;
  root.querySelector('[data-products-title]').textContent = settings.title;
  root.querySelector('[data-products-description]').textContent = settings.description;
  root.querySelector('[data-product-index-label]').textContent = settings.itemLabel;
  root.querySelector('[data-product-index-count]').textContent = `01 — ${formatIndex(content.productCategories.length - 1)}`;
  root.querySelector('[data-featured-products-eyebrow]').textContent = settings.featuredEyebrow;
  root.querySelector('[data-featured-products-title]').textContent = settings.featuredTitle;
  root.querySelector('[data-featured-products-description]').textContent = settings.featuredDescription;

  content.productCategories.forEach((category, index) => {
    const item = document.createElement('article');
    item.className = 'product-index-item';
    item.setAttribute('role', 'listitem');

    const topRow = document.createElement('div');
    topRow.className = 'relative z-10 flex items-center justify-between';

    const number = document.createElement('span');
    number.className = 'product-index-item__number font-heading';
    number.textContent = formatIndex(index);

    const label = document.createElement('span');
    label.className = 'product-index-item__label';
    label.textContent = settings.itemLabel;

    const name = document.createElement('h3');
    name.className = 'product-index-item__name relative z-10 font-heading';
    name.textContent = category.name;

    topRow.append(number, label);
    item.append(topRow, name);
    list.append(item);
  });

  const featuredList = root.querySelector('[data-featured-product-list]');
  const articles = content.featuredProducts.map((product, index) => {
    const article = createFeaturedProduct(product, index, settings.dataSheetLabel);
    featuredList.append(article);
    return article;
  });

  initFeaturedProgress(root, articles);
}
