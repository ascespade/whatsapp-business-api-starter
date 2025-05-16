const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { i18next, middleware } = require('./i18n');
const { PrismaClient: PrismaAppClient } = require('@prisma/client');
const prismaApp = new PrismaAppClient();
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';
const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

app.use(cors());
app.use(express.json());
app.use(middleware.handle(i18next));

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/whatsapp', require('./routes/whatsapp'));
app.use('/api/translations', require('./routes/translations'));

app.post('/webhook', async (req, res) => {
  console.log('Webhook received:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN || 'my_verify_token';
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Webhook verified');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));