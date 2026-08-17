import content from '../../../data/content.json';

function formatIndex(index) {
  return String(index + 1).padStart(2, '0');
}

function createMetaRow(labelText, valueText) {
  const row = document.createElement('div');

  const label = document.createElement('dt');
  label.className = 'text-[9px] font-semibold uppercase tracking-[0.13em] text-ink/40';
  label.textContent = labelText;

  const value = document.createElement('dd');
  value.className = 'mt-1.5 text-xs leading-[1.65] text-ink/70';
  value.textContent = valueText;

  row.append(label, value);
  return row;
}

function createProjectCard(project, index, settings) {
  const article = document.createElement('article');
  article.className = 'group flex h-full flex-col';
  article.dataset.projectSlug = project.slug;
  article.dataset.projectRegion = project.region;
  article.dataset.reveal = '';

  const figure = document.createElement('figure');
  figure.className = 'relative aspect-[4/3] overflow-hidden rounded-brand bg-paper';

  const image = document.createElement('img');
  image.className = 'h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]';
  image.src = project.imageUrl;
  image.alt = project.imageAlt;
  image.loading = 'lazy';
  image.decoding = 'async';

  const number = document.createElement('span');
  number.className = 'absolute left-4 top-4 bg-paper/95 px-3 py-2 font-heading text-[10px] font-bold tracking-[0.12em] text-brand-red backdrop-blur-sm';
  number.textContent = formatIndex(index);

  const region = document.createElement('span');
  region.className = 'absolute right-4 top-4 bg-deep-blue/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm';
  region.textContent = project.location;
  figure.append(image, number, region);

  const body = document.createElement('div');
  body.className = 'flex flex-1 flex-col border-b border-ink/20 pb-8 pt-6';

  const name = document.createElement('h3');
  name.className = 'font-heading text-[1.35rem] font-semibold leading-[1.22] tracking-[-0.02em] text-ink sm:text-2xl';
  name.textContent = project.name;

  const sourceName = document.createElement('p');
  sourceName.className = 'mt-2 text-sm leading-[1.5] text-ink/45';
  sourceName.lang = 'zh-Hans';
  sourceName.textContent = project.sourceName;

  const metadata = document.createElement('dl');
  metadata.className = 'mt-6 grid gap-4 border-t border-ink/10 pt-5';
  metadata.append(
    createMetaRow(settings.supplyYearsLabel, project.supplyYears),
    createMetaRow(settings.productsLabel, project.products.join(' · ')),
  );

  body.append(name, sourceName, metadata);
  article.append(figure, body);
  return article;
}

function createFilterButton(filter, count) {
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.projectFilter = filter.slug;
  button.className = 'min-h-10 rounded-full border px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-mist';

  const label = document.createElement('span');
  label.textContent = filter.label;

  const total = document.createElement('span');
  total.className = 'ml-2 opacity-60';
  total.textContent = count;

  button.append(label, total);
  return button;
}

function setFilterState(button, isActive) {
  button.setAttribute('aria-pressed', String(isActive));
  button.classList.toggle('border-brand-blue', isActive);
  button.classList.toggle('bg-brand-blue', isActive);
  button.classList.toggle('text-white', isActive);
  button.classList.toggle('border-ink/20', !isActive);
  button.classList.toggle('text-ink/65', !isActive);
  button.classList.toggle('hover:border-brand-blue', !isActive);
  button.classList.toggle('hover:text-brand-blue', !isActive);
}

export function initProjects() {
  const root = document.querySelector('[data-projects]');
  if (!root) return;

  const settings = content.projectsSection;
  const list = root.querySelector('[data-project-list]');
  const filtersRoot = root.querySelector('[data-project-filters]');
  const toggle = root.querySelector('[data-project-toggle]');
  const toggleWrap = root.querySelector('[data-project-toggle-wrap]');
  const status = root.querySelector('[data-project-status]');
  const projectCards = new Map();
  const hongKongProjects = content.projects.filter((project) => project.region === 'hong-kong');
  const mainlandProjects = content.projects.filter((project) => project.region === 'mainland-china');
  let activeRegion = 'all';
  let expanded = false;

  root.querySelector('[data-projects-eyebrow]').textContent = settings.eyebrow;
  root.querySelector('[data-projects-title]').textContent = settings.title;
  root.querySelector('[data-projects-description]').textContent = settings.description;
  root.querySelector('[data-project-count]').textContent = content.projects.length;
  root.querySelector('[data-project-count-label]').textContent = settings.projectCountLabel;
  root.querySelector('[data-project-hong-kong-count]').textContent = hongKongProjects.length;
  root.querySelector('[data-project-hong-kong-label]').textContent = settings.hongKongCountLabel;
  root.querySelector('[data-project-mainland-count]').textContent = mainlandProjects.length;
  root.querySelector('[data-project-mainland-label]').textContent = settings.mainlandCountLabel;
  root.querySelector('[data-project-filter-label]').textContent = settings.filterLabel;

  const casebook = root.querySelector('[data-project-casebook]');
  casebook.href = settings.casebookUrl;
  root.querySelector('[data-project-casebook-label]').textContent = settings.casebookLabel;

  content.projects.forEach((project, index) => {
    const card = createProjectCard(project, index, settings);
    projectCards.set(project.slug, card);
    list.append(card);
  });

  settings.filters.forEach((filter) => {
    const count = filter.slug === 'all'
      ? content.projects.length
      : content.projects.filter((project) => project.region === filter.slug).length;
    filtersRoot.append(createFilterButton(filter, count));
  });

  const render = () => {
    const filteredProjects = activeRegion === 'all'
      ? content.projects
      : content.projects.filter((project) => project.region === activeRegion);
    const prioritizedProjects = [...filteredProjects].sort((first, second) => Number(second.featured) - Number(first.featured));
    const visibleProjects = expanded
      ? filteredProjects
      : prioritizedProjects.slice(0, settings.initialVisibleCount);
    const visibleSlugs = new Set(visibleProjects.map((project) => project.slug));

    projectCards.forEach((card, slug) => {
      const isVisible = visibleSlugs.has(slug);
      card.hidden = !isVisible;
      card.classList.toggle('hidden', !isVisible);
    });

    filtersRoot.querySelectorAll('[data-project-filter]').forEach((button) => {
      setFilterState(button, button.dataset.projectFilter === activeRegion);
    });

    const hasMore = filteredProjects.length > settings.initialVisibleCount;
    toggleWrap.hidden = !hasMore;
    toggleWrap.classList.toggle('hidden', !hasMore);
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.textContent = expanded
      ? settings.showFewerLabel
      : `${settings.showAllLabel} (${filteredProjects.length})`;
    status.textContent = `Showing ${visibleProjects.length} of ${filteredProjects.length} projects`;
  };

  filtersRoot.addEventListener('click', (event) => {
    const button = event.target.closest('[data-project-filter]');
    if (!button) return;
    activeRegion = button.dataset.projectFilter;
    expanded = false;
    render();
  });

  toggle.addEventListener('click', () => {
    expanded = !expanded;
    render();
  });

  render();
}
