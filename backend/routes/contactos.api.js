const express = require('express');
const { Op } = require('sequelize');
const { sequelize, dbContext } = require('../models/cursos/db-context')
const { formatError, formatLocation, problemDetails, generateErrorByError } = require('../lib/utils');
const { useAuthentication, readOnly, onlyInRole } = require('../lib/security');

const router = express.Router();
const dao = dbContext.Contactos;

router.use(useAuthentication)
router.use(readOnly)
router.use(onlyInRole('Administradores'))

function noSonDatosValidos(data) {
  // Schema
  // const valid = validate(data)
  // if (!valid) console.log(validate.errors)
  // return !valid;
  return false
}

/**
 * @swagger
 * tags:
 *   - name: contactos
 *     description: Mantenimiento de contactos
 */
/**
 * @swagger
 * /contactos:
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
 * "/contactos/{id}":
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
        if(noSonDatosValidos(req.body)){
            res.status(400).json({ message: 'Invalid format' })
            return
        }
        let row = await dao.build({ ...req.body })
        try {
            await row.save()
            res.append('location', formatLocation(req, row.id))
            res.sendStatus(201)
        } catch (error) {
            console.log(generateErrorByError(error))
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
        if (req.body.id && req.body.id != req.params.id) {
            res.status(400).json({ message: 'Invalid identifier' })
            return
        }
        if(noSonDatosValidos(req.body)){
            res.status(400).json({ message: 'Invalid format' })
            return
        }
        let row = await dao.findByPk(req.params.id)
        if (!row) {
            res.status(404).json(problemDetails(req, 404))
            return
        }
        row.set({ ...req.body })
        try {
            await row.save()
            res.sendStatus(204)
        } catch (error) {
            res.status(400).json(formatError(req, error))
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
