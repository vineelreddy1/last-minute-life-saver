let selectedCat = '';

// Pre-select from URL param
window.addEventListener('DOMContentLoaded', () => {
  const p = new URLSearchParams(window.location.search).get('cat');
  if (p) {
    const btn = document.querySelector(`[data-cat="${p}"]`);
    if (btn) selectCategory(btn);
  }
});

function selectCategory(el) {
  document.querySelectorAll('.cat-select-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  selectedCat = el.dataset.cat;
}

function getLocation() {
  if (!navigator.geolocation) return;
  document.getElementById('locationStatus').textContent = 'Detecting location...';
  navigator.geolocation.getCurrentPosition(
    pos => { document.getElementById('location').value = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`; document.getElementById('locationStatus').textContent = '✅ Location detected'; },
    () => { document.getElementById('locationStatus').textContent = 'Could not detect. Please type your location.'; }
  );
}

function submitSOS() {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const desc = document.getElementById('description').value.trim();
  const loc = document.getElementById('location').value.trim();
  const urgency = document.querySelector('input[name="urgency"]:checked');
  if (!selectedCat) return alert('Please select a category');
  if (!name || !phone || !desc || !loc) return alert('Please fill all required fields');
  if (!urgency) return alert('Please select urgency level');
  const req = { id: 'SOS-' + Date.now(), cat: selectedCat, name, phone, description: desc, location: loc, urgency: urgency.value, time: new Date().toISOString() };
  Store.push('sos_requests', req);
  const count = Math.floor(Math.random() * 3) + 2;
  document.getElementById('matchCount').textContent = count;
  document.getElementById('successModal').style.display = 'flex';
}
