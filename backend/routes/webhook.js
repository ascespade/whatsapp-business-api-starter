const express = require('express');
const router = express.Router();

// Meta Webhook Verification (GET)
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
      res.sendStatus(403); // Forbidden
    }
  } else {
    res.sendStatus(400); // Bad Request
  }
});

// Receiving Webhook Events (POST)
router.post('/', (req, res) => {
  console.log('Webhook received:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

module.exports = router;
