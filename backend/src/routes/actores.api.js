const express = require('express');
const { Op } = require('sequelize');
const { formatError, formatLocation, ApiError } = require('../lib/utils')
const { dbContext } = require('../models/sakila/db-context')
const { useAuthentication, readOnly, onlyInRole } = require('../lib/security');
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

const validate = ajv.compile(schema)
function throwsErrorIfInvalid(data) {
    if (!validate(data))
        throw new ApiError(400, 'Invalid format', validate.errors)
}

const router = express.Router();

router.use( useAuthentication)
// // router.use(readOnly)
router.use(onlyInRole('Administradores'))

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
const getComun = async (req, res) => { // get all
    const page = +req.query.page || 0;
    const limit = +req.query.rows || 10;
    let options = { offset: page * limit, limit }
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

}
router.route('/v1')
    .get(getComun)
    .post(async function (req, res) { // add
        try {
            throwsErrorIfInvalid(req.body)
            const reg = { firstName: req.body.firstName, lastName: req.body.lastName }
            let row = await dbContext.Actor.create(reg)
            // let row = await dbContext.Actor.create({ firstName: req.body.firstName, lastName: req.body.lastName })
            res.append('location', formatLocation(req, row.actorId))
            res.status(201).end('')
        } catch (error) {
            res.status(400).send(formatError(req, error))
        }
    })
router.route('/v2')
    .get(getComun)
    .post(async function (req, res) { // add
        try {
            throwsErrorIfInvalid(req.body)
            let row = await dbContext.Actor.create({ firstName: req.body.firstName, lastName: req.body.lastName })
            res.append('location', formatLocation(req, row.actorId))
            res.status(201).end('')
        } catch (error) {
            res.status(400).send(formatError(req, error))
        }
    })

router.route('/v1/:id')
    .get(async function (req, res) { // get one
        try {
            let row = await dbContext.Actor.findByPk(req.params.id)
            if (row)
                res.json(row)
            else
                res.sendStatus(404)
        } catch (error) {
            res.status(400).send(formatError(req, error))
        }
    })
    .put(async function (req, res) { // update
        try {
            throwsErrorIfInvalid(req.body)
            if (req.body.actorId != req.params.id) throw new ApiError(400, 'No coinciden los identificadores')
        } catch (error) {
            return res.status(400).send(formatError(req, error))
        }
        try {
            let row = await dbContext.Actor.findByPk(req.params.id)
            if (!row) return res.sendStatus(404)
            row.set({ firstName: req.body.firstName, lastName: req.body.lastName })
            await row.save()
            res.sendStatus(204)
        } catch (error) {
            res.status(400).send(formatError(req, error))
        }
    })
    .delete(async function (req, res) { // remove
        let row = await dbContext.Actor.findByPk(req.params.id)
        if (!row) {
            return res.sendStatus(404)
        }
        try {
            await row.destroy()
            res.sendStatus(204)
        } catch (error) {
            res.status(409).json(formatError(req, error, 409))
        }
    })

router.get('/v*/:id/peliculas', async function (req, res) { // get one
    try {
        let row = await dbContext.Actor.findByPk(req.params.id, { include: 'filmIdFilms' })
        if (row)
            res.json(row.filmIdFilms.map(item => ({ id: item.filmId, name: item.title })))
        else
            res.sendStatus(404)
    } catch {
        res.sendStatus(404)
    }
})
module.exports = router;
