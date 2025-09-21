document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const status = document.getElementById('registerStatus');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const registrantsList = document.getElementById('registrantsList');

  function updateProgress() {
    fetch('/api/progress')
      .then(res => res.json())
      .then(data => {
        progressBar.value = data.percent;
        progressText.textContent = `${data.percent}% funded (${data.ticketsSold} / ${data.fundingGoal} tickets)`;
      });
  }

  function updateRegistrants() {
    fetch('/api/registrants')
      .then(res => res.json())
      .then(data => {
        registrantsList.innerHTML = '';
        if (data.length === 0) {
          registrantsList.innerHTML = '<li>No registrants yet.</li>';
        } else {
          data.forEach(r => {
            const li = document.createElement('li');
            li.textContent = `${r.name} (${r.email}) - ${new Date(r.time).toLocaleString()}`;
            registrantsList.appendChild(li);
          });
        }
      });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    if (!name || !email) return;
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          status.textContent = 'Registration successful!';
          form.reset();
          updateProgress();
          updateRegistrants();
        } else {
          status.textContent = data.error || 'Registration failed.';
        }
      });
  });

  updateProgress();
  updateRegistrants();
});