import content from '../../../data/content.json';

function createGateway(item) {
  const link = document.createElement('a');
  link.className = `gateway-panel gateway-panel--${item.slug} group`;
  link.href = item.href;
  link.setAttribute('aria-label', `${item.linkLabel}: ${item.title}`);

  const image = document.createElement('img');
  image.className = 'gateway-panel__image';
  image.src = item.imageUrl;
  image.alt = item.imageAlt;
  image.loading = 'lazy';
  image.decoding = 'async';

  const grade = document.createElement('span');
  grade.className = 'gateway-panel__grade';
  grade.setAttribute('aria-hidden', 'true');

  const index = document.createElement('span');
  index.className = 'gateway-panel__index font-heading';
  index.textContent = item.index;

  const contentPanel = document.createElement('span');
  contentPanel.className = 'gateway-panel__content';

  const title = document.createElement('span');
  title.className = 'gateway-panel__title font-heading';
  title.textContent = item.title;

  const description = document.createElement('span');
  description.className = 'gateway-panel__description';
  description.textContent = item.description;

  const cta = document.createElement('span');
  cta.className = 'gateway-panel__cta';
  cta.textContent = item.linkLabel;

  const arrow = document.createElement('span');
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '↗';
  cta.append(arrow);

  contentPanel.append(title, description, cta);
  link.append(image, grade, index, contentPanel);
  return link;
}

function initGateways() {
  const root = document.querySelector('[data-home-gateways]');
  if (!root) return;

  const settings = content.homeGatewaysSection;
  root.querySelector('[data-home-gateways-eyebrow]').textContent = settings.eyebrow;
  root.querySelector('[data-home-gateways-title]').textContent = settings.title;
  root.querySelector('[data-home-gateways-description]').textContent = settings.description;

  const list = root.querySelector('[data-home-gateways-list]');
  content.homeGateways.forEach((item) => list.append(createGateway(item)));
}

function initProjectProof() {
  const root = document.querySelector('[data-home-project-proof]');
  if (!root) return;

  const settings = content.homeProjectProof;
  const project = content.projects.find((item) => item.slug === settings.projectSlug);
  if (!project) return;

  root.querySelector('[data-project-proof-eyebrow]').textContent = settings.eyebrow;
  root.querySelector('[data-project-proof-title]').textContent = settings.title;
  root.querySelector('[data-project-proof-portfolio-label]').textContent = settings.portfolioLabel;
  root.querySelector('[data-project-proof-location]').textContent = project.location;
  root.querySelector('[data-project-proof-name]').textContent = project.name;
  root.querySelector('[data-project-proof-years]').textContent = project.supplyYears;
  root.querySelector('[data-project-proof-products]').textContent = project.products.join(' · ');

  const image = root.querySelector('[data-project-proof-image]');
  image.src = project.imageUrl;
  image.alt = project.imageAlt;

  const cta = root.querySelector('[data-project-proof-cta]');
  cta.href = settings.ctaHref;
  root.querySelector('[data-project-proof-cta-label]').textContent = settings.ctaLabel;
}

export function initHomeShowcase() {
  initGateways();
  initProjectProof();
}
