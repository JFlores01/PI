
const express = require('express');
const router = express.Router();

// Ruta para la página principal
router.get('/', (req, res) => {
  res.render('validacion');
});

router.get('/index', (req, res) => {
  res.render('index');
});

module.exports = router;






