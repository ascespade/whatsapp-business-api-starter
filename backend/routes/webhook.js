// backend/routes/webhook.js

const express = require('express');
const router = express.Router();

// Webhook Verification (GET)
router.get('/', (req, res) => {
  const verifyToken = process.env.WEBHOOK_VERIFY_TOKEN;

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === verifyToken) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

// Webhook Receiver (POST)
router.post('/', (req, res) => {
  const body = req.body;

  console.log('Received webhook:', JSON.stringify(body, null, 2));

  if (body.object) {
    // Handle incoming messages or events here
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
