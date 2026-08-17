function clamp(value, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function initBrandMotion() {
  const rail = document.querySelector('[data-brand-progress]');
  const sectionLabel = rail?.querySelector('[data-brand-section]');
  const sections = [...document.querySelectorAll('main > section[id]')];
  if (!sections.length) return;

  let animationFrame = null;

  const update = () => {
    animationFrame = null;
    const scrollableDistance = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = clamp(window.scrollY / scrollableDistance);
    const readingLine = window.innerHeight * 0.42;
    let activeIndex = 0;

    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= readingLine) activeIndex = index;
    });

    const activeSection = sections[activeIndex];
    const isDark = ['hero', 'certifications'].includes(activeSection.id);
    document.documentElement.style.setProperty('--page-progress', progress.toFixed(4));
    rail?.classList.toggle('is-on-dark', isDark);
    rail?.setAttribute('data-active-section', activeSection.id);
    if (sectionLabel) sectionLabel.textContent = String(activeIndex).padStart(2, '0');
  };

  const requestUpdate = () => {
    if (animationFrame) return;
    animationFrame = window.requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
}
