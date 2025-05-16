require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('WhatsApp Business API Starter Backend is running.');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
