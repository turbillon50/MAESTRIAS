/* REDIBAI realtime simulation engine. */
(function (global) {
  const handlers = {
    activity: [],
    metric: [],
    presence: []
  };

  let activityCounter = 1000;

  function on(event, fn) { (handlers[event] || (handlers[event] = [])).push(fn); }
  function emit(event, payload) { (handlers[event] || []).forEach(fn => { try { fn(payload); } catch (e) {} }); }

  // --- Ticker ---
  let tickerEl = null;
  function mountTicker() {
    tickerEl = document.getElementById('ticker-track');
    if (!tickerEl) return;
    pushTickerLine(REDIBAI.ACTIVITY.slice(0, 6).map(a => a.html).join('  •  '));
  }
  function pushTickerLine(html) {
    if (!tickerEl) return;
    const line = document.createElement('span');
    line.className = 'ticker-line is-new';
    line.innerHTML = html;
    tickerEl.appendChild(line);
    line.addEventListener('animationend', () => line.remove());
  }

  // --- Generate new activity periodically ---
  function pulseActivity() {
    const evt = REDIBAI.buildActivityEvent(activityCounter++, 0);
    REDIBAI.ACTIVITY.unshift(evt);
    if (REDIBAI.ACTIVITY.length > 80) REDIBAI.ACTIVITY.pop();
    emit('activity', evt);
    pushTickerLine(evt.html);
  }

  // --- Refresh timestamps every second ---
  function tickTimestamps() {
    document.querySelectorAll('[data-time-ago]').forEach(el => {
      const ms = parseInt(el.dataset.timeAgo, 10);
      if (!ms) return;
      el.textContent = RedibaiApp.timeAgo(ms);
    });
    document.querySelectorAll('[data-clock]').forEach(el => {
      el.textContent = new Date().toLocaleTimeString('es-MX', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
    });
  }

  // --- Online counter fluctuation ---
  function pulsePresence() {
    REDIBAI.STUDENTS.forEach(s => {
      const r = Math.random();
      if (r < 0.005) s.online = !s.online;
    });
    const onlineCount = REDIBAI.STUDENTS.filter(s => s.online).length;
    emit('presence', { online: onlineCount, total: REDIBAI.STUDENTS.length });
    document.querySelectorAll('[data-online-count]').forEach(el => {
      const cur = parseInt(el.textContent.replace(/\D/g,''), 10) || onlineCount;
      el.textContent = onlineCount;
      el.classList.add('flash');
      setTimeout(() => el.classList.remove('flash'), 400);
    });
  }

  // --- Random toasts ---
  const TOAST_POOL = [
    { icon:'task_alt',  kind:'success', title:'Tarea calificada', body:(s) => `Ya está disponible la calificación de ${s.name}.` },
    { icon:'campaign',  kind:'info',    title:'Aviso académico', body:() => 'Se publicó un nuevo anuncio en el panel de comunicados.' },
    { icon:'forum',     kind:'info',    title:'Nuevo mensaje', body:(s) => `${s.name} te escribió en el chat.` },
    { icon:'event',     kind:'info',    title:'Recordatorio', body:() => 'Reunión académica en 30 minutos — Sede Orizaba.' },
    { icon:'warning',   kind:'error',   title:'Asistencia baja', body:(s) => `${s.name} requiere seguimiento (asistencia < 75%).` },
    { icon:'cloud_done',kind:'success', title:'Sincronizado', body:() => 'Calificaciones sincronizadas con plataforma SEP.' }
  ];
  function fireRandomToast() {
    if (document.hidden) return;
    const tpl = TOAST_POOL[Math.floor(Math.random() * TOAST_POOL.length)];
    const s = REDIBAI.STUDENTS[Math.floor(Math.random() * REDIBAI.STUDENTS.length)];
    RedibaiApp.toast({ title: tpl.title, body: tpl.body(s), icon: tpl.icon, kind: tpl.kind, timeout: 6000 });
    const dot = document.getElementById('notify-dot');
    if (dot) dot.hidden = false;
  }

  // --- Boot ---
  function boot() {
    mountTicker();
    setInterval(pulseActivity, 4500 + Math.random() * 2500);
    setInterval(tickTimestamps, 1000);
    setInterval(pulsePresence, 6000);
    setInterval(fireRandomToast, 22000);
    tickTimestamps();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  global.RedibaiRealtime = { on, emit, pulseActivity, fireRandomToast };
})(window);

/* Flash animation for live counters */
const _rtStyle = document.createElement('style');
_rtStyle.textContent = `
  .flash { animation: flash .4s ease-out; }
  @keyframes flash { 0% { color: var(--gold-light); transform: scale(1.15); } 100% { color: inherit; transform: none; } }
`;
document.head.appendChild(_rtStyle);
