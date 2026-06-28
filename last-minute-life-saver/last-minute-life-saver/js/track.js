let demoStep = 3;
let etaVal = 18;

const etaTimer = setInterval(() => {
  if (etaVal > 0 && demoStep === 3) {
    etaVal--;
    document.getElementById('etaNum').textContent = etaVal;
    document.getElementById('mapEta').innerHTML = `<i class="fa fa-car"></i> ${etaVal} min away`;
    document.getElementById('onTheWayTime').textContent = `Estimated arrival: ${etaVal} minutes`;
    if (etaVal === 0) { clearInterval(etaTimer); advanceDemo(); }
  }
}, 3000);

function advanceDemo() {
  demoStep++;
  if (demoStep === 4) {
    setStep(4, 'Arrived', 'Rajesh is at your door!');
    document.getElementById('etaNum').textContent = '✓';
    document.getElementById('mapEta').innerHTML = '<i class="fa fa-check"></i> Arrived';
  } else if (demoStep === 5) {
    setStep(5, 'Problem Solved', 'Job completed successfully');
    document.getElementById('rateSection').style.display = 'block';
  } else if (demoStep > 5) {
    alert('Request already completed!');
  }
}

function setStep(n, title, time) {
  const el = document.getElementById('ts' + n);
  el.classList.add('done');
  el.querySelector('.ts-title').textContent = title;
  el.querySelector('.ts-time').textContent = time;
  el.querySelector('.ts-circle').innerHTML = '<i class="fa fa-check"></i>';
  if (n > 3) document.getElementById('ts' + (n-1)).classList.remove('active');
  if (n < 5) document.getElementById('ts' + (n+1) )?.classList.add('active');
}

let currentRating = 0;
function setRating(val) {
  currentRating = val;
  document.querySelectorAll('.star-rating i').forEach((s, i) => {
    s.classList.toggle('active', i < val);
  });
}

function submitReview() {
  if (!currentRating) return alert('Please select a star rating');
  const review = document.getElementById('reviewText').value;
  Store.push('reviews', { hero: 'Rajesh Singh', rating: currentRating, review, date: new Date().toISOString() });
  document.getElementById('rateSection').innerHTML = '<div style="text-align:center;padding:1.5rem"><div style="font-size:36px">🙏</div><h3 style="margin-top:0.75rem">Thank you!</h3><p style="color:#888;font-size:14px">Your review helps the community.</p></div>';
}

function cancelRequest() {
  if (confirm('Cancel this request?')) window.location.href = 'index.html';
}
