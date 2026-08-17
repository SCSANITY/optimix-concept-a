import content from '../../../data/content.json';

function formatIndex(index) {
  return String(index + 1).padStart(2, '0');
}

export function initSystems() {
  const root = document.querySelector('[data-systems]');
  if (!root) return;

  const settings = content.systemsSection;
  const list = root.querySelector('[data-system-list]');
  const preview = root.querySelector('[data-system-preview]');
  const previewName = root.querySelector('[data-system-preview-name]');
  const previewIndex = root.querySelector('[data-system-preview-index]');
  const ghostIndex = root.querySelector('[data-system-ghost-index]');
  const mobileLayout = window.matchMedia('(max-width: 1023px)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  root.querySelector('[data-systems-eyebrow]').textContent = settings.eyebrow;
  root.querySelector('[data-systems-title]').textContent = settings.title;
  root.querySelector('[data-systems-description]').textContent = settings.description;
  root.querySelector('[data-system-drawing-label]').textContent = settings.drawingLabel;
  root.querySelector('[data-system-placeholder]').textContent = settings.drawingPlaceholder;

  const buttons = content.systems.map((system, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.id = `system-tab-${system.slug}`;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', 'system-preview');
    button.className = 'system-tab group';

    const number = document.createElement('span');
    number.className = 'system-tab__number font-heading';
    number.textContent = formatIndex(index);

    const name = document.createElement('span');
    name.className = 'system-tab__name font-heading';
    name.textContent = system.name;

    const marker = document.createElement('span');
    marker.className = 'system-tab__marker';
    marker.setAttribute('aria-hidden', 'true');

    button.append(number, name, marker);
    list.append(button);
    return { button, system };
  });

  let selectedIndex = 0;

  const selectSystem = (nextIndex, animate = true) => {
    selectedIndex = nextIndex;
    const selected = buttons[nextIndex];
    const indexLabel = formatIndex(nextIndex);

    previewName.textContent = selected.system.name;
    previewIndex.textContent = indexLabel;
    ghostIndex.textContent = indexLabel;
    preview.dataset.activeSystem = selected.system.slug;
    preview.style.setProperty('--system-index', nextIndex);
    preview.setAttribute('aria-labelledby', selected.button.id);

    if (animate && !reduceMotion.matches) {
      preview.classList.remove('is-changing');
      void preview.offsetWidth;
      preview.classList.add('is-changing');
    }

    buttons.forEach(({ button }, index) => {
      const active = index === nextIndex;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
      button.classList.toggle('is-active', active);
    });
  };

  const updateOrientation = () => {
    list.setAttribute('aria-orientation', mobileLayout.matches ? 'horizontal' : 'vertical');
  };

  buttons.forEach(({ button }, index) => {
    button.addEventListener('click', () => {
      selectSystem(index);
      if (mobileLayout.matches) {
        preview.scrollIntoView({
          behavior: reduceMotion.matches ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    });

    button.addEventListener('keydown', (event) => {
      const previousKeys = mobileLayout.matches ? ['ArrowLeft', 'ArrowUp'] : ['ArrowUp'];
      const nextKeys = mobileLayout.matches ? ['ArrowRight', 'ArrowDown'] : ['ArrowDown'];
      if (![...previousKeys, ...nextKeys, 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = selectedIndex;
      if (nextKeys.includes(event.key)) nextIndex = (index + 1) % buttons.length;
      if (previousKeys.includes(event.key)) nextIndex = (index - 1 + buttons.length) % buttons.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = buttons.length - 1;

      selectSystem(nextIndex);
      buttons[nextIndex].button.focus();
      if (mobileLayout.matches) {
        buttons[nextIndex].button.scrollIntoView({
          behavior: reduceMotion.matches ? 'auto' : 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    });
  });

  updateOrientation();
  mobileLayout.addEventListener('change', updateOrientation);
  selectSystem(0, false);
}
