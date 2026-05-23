/* Theme + language toggle for standalone marketing pages (splash/welcome/login). */
(function () {
  const STRINGS = {
    es: {
      enter: 'INGRESAR AL CAMPUS', tagline: 'Excelencia educativa conectada',
      welcome_link: 'Bienvenida', login_link: 'Iniciar sesión', dash_link: 'Vista alumno',
      stats: '400 alumnos · 5 maestrías · 3 doctorados · 7 sedes'
    },
    en: {
      enter: 'ENTER CAMPUS', tagline: 'Connected academic excellence',
      welcome_link: 'Welcome', login_link: 'Sign in', dash_link: 'Student view',
      stats: '400 students · 5 master degrees · 3 doctorates · 7 campuses'
    }
  };

  function getTheme() {
    try { return localStorage.getItem('redibai:theme') || 'dark'; } catch (_) { return 'dark'; }
  }
  function getLang() {
    try { return localStorage.getItem('redibai:lang') || 'es'; } catch (_) { return 'es'; }
  }
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    document.documentElement.classList.toggle('dark', t === 'dark');
    try { localStorage.setItem('redibai:theme', t); } catch (_) {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = t === 'light' ? '#f5f1e8' : '#111415';
    applyLightModeOverrides(t);
  }
  function setLang(l) {
    try { localStorage.setItem('redibai:lang', l); } catch (_) {}
    document.documentElement.setAttribute('lang', l);
    location.reload();
  }

  // Override dark-only Tailwind tokens with cream tokens when light.
  function applyLightModeOverrides(t) {
    let style = document.getElementById('redibai-light-overrides');
    if (t !== 'light') { if (style) style.remove(); return; }
    if (style) return;
    style = document.createElement('style');
    style.id = 'redibai-light-overrides';
    style.textContent = `
      html[data-theme="light"] body, html[data-theme="light"] .bg-background { background:#f5f1e8 !important; color:#1a1d20 !important; }
      html[data-theme="light"] .text-on-background, html[data-theme="light"] .text-on-surface { color:#1a1d20 !important; }
      html[data-theme="light"] .text-on-surface-variant { color:#4a4f57 !important; }
      html[data-theme="light"] .text-secondary { color:#b8941f !important; }
      html[data-theme="light"] .text-secondary-fixed, html[data-theme="light"] .text-secondary-fixed-dim { color:#9e7d12 !important; }
      html[data-theme="light"] .bg-secondary { background:#b8941f !important; color:#fff !important; }
      html[data-theme="light"] .bg-secondary:hover { background:#c9a635 !important; }
      html[data-theme="light"] .text-on-secondary { color:#ffffff !important; }
      html[data-theme="light"] .text-outline { color:#797d85 !important; }
      html[data-theme="light"] .text-outline-variant { color:#b8b0a0 !important; }
      html[data-theme="light"] .border-outline-variant\\/20, html[data-theme="light"] .border-outline-variant\\/10 { border-color:rgba(35,30,15,.10) !important; }
      html[data-theme="light"] .bg-surface\\/70 { background:rgba(255,255,255,.85) !important; }
      html[data-theme="light"] .bg-surface-container-lowest, html[data-theme="light"] .bg-surface-container-lowest\\/80, html[data-theme="light"] .bg-surface-container-lowest\\/40 { background:rgba(245,241,232,.85) !important; }
      html[data-theme="light"] .glass-panel { background:rgba(255,255,255,.7) !important; border-color:rgba(35,30,15,.08) !important; color:#1a1d20 !important; }
      html[data-theme="light"] .gold-gradient-text { background:linear-gradient(135deg, #b8941f 0%, #9e7d12 100%) !important; -webkit-background-clip:text !important; -webkit-text-fill-color:transparent !important; }
      html[data-theme="light"] .hero-bg { background: radial-gradient(ellipse at 20% 20%, rgba(184,148,31,.10), transparent 50%), radial-gradient(ellipse at 80% 60%, rgba(35,49,72,.05), transparent 55%), linear-gradient(180deg, #ede7d8 0%, #f5f1e8 60%, #f5f1e8 100%) !important; }
      html[data-theme="light"] .gold-glow { background: radial-gradient(circle, rgba(184,148,31,.18) 0%, rgba(245,241,232,0) 70%) !important; }
      html[data-theme="light"] .demo-banner { background:rgba(184,148,31,.10) !important; border-color:rgba(184,148,31,.30) !important; color:#5a4500 !important; }
      html[data-theme="light"] .demo-pill { background:rgba(35,30,15,.06) !important; border-color:rgba(35,30,15,.12) !important; color:#5a4500 !important; }
      html[data-theme="light"] .demo-pill:hover { background:rgba(184,148,31,.20) !important; border-color:#b8941f !important; }
      html[data-theme="light"] input { color:#1a1d20 !important; }
      html[data-theme="light"] input::placeholder { color:#979ba1 !important; }
      html[data-theme="light"] .bg-surface-container-low\\/50 { background:rgba(35,30,15,.04) !important; }
      html[data-theme="light"] .bg-surface-container-high\\/30 { background:rgba(35,30,15,.04) !important; }
      html[data-theme="light"] .bg-surface-container-high\\/30:hover { background:rgba(35,30,15,.08) !important; }
    `;
    document.head.appendChild(style);
  }

  function inject() {
    const lang = getLang();
    const theme = getTheme();
    document.documentElement.setAttribute('lang', lang);
    setTheme(theme);

    // Apply language to known elements (data-i18n attribute)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (STRINGS[lang][key]) el.textContent = STRINGS[lang][key];
    });

    // Inject toolbar
    const bar = document.createElement('div');
    bar.id = 'redibai-toolbar';
    bar.innerHTML = `
      <button id="rb-lang" type="button" aria-label="Language">${lang.toUpperCase()}</button>
      <button id="rb-theme" type="button" aria-label="Theme">
        <span class="material-symbols-outlined" style="font-size:18px">${theme==='dark'?'light_mode':'dark_mode'}</span>
      </button>
    `;
    document.body.appendChild(bar);

    const style = document.createElement('style');
    style.textContent = `
      #redibai-toolbar { position:fixed; top:14px; right:14px; z-index:80; display:flex; gap:6px; }
      #redibai-toolbar button { background:rgba(29,32,33,.7); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,.1); color:#ffe088; border-radius:9999px; padding:0 10px; min-width:42px; height:34px; display:inline-flex; align-items:center; justify-content:center; cursor:pointer; font-size:11px; font-weight:600; letter-spacing:.12em; transition:.2s; font-family: Inter, system-ui, sans-serif; }
      #redibai-toolbar button:hover { border-color:#e9c349; color:#fff; }
      html[data-theme="light"] #redibai-toolbar button { background:rgba(255,255,255,.85); border-color:rgba(35,30,15,.12); color:#b8941f; }
      html[data-theme="light"] #redibai-toolbar button:hover { border-color:#b8941f; color:#5a4500; }
    `;
    document.head.appendChild(style);

    document.getElementById('rb-theme').addEventListener('click', () => {
      setTheme(getTheme() === 'dark' ? 'light' : 'dark');
      const icon = document.querySelector('#rb-theme .material-symbols-outlined');
      if (icon) icon.textContent = getTheme()==='dark' ? 'light_mode' : 'dark_mode';
    });
    document.getElementById('rb-lang').addEventListener('click', () => setLang(getLang()==='es'?'en':'es'));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();
