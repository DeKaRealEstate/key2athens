const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage for registrants (demo only)
let registrants = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Registration endpoint
app.post('/register', (req, res) => {
  const { name, email } = req.body;
  if (name && email) {
    registrants.unshift({ name, email, time: new Date().toISOString() });
    if (registrants.length > 10) registrants.pop();
    return res.status(200).json({ success: true });
  }
  return res.status(400).json({ success: false, message: 'Missing fields' });
});

// Get recent registrants
app.get('/registrants', (req, res) => {
  res.json(registrants);
});

app.listen(PORT, () => {
  console.log(`Key2Athens server running at http://localhost:${PORT}`);
});
