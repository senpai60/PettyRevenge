// index.js using ES6 modules

import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Use 'export default' for the router object
export default router;