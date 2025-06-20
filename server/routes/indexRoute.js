const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const data = { status: 'Tada API is running', timestamp: Date.now() };
  res.json(data);
});

module.exports = router;
