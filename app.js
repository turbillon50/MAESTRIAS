/* REDIBAI shared layout, navigation, helpers. */
(function (global) {
  const NAV = [
    { id:'admin',     href:'/admin.html',     icon:'space_dashboard', label:'nav_admin',     roles:['admin','docente'] },
    { id:'dashboard', href:'/dashboard.html', icon:'home',            label:'nav_dashboard', roles:['admin','docente','alumno'] },
    { id:'groups',    href:'/groups.html',    icon:'groups',          label:'nav_groups',    roles:['admin','docente'] },
    { id:'students',  href:'/students.html',  icon:'school',          label:'nav_students',  roles:['admin','docente'] },
    { id:'courses',   href:'/courses.html',   icon:'menu_book',       label:'nav_courses',   roles:['admin','docente','alumno'] },
    { id:'calendar',  href:'/calendar.html',  icon:'calendar_month',  label:'nav_calendar',  roles:['admin','docente','alumno'] },
    { id:'locations', href:'/locations.html', icon:'location_on',     label:'nav_locations', roles:['admin','docente'] },
    { id:'messages',  href:'/messages.html',  icon:'forum',           label:'nav_messages',  roles:['admin','docente','alumno'] },
    { id:'reports',   href:'/reports.html',   icon:'analytics',       label:'nav_reports',   roles:['admin'] },
    { id:'settings',  href:'/settings.html',  icon:'settings',        label:'nav_settings',  roles:['admin','docente','alumno'] }
  ];

  const t = (k, p) => (global.I18N ? global.I18N.t(k, p) : k);

  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  function initials(name) {
    return name.split(/\s+/).filter(Boolean).slice(0,2).map(n => n[0].toUpperCase()).join('');
  }

  function avatar(name, hue = 42, size = 36) {
    const init = initials(name);
    return `<span class="avatar" style="width:${size}px;height:${size}px;background:hsl(${hue}deg 50% 22%);color:hsl(${hue}deg 90% 70%);font-size:${Math.round(size*0.40)}px;">${init}</span>`;
  }

  function timeAgo(ms) {
    const diff = Math.max(0, Date.now() - ms);
    const s = Math.floor(diff/1000);
    const lang = global.I18N ? global.I18N.getLang() : 'es';
    if (lang === 'en') {
      if (s < 60) return `${s}s ago`;
      const m = Math.floor(s/60); if (m < 60) return `${m} min ago`;
      const h = Math.floor(m/60); if (h < 24) return `${h} h ago`;
      const d = Math.floor(h/24); return `${d}d ago`;
    }
    if (s < 60) return `hace ${s}s`;
    const m = Math.floor(s/60); if (m < 60) return `hace ${m} min`;
    const h = Math.floor(m/60); if (h < 24) return `hace ${h} h`;
    const d = Math.floor(h/24); return `hace ${d} d`;
  }

  function fmtDate(iso) {
    const d = new Date(iso);
    const lang = global.I18N ? global.I18N.getLang() : 'es';
    const locale = lang === 'en' ? 'en-US' : 'es-MX';
    return d.toLocaleDateString(locale, { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' });
  }

  function getSession() {
    try {
      const raw = localStorage.getItem('redibai:session');
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return REDIBAI.SESSION;
  }
  function setSession(s) {
    try { localStorage.setItem('redibai:session', JSON.stringify(s)); } catch (_) {}
  }

  // ---------- Theme ----------
  function getTheme() {
    try { return localStorage.getItem('redibai:theme') || 'dark'; } catch (_) { return 'dark'; }
  }
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.add('theme-flash');
    setTimeout(() => document.documentElement.classList.remove('theme-flash'), 500);
    try { localStorage.setItem('redibai:theme', theme); } catch (_) {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'light' ? '#f5f1e8' : '#0e1112';
  }

  // ---------- Layout shell ----------
  let _mountArgs = null;

  function renderShell({ active, title, subtitle = '', actions = '' } = {}) {
    const session = getSession();
    const role = session.role || 'admin';
    const user = session.user || REDIBAI.SESSION.user;

    const navItems = NAV.filter(n => n.roles.includes(role)).map(n => `
      <a href="${n.href}" data-nav="${n.id}" class="nav-item ${n.id === active ? 'is-active' : ''}">
        <span class="material-symbols-outlined">${n.icon}</span>
        <span class="nav-label">${t(n.label)}</span>
      </a>
    `).join('');

    const bottomNavItems = NAV.filter(n => n.roles.includes(role)).slice(0, 5).map(n => `
      <a href="${n.href}" class="bottom-nav-item ${n.id === active ? 'is-active' : ''}">
        <span class="material-symbols-outlined">${n.icon}</span>
        <span>${t(n.label)}</span>
      </a>
    `).join('');

    const theme = getTheme();
    const lang = global.I18N ? global.I18N.getLang() : 'es';

    return `
      <div class="app-frame">
        <aside class="sidebar">
          <a href="/" class="brand">
            <span class="brand-mark">R</span>
            <div>
              <div class="brand-name">REDIBAI</div>
              <div class="brand-sub">${t('brand_sub')}</div>
            </div>
          </a>
          <nav class="nav-list">${navItems}</nav>
          <div class="sidebar-foot">
            <div class="user-card">
              ${avatar(user.name, 42, 34)}
              <div class="user-meta">
                <div class="user-name">${user.name.split(' ').slice(0,2).join(' ')}</div>
                <div class="user-role">${user.role}</div>
              </div>
            </div>
            <a href="/login.html" id="logout-link" class="logout" aria-label="${t('logout')}">
              <span class="material-symbols-outlined" style="font-size:18px">logout</span>
            </a>
          </div>
        </aside>

        <div class="page">
          <header class="topbar">
            <div class="topbar-left">
              <button class="icon-btn menu-toggle" aria-label="Menú" id="menu-toggle">
                <span class="material-symbols-outlined">menu</span>
              </button>
              <div class="page-title">
                <h1>${escapeHtml(title)}</h1>
                ${subtitle ? `<p>${escapeHtml(subtitle)}</p>` : ''}
              </div>
            </div>
            <div class="topbar-right">
              <div class="search">
                <span class="material-symbols-outlined">search</span>
                <input id="global-search" type="search" placeholder="${t('search_placeholder')}" />
              </div>
              <span id="pwa-status" data-state="online" class="status-pill"></span>
              <button class="lang-btn" id="lang-toggle" aria-label="${t('language')}" title="${t('language')}">${lang.toUpperCase()}</button>
              <button class="icon-btn" id="theme-toggle" aria-label="${theme==='dark'?t('theme_light'):t('theme_dark')}" title="${theme==='dark'?t('theme_light'):t('theme_dark')}">
                <span class="material-symbols-outlined">${theme==='dark' ? 'light_mode' : 'dark_mode'}</span>
              </button>
              <button class="icon-btn" id="notify-btn" aria-label="${t('notifications')}">
                <span class="material-symbols-outlined">notifications</span>
                <span class="notify-dot" id="notify-dot" hidden></span>
              </button>
              <button class="icon-btn install-cta" id="pwa-install-btn" hidden aria-label="${t('install_app')}">
                <span class="material-symbols-outlined">download</span>
              </button>
              ${actions}
            </div>
          </header>

          <div class="live-ticker">
            <span class="live-dot"></span>
            <span class="live-label">${t('live')}</span>
            <div class="ticker-track" id="ticker-track"></div>
          </div>

          <main class="page-body" id="page-body"></main>
        </div>

        <nav class="bottom-nav">${bottomNavItems}</nav>

        <div class="toast-stack" id="toast-stack"></div>
        <div class="search-results" id="search-results" hidden></div>
      </div>
    `;
  }

  function mount(args) {
    _mountArgs = args;
    const { active, title, subtitle = '', actions = '', html = '', onRender } = args;
    const app = document.getElementById('app');
    if (!app) return;
    setTheme(getTheme());
    app.innerHTML = renderShell({ active, title, subtitle, actions });
    document.getElementById('page-body').innerHTML = html;

    document.getElementById('menu-toggle').addEventListener('click', () => {
      document.querySelector('.app-frame').classList.toggle('sidebar-open');
    });

    document.getElementById('theme-toggle').addEventListener('click', () => {
      const next = getTheme() === 'dark' ? 'light' : 'dark';
      setTheme(next);
      // Swap the toggle icon and tooltip in place — no remount needed.
      const btn = document.getElementById('theme-toggle');
      const icon = btn.querySelector('.material-symbols-outlined');
      icon.textContent = next === 'dark' ? 'light_mode' : 'dark_mode';
      const lbl = next === 'dark' ? t('theme_light') : t('theme_dark');
      btn.setAttribute('aria-label', lbl);
      btn.setAttribute('title', lbl);
    });

    document.getElementById('lang-toggle').addEventListener('click', () => {
      const cur = global.I18N.getLang();
      global.I18N.setLang(cur === 'es' ? 'en' : 'es');
      location.reload();
    });

    const search = document.getElementById('global-search');
    const results = document.getElementById('search-results');
    search.addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase();
      if (q.length < 2) { results.hidden = true; results.innerHTML = ''; return; }
      const hits = [
        ...REDIBAI.STUDENTS.filter(s => s.name.toLowerCase().includes(q)).slice(0,5)
          .map(s => ({ icon:'school', label:s.name, sub:`${REDIBAI.getGroup(s.groupId).program} · ${REDIBAI.getLocation(s.locationId).city}`, href:`/student.html?id=${s.id}` })),
        ...REDIBAI.GROUPS.filter(g => g.program.toLowerCase().includes(q) || g.name.toLowerCase().includes(q)).slice(0,3)
          .map(g => ({ icon:'groups', label:`${g.name} — ${g.program}`, sub:`${t('th_cohort')} ${g.cohort}`, href:`/group.html?id=${g.id}` })),
        ...REDIBAI.COURSES.filter(c => c.name.toLowerCase().includes(q)).slice(0,3)
          .map(c => ({ icon:'menu_book', label:c.name, sub:c.code, href:`/courses.html#${c.id}` }))
      ];
      results.innerHTML = hits.length
        ? hits.map(h => `<a href="${h.href}" class="search-hit"><span class="material-symbols-outlined">${h.icon}</span><div><div class="hit-label">${escapeHtml(h.label)}</div><div class="hit-sub">${escapeHtml(h.sub)}</div></div></a>`).join('')
        : `<div class="search-empty">${t('no_results')}</div>`;
      results.hidden = false;
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('.search') && !e.target.closest('.search-results')) {
        results.hidden = true;
      }
    });

    document.getElementById('logout-link').addEventListener('click', () => {
      try { localStorage.removeItem('redibai:session'); localStorage.removeItem('redibai:user'); } catch (_) {}
    });

    document.getElementById('notify-btn').addEventListener('click', () => {
      toast({ title: t('notifications_title'), body: t('notifications_body'), icon: 'notifications' });
      document.getElementById('notify-dot').hidden = true;
    });

    document.addEventListener('click', e => {
      const link = e.target.closest('.nav-item, .bottom-nav-item');
      if (link && link.getAttribute('href')) {
        document.querySelector('.app-frame').classList.remove('sidebar-open');
      }
    });
  }

  // ---------- Toast notifications ----------
  function toast({ title, body, icon = 'notifications', kind = 'info', timeout = 5200 }) {
    const stack = document.getElementById('toast-stack');
    if (!stack) return;
    const el = document.createElement('div');
    el.className = `toast toast-${kind}`;
    el.innerHTML = `
      <span class="material-symbols-outlined">${icon}</span>
      <div class="toast-body">
        ${title ? `<div class="toast-title">${escapeHtml(title)}</div>` : ''}
        <div class="toast-text">${body || ''}</div>
      </div>
      <button class="toast-close" aria-label="×">&times;</button>
    `;
    stack.appendChild(el);
    requestAnimationFrame(() => el.classList.add('is-visible'));
    const dismiss = () => {
      el.classList.remove('is-visible');
      setTimeout(() => el.remove(), 250);
    };
    el.querySelector('.toast-close').addEventListener('click', dismiss);
    if (timeout) setTimeout(dismiss, timeout);
  }

  global.RedibaiApp = {
    mount, toast, avatar, initials, timeAgo, fmtDate, escapeHtml,
    getSession, setSession, getTheme, setTheme, NAV, t
  };

  // Apply persisted theme as early as possible (before mount, if pages call it directly).
  document.documentElement.setAttribute('data-theme', getTheme());
})(window);
