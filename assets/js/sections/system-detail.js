import content from '../../../data/content.json';

export function initSystemDetail() {
  const root = document.querySelector('[data-system-detail]');
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('system');
  const currentIndex = Math.max(0, content.systems.findIndex((item) => item.slug === requested));
  const system = content.systems[currentIndex];
  if (requested !== system.slug) {
    const url = new URL(window.location.href);
    url.searchParams.set('system', system.slug);
    window.history.replaceState({}, '', url);
  }
  document.title = `${system.name} — Optimix Systems`;
  root.querySelector('[data-system-detail-index]').textContent = system.index;
  root.querySelector('[data-system-detail-title]').textContent = system.name;
  root.querySelector('[data-system-detail-summary]').textContent = system.summary;
  const image = root.querySelector('[data-system-detail-image]');
  image.src = system.imageUrl;
  image.alt = system.imageAlt;
  root.querySelector('[data-system-detail-disclaimer]').textContent = content.systemsSection.disclaimer;
  root.querySelector('[data-system-detail-source]').href = system.sourceUrl;

  const assemblies = root.querySelector('[data-system-assemblies]');
  system.assemblies.forEach((assembly, assemblyIndex) => {
    const section = document.createElement('section');
    section.className = 'system-assembly border border-ink/15 bg-white';
    const title = document.createElement('h2');
    title.className = 'flex items-center justify-between gap-4 border-b border-ink/12 px-5 py-4 font-heading text-lg font-bold text-ink';
    title.innerHTML = `<span>${assembly.name}</span><span class="text-xs text-brand-blue">${String(assemblyIndex + 1).padStart(2, '0')}</span>`;
    const list = document.createElement('ol');
    list.className = 'divide-y divide-ink/10 px-5';
    assembly.layers.forEach((layer) => {
      const item = document.createElement('li');
      item.className = 'py-3 text-sm leading-[1.55] text-ink/66';
      item.textContent = layer;
      list.append(item);
    });
    section.append(title, list);
    assemblies.append(section);
  });

  const layerText = system.assemblies.flatMap((assembly) => assembly.layers).join(' ');
  const relatedProducts = content.featuredProducts.filter((product) => layerText.includes(product.code));
  if (relatedProducts.length) {
    const productSection = root.querySelector('[data-system-products]');
    const productLinks = root.querySelector('[data-system-product-links]');
    productSection.hidden = false;
    relatedProducts.forEach((product) => {
      const link = document.createElement('a');
      link.href = product.detailHref;
      link.className = 'border border-ink/15 bg-white px-3 py-2 text-xs font-semibold text-brand-blue transition hover:border-brand-blue';
      link.textContent = product.code;
      productLinks.append(link);
    });
  }

  const previous = content.systems[(currentIndex - 1 + content.systems.length) % content.systems.length];
  const next = content.systems[(currentIndex + 1) % content.systems.length];
  const pagination = root.querySelector('[data-system-pagination]');
  [{ item: previous, label: 'Previous system', align: 'previous' }, { item: next, label: 'Next system', align: 'next' }].forEach(({ item, label, align }) => {
    const link = document.createElement('a');
    link.href = `./system-detail.html?system=${item.slug}`;
    link.className = `system-pagination-link ${align === 'next' ? 'sm:text-right' : ''}`;
    link.innerHTML = `<span>${label}</span><strong>${align === 'previous' ? '← ' : ''}${item.name}${align === 'next' ? ' →' : ''}</strong>`;
    pagination.append(link);
  });
}
