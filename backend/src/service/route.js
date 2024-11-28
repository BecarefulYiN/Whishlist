const express = require('express');
const { encryptData, decryptData } = require('./encryptDecryptService.js');

const router = express.Router();

router.post('/encrypt', (req, res) => {
  const { data } = req.body;
  const encryptedData = encryptData(data);
  res.json({ encryptedData });
});

router.post('/decrypt', (req, res) => {
  const { encryptedData } = req.body;
  const data = decryptData(encryptedData);
  res.json({ data });
});

module.exports = router;
