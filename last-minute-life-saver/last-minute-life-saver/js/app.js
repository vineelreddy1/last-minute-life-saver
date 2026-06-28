// ================================
// LAST-MINUTE LIFE SAVER — app.js
// ================================

// ----- NAVIGATION -----
function toggleMenu() {
  const m = document.getElementById('mobileMenu');
  if (m) m.classList.toggle('open');
}

// ----- LOCAL STORAGE HELPERS -----
const Store = {
  get: (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  push: (k, v) => {
    const arr = Store.get(k) || [];
    arr.unshift(v);
    Store.set(k, arr);
    return arr;
  }
};

// ----- SHARED DATA: HELPERS -----
const HELPERS_DATA = [
  { id: 1, name: 'Rajesh Singh', initials: 'RS', skill: 'plumber', skillLabel: '🔧 Plumber', rating: 4.9, jobs: 120, distance: 3.2, area: 'Model Town', available: true, phone: '+91 98100 11111', whatsapp: '919810011111', bio: '15+ years experience. Specialist in burst pipes, drainage, and bathroom fitting. Available 24×7 for emergencies.', color: 'blue', earnings: 42000 },
  { id: 2, name: 'Priya Kaur', initials: 'PK', skill: 'baker', skillLabel: '🎂 Baker', rating: 4.8, jobs: 86, distance: 1.8, area: 'Civil Lines', available: true, phone: '+91 98100 22222', whatsapp: '919810022222', bio: 'Custom cakes, eggless options, Indian sweets. Can deliver within 4 hours for urgent orders.', color: 'teal', earnings: 31500 },
  { id: 3, name: 'Mandeep Sharma', initials: 'MS', skill: 'electrician', skillLabel: '⚡ Electrician', rating: 5.0, jobs: 98, distance: 2.1, area: 'Sarabha Nagar', available: true, phone: '+91 98100 33333', whatsapp: '919810033333', bio: '24/7 emergency electrician. Wiring, MCB, inverter installation. All work fully insured.', color: 'amber', earnings: 27000 },
  { id: 4, name: 'Dr. Lata Sharma', initials: 'LS', skill: 'doctor', skillLabel: '🩺 Doctor', rating: 4.8, jobs: 54, distance: 0.9, area: 'BRS Nagar', available: true, phone: '+91 98100 44444', whatsapp: '919810044444', bio: 'MBBS, general physician. Home visits for fever, infections, BP checks, elderly care. 10 years exp.', color: 'pink', earnings: 18500 },
  { id: 5, name: 'Gurpreet Singh', initials: 'GS', skill: 'locksmith', skillLabel: '🔒 Locksmith', rating: 4.7, jobs: 77, distance: 4.0, area: 'Dugri', available: true, phone: '+91 98100 55555', whatsapp: '919810055555', bio: 'All lock types: mortise, digital, padlock. Car key duplication. 30-minute response guarantee.', color: 'coral', earnings: 15200 },
  { id: 6, name: 'Amit Kumar', initials: 'AK', skill: 'driver', skillLabel: '🚗 Driver', rating: 4.9, jobs: 210, distance: 0.7, area: 'Bhamian Road', available: true, phone: '+91 98100 66666', whatsapp: '919810066666', bio: 'Airport drops, late-night rides, outstation trips. Clean car, safe driver, always on time.', color: 'blue', earnings: 22000 },
  { id: 7, name: 'Sunita Devi', initials: 'SD', skill: 'cleaner', skillLabel: '🧹 Cleaner', rating: 4.6, jobs: 43, distance: 2.8, area: 'Shastri Nagar', available: false, phone: '+91 98100 77777', whatsapp: '919810077777', bio: 'Deep cleaning, post-party cleanup, move-in/move-out cleaning. Brings own supplies.', color: 'green', earnings: 9800 },
  { id: 8, name: 'Harpreet Singh', initials: 'HS', skill: 'mechanic', skillLabel: '🔩 Mechanic', rating: 4.8, jobs: 65, distance: 3.5, area: 'Focal Point', available: true, phone: '+91 98100 88888', whatsapp: '919810088888', bio: 'On-road breakdown assistance, flat tyre, battery jumpstart, engine diagnostics.', color: 'amber', earnings: 14300 },
  { id: 9, name: 'Deepak Chopra', initials: 'DC', skill: 'carpenter', skillLabel: '🪚 Carpenter', rating: 4.5, jobs: 38, distance: 5.1, area: 'Haibowal', available: true, phone: '+91 98100 99999', whatsapp: '919810099999', bio: 'Door repair, furniture assembly, broken window frames, false ceiling. 12 years exp.', color: 'coral', earnings: 11200 },
  { id: 10, name: 'Navneet Kaur', initials: 'NK', skill: 'pharmacy', skillLabel: '💊 Pharmacy', rating: 4.9, jobs: 91, distance: 1.2, area: 'Gill Road', available: true, phone: '+91 98100 00001', whatsapp: '919810000001', bio: 'Medicine delivery within 1 hour. All branded and generic medicines. Prescription required for Rx.', color: 'teal', earnings: 19500 },
];

// ----- SHARED DATA: REQUESTS (demo) -----
const DEMO_REQUESTS = [
  { id: 'SOS-001', cat: '🔧 Plumber', person: 'Simran Kaur', location: 'Model Town', urgency: '🚨 NOW', hero: 'Rajesh Singh', status: 'en-route', time: '2 min ago' },
  { id: 'SOS-002', cat: '🎂 Baker', person: 'Vikas Grover', location: 'Civil Lines', urgency: '⚠️ Today', hero: 'Priya Kaur', status: 'active', time: '5 min ago' },
  { id: 'SOS-003', cat: '⚡ Electrician', person: 'Ritu Malhotra', location: 'Sarabha Nagar', urgency: '🔴 2hrs', hero: 'Mandeep S.', status: 'resolved', time: '18 min ago' },
  { id: 'SOS-004', cat: '🔒 Locksmith', person: 'Amandeep K.', location: 'Dugri', urgency: '🚨 NOW', hero: 'Gurpreet S.', status: 'active', time: '7 min ago' },
  { id: 'SOS-005', cat: '🚗 Driver', person: 'Neha Sharma', location: 'Airport Road', urgency: '🔴 2hrs', hero: 'Amit Kumar', status: 'resolved', time: '35 min ago' },
  { id: 'SOS-006', cat: '🩺 Doctor', person: 'Balraj Singh', location: 'BRS Nagar', urgency: '🚨 NOW', hero: 'Dr. Lata S.', status: 'en-route', time: '3 min ago' },
  { id: 'SOS-007', cat: '💊 Pharmacy', person: 'Harleen K.', location: 'Gill Road', urgency: '⚠️ Today', hero: 'Navneet K.', status: 'active', time: '12 min ago' },
];

// ----- AVATAR COLORS -----
const AVATAR_COLORS = {
  blue:  { bg: '#E6F1FB', color: '#185FA5' },
  teal:  { bg: '#E1F5EE', color: '#0F6E56' },
  amber: { bg: '#FAEEDA', color: '#854F0B' },
  coral: { bg: '#FAECE7', color: '#993C1D' },
  pink:  { bg: '#FBEAF0', color: '#993556' },
  green: { bg: '#EAF3DE', color: '#3B6D11' },
};

function getAvatarStyle(colorKey) {
  const c = AVATAR_COLORS[colorKey] || AVATAR_COLORS.blue;
  return `background:${c.bg};color:${c.color}`;
}

function getStatusPill(status) {
  if (status === 'active') return '<span class="status-pill sp-active">🔴 Active</span>';
  if (status === 'en-route') return '<span class="status-pill sp-enroute">🚗 En route</span>';
  if (status === 'resolved') return '<span class="status-pill sp-resolved">✅ Resolved</span>';
  return status;
}

// ----- CLOSE MODAL -----
function closeModal() {
  document.getElementById('successModal').style.display = 'none';
  window.location.href = 'index.html';
}

function closeHeroModal() {
  document.getElementById('heroSuccessModal').style.display = 'none';
  window.location.href = 'index.html';
}

// Close modals on overlay click
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.style.display = 'none';
  }
});
