const express = require('express');
const { Sequelize, DataTypes, Op, QueryTypes } = require('sequelize');
const { formatError, formatLocation } = require('../lib/utils')
const { sequelize, dbContext } = require('../models/sakila/db-context')
const security = require("../lib/security");
const Ajv = require("ajv")
const addFormats = require("ajv-formats")

const ajv = new Ajv()
addFormats(ajv)

const schema = {
    "type": "object",
    "properties": {
      "actor_id": {
        "type": "integer"
      },
      "first_name": {
        "type": "string"
      },
      "last_name": {
        "type": "string"
      },
      "last_update": {
        "type": "string"
      }
    },
    "required": [
      "actor_id",
      "first_name",
      "last_name",
      "last_update"
    ]
  }

const validate = ajv.compile(schema)

function noSonDatosValidos(data) {
    const valid = validate(data)
    if (!valid) console.log(validate.errors)
    return !valid;
}

const router = express.Router();

router.use(security.onlyAuthenticated)
router.use(security.onlyInRole('Empleados,Administradores'))

// router.use(function (req, res, next) {
//     if (!res.locals.isAuthenticated) {
//         res.status(401).end()
//         return
//     }
//     if (!res.locals.isInRole('Administradores')) {
//         res.status(403).end()
//         return
//     }
//     next()
// })
router.route('/')
    .get(async function (req, res) { // get all
        const page = +req.query.page || 0;
        const limit = +req.query.rows || 10;
        let options = { offsset: page * limit, limit }
        if (req.query.page === 'all') {
            options = {}
        }
        if (req.query.proyection) {
            options.attributes = req.query.proyection.split(',')
        } else {
            options.attributes = ["actor_id", "first_name", "last_name"]
        }
        if (req.query.order) {
            options.order = req.query.order.split(',')
        }
        if (req.query.find) {
            options.where = { first_name: { [Op.startsWith]: req.query.find } }
        }
        try {
            let resultado = await dbContext.actor.findAll(options)
            let totalRows = await dbContext.actor.count()
            // res.json(resultado)
            res.json({ totalRows, page, totalPages: Math.ceil(totalRows / limit), listado: resultado})
        } catch (error) {
            res.status(400).json(formatError(error))
        }
        
    })
    .post(async function (req, res) { // add
        let row = await dbContext.actor.build({ first_name: req.body.first_name, last_name: req.body.last_name })
        try {
            await row.validate()
            await row.save()
            res.append('location', formatLocation(req, row.actor_id))
            res.sendStatus(201)
        } catch (error) {
            res.status(400).send(formatError(error))
        }
    })

router.route('/:id')
    .get(async function (req, res) { // get one
        try {
            let row = await dbContext.actor.findByPk(req.params.id)
            if (row)
                res.json(row)
            else
                res.sendStatus(404)
        } catch {
            res.sendStatus(404)
        }
    })
    .put(async function (req, res) { // update
        if (req.body.actor_id && req.body.actor_id != req.params.id) {
            res.status(400).json({ message: 'Invalid identifier' })
            return
        }
        if(noSonDatosValidos(req.body)){
            res.status(400).json({ message: 'Invalid format' })
            return
        }
        let row = await dbContext.actor.findByPk(req.params.id)
        if (!row) {
            res.sendStatus(404)
            return
        }
        row.set({ first_name: req.body.first_name, last_name: req.body.last_name })
        try {
            await row.save()
            res.sendStatus(204)
        } catch (error) {
            res.status(400).send(formatError(error))
        }
    })
    .delete(async function (req, res) { // remove
        let row = await dbContext.actor.findByPk(req.params.id)
        if (!row) {
            res.sendStatus(404)
            return
        }
        try {
            await row.destroy()
            res.sendStatus(204)
        } catch (error) {
            res.status(409).json(formatError(error, 409))
        }
    })

router.get('/:id/peliculas', async function (req, res) { // get one
    try {
        let row = await dbContext.actor.findByPk(req.params.id, { include: 'peliculas' })
        if (row)
            res.json(row.peliculas.map(item => ({ id: item.film_id, name: item.title })))
        else
            res.sendStatus(404)
    } catch {
        res.sendStatus(404)
    }
})
module.exports = router;
