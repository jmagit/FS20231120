const express = require('express');
const router = express.Router();
const xml2js = require('xml2js');
const builder = new xml2js.Builder();


router.route('/login')
     .post((req, res) => {
        let respuesta = req.body.user ?? req.body
        res.format({
            'text/plain': function () { res.send(`usuario: ${respuesta.username}`) },
            'text/html': function () { res.send(`<html><body><p>usuario: ${respuesta.username}</p></body></html>`) },
            'application/json': function () { res.json(respuesta) },
            'application/xml': function () { res.status(200).end(builder.buildObject(respuesta))  },
            'text/xml': function () { res.status(200).end(builder.buildObject(respuesta))  },
            'default': function () { res.status(406).send('Not Acceptable') }
          })
          
        //res.end(JSON.stringify(req.body))
    })

module.exports = router;
