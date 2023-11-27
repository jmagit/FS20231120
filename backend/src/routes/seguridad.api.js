const security = require('../lib/security')
const { dbContext } = require('../models/cursos/db-context')
const { generateErrorByStatus, generateError, formatError, extractURL, } = require('../lib/utils');
const xml2js = require('xml2js');
const builder = new xml2js.Builder();
const express = require('express');
const router = express.Router();
module.exports = router;

const sendAccessTokenDTO = (req, res, element) => {
  let payload = {
      success: true,
      token: security.generarTokenScheme(element),
      refresh: security.RefreshTokenHMAC256.generar(element),
      name: element.nombre,
      roles: element.roles,
      expires_in: security.config.EXPIRACION_MIN * 60
  }
  res.format({
      'application/json': function () {
           res.status(200).json(payload) 
          },
      'application/xml': function () { 
          res.status(200).end(builder.buildObject(payload)) 
      },
      'default': function () { res.status(406).send('Not Acceptable') }
    })
}


// Rutas: Control de acceso
/**
* @swagger
* tags:
*   - name: autenticación
*     description: Login
*   - name: registro
*     description: Cuentas de usuarios
*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       description: Credenciales de autenticación
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           example: 'adm@example.com'
 *         password:
 *           type: string
 *           format: password
 *           example: 'P@$$$$w0rd'
 *     RespuestaLogin:
 *       type: object
 *       title: Respuesta Login
 *       properties:
 *         success:
 *           type: boolean
 *         token:
 *           type: string
 *         refresh:
 *           type: string
 *         name:
 *           type: string
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *         expires_in:
 *           type: integer
 *           format: int32
 *     RefreshToken:
 *       type: object
 *       title: Token de petición de refresco
 *       properties:
 *         token:
 *           type: string
*/
/**
* @swagger
*
* /login:
*   post:
*     tags: [ autenticación ]
*     summary: Iniciar sesión
*     requestBody:
*       content:
*         application/json:
*           schema:
*             $ref: "#/components/schemas/Login"
*         application/x-www-form-urlencoded:
*           schema:
*             type: object
*             properties:
*               name:
*                 description: Usuario
*                 type: string
*               password:
*                 description: Contraseña
*                 type: string
*                 format: password
*       required: true
*     responses:
*       "200":
*         description: "Resultado de la autenticación"
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/schemas/RespuestaLogin"
*       "400":
*         $ref: "#/components/responses/BadRequest"
*/
router.post('/login', async (req, res, next) => {
  if (!req.body || !req.body.username || !req.body.password || !security.config.PASSWORD_PATTERN.test(req.body.password)) {
    return next(generateErrorByStatus(res, 400))
  }
  let username = req.body.username
  let password = req.body.password
  try {
    const usr = await dbContext.Usuarios.findByPk(username, { include: 'idRolRoles' })
    if (usr && await security.verificaPassword(password, usr.password)) {
      sendAccessTokenDTO(req, res, { idUsuario: username, nombre: usr.nombre, roles: usr.idRolRoles.map(item => item.idRol) })
    } else {
      res.status(200).json({ success: false })
    }
  } catch (error) {
    res.status(400).json(formatError(req, error))
  }
})
/**
* @swagger
*
* /login/refresh:
*   post:
*     tags: [ autenticación ]
*     summary: Volver a iniciar sesión con el token de refresco
*     requestBody:
*       content:
*         application/json:
*           schema:
*             $ref: "#/components/schemas/RefreshToken"
*       required: true
*     responses:
*       "200":
*         description: "Resultado de la autenticación"
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/schemas/RespuestaLogin"
*       "400":
*         $ref: "#/components/responses/BadRequest"
*/
router.post('/login/refresh', async function (req, res, next) {
  if (!req.body || !req.body.token) {
    return next(generateErrorByStatus(res, 400))
  }
  try {
    let decoded = security.RefreshTokenHMAC256.decode(req.body.token);
    let username = decoded.usr
    try {
      const usr = await dbContext.Usuarios.findByPk(username, { include: 'idRolRoles' })
      if (usr /*&& usr.activo*/) {
        sendAccessTokenDTO(req, res, { idUsuario: username, nombre: usr.nombre, roles: usr.idRolRoles.map(item => item.idRol) })
      } else {
        res.status(200).json({ success: false })
      }
    } catch (error) {
      res.status(400).json(formatError(req, error))
    }
  } catch (err) {
    let result;
    switch (err.name) {
      case 'TokenExpiredError':
        res.set('WWW-Authenticate', 'Bearer realm="MicroserviciosJWT", error="invalid_token", error_description="The access token expired"')
        result = generateError(req, `Invalid token: token expired`, 403, [{ expiredAt: err.expiredAt }])
        break;
      case 'NotBeforeError':
        result = generateError(req, `Invalid token: token not active`, 403, [{ notBefore: err.date }])
        break;
      default:
        result = generateError(req, 'Invalid token', 403)
        break;
    }
    res.status(403).json(result.payload)
  }
})
/**
* @swagger
*
* /login/signature:
*   get:
*     tags: [ autenticación ]
*     summary: Clave publica para validar el token JWT
*     responses:
*       "200":
*         description: "OK"
*         content:
*           text/plain:
*             schema:
*               type: string
*/
router.get('/login/signature', function (_req, res) {
  res.contentType('text/plain').send(security.config.PUBLIC_KEY)
})
/**
* @swagger
*
* /logout:
*   post:
*     tags: [ autenticación ]
*     summary: Cerrar sesión
*     responses:
*       "204":
*         description: "OK"
*/
router.all('/logout', function (_req, res) {
  res.sendStatus(204)
})
/**
* @swagger
*
* /register:
*   post:
*     tags: [ registro ]
*     summary: Registrar un nuevo usuario
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               idUsuario:
*                 type: string
*                 format: email
*               nombre:
*                 type: string
*               password:
*                 type: string
*                 format: password
*       required: true
*     responses:
*       "202":
*         description: "Accepted"
*         content:
*           application/json:
*             schema:
*               type: object
*               description: webhook para controlar el registro del usuario
*               properties:
*                 statusGetUri:
*                   description: webhook vía GET para consultar el estado del registro
*                   type: string
*                   format: uri
*                 confirmGetUri:
*                   description: webhook vía GET para confirmar el email y activar al usuario
*                   type: string
*                   format: uri
*                 rejectGetUri:
*                   description: webhook vía GET para rechazar el email y borrar al usuario
*                   type: string
*                   format: uri
*       "400":
*         $ref: "#/components/responses/BadRequest"
*/
router.post('/register', async function (req, res, next) {
  if (!security.config.PASSWORD_PATTERN.test(req.body.password)) {
    return next(generateError(res, 'Formato incorrecto de la password.', 400))
  }
  try {
    await dbContext.Usuarios.create({
      idUsuario: req.body.idUsuario,
      password: await security.encriptaPassword(req.body.password),
      nombre: req.body.nombre,
      roles: 'Usuarios',
      activo: null,
    })
    const token = security.CreatedTokenHMAC256.generar({ idUsuario: req.body.idUsuario })
    const location = extractURL(req)
    res.status(202).json({
      statusGetUri: `${location}/status?instance=${token}`,
      confirmGetUri: `${location}/confirm?instance=${token}`,
      rejectGetUri: `${location}/reject?instance=${token}`
    })
  } catch (error) {
    return next(error.name === 'SequelizeUniqueConstraintError' ? generateError(res, 'El usuario ya existe.', 400) : formatError(req, error))
  }
})
/**
* @swagger
* components:
*   schemas:
*     RegisterStatus:
*       title: Estado Registro
*       description: Credenciales de autenticación
*       type: object
*       required:
*         - username
*         - password
*       properties:
*         status:
*           type: string
*           enum:
*             - pending
*             - complete
*             - canceled
*         result:
*           type: string
*           enum:
*             - confirm
*             - reject
*             - canceled
*             - timeout
* @swagger
* /register/status:
*   get:
*     tags: [ registro ]
*     summary: Estado del registro un nuevo usuario
*     parameters:
*       - name: instance
*         in: query
*         required: true
*         description: Identificador la instancia
*         schema:
*           type: string
*     responses:
*       "200":
*         description: "Finalize"
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/schemas/RegisterStatus"
*       "202":
*         description: "Pending"
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/schemas/RegisterStatus"
*       "400":
*         $ref: "#/components/responses/BadRequest"
*/
router.get('/register/status', async function (req, res, next) {
  if (!req.query.instance) {
    return next(generateError(res, 'Falta la instancia.', 400))
  }
  let username;
  try {
    username = security.CreatedTokenHMAC256.decode(req.query.instance).usr
  } catch (ex) {
    return res.status(200).json({ status: 'canceled', result: 'timeout' }).end()
  }
  try {
    let element = await dbContext.Usuarios.findByPk(username)
    if (!element) {
      res.status(200).json({ status: 'complete', result: 'reject' }).end()
    } else if (element.activo === null) {
      res.status(202).json({ status: 'pending' }).end()
    } else {
      res.status(200).json({ status: 'complete', result: element.activo ? 'confirm' : 'reject' }).end()
    }
  } catch (error) {
    res.status(400).json(formatError(req, error))
  }
})
/**
* @swagger
* /register/confirm:
*   get:
*     tags: [ registro ]
*     summary: Confirmar el email y activar al usuario
*     parameters:
*       - name: instance
*         in: query
*         required: true
*         description: Identificador la instancia
*         schema:
*           type: string
*     responses:
*       "204":
*         $ref: "#/components/responses/NoContent"
*       "400":
*         $ref: "#/components/responses/BadRequest"
*/
router.get('/register/confirm', async function (req, res, next) {
  if (!req.query.instance) {
    return next(generateError(res, 'Falta la instancia.', 400))
  }
  let username;
  try {
    username = security.CreatedTokenHMAC256.decode(req.query.instance).usr
  } catch (ex) {
    return next(generateError(res, 'Ya no existe la instancia.', 400))
  }
  try {
    const count = await dbContext.Usuarios.update({ activo: true }, { where: { idUsuario: username } })
    res.sendStatus(count ? 204 : 404)
  } catch (error) {
    res.status(500).json(formatError(req, error))
  }
})
/**
* @swagger
* /register/reject:
*   get:
*     tags: [ registro ]
*     summary: Rechazar el email y borrar al usuario
*     parameters:
*       - name: instance
*         in: query
*         required: true
*         description: Identificador la instancia
*         schema:
*           type: string
*     responses:
*       "204":
*         $ref: "#/components/responses/NoContent"
*       "400":
*         $ref: "#/components/responses/BadRequest"
*/
router.get('/register/reject', async function (req, res, next) {
  if (!req.query.instance) {
    return next(generateError(res, 'Falta la instancia.', 400))
  }
  let username;
  try {
    username = security.CreatedTokenHMAC256.decode(req.query.instance).usr
  } catch (ex) {
    return next(generateError(res, 'Ya no existe la instancia.', 400))
  }
  try {
    const count = await dbContext.Usuarios.update({ activo: false }, { where: { idUsuario: username } })
    res.sendStatus(count ? 204 : 404)
  } catch (error) {
    res.status(500).json(formatError(req, error))
  }
})

let autenticados = express.Router();
autenticados.use(security.useAuthentication)
autenticados.use(security.onlyAuthenticated)

/**
* @swagger
*
* /register:
*   get:
*     tags: [ registro ]
*     summary: Consultar su usuario
*     security:
*       - bearerAuth: []
*       - cookieAuth: []
*     responses:
*       "200":
*         description: "OK"
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 idUsuario:
*                   type: string
*                   format: email
*                 nombre:
*                   type: string
*                 roles:
*                   type: array
*                   items:
*                     type: string
*       "401":
*         $ref: "#/components/responses/Unauthorized"
*/
autenticados.get('/', async function (req, res) {
  let username = res.locals.usr;
  try {
    const row = await dbContext.Usuarios.findByPk(username, { include: 'idRolRoles' })
    res.status(200).json({ 
      idUsuario: row.idUsuario, 
      nombre: row.nombre, 
      roles: row.roles.split(',') 
    })
  } catch (error) {
    res.status(400).json(formatError(req, error))
  }
})
/**
* @swagger
*
* /register:
*   put:
*     tags: [ registro ]
*     summary: Modificar el nombre de su usuario
*     security:
*       - bearerAuth: []
*       - cookieAuth: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               nombre:
*                 type: string
*             required:
*               - nombre
*       required: true
*     responses:
*       "204":
*         $ref: "#/components/responses/NoContent"
*       "403":
*         $ref: "#/components/responses/Forbidden"
*       "404":
*         $ref: "#/components/responses/NotFound"
*/
autenticados.put('/', async function (req, res, next) {
  if (!req.body || !req.body.nombre) {
    return next(generateErrorByStatus(res, 400))
  }
  try {
    const count = await dbContext.Usuarios.update({ nombre: req.body.nombre }, { where: { idUsuario: res.locals.usr } })
    res.sendStatus(count ? 204 : 404)
  } catch (error) {
    res.status(500).json(formatError(req, error))
  }
})
/**
* @swagger
*
* /register/password:
*   put:
*     tags: [ registro ]
*     summary: Cambiar su contraseña
*     security:
*       - bearerAuth: []
*       - cookieAuth: []
*     description: Es necesario conocer la contraseña actual antes de cambiarla
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               oldPassword:
*                 type: string
*                 format: password
*               newPassword:
*                 type: string
*                 format: password
*       required: true
*     responses:
*       "204":
*         $ref: "#/components/responses/NoContent"
*       "400":
*         $ref: "#/components/responses/BadRequest"
*       "403":
*         $ref: "#/components/responses/Forbidden"
*       "404":
*         $ref: "#/components/responses/NotFound"
*/
autenticados.put('/password', async function (req, res, next) {
  if (!req.body || !req.body.oldPassword || !req.body.newPassword) {
    return next(generateErrorByStatus(res, 400))
  }
  try {
    const usr = await dbContext.Usuarios.findByPk(res.locals.usr)
    if (usr && await security.verificaPassword(req.body.oldPassword, usr.password) 
      && security.config.PASSWORD_PATTERN.test(req.body.newPassword)) {
        usr.password = await security.encriptaPassword(req.body.newPassword)
        usr.save()
        res.sendStatus(204)
    } else {
      return next(generateErrorByStatus(res, 400))
    }
  } catch (error) {
    res.status(500).json(formatError(req, error))
  }
})

router.use('/register', autenticados)
