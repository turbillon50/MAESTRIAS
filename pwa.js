/* REDIBAI PWA bootstrap: SW registration + install prompt + online badge. */
(function () {
  // Register service worker (skip on file:// to avoid noisy errors).
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .catch((err) => console.warn('SW registration failed', err));
    });
  }

  // Capture install prompt and surface our own button.
  let deferredPrompt = null;
  const installBtnId = 'pwa-install-btn';

  function showInstallButton() {
    const btn = document.getElementById(installBtnId);
    if (btn) btn.removeAttribute('hidden');
  }

  function hideInstallButton() {
    const btn = document.getElementById(installBtnId);
    if (btn) btn.setAttribute('hidden', '');
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallButton();
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    hideInstallButton();
  });

  document.addEventListener('click', async (event) => {
    const target = event.target.closest('#' + installBtnId);
    if (!target) return;
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') hideInstallButton();
    deferredPrompt = null;
  });

  // Online/offline indicator (optional element with id="pwa-status").
  function updateStatus() {
    const el = document.getElementById('pwa-status');
    if (!el) return;
    if (navigator.onLine) {
      el.textContent = 'En línea';
      el.dataset.state = 'online';
    } else {
      el.textContent = 'Modo offline';
      el.dataset.state = 'offline';
    }
  }
  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
  document.addEventListener('DOMContentLoaded', updateStatus);
})();
