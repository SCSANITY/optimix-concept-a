import content from '../../../data/content.json';

export function initAbout() {
  const root = document.querySelector('[data-about]');
  if (!root) return;

  const section = content.corporate;
  const proof = content.companyStats.find((stat) => stat.slug === section.proofStatSlug);

  root.querySelector('[data-about-eyebrow]').textContent = section.eyebrow;
  root.querySelector('[data-about-title]').textContent = section.title;
  root.querySelector('[data-about-description]').textContent = section.description;
  root.querySelector('[data-about-profile-label]').textContent = section.profileLabel;

  if (proof) {
    root.querySelector('[data-about-proof-value]').textContent = proof.value;
    root.querySelector('[data-about-proof-label]').textContent = proof.label;
  }

  const facts = root.querySelector('[data-about-facts]');
  section.facts.forEach((fact, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = [
      'min-h-36 px-0 py-7 sm:min-h-40 sm:px-7 sm:py-9 lg:px-9',
      index < 2 ? 'border-b border-ink/15' : '',
      index % 2 === 0 ? 'sm:border-r sm:border-ink/15' : '',
    ].filter(Boolean).join(' ');

    const term = document.createElement('dt');
    term.className = 'text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/45';
    term.textContent = fact.label;

    const description = document.createElement('dd');
    description.className = 'mt-5 font-heading text-xl font-semibold leading-[1.3] tracking-[-0.015em] text-ink sm:text-2xl';
    description.textContent = fact.value;

    wrapper.append(term, description);
    facts.append(wrapper);
  });
}
