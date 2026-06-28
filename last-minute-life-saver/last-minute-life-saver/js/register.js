document.getElementById('heroSkill').addEventListener('change', function() {
  document.getElementById('otherSkillGroup').style.display = this.value === 'other' ? 'block' : 'none';
});

function registerHero() {
  const name = document.getElementById('heroName').value.trim();
  const phone = document.getElementById('heroPhone').value.trim();
  const skill = document.getElementById('heroSkill').value;
  const area = document.getElementById('heroArea').value.trim();
  const terms = document.getElementById('termsAccept').checked;
  if (!name || !phone || !skill || !area) return alert('Please fill all required fields');
  if (!terms) return alert('Please accept the community guidelines');
  const hero = { name, phone, skill, area, bio: document.getElementById('heroBio').value, registeredAt: new Date().toISOString() };
  Store.push('registered_heroes', hero);
  document.getElementById('heroSuccessModal').style.display = 'flex';
}
