const express = require('express');
const { Op } = require('sequelize');
const { formatError, formatLocation, ApiError } = require('../lib/utils')
const { dbContext } = require('../models/sakila/db-context')
// const security = require("../lib/security");
const Ajv = require("ajv")
const addFormats = require("ajv-formats")

const ajv = new Ajv()
addFormats(ajv)

const schema = {
    "type": "object",
    "properties": {
        "actorId": {
            "type": "integer"
        },
        "firstName": {
            "type": "string"
        },
        "lastName": {
            "type": "string"
        },
    },
    "required": [
        "actorId",
        "firstName",
        "lastName",
    ]
}

function throwsErrorIfInvalid(data) {
    const validate = ajv.compile(schema)
    if (!validate(data))
        throw new ApiError('Invalid format', validate.errors)
}

const router = express.Router();

// router.use(security.onlyAuthenticated)
// router.use(security.onlyInRole('Empleados,Administradores'))

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
/**
* @swagger
* tags:
*   - name: actores
*     description: Mantenimiento de actores
*/
/**
 * @swagger
 *
 * /api/actores:
 *   get:
 *     tags: [ actores ]
 *     summary: Consulta actores
 *     responses:
 *       "200":
 *         description: "OK"
 */
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
            options.attributes = ["actorId", "firstName", "lastName"]
        }
        if (req.query.order) {
            options.order = req.query.order.split(',')
        }
        if (req.query.find) {
            options.where = { firstName: { [Op.startsWith]: req.query.find } }
        }
        try {
            let resultado = await dbContext.Actor.findAll(options)
            let totalRows = await dbContext.Actor.count()
            // res.json(resultado)
            res.json({ totalRows, page, totalPages: Math.ceil(totalRows / limit), listado: resultado })
        } catch (error) {
            res.status(400).json(formatError(req, error))
        }

    })
    .post(async function (req, res) { // add
        try {
            throwsErrorIfInvalid(req.body)
            let row = await dbContext.Actor.create({ firstName: req.body.firstName, lastName: req.body.lastName })
            res.append('location', formatLocation(req, row.actorId))
            res.sendStatus(201)
        } catch (error) {
            res.status(400).send(formatError(req, error))
        }
    })

router.route('/:id')
    .get(async function (req, res) { // get one
        try {
            let row = await dbContext.Actor.findByPk(req.params.id)
            if (row)
                res.json(row)
            else
                res.sendStatus(404)
        } catch {
            res.sendStatus(404)
        }
    })
    .put(async function (req, res) { // update
        try {
            throwsErrorIfInvalid(req.body)
            if (req.body.actorId != req.params.id) throw new Error('Invalid identifier')
        } catch (error) {
            return res.status(400).send(formatError(req, error))
        }
        let row = await dbContext.Actor.findByPk(req.params.id)
        if (!row) return res.sendStatus(404)
        row.set({ firstName: req.body.firstName, lastName: req.body.lastName })
        try {
            await row.save()
            res.sendStatus(204)
        } catch (error) {
            res.status(400).send(formatError(req, error))
        }
    })
    .delete(async function (req, res) { // remove
        let row = await dbContext.Actor.findByPk(req.params.id)
        if (!row) {
            res.sendStatus(404)
            return
        }
        try {
            await row.destroy()
            res.sendStatus(204)
        } catch (error) {
            res.status(409).json(formatError(req, error, 409))
        }
    })

router.get('/:id/peliculas', async function (req, res) { // get one
    try {
        let row = await dbContext.Actor.findByPk(req.params.id, { include: 'peliculas' })
        if (row)
            res.json(row.peliculas.map(item => ({ id: item.film_id, name: item.title })))
        else
            res.sendStatus(404)
    } catch {
        res.sendStatus(404)
    }
})
module.exports = router;
