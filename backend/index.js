require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
const webhookRoutes = require('./routes/webhook');

app.use('/webhook', webhookRoutes);
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('WhatsApp Business API Starter Backend is running.');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
