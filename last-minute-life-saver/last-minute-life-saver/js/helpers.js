let allHelpers = [...HELPERS_DATA];

function renderHelpers(list) {
  const grid = document.getElementById('helpersGrid');
  document.getElementById('resultsCount').textContent = `${list.length} helpers found`;
  if (!list.length) { grid.innerHTML = '<p style="color:#888;padding:2rem">No helpers found. Try changing filters.</p>'; return; }
  grid.innerHTML = list.map(h => `
    <div class="helper-card" onclick="openHelper(${h.id})">
      <div class="helper-card-top">
        <div class="helper-avatar" style="${getAvatarStyle(h.color)}">${h.initials}</div>
        <div>
          <div class="helper-name">${h.name}</div>
          <div class="helper-skill">${h.skillLabel}</div>
          <div class="helper-rating">⭐ ${h.rating} · ${h.jobs} jobs · ${h.distance} km</div>
        </div>
      </div>
      <div class="helper-tags">
        <span class="tag ${h.available ? 'tag-green' : 'tag-red'}">${h.available ? '● Available' : '● Busy'}</span>
        <span class="tag tag-blue">${h.area}</span>
      </div>
      <div class="helper-card-footer">
        <span class="helper-distance"><i class="fa fa-location-dot"></i> ${h.distance} km away</span>
        <button class="btn btn-sm btn-danger" onclick="event.stopPropagation();window.location.href='request.html?cat=${h.skill}'">Send SOS</button>
      </div>
    </div>`).join('');
}

function filterHelpers() {
  const cat = document.getElementById('filterCat').value;
  const sort = document.getElementById('filterSort').value;
  const status = document.getElementById('filterStatus').value;
  const q = document.getElementById('searchInput').value.toLowerCase();
  let list = HELPERS_DATA.filter(h => {
    if (cat !== 'all' && h.skill !== cat) return false;
    if (status === 'available' && !h.available) return false;
    if (status === 'busy' && h.available) return false;
    if (q && !h.name.toLowerCase().includes(q) && !h.skillLabel.toLowerCase().includes(q)) return false;
    return true;
  });
  if (sort === 'rating') list.sort((a,b) => b.rating - a.rating);
  if (sort === 'distance') list.sort((a,b) => a.distance - b.distance);
  if (sort === 'jobs') list.sort((a,b) => b.jobs - a.jobs);
  renderHelpers(list);
}

function openHelper(id) {
  const h = HELPERS_DATA.find(x => x.id === id);
  if (!h) return;
  document.getElementById('helperModalContent').innerHTML = `
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:1.5rem">
      <div class="helper-avatar" style="${getAvatarStyle(h.color)};width:64px;height:64px;font-size:22px">${h.initials}</div>
      <div>
        <h2 style="margin-bottom:4px">${h.name}</h2>
        <div style="font-size:15px;color:#64748b">${h.skillLabel} · ${h.area}</div>
        <div style="font-size:14px;margin-top:4px">⭐ ${h.rating} · ${h.jobs} jobs completed</div>
      </div>
    </div>
    <p style="font-size:14px;color:#475569;margin-bottom:1.5rem">${h.bio}</p>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <a href="tel:${h.phone}" class="btn btn-teal"><i class="fa fa-phone"></i> Call</a>
      <a href="https://wa.me/${h.whatsapp}" target="_blank" class="btn btn-outline"><i class="fab fa-whatsapp"></i> WhatsApp</a>
      <a href="request.html?cat=${h.skill}" class="btn btn-danger"><i class="fa fa-bolt"></i> Send SOS</a>
    </div>`;
  document.getElementById('helperModal').style.display = 'flex';
}

function closeHelperModal() { document.getElementById('helperModal').style.display = 'none'; }

renderHelpers(HELPERS_DATA);
