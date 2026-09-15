import content from '../../../data/content.json';

function formatIndex(index) {
  return String(index + 1).padStart(2, '0');
}

function getFamily(slug) {
  return content.productFamilies.find((family) => family.slug === slug);
}

function createBenefitList(benefits, limit = 3) {
  const list = document.createElement('ul');
  list.className = 'product-directory-card__benefits';

  benefits.slice(0, limit).forEach((benefit) => {
    const item = document.createElement('li');
    item.textContent = benefit;
    list.append(item);
  });

  return list;
}

function createCategoryCard(category, index, settings) {
  const isAvailable = category.status === 'available';
  const card = document.createElement(isAvailable ? 'a' : 'article');
  card.className = 'product-directory-card';
  card.id = `category-${category.slug}`;
  card.dataset.categoryStatus = category.status;
  card.dataset.reveal = '';

  if (isAvailable) {
    card.href = category.href;
    card.setAttribute('aria-label', `Explore ${category.name} product range`);
  }

  const media = document.createElement('div');
  media.className = 'product-directory-card__media';

  if (category.imageUrl) {
    media.dataset.hasImage = '';

    const image = document.createElement('img');
    image.src = category.imageUrl;
    image.alt = '';
    image.loading = 'lazy';
    image.decoding = 'async';
    media.append(image);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'product-directory-card__placeholder';
    placeholder.setAttribute('aria-hidden', 'true');

    const placeholderMark = document.createElement('span');
    placeholderMark.className = 'product-directory-card__placeholder-mark';

    const placeholderLabel = document.createElement('span');
    placeholderLabel.className = 'product-directory-card__placeholder-label';
    placeholderLabel.textContent = settings.imagePendingLabel;
    placeholder.append(placeholderMark, placeholderLabel);
    media.append(placeholder);
  }

  const meta = document.createElement('div');
  meta.className = 'product-directory-card__meta';

  const number = document.createElement('span');
  number.className = 'font-heading';
  number.textContent = `${formatIndex(index)} / ${formatIndex(content.productCategories.length - 1)}`;

  const status = document.createElement('span');
  status.className = 'product-directory-card__status';
  status.textContent = isAvailable ? settings.availableLabel : settings.pendingLabel;
  meta.append(number, status);
  media.append(meta);

  const body = document.createElement('div');
  body.className = 'product-directory-card__body';

  const title = document.createElement('h3');
  title.className = 'product-directory-card__title font-heading';
  title.textContent = category.name;

  const benefits = createBenefitList(category.benefits);
  const action = document.createElement('span');
  action.className = 'product-directory-card__action';

  const actionLabel = document.createElement('span');
  actionLabel.textContent = isAvailable ? `${settings.openCategoryLabel} · ${category.name}` : settings.pendingCategoryLabel;

  const actionIcon = document.createElement('span');
  actionIcon.setAttribute('aria-hidden', 'true');
  actionIcon.textContent = isAvailable ? '↗' : '—';
  action.append(actionLabel, actionIcon);

  body.append(title, benefits, action);
  card.append(media, body);
  return card;
}

function initProductLanding() {
  const root = document.querySelector('[data-products]');
  if (!root) return;

  const settings = content.productsSection;
  root.querySelector('[data-products-eyebrow]').textContent = settings.eyebrow;
  root.querySelector('[data-products-title]').textContent = settings.title;
  root.querySelector('[data-products-description]').textContent = settings.description;
  root.querySelector('[data-products-source]').textContent = settings.sourceLabel;

  const list = root.querySelector('[data-product-list]');
  content.productCategories.forEach((category, index) => {
    list.append(createCategoryCard(category, index, settings));
  });
}

function createFamilyFilter(label, slug, onSelect) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'category-family-filter';
  button.textContent = label;
  button.dataset.familyFilter = slug;
  button.addEventListener('click', () => onSelect(slug));
  return button;
}

function createCategoryProductCard(product, index, settings) {
  const family = getFamily(product.familySlug);
  const article = document.createElement('article');
  article.className = 'category-product-card';
  article.dataset.productFamily = product.familySlug;
  article.dataset.reveal = '';

  const figure = document.createElement('figure');
  figure.className = 'category-product-card__visual';

  const image = document.createElement('img');
  image.src = product.imageUrl;
  image.alt = product.imageAlt;
  image.loading = 'lazy';
  image.decoding = 'async';
  figure.dataset.imageMode = 'packshot';
  figure.append(image);

  const body = document.createElement('div');
  body.className = 'category-product-card__body';

  const top = document.createElement('div');
  top.className = 'flex items-center justify-between gap-4';

  const type = document.createElement('p');
  type.className = 'text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-blue';
  type.textContent = family?.name || 'Product';

  const number = document.createElement('span');
  number.className = 'font-heading text-[10px] font-bold tracking-[0.14em] text-ink/35';
  number.textContent = formatIndex(index);
  top.append(type, number);

  const code = document.createElement('p');
  code.className = 'mt-8 font-heading text-5xl font-extrabold leading-none tracking-[-0.055em] text-brand-blue';
  code.textContent = product.code;

  const standard = document.createElement('p');
  standard.className = 'mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/45';
  standard.textContent = product.standard;

  const title = document.createElement('h3');
  title.className = 'mt-5 font-heading text-2xl font-bold leading-[1.15] tracking-[-0.025em] text-ink';
  title.textContent = product.name;

  const description = document.createElement('p');
  description.className = 'mt-4 text-sm leading-[1.65] text-ink/65';
  description.textContent = product.description;

  const actions = document.createElement('div');
  actions.className = 'category-product-card__actions';

  const detail = document.createElement('a');
  detail.href = product.detailHref;
  detail.className = 'category-product-card__detail';
  detail.textContent = `${settings.detailLabel} →`;

  const sheet = document.createElement('a');
  sheet.href = product.dataSheetUrl;
  sheet.target = '_blank';
  sheet.rel = 'noopener noreferrer';
  sheet.className = 'category-product-card__sheet';
  sheet.textContent = `${settings.dataSheetLabel} ↗`;

  actions.append(detail, sheet);
  body.append(top, code, standard, title, description, actions);
  article.append(figure, body);
  return article;
}

function initProductCategoryPage() {
  const root = document.querySelector('[data-product-category-page]');
  if (!root) return;

  const requestedSlug = new URLSearchParams(window.location.search).get('category') || 'tiling';
  const category = content.productCategories.find((item) => item.slug === requestedSlug && item.status === 'available')
    || content.productCategories.find((item) => item.status === 'available');
  if (!category) return;

  const settings = content.productCategoryPage;
  const families = content.productFamilies.filter((family) => family.categorySlug === category.slug);
  const products = content.featuredProducts.filter((product) => product.categorySlug === category.slug);

  const categoryIndex = content.productCategories.findIndex((item) => item.slug === category.slug);
  const heroImage = root.querySelector('[data-category-hero-image]');

  document.title = `${category.name} Products — Optimix`;
  heroImage.src = category.imageUrl;
  heroImage.alt = category.imageAlt;
  root.querySelector('[data-category-back-label]').textContent = settings.backLabel;
  root.querySelector('[data-category-eyebrow]').textContent = `Product Category ${formatIndex(categoryIndex)} / ${String(content.productCategories.length).padStart(2, '0')}`;
  root.querySelector('[data-category-title]').textContent = category.name;
  root.querySelector('[data-category-description]').textContent = category.tagline;
  root.querySelector('[data-category-product-count-label]').textContent = settings.productCountLabel;
  root.querySelector('[data-category-product-count]').textContent = String(products.length).padStart(2, '0');
  root.querySelector('[data-category-family-count-label]').textContent = settings.familyCountLabel;
  root.querySelector('[data-category-family-count]').textContent = String(families.length).padStart(2, '0');
  root.querySelector('[data-category-source]').textContent = settings.sourceLabel;
  root.querySelector('[data-category-catalogue-eyebrow]').textContent = settings.catalogueEyebrow;
  root.querySelector('[data-category-catalogue-title]').textContent = settings.catalogueTitle;
  root.querySelector('[data-category-catalogue-description]').textContent = category.catalogueDescription;

  const productList = root.querySelector('[data-category-product-list]');
  const productCards = products.map((product, index) => {
    const card = createCategoryProductCard(product, index, settings);
    productList.append(card);
    return card;
  });

  const filterButtons = [];
  const selectFamily = (slug) => {
    filterButtons.forEach((button) => {
      const isActive = button.dataset.familyFilter === slug;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
    productCards.forEach((card) => {
      card.hidden = slug !== 'all' && card.dataset.productFamily !== slug;
    });
  };

  const familyNav = root.querySelector('[data-category-family-nav]');
  const allButton = createFamilyFilter(settings.allLabel, 'all', selectFamily);
  familyNav.append(allButton);
  filterButtons.push(allButton);

  families.forEach((family) => {
    const button = createFamilyFilter(family.name, family.slug, selectFamily);
    familyNav.append(button);
    filterButtons.push(button);
  });

  selectFamily('all');
}

function populateTextList(root, items) {
  items.forEach((text) => {
    const item = document.createElement('li');
    item.textContent = text;
    root.append(item);
  });
}

function createTechnicalMetric(metric) {
  const item = document.createElement('div');
  item.className = 'product-detail-metric';

  const label = document.createElement('dt');
  label.textContent = metric.label;

  const value = document.createElement('dd');
  value.textContent = metric.value;
  item.append(label, value);
  return item;
}

function createRelatedProduct(product, settings) {
  const link = document.createElement('a');
  link.href = product.detailHref;
  link.className = 'product-detail-related-card';

  const code = document.createElement('span');
  code.className = 'font-heading';
  code.textContent = product.code;

  const name = document.createElement('span');
  name.textContent = product.name;

  const action = document.createElement('span');
  action.className = 'product-detail-related-card__action';
  action.textContent = `${settings.relatedLabel} ↗`;
  link.append(code, name, action);
  return link;
}

function initProductDetailPage() {
  const root = document.querySelector('[data-product-detail-page]');
  if (!root) return;

  const settings = content.productDetailPage;
  const requestedSlug = new URLSearchParams(window.location.search).get('product') || 'ta313';
  const product = content.featuredProducts.find((item) => item.slug === requestedSlug)
    || content.featuredProducts[0];
  const category = content.productCategories.find((item) => item.slug === product.categorySlug);
  const family = getFamily(product.familySlug);
  const relatedProducts = content.featuredProducts.filter((item) => (
    item.categorySlug === product.categorySlug && item.slug !== product.slug
  ));

  document.title = `${product.code} ${product.name} — Optimix`;

  const back = root.querySelector('[data-product-detail-back]');
  back.href = category.href;
  root.querySelector('[data-product-detail-back-label]').textContent = `${settings.backLabel} · ${category.name}`;
  root.querySelector('[data-product-detail-family]').textContent = `${category.name} / ${family?.name || 'Product'}`;
  root.querySelector('[data-product-detail-code]').textContent = product.code;
  root.querySelector('[data-product-detail-title]').textContent = product.name;
  root.querySelector('[data-product-detail-standard]').textContent = product.standard;
  root.querySelector('[data-product-detail-description]').textContent = product.description;
  root.querySelector('[data-product-detail-badge]').textContent = product.featured
    ? settings.flagshipLabel
    : settings.supportingLabel;

  const image = root.querySelector('[data-product-detail-image]');
  image.src = product.imageUrl;
  image.alt = product.imageAlt;

  root.querySelector('[data-product-detail-source-label]').textContent = settings.sourceLabel;
  root.querySelector('[data-product-detail-source]').textContent = product.sourceEdition;

  const sheet = root.querySelector('[data-product-detail-sheet]');
  sheet.href = product.dataSheetUrl;
  root.querySelector('[data-product-detail-sheet-label]').textContent = settings.dataSheetLabel;

  root.querySelector('[data-product-detail-overview-eyebrow]').textContent = settings.overviewEyebrow;
  root.querySelector('[data-product-detail-uses-title]').textContent = settings.usesTitle;
  root.querySelector('[data-product-detail-benefits-title]').textContent = settings.benefitsTitle;
  populateTextList(root.querySelector('[data-product-detail-uses]'), product.typicalUses);
  populateTextList(root.querySelector('[data-product-detail-benefits]'), product.highlights);

  root.querySelector('[data-product-detail-technical-eyebrow]').textContent = settings.technicalEyebrow;
  root.querySelector('[data-product-detail-technical-title]').textContent = settings.technicalTitle;
  root.querySelector('[data-product-detail-technical-description]').textContent = settings.technicalDescription;
  const metrics = root.querySelector('[data-product-detail-metrics]');
  product.technicalData.forEach((metric) => metrics.append(createTechnicalMetric(metric)));

  root.querySelector('[data-product-detail-related-eyebrow]').textContent = settings.relatedEyebrow;
  root.querySelector('[data-product-detail-related-title]').textContent = settings.relatedTitle;
  const related = root.querySelector('[data-product-detail-related]');
  relatedProducts.forEach((item) => related.append(createRelatedProduct(item, settings)));
  root.querySelector('[data-product-detail-related-section]').hidden = relatedProducts.length === 0;
}

export function initProducts() {
  initProductLanding();
  initProductCategoryPage();
  initProductDetailPage();
}
