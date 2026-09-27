import '../css/main.css';
import content from '../../data/content.json';

const routeMeta = {
  dashboard: ['Workspace / Overview', 'Good morning, Optimix.'],
  content: ['Workspace / Content', 'Content library'],
  assets: ['Workspace / Media', 'Asset library'],
  site: ['Workspace / Configuration', 'Site settings'],
  team: ['Workspace / Administration', 'Team & roles'],
};

const contentCollections = {
  Products: content.featuredProducts.map((item) => ({ title: `${item.code} · ${item.name}`, meta: 'Documented product', status: 'Published' })),
  Systems: content.systems.map((item) => ({ title: item.name, meta: `${item.assemblies.length} assembly view${item.assemblies.length === 1 ? '' : 's'}`, status: 'Published' })),
  Projects: content.projects.slice(0, 12).map((item) => ({ title: item.name, meta: item.location || item.region, status: 'Published' })),
  News: content.news.map((item) => ({ title: item.title, meta: item.category, status: 'Published' })),
  Credentials: content.credentialGroups.flatMap((group) => group.items.map((item) => ({ title: item.title, meta: group.name, status: 'Published' }))),
};

const panels = [...document.querySelectorAll('[data-admin-panel]')];
const routeButtons = [...document.querySelectorAll('[data-admin-route]')];
const eyebrow = document.querySelector('[data-admin-eyebrow]');
const title = document.querySelector('[data-admin-title]');
const toast = document.querySelector('[data-admin-toast]');
let activeCollection = 'Products';

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

function setRoute(route) {
  panels.forEach((panel) => { panel.hidden = panel.dataset.adminPanel !== route; });
  routeButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.adminRoute === route));
  eyebrow.textContent = routeMeta[route][0];
  title.textContent = routeMeta[route][1];
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

routeButtons.forEach((button) => button.addEventListener('click', () => setRoute(button.dataset.adminRoute)));
setRoute('dashboard');

const metrics = [
  ['Products', content.featuredProducts.length, 'documented details'],
  ['Systems', content.systems.length, 'all mapped'],
  ['Projects', content.projects.length, 'documented cases'],
  ['Credentials', content.credentialGroups.reduce((sum, group) => sum + group.items.length, 0), 'source documents'],
];
const metricRoot = document.querySelector('[data-admin-metrics]');
metrics.forEach(([label, value, note], index) => {
  const article = document.createElement('article');
  article.className = 'admin-metric';
  article.innerHTML = `<span>${String(index + 1).padStart(2, '0')} · ${label}</span><strong>${value}</strong><p>${note}</p>`;
  metricRoot.append(article);
});

const activityRoot = document.querySelector('[data-admin-activity]');
[
  ['News', content.news[0].title, 'Published content'],
  ['Systems', content.systems[6].name, 'System structure'],
  ['Company', content.companyStory.chapters[1].title, 'Page narrative'],
  ['Credentials', content.credentialGroups[1].items[1].title, 'Document record'],
].forEach(([type, entry, state]) => {
  const row = document.createElement('button');
  row.type = 'button';
  row.innerHTML = `<span>${type}</span><strong>${entry}</strong><em>${state}</em><b>→</b>`;
  row.addEventListener('click', () => openEditor(entry));
  activityRoot.append(row);
});

const tabs = document.querySelector('[data-admin-content-tabs]');
const list = document.querySelector('[data-admin-content-list]');
const search = document.querySelector('[data-admin-search]');

function renderContentList() {
  const query = search.value.trim().toLowerCase();
  list.replaceChildren();
  contentCollections[activeCollection].filter((item) => item.title.toLowerCase().includes(query)).forEach((item, index) => {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'admin-content-row';
    row.innerHTML = `<span>${String(index + 1).padStart(2, '0')}</span><span><strong>${item.title}</strong><small>${item.meta}</small></span><em>${item.status}</em><b>Edit →</b>`;
    row.addEventListener('click', () => openEditor(item.title));
    list.append(row);
  });
}

Object.keys(contentCollections).forEach((collection) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = `${collection} ${contentCollections[collection].length}`;
  button.classList.toggle('is-active', collection === activeCollection);
  button.addEventListener('click', () => {
    activeCollection = collection;
    tabs.querySelectorAll('button').forEach((tab) => tab.classList.toggle('is-active', tab === button));
    renderContentList();
  });
  tabs.append(button);
});
search.addEventListener('input', renderContentList);
renderContentList();

const media = [
  ...content.news.map((item) => ({ src: item.imageUrl, label: item.title })),
  ...content.systems.slice(0, 6).map((item) => ({ src: item.imageUrl, label: item.name })),
];
const mediaRoot = document.querySelector('[data-admin-media]');
media.forEach((item) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.innerHTML = `<img src="${item.src}" alt=""><span>${item.label}</span>`;
  button.addEventListener('click', () => {
    button.classList.toggle('is-selected');
    showToast(button.classList.contains('is-selected') ? 'Media selected in prototype.' : 'Media selection cleared.');
  });
  mediaRoot.append(button);
});

const menuPreview = document.querySelector('[data-admin-menu-preview]');
content.header.navigation.forEach((item, index) => {
  const row = document.createElement('div');
  row.innerHTML = `<span>⠿</span><strong>${item.label}</strong><small>${item.href}</small><em>${index + 1}</em>`;
  menuPreview.append(row);
});

const editor = document.querySelector('[data-admin-editor]');
const scrim = document.querySelector('[data-admin-scrim]');
const editorTitle = document.querySelector('[data-admin-editor-title]');
const editorInput = document.querySelector('[data-admin-editor-input]');
function openEditor(entryTitle) {
  editorTitle.textContent = entryTitle ? 'Edit entry' : 'New entry';
  editorInput.value = entryTitle || 'Untitled content';
  editor.classList.add('is-open');
  editor.setAttribute('aria-hidden', 'false');
  scrim.hidden = false;
  window.setTimeout(() => editorInput.focus(), 250);
}
function closeEditor() {
  editor.classList.remove('is-open');
  editor.setAttribute('aria-hidden', 'true');
  scrim.hidden = true;
}
document.querySelectorAll('[data-admin-editor-close]').forEach((button) => button.addEventListener('click', closeEditor));
document.querySelector('[data-admin-create]').addEventListener('click', () => openEditor(''));
scrim.addEventListener('click', closeEditor);
document.querySelector('[data-admin-editor-form]').addEventListener('submit', (event) => { event.preventDefault(); closeEditor(); showToast('Prototype only — changes were not saved.'); });

const previewDialog = document.querySelector('[data-admin-preview-dialog]');
document.querySelector('[data-admin-preview]').addEventListener('click', () => previewDialog.showModal());
document.querySelector('[data-admin-preview-close]').addEventListener('click', () => previewDialog.close());
document.querySelector('[data-admin-form]').addEventListener('submit', (event) => { event.preventDefault(); showToast('Prototype only — settings were not saved.'); });
document.querySelector('[data-admin-upload]').addEventListener('click', () => showToast('Upload is disabled in this static prototype.'));
document.querySelector('[data-admin-invite]').addEventListener('click', () => showToast('Invitations require the future authentication system.'));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && editor.classList.contains('is-open')) closeEditor();
});
