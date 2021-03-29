const express = require('express');
const router = express.Router();
const db = require('../database/connection');

const query = {
  dbWarmUp: 'SELECT * FROM Cart;',
};

/* GET home page. */
router.get('/', async function (req, res) {
  await db.promise().execute(query.dbWarmUp);
  res.send('Server ready.');
});

module.exports = router;
