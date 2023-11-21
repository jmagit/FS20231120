const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.end('GET: Hola mundo')
  })
  .post((req, res) => {
    res.end('POST: Hola mundo')
  })
  .options((req, res) => {
    res.end('OPTION: Hola mundo')
  })
router.route('/saluda/:id')
  .get((req, res) => {
    res.end(`GET ${req.params.id}: Hola mundo`)
  })
  .put((req, res) => {
    res.end(`PUT ${req.params.id}: Hola mundo`)
  })
  .delete((req, res) => {
    res.end(`DELETE ${req.params.id}: Hola mundo`)
  })

module.exports = router;
