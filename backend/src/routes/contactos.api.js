const express = require('express');
const { Op } = require('sequelize');
const { dbContext } = require('../models/cursos/db-context')
const { formatError, formatLocation, problemDetails, ApiError } = require('../lib/utils');
const { useAuthentication, readOnly, onlyInRole } = require('../lib/security');
const Ajv = require("ajv")
const addFormats = require("ajv-formats")

const router = express.Router();
const dao = dbContext.Contactos;

// router.use(useAuthentication)
// router.use(readOnly)
// router.use(onlyInRole('Administradores'))

const ajv = new Ajv()
addFormats(ajv)

const schema = {
    "type": "object",
    "properties": {
        "id": { "type": "number" },
        "tratamiento": { "type": "string" },
        "nombre": { "type": "string" },
        "apellidos": { "type": "string" },
        "telefono": { "type": "string" },
        "email": { "type": "string" },
        "sexo": { "type": "string" },
        "nacimiento": { "type": "string" },
        "avatar": { "type": "string" },
        "conflictivo": { "type": "boolean" },
        "icono": { "type": "string" }
    },
    "required": [
        "id",
        "tratamiento",
        "nombre",
        "apellidos",
        "telefono",
        "email",
        "sexo",
        "nacimiento",
        "avatar",
        "conflictivo",
        "icono"
    ]
}
function throwsErrorIfInvalid(data) {
    const validate = ajv.compile(schema)
    if (!validate(data))
        throw new ApiError('Invalid format', validate.errors)
}

/**
 * @swagger
 * tags:
 *   - name: contactos
 *     description: Mantenimiento de contactos
 * components:
 *   schemas:
 *     ContactoModel:
 *       title: Contacto (Modelo)
 *       allOf:
 *         - $ref: "#/components/schemas/ContactoProjection"
 *       required:
 *         - id
 *         - nombre
 *     ContactoProjection:
 *       title: Contacto (Proyección)
 *       type: object
 *       properties:
 *         id:
 *           title: Id
 *           type: integer
 *           example: 1
 *           description: El 0 actúa como autonumérico en la creación
 *         tratamiento:
 *           title: Tratamiento
 *           type: string
 *           enum:
 *             - Sr.
 *             - Sra.
 *             - Srta.
 *             - Dr.
 *             - Dra.
 *             - Ilmo.
 *             - Ilma.
 *             - Excmo.
 *             - Excma.
 *           example: Excmo.
 *         nombre:
 *           title: Nombre
 *           type: string
 *           maxLength: 100
 *           example: Pietro
 *         apellidos:
 *           title: Apellidos
 *           type: string
 *           maxLength: 100
 *           example: Woodall
 *         telefono:
 *           title: Telefono
 *           type: string
 *           example: 642 051 348
 *           pattern: ^(\d{3}\s){2}\d{3}$
 *         email:
 *           title: Email
 *           type: string
 *           format: email
 *           maxLength: 100
 *           example: pwoodall0@army.mil
 *         nif:
 *           title: N.I.F.
 *           type: string
 *           format: nif
 *           example: 12345678Z
 *         sexo:
 *           title: Sexo
 *           type: string
 *           enum:
 *             - H
 *             - M
 *           example: H
 *         nacimiento:
 *           title: Nacimiento
 *           type: string
 *           format: date
 *           example: 1963-10-11
 *         avatar:
 *           title: Avatar
 *           type: string
 *           format: uri
 *           maxLength: 200
 *           example: https://randomuser.me/api/portraits/men/0.jpg
 *         conflictivo:
 *           title: Conflictivo
 *           type: boolean
 *           example: true
 *         icono:
 *           title: Icono
 *           type: string
 *           maxLength: 65000
 *           example: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALJSURBVDjLpVNbS1RRFP72nHGaUedmpamj5pgKSUli0eXJfOipoELs+hA+FFT44oMSRBkZ1GNC/oAoCJ+C8QaSZhdCTEU0rbyP05jTzOTczv20zkz6IBFBBxZrs9f+vv3t76zFNE3D/3zGjYXa01OuKUqtJstZqizPUnSb6+vDem29o8OpiuIFimZFEOZUQXiY09rq0WtMV6B2d98k8F2YTU4YOKjRCKTw+qQqSZcJFKPoTMty7Nu2pwRKJILY2DjiPv9TIrvGlK6uk5osvjSUl4ERGJIEmEyQlpeRmJpeUkQxaikp3mt2u4FwEPoFcDgR6u1FaHzivpGk3uDy88DiccDnBxQVkGWkFReAO3SgUONFcGYLMDxC71RTF1jTYTt2FIEPw1eMJLOCs9mAuXkqyoBGhxQF+PQFBjvtcwyY+aq7BIhyKgeCYCUqFJ636QSmJIAXAEFIEYhSimTFl1STvFkPjfYEqqmUJRFkpmokg9bJ+Z1MpgKfIICSAutAZcs6mSmMBvLCADLRYCCWfnlmBnDlAbEokCASnqcbhFQW+VRO7lPQX0CpG4GB17qCZyzc3u4mFf2WItdu864cYHIKWAv+bg5lU4V3bYxiFLHQd3CZNqT9zIynx7PLuAceTyg2OPiK9/kPqqEfeWmV+8HSqb8WvSkwue5dHUXIHkbFmQaUXmxETrYVIX6FC0YmFtlGK39rabHTm5pIVqOzqtJqzc8F3r2nNoxiaLkT1Q1NsMwOkLFvALsDAWMRPvYNzbOtszDf0FBNRI8dxYWHd9TWJE3rbzuF449egFWd3jwXvpOLkaGAxv40TJ/r6hxEco+8ue4syGVTC88TR85fsmQseSAk/KCWQ2Sdw/QsVtjfpnGipuYs9Ykr4pp3mqwZtwq2y0ajwYvImoyFVU6ReO02+9dxfnuusDkW9F3lFFakcNoKoZ6c6JPbfgHHGqU/+iLy1wAAAABJRU5ErkJggg==
 *         direcciones:
 *           title: Direcciones
 *           type: array
 *           uniqueItems: true
 *           items:
 *             title: Dirección
 *             type: object
 *             required:
 *               - calle
 *               - codigo
 *               - provincia
 *               - pais
 *             properties:
 *               calle:
 *                 title: Calle
 *                 type: string
 *                 maxLength: 500
 *                 example: 488 Pankratz Junction
 *               codigo:
 *                 title: Código Postal
 *                 type: string
 *                 example: "29071"
 *                 pattern: ^\d{4,5}$
 *               provincia:
 *                 title: Provincia
 *                 type: string
 *                 maxLength: 100
 *                 example: Malaga
 *               pais:
 *                 title: Pais
 *                 type: string
 *                 maxLength: 100
 *                 example: España
 *       additionalProperties: false
 *       minProperties: 1
 *     Contactos:
 *       type: array
 *       title: Contactos (Listado)
 *       items:
 *         $ref: "#/components/schemas/ContactoProjection"
 *     ContactosPage:
 *       type: object
 *       title: Contactos (Página)
 *       properties:
 *         content:
 *           $ref: "#/components/schemas/Contactos"
 *         totalElements:
 *           type: integer
 *           description: Número total de elementos
 *         totalPages:
 *           type: integer
 *           description: Número total de páginas
 *         size:
 *           type: integer
 *           description: Tamaño de página en elementos
 *         number:
 *           type: integer
 *           description: Número de página actual
 *         numberOfElements:
 *           type: integer
 *           description: Número total de elementos en la página
 *         empty:
 *           type: boolean
 *           description: Si la página está vacía
 *         first:
 *           type: boolean
 *           description: Si la página es la primera
 *         last:
 *           type: boolean
 *           description: Si la página es la última
 */
/**
 * @swagger
 * /api/contactos:
 *   get:
 *     tags:
 *       - contactos
 *     summary: Listar contactos
 *     parameters:
 *       - $ref: "#/components/parameters/pagina"
 *       - $ref: "#/components/parameters/filas"
 *       - $ref: "#/components/parameters/ordenar"
 *       - $ref: "#/components/parameters/buscar"
 *       - $ref: "#/components/parameters/proyeccion"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: "#/components/schemas/Contactos"
 *                 - $ref: "#/components/schemas/ContactosPage"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 *   post:
 *     tags:
 *       - contactos
 *     summary: Crear contacto
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ContactoModel"
 *       required: true
 *     responses:
 *       "201":
 *         $ref: "#/components/responses/Created"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 *   options:
 *     tags:
 *       - contactos
 *     summary: Sondeo CORS
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 * "/api/contactos/{id}":
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       description: Identificador del recurso
 *       schema:
 *         type: integer
 *   get:
 *     tags:
 *       - contactos
 *     summary: Recuperar contacto
 *     parameters:
 *       - in: query
 *         name: _projection
 *         description: Devuelve solo aquellas propiedades de la lista suministrada, los
 *           nombres de las propiedades deben ir separadas por comas.
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ContactoProjection"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 *       "404":
 *         $ref: "#/components/responses/NotFound"
 *   put:
 *     tags:
 *       - contactos
 *     summary: Reemplazar contacto
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ContactoModel"
 *       required: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ContactoProjection"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 *       "404":
 *         $ref: "#/components/responses/NotFound"
 *   delete:
 *     tags:
 *       - contactos
 *     summary: Borrar contacto
 *     responses:
 *       "204":
 *         $ref: "#/components/responses/NoContent"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 *       "404":
 *         $ref: "#/components/responses/NotFound"
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
            //options.attributes = ["id", "nombre", "apellidos"]
        }
        if (req.query.order) {
            options.order = req.query.order.split(',')
        }
        if (req.query.find) {
            options.where = { first_name: { [Op.startsWith]: req.query.find } }
        }
        try {
            let content = await dao.findAll(options)
            let totalElements = await dao.count()
            let totalPages = Math.ceil(totalElements / limit)
            res.json({
                content,
                totalElements,
                totalPages,
                number: totalElements === 0 ? 0 : page,
                empty: !totalElements,
                first: !totalElements && page === 0,
                last: !totalElements && page === (totalPages - 1),
                numberOfElements: content.length
            })
        } catch (error) {
            res.status(400).json(formatError(req, error))
        }

    })
    .post(async function (req, res) { // add
        try {
            throwsErrorIfInvalid(req.body)
            let reg = { ...req.body }
            delete reg.id
            let row = await dao.create(req)
            res.append('location', formatLocation(req, row.id))
            res.sendStatus(201)
        } catch (error) {
            res.status(400).json(formatError(req, error))
        }
    })

router.route('/:id')
    .get(async function (req, res) { // get one
        try {
            let row = await dao.findByPk(req.params.id)
            if (row)
                res.json(row)
            else
                res.status(404).json(problemDetails(req, 404))
        } catch {
            res.status(404).json(problemDetails(req, 404))
        }
    })
    .put(async function (req, res) { // update
        try {
            throwsErrorIfInvalid(req.body)
            if (req.body.id != req.params.id) throw new Error('Invalid identifier')
            let row = await dao.findByPk(req.params.id)
            if (!row) return res.sendStatus(404)
            row.set({ ...req.body })
            await row.save()
            res.sendStatus(204)
        } catch (error) {
            res.status(400).send(formatError(req, error))
        }
    })
    .delete(async function (req, res) { // remove
        let row = await dao.findByPk(req.params.id)
        if (!row) {
            res.status(404).json(problemDetails(req, 404))
            return
        }
        try {
            await row.destroy()
            res.sendStatus(204)
        } catch (error) {
            res.status(409).json(formatError(req, error, 409))
        }
    })

module.exports = router;
