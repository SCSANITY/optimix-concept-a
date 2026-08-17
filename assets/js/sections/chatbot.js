import content from '../../../data/content.json';

function createMessage(text, type, action = null) {
  const message = document.createElement('div');
  message.className = `chatbot-message chatbot-message--${type}`;

  const bubble = document.createElement('div');
  bubble.className = 'chatbot-message__bubble';

  const label = document.createElement('p');
  label.className = 'chatbot-message__label font-heading';
  label.textContent = type === 'assistant' ? 'Optimix' : 'You';

  const body = document.createElement('p');
  body.className = 'chatbot-message__text';
  body.textContent = text;

  bubble.append(label, body);

  if (action) {
    const link = document.createElement('a');
    link.className = 'chatbot-message__action';
    link.href = action.href;
    link.textContent = action.label;

    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '→';
    link.append(arrow);
    bubble.append(link);
  }

  message.append(bubble);
  return message;
}

function createTypingIndicator() {
  const message = document.createElement('div');
  message.className = 'chatbot-message chatbot-message--assistant chatbot-message--typing';
  message.setAttribute('aria-label', 'Assistant is typing');
  message.dataset.chatbotTyping = '';

  const bubble = document.createElement('div');
  bubble.className = 'chatbot-message__bubble';
  bubble.setAttribute('aria-hidden', 'true');

  const label = document.createElement('p');
  label.className = 'chatbot-message__label font-heading';
  label.textContent = 'Optimix';

  const dots = document.createElement('span');
  dots.className = 'chatbot-typing-dots';
  dots.append(document.createElement('span'), document.createElement('span'), document.createElement('span'));

  bubble.append(label, dots);
  message.append(bubble);
  return message;
}

export function initChatbot() {
  const root = document.querySelector('[data-chatbot]');
  if (!root) return;

  const settings = content.supportAssistant;
  const trigger = root.querySelector('[data-chatbot-trigger]');
  const panel = root.querySelector('[data-chatbot-panel]');
  const closeButton = root.querySelector('[data-chatbot-close]');
  const body = root.querySelector('[data-chatbot-body]');
  const messages = root.querySelector('[data-chatbot-messages]');
  const quickReplies = root.querySelector('[data-chatbot-quick-replies]');
  const form = root.querySelector('[data-chatbot-form]');
  const input = root.querySelector('[data-chatbot-input]');
  const sendButton = root.querySelector('[data-chatbot-send]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let isOpen = false;
  let responsePending = false;
  let closeTimer = null;
  let hintTimer = null;
  let hintDismissTimer = null;

  root.querySelector('[data-chatbot-title]').textContent = settings.title;
  root.querySelector('[data-chatbot-status]').textContent = settings.statusLabel;
  root.querySelector('[data-chatbot-trigger-label]').textContent = settings.triggerLabel;
  root.querySelector('[data-chatbot-close-label]').textContent = settings.closeLabel;
  root.querySelector('[data-chatbot-hint]').textContent = settings.hint;
  root.querySelector('[data-chatbot-input-label]').textContent = settings.inputLabel;
  root.querySelector('[data-chatbot-send-label]').textContent = settings.sendLabel;
  input.placeholder = settings.inputPlaceholder;

  const welcome = createMessage(settings.welcome, 'assistant');
  const disclaimer = document.createElement('p');
  disclaimer.className = 'chatbot-disclaimer';
  disclaimer.textContent = settings.disclaimer;
  messages.append(welcome, disclaimer);

  const scrollMessages = () => {
    body.scrollTo({
      top: body.scrollHeight,
      behavior: reduceMotion.matches ? 'auto' : 'smooth',
    });
  };

  const scrollToConversation = () => {
    const userMessages = messages.querySelectorAll('.chatbot-message--user');
    const latestUserMessage = userMessages[userMessages.length - 1];
    if (!latestUserMessage) {
      scrollMessages();
      return;
    }

    body.scrollTo({
      top: Math.max(0, latestUserMessage.offsetTop - body.offsetTop - 8),
      behavior: reduceMotion.matches ? 'auto' : 'smooth',
    });
  };

  const setControlsDisabled = (disabled) => {
    responsePending = disabled;
    input.disabled = disabled;
    sendButton.disabled = disabled;
    quickReplies.querySelectorAll('button').forEach((button) => {
      button.disabled = disabled;
    });
  };

  const queueResponse = (response, action = null) => {
    if (responsePending) return;
    setControlsDisabled(true);

    const typing = createTypingIndicator();
    messages.append(typing);
    scrollMessages();

    window.setTimeout(() => {
      typing.remove();
      const reply = createMessage(response, 'assistant', action);
      const actionLink = reply.querySelector('a');
      if (actionLink) {
        actionLink.addEventListener('click', () => closePanel(false));
      }
      messages.append(reply);
      setControlsDisabled(false);
      scrollToConversation();
      if (isOpen) input.focus({ preventScroll: true });
    }, reduceMotion.matches ? 0 : 720);
  };

  settings.quickReplies.forEach((reply) => {
    const button = document.createElement('button');
    button.className = 'chatbot-quick-reply';
    button.type = 'button';
    button.dataset.chatbotQuickReply = reply.id;
    button.textContent = reply.label;
    button.addEventListener('click', () => {
      messages.append(createMessage(reply.label, 'user'));
      queueResponse(reply.response, {
        label: reply.actionLabel,
        href: reply.actionHref,
      });
    });
    quickReplies.append(button);
  });

  const dismissHint = () => {
    window.clearTimeout(hintTimer);
    window.clearTimeout(hintDismissTimer);
    root.classList.remove('is-hint-visible');
  };

  const openPanel = () => {
    if (isOpen) return;
    window.clearTimeout(closeTimer);
    dismissHint();
    panel.hidden = false;
    isOpen = true;
    trigger.setAttribute('aria-expanded', 'true');
    trigger.tabIndex = -1;
    document.body.classList.add('chatbot-is-open');

    window.requestAnimationFrame(() => {
      root.classList.add('is-open');
      closeButton.focus({ preventScroll: true });
    });
  };

  function closePanel(restoreFocus = true) {
    if (!isOpen) return;
    isOpen = false;
    root.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.tabIndex = 0;
    document.body.classList.remove('chatbot-is-open');

    closeTimer = window.setTimeout(() => {
      panel.hidden = true;
      if (restoreFocus) trigger.focus({ preventScroll: true });
    }, reduceMotion.matches ? 0 : 240);
  }

  const handleKeydown = (event) => {
    if (!isOpen) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closePanel();
    }
  };

  trigger.addEventListener('click', openPanel);
  closeButton.addEventListener('click', () => closePanel());
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('pointerdown', (event) => {
    if (isOpen && !root.contains(event.target)) closePanel(false);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = input.value.trim();
    if (!message || responsePending) return;

    messages.append(createMessage(message, 'user'));
    input.value = '';
    queueResponse(settings.fallbackResponse);
  });

  hintTimer = window.setTimeout(() => {
    if (isOpen) return;
    root.classList.add('is-hint-visible');
    hintDismissTimer = window.setTimeout(dismissHint, 5200);
  }, reduceMotion.matches ? 0 : 1800);
}
