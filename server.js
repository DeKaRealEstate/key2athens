const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// In-memory registration storage
let registrants = [];
let fundingGoal = 1000; // Example: 1000 tickets needed
let ticketsSold = 0;

app.get('/api/progress', (req, res) => {
  res.json({
    ticketsSold,
    fundingGoal,
    percent: Math.round((ticketsSold / fundingGoal) * 100)
  });
});

app.get('/api/registrants', (req, res) => {
  res.json(registrants.slice(-5).reverse()); // Last 5 registrants
});

app.post('/api/register', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required.' });
  }
  registrants.push({ name, email, time: new Date() });
  ticketsSold++;
  res.json({ success: true });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Key2Athens server running on port ${PORT}`);
});
