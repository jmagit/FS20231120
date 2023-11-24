const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        
         res.end(`GET: ${req.headers['accept-language']?.startsWith('es') ? 'Hola' : 'Hello'} ${req.query.nombre ?? 'mundo'}`)
    })
    .post((req, res) => {
        res.end('POST: Hola mundo')
    })
    .options((req, res) => {
        res.end('OPTION: Hola mundo')
    })
router.use('/user', require('./users'))
router.route('/:id')
    .get((req, res) => {
        res.end(`GET ${req.params.id}: Hola mundo`)
    })
    .put((req, res) => {
        res.end(`PUT ${req.params.id}: Hola mundo`)
    })
    .delete((req, res) => {
        res.end(`DELETE ${req.params.id}: Hola mundo`)
    })
router.route('/:id/despide')
    .get((req, res) => {
        res.end(`GET ${req.params.id}: se despide`)
    })

module.exports = router;
