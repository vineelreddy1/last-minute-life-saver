// Clock
function updateClock() {
  const el = document.getElementById('dashTime');
  if (el) el.textContent = new Date().toLocaleString('en-IN', { weekday:'short', day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' });
}
setInterval(updateClock, 1000); updateClock();

// Tabs
document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
    link.classList.add('active');
    document.getElementById('tab-' + link.dataset.tab).classList.add('active');
  });
});

// Category bar chart
const catData = [
  { label: 'Plumber', count: 38, pct: 100 },
  { label: 'Driver', count: 31, pct: 82 },
  { label: 'Electrician', count: 24, pct: 63 },
  { label: 'Baker', count: 18, pct: 47 },
  { label: 'Doctor', count: 14, pct: 37 },
  { label: 'Locksmith', count: 11, pct: 29 },
];
const barChart = document.getElementById('categoryChart');
if (barChart) barChart.innerHTML = catData.map(d => `
  <div class="bar-row">
    <span class="bar-label">${d.label}</span>
    <div class="bar-track"><div class="bar-fill" style="width:${d.pct}%">${d.count}</div></div>
  </div>`).join('');

// SVG line chart
const hourly = [4,2,6,3,8,12,18,22,17,14,20,25,28,24,19,16,21,18,15,12,9,11,7,5];
const lc = document.getElementById('hourlyChart');
if (lc) {
  const max = Math.max(...hourly); const w = 300; const h = 100;
  const pts = hourly.map((v,i) => `${(i/(hourly.length-1))*w},${h - (v/max)*h}`).join(' ');
  lc.innerHTML = `<svg viewBox="0 0 ${w} ${h}" style="width:100%;height:100px">
    <defs><linearGradient id="lg" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#e74c3c" stop-opacity="0.2"/><stop offset="100%" stop-color="#e74c3c" stop-opacity="0"/></linearGradient></defs>
    <polygon points="${pts} ${w},${h} 0,${h}" fill="url(#lg)"/>
    <polyline points="${pts}" fill="none" stroke="#e74c3c" stroke-width="2" stroke-linejoin="round"/>
  </svg>`;
}

// Alerts
const alerts = document.getElementById('alertList');
if (alerts) alerts.innerHTML = [
  'SOS-004 (Locksmith) — no response in 32 minutes',
  'SOS-007 (Pharmacy) — helper not yet assigned',
].map(t => `<div class="alert-item"><i class="fa fa-triangle-exclamation"></i>${t}</div>`).join('');

// Requests table
let reqFilter = 'all';
function filterReq(f, btn) {
  reqFilter = f;
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  renderTable();
}
function renderTable() {
  const body = document.getElementById('requestsBody');
  if (!body) return;
  const list = reqFilter === 'all' ? DEMO_REQUESTS : DEMO_REQUESTS.filter(r => r.status === reqFilter);
  body.innerHTML = list.map(r => `<tr>
    <td><strong>${r.id}</strong></td>
    <td>${r.cat}</td><td>${r.person}</td><td>${r.location}</td>
    <td>${r.urgency}</td><td>${r.hero}</td>
    <td>${getStatusPill(r.status)}</td><td style="color:#94a3b8">${r.time}</td>
  </tr>`).join('');
}
renderTable();
function refreshRequests() { renderTable(); }

// Heroes dash
const hg = document.getElementById('heroesDashGrid');
if (hg) hg.innerHTML = HELPERS_DATA.map(h => `
  <div class="helper-card">
    <div class="helper-card-top">
      <div class="helper-avatar" style="${getAvatarStyle(h.color)}">${h.initials}</div>
      <div>
        <div class="helper-name">${h.name}</div>
        <div class="helper-skill">${h.skillLabel}</div>
        <div class="helper-rating">⭐ ${h.rating} · ${h.jobs} jobs</div>
      </div>
    </div>
    <div class="helper-tags">
      <span class="tag ${h.available ? 'tag-green' : 'tag-red'}">${h.available ? '● Online' : '● Offline'}</span>
      <span class="tag tag-blue">${h.area}</span>
    </div>
  </div>`).join('');

// Top cats analytics
const tc = document.getElementById('topCatsList');
if (tc) tc.innerHTML = [
  { emoji:'🔧', name:'Plumber', count:234, pct:100 },
  { emoji:'🚗', name:'Driver', count:198, pct:85 },
  { emoji:'⚡', name:'Electrician', count:156, pct:67 },
  { emoji:'🎂', name:'Baker', count:112, pct:48 },
  { emoji:'🩺', name:'Doctor', count:87, pct:37 },
].map((c,i) => `<div class="top-cat-row">
  <span class="top-cat-rank">${['🥇','🥈','🥉','4️⃣','5️⃣'][i]}</span>
  <div class="top-cat-info">
    <span style="font-size:14px;font-weight:600">${c.emoji} ${c.name}</span>
    <div class="top-cat-bar" style="width:${c.pct}%"></div>
  </div>
  <span class="top-cat-count">${c.count}</span>
</div>`).join('');
