import content from '../../../data/content.json';

function formatIndex(index) {
  return String(index + 1).padStart(2, '0');
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
}

function createCredentialLink(credential, holderLabel) {
  const link = document.createElement('a');
  link.href = credential.fileUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'credential-link group grid gap-5 border-t border-white/15 py-6 transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white sm:grid-cols-[7.5rem_minmax(0,1fr)_auto] sm:items-start sm:gap-6 sm:px-4';

  const preview = document.createElement('figure');
  preview.className = 'credential-preview overflow-hidden bg-white';

  const image = document.createElement('img');
  image.className = 'h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]';
  image.src = credential.fileUrl
    .replace('./documents/certificates/', './media/certifications/')
    .replace(/\.pdf$/i, '.jpg');
  image.alt = `${credential.title} document preview`;
  image.loading = 'lazy';
  image.decoding = 'async';
  preview.append(image);

  const body = document.createElement('div');

  const title = document.createElement('h4');
  title.className = 'font-heading text-lg font-semibold leading-[1.3] tracking-[-0.015em] text-white transition-colors group-hover:text-white sm:text-xl';
  title.textContent = credential.title;

  const subtitle = document.createElement('p');
  subtitle.className = 'mt-1 text-sm font-medium text-white/75';
  subtitle.textContent = credential.subtitle;

  const issuer = document.createElement('p');
  issuer.className = 'mt-4 text-xs leading-[1.5] text-white/60';
  issuer.textContent = credential.issuer;

  const holder = document.createElement('p');
  holder.className = 'mt-1 max-w-[720px] text-xs leading-[1.5] text-white/60';
  holder.textContent = `${holderLabel}: ${credential.holder}`;

  const meta = document.createElement('div');
  meta.className = 'flex items-start justify-between gap-4 sm:min-w-40 sm:justify-end';

  const date = document.createElement('span');
  date.className = 'text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60';
  date.textContent = credential.validUntil
    ? `Valid to ${formatDate(credential.validUntil)}`
    : `Issued ${formatDate(credential.issuedOn)}`;

  const arrow = document.createElement('span');
  arrow.className = 'text-lg text-white transition-transform duration-300 group-hover:translate-x-1';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '↗';

  body.append(title, subtitle, issuer, holder);
  meta.append(date, arrow);
  link.append(preview, body, meta);
  return link;
}

function createCredentialGroup(group, index, holderLabel) {
  const article = document.createElement('article');
  article.className = 'grid gap-7 border-t border-white/20 py-9 first:border-t-0 sm:py-11 lg:grid-cols-12 lg:gap-12';
  article.dataset.reveal = '';

  const heading = document.createElement('div');
  heading.className = 'lg:col-span-4';

  const number = document.createElement('p');
  number.className = 'font-heading text-xs font-bold tracking-[0.12em] text-brand-red';
  number.textContent = formatIndex(index);

  const title = document.createElement('h3');
  title.className = 'mt-3 font-heading text-2xl font-semibold tracking-[-0.02em] text-white';
  title.textContent = group.name;

  const description = document.createElement('p');
  description.className = 'mt-4 max-w-[360px] text-sm leading-[1.65] text-white/65';
  description.textContent = group.description;

  const list = document.createElement('div');
  list.className = 'lg:col-span-8';
  group.items.forEach((credential) => list.append(createCredentialLink(credential, holderLabel)));

  heading.append(number, title, description);
  article.append(heading, list);
  return article;
}

export function initCertifications() {
  const root = document.querySelector('[data-certifications]');
  if (!root) return;

  const section = content.certificationsSection;
  root.querySelector('[data-certifications-eyebrow]').textContent = section.eyebrow;
  root.querySelector('[data-certifications-title]').textContent = section.title;
  root.querySelector('[data-certifications-description]').textContent = section.description;
  root.querySelector('[data-certifications-document-count]').textContent = section.documentCount;
  root.querySelector('[data-certifications-document-label]').textContent = section.documentCountLabel;
  root.querySelector('[data-certifications-family-count]').textContent = section.familyCount;
  root.querySelector('[data-certifications-family-label]').textContent = section.familyCountLabel;

  const groups = root.querySelector('[data-credential-groups]');
  content.credentialGroups.forEach((group, index) => {
    groups.append(createCredentialGroup(group, index, section.holderLabel));
  });
}
