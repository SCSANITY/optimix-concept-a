import content from '../../../data/content.json';

function populateHero(root) {
  const hero = content.hero;
  const eyebrow = root.querySelector('[data-hero-eyebrow]');
  const title = root.querySelector('[data-hero-title]');
  const description = root.querySelector('[data-hero-description]');
  const primaryCta = root.querySelector('[data-hero-primary-cta]');
  const secondaryCta = root.querySelector('[data-hero-secondary-cta]');
  const secondaryLabel = root.querySelector('[data-hero-secondary-label]');
  const filmLink = root.querySelector('[data-hero-film-link]');
  const filmLabel = root.querySelector('[data-hero-film-label]');
  const filmDuration = root.querySelector('[data-hero-film-duration]');

  eyebrow.textContent = hero.eyebrow;
  description.textContent = hero.description;
  primaryCta.href = hero.primaryCta.href;
  primaryCta.textContent = hero.primaryCta.label;
  secondaryCta.href = hero.secondaryCta.href;
  secondaryLabel.textContent = hero.secondaryCta.label;
  filmLink.href = hero.media.fullVideoUrl;
  filmLabel.textContent = hero.filmLabel;
  filmDuration.textContent = hero.filmDuration;

  title.replaceChildren();
  hero.titleLines.forEach((line) => {
    const titleLine = document.createElement('span');
    titleLine.className = 'hero-title__line';

    const titleText = document.createElement('span');
    titleText.className = 'hero-title__text';
    titleText.textContent = typeof line === 'string' ? line : line.text;
    titleLine.append(titleText);

    if (typeof line === 'object' && line.accent) {
      const accent = document.createElement('span');
      accent.className = 'hero-title__accent';
      accent.textContent = line.accent;
      titleLine.append(accent);
    }

    title.append(titleLine);
  });
}

function configureVideo(root) {
  const video = root.querySelector('[data-hero-video]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!video) return;

  const media = content.hero.media;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const saveData = Boolean(connection?.saveData);
  const slowConnection = ['slow-2g', '2g'].includes(connection?.effectiveType);
  let source = null;
  let heroVisible = true;

  video.poster = media.posterUrl;

  const ensureSource = () => {
    if (source || saveData || slowConnection) return;
    source = document.createElement('source');
    source.src = media.videoUrl;
    source.type = 'video/mp4';
    video.append(source);
    video.load();
  };

  const updatePlayback = () => {
    if (reduceMotion.matches || saveData || slowConnection || !heroVisible || document.hidden) {
      video.pause();
      if (reduceMotion.matches || saveData || slowConnection) root.dataset.heroMedia = 'poster';
      return;
    }

    ensureSource();
    video.play()
      .then(() => {
        root.dataset.heroMedia = 'video';
      })
      .catch(() => {
        root.dataset.heroMedia = 'poster';
      });
  };

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    updatePlayback();
  }, { rootMargin: '160px 0px' });

  visibilityObserver.observe(root);
  updatePlayback();
  reduceMotion.addEventListener('change', updatePlayback);
  document.addEventListener('visibilitychange', updatePlayback);
}

function initHeroMotion(root) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let scrollFrame = null;

  const updateScrollProgress = () => {
    scrollFrame = null;
    const bounds = root.getBoundingClientRect();
    const travelled = Math.max(0, -bounds.top);
    const progress = Math.min(1, travelled / Math.max(bounds.height, 1));
    root.style.setProperty('--hero-scroll', progress.toFixed(4));
  };

  const requestScrollProgress = () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(updateScrollProgress);
  };

  const updatePointer = (event) => {
    if (reduceMotion.matches || event.pointerType === 'touch') return;
    const bounds = root.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    root.style.setProperty('--hero-pointer-x', `${Math.max(0, Math.min(100, x)).toFixed(2)}%`);
    root.style.setProperty('--hero-pointer-y', `${Math.max(0, Math.min(100, y)).toFixed(2)}%`);
  };

  const resetPointer = () => {
    root.style.setProperty('--hero-pointer-x', '72%');
    root.style.setProperty('--hero-pointer-y', '45%');
  };

  updateScrollProgress();
  resetPointer();
  window.addEventListener('scroll', requestScrollProgress, { passive: true });
  window.addEventListener('resize', requestScrollProgress);
  root.addEventListener('pointermove', updatePointer, { passive: true });
  root.addEventListener('pointerleave', resetPointer);
}

export function initHero() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;

  populateHero(hero);
  configureVideo(hero);
  initHeroMotion(hero);
  window.requestAnimationFrame(() => hero.classList.add('is-ready'));
}
