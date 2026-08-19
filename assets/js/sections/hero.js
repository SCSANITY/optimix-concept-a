import content from '../../../data/content.json';

function populateHero(root) {
  const hero = content.hero;
  const eyebrow = root.querySelector('[data-hero-eyebrow]');
  const title = root.querySelector('[data-hero-title]');
  const description = root.querySelector('[data-hero-description]');
  const primaryCta = root.querySelector('[data-hero-primary-cta]');
  const secondaryCta = root.querySelector('[data-hero-secondary-cta]');
  const secondaryLabel = root.querySelector('[data-hero-secondary-label]');
  const filmLabel = root.querySelector('[data-hero-film-label]');
  const filmDuration = root.querySelector('[data-hero-film-duration]');

  eyebrow.textContent = hero.eyebrow;
  description.textContent = hero.description;
  primaryCta.href = hero.primaryCta.href;
  primaryCta.textContent = hero.primaryCta.label;
  secondaryCta.href = hero.secondaryCta.href;
  secondaryLabel.textContent = hero.secondaryCta.label;
  filmLabel.textContent = hero.filmLabel;
  filmDuration.textContent = hero.filmDuration;

  hero.titleLines.forEach((line, index) => {
    const titleLine = document.createElement('span');
    titleLine.textContent = line;
    title.append(titleLine);

    if (index < hero.titleLines.length - 1) {
      const desktopBreak = document.createElement('br');
      desktopBreak.className = 'hidden lg:block';
      title.append(document.createTextNode(' '), desktopBreak);
    }
  });

}

function parseRgb(color) {
  const channels = color.match(/[\d.]+/g)?.slice(0, 3).map(Number);
  return channels?.length === 3 ? channels : [255, 255, 255];
}

function createParticle(width, height, colors) {
  const isBlue = Math.random() < 0.82;

  return {
    x: width * (0.42 + Math.random() * 0.58),
    y: Math.random() * height,
    size: 1 + Math.pow(Math.random(), 1.8) * 1.6,
    speed: 8 + Math.random() * 6,
    rotation: Math.random() * Math.PI,
    color: isBlue ? colors.blue : colors.red,
    alpha: isBlue ? 0.07 + Math.random() * 0.04 : 0.06 + Math.random() * 0.02,
  };
}

function initParticles(root) {
  const canvas = root.querySelector('[data-particle-canvas]');
  const blueProbe = root.querySelector('[data-particle-blue]');
  const redProbe = root.querySelector('[data-particle-red]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!canvas || !blueProbe || !redProbe) return;

  const context = canvas.getContext('2d');
  if (!context) return;

  const colors = {
    blue: parseRgb(getComputedStyle(blueProbe).backgroundColor),
    red: parseRgb(getComputedStyle(redProbe).backgroundColor),
  };

  let particles = [];
  let animationFrame = null;
  let previousTime = 0;
  let width = 0;
  let height = 0;

  const resize = () => {
    const bounds = root.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = bounds.width;
    height = bounds.height;
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const particleCount = width < 640 ? 28 : 84;
    particles = Array.from({ length: particleCount }, () => createParticle(width, height, colors));
  };

  const drawParticle = (particle) => {
    const [red, green, blue] = particle.color;
    const halfSize = particle.size / 2;
    context.save();
    context.translate(particle.x, particle.y);
    context.rotate(particle.rotation);
    context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${particle.alpha})`;
    context.beginPath();
    context.moveTo(-halfSize, -halfSize * 0.65);
    context.lineTo(halfSize * 0.8, -halfSize);
    context.lineTo(halfSize, halfSize * 0.55);
    context.lineTo(-halfSize * 0.7, halfSize);
    context.closePath();
    context.fill();
    context.restore();
  };

  const animate = (time) => {
    const elapsed = Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;
    context.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.y += particle.speed * elapsed;
      if (particle.y > height + particle.size) {
        Object.assign(particle, createParticle(width, height, colors), { y: -particle.size });
      }
      drawParticle(particle);
    });

    animationFrame = window.requestAnimationFrame(animate);
  };

  const stop = () => {
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
    animationFrame = null;
    context.clearRect(0, 0, width, height);
  };

  const start = () => {
    stop();
    if (reduceMotion.matches || document.hidden) return;
    previousTime = performance.now();
    animationFrame = window.requestAnimationFrame(animate);
  };

  const resizeObserver = new ResizeObserver(() => {
    resize();
    start();
  });

  resizeObserver.observe(root);
  reduceMotion.addEventListener('change', start);
  document.addEventListener('visibilitychange', start);
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
  initParticles(hero);
  initHeroMotion(hero);
}
