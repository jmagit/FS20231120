const { createPrivateKey, createPublicKey } = require('crypto')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { generateErrorByStatus, generateError } = require('./utils')
const express = require('express');
const xml2js = require('xml2js');
const builder = new xml2js.Builder();

const security = {
    APP_SECRET: 'Es segura al 99%',
    PRIVATE_KEY: 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDHp+JR9/LfZAtXeJFLRANM/j3HvnoEqYeK3w294veF0cUZvya9sXoTYR4Pls/wy5IFIW8gxjD35mXUmo3cMsfm0KgxdQDQD0W8qx52bE8Gh5uww4LHSlIwzwnkHFHmgYtg1k56d9s+e8kYLRkq3DGxZ7SwKgzNhQXUVUoNLbsPr4hVZYd7BABC5KCOHhd6rBxZyK6HDLcoNyfmkospNJQHps/SYmbt+MlyTpvFXWrcj4ttVLKXwjefxkaxF4YNrZrO4aCXuOeJG8Q9IOXxdXkdsP5WJEUnWP63Jca8cyJMCS41GAowb9ratjm0eeTA130eHBMJuJyV2UtKcoB/0IoXAgMBAAECggEAGJ8Zh+Y961KZG3Zg5JlElvAbilBxF7YYYwXS2gHtaHFQDzbFfksutMkbPezpQ9a28S8IV1BZpZiiIi/VIryYblx5AXBeY0oe3X90yEHfFP0QNCJING9z51UA8UKUzwpWt+B12SCCxxfY2sRlACYbcrdJTxhAb+/hoifKdAmZsftJqSiGuMlYWbi6Q3Lk+tsHVPVCwqyf8puZEFTf76s2yY/ySTAhNL4drd64++sVlQbgieSGnOqFv6ai12XJbuYOZE0Dce9+r3PRvDVQhMDajG7AuAJd4fmwFjJR3aPwyxGVv0oZk5KmqM6hTV1mxBLuZvqBYLAZojYl45i/GnEzYQKBgQD2yXJsRJyh7l8H4wCHIeUGXrpF+IbSaz5vK6hGqs4Xw5rOiA+wcYKIMqYnG1cfX/rP3hPh5kzz96wsAyL0jzZhbCP2Miz35XYAm+LgQzhAN6VXtwUHWQDAehhmM00y3X/gu1I+3IffB9fVGh4xK1T49mDnq+pZ+HWsORu5Vr/n/wKBgQDPHADLOO+JT7yFmCMP0PQfSy0UPTNDuaDdWVtnQYwZ68a0SIk+ygZNCEbeYEhCO+Kq7/S3DcmQHYq54O7G8LP/+oxCmSXLkA5hwJFOJtC5hea+i0JHG5UvOmDvRBojaSO5xxC17PREL/QOMV0niEd1VYFBcCFt79C1P6DQDiGd6QKBgCiX4jZk4s7QAtmtQTz5Gk797e3sf2DFOzPWHovhNJ08E469WrdPNIVqr2HnYWFLzFm80dBqrWXD65IhwfIwTGWiABhTEIqGN+7JtXvmEq6deJkBBda7kSAX9UN6VMx1Gr/AkDq+06qgA6SN80FrO0LoY/A3mwjJkbGOgzztRAvJAoGBAJa85+sBVn4W9bw6HZK+X1+DZJztailpqqZQChGeCG05SJcgkBuOCIX6dzIU26KxWWlWWkL9Gu30QmrFRqSuviOZ5In4UyTUhVMqR9ecsp/E0Etwqd19Othz4edjJq8NL/5f30651pLmX/gQf59tNa01fWz2Qq50M/AnDlE/Z8I5AoGBALil+ccLACzw2W3qrU44HEpXYY91RLE9ANXUlM9OfbnHYfrI6wZylRA5TjcAcaLHwC88c/yLalVEJXnSgBpm9MNmQPE6tNGU7+IIn6cdIbX1eW6QUPWU5yLwiFlntkp/v+WwURN3sIQWegtOacAp5R78nJLpeWm1WmuFOYJ0glaF',
    PUBLIC_KEY: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx6fiUffy32QLV3iRS0QDTP49x756BKmHit8NveL3hdHFGb8mvbF6E2EeD5bP8MuSBSFvIMYw9+Zl1JqN3DLH5tCoMXUA0A9FvKsedmxPBoebsMOCx0pSMM8J5BxR5oGLYNZOenfbPnvJGC0ZKtwxsWe0sCoMzYUF1FVKDS27D6+IVWWHewQAQuSgjh4XeqwcWciuhwy3KDcn5pKLKTSUB6bP0mJm7fjJck6bxV1q3I+LbVSyl8I3n8ZGsReGDa2azuGgl7jniRvEPSDl8XV5HbD+ViRFJ1j+tyXGvHMiTAkuNRgKMG/a2rY5tHnkwNd9HhwTCbicldlLSnKAf9CKFwIDAQAB',
    AUTHENTICATION_SCHEME: 'Bearer ',
    PROP_USERNAME: 'idUsuario',
    PROP_PASSWORD: 'password',
    PROP_NAME: 'idUsuario',
    PASSWORD_PATTERN: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
    USR_FILENAME: './data/usuarios.json',
    EXPIRACION_MIN: 5,
    REFRESH_FACTOR: 4,
    USERNAME: 'adm@example.com',
    PASSWORD: 'P@$$w0rd',
}

module.exports.encriptaPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

module.exports.RefreshTokenHMAC256 = {
    generar: (usuario) => {
        return jwt.sign({
            usr: usuario[security.PROP_USERNAME],
        }, security.APP_SECRET, { issuer: 'MicroserviciosJWT', audience: 'authorization', expiresIn: security.EXPIRACION_MIN * security.REFRESH_FACTOR + 'm', notBefore: security.EXPIRACION_MIN + 'm' })
    },
    decode: (token) => {
        return jwt.verify(token, security.APP_SECRET);
    }
}

const TokenRS256 = {
    generar: (usuario) => {
        let buff = Buffer.from(security.PRIVATE_KEY, 'base64');

        return jwt.sign({
            usr: usuario[security.PROP_USERNAME],
            name: usuario.nombre,
            roles: usuario.roles
        }, createPrivateKey({ key: buff, format: 'der', type: 'pkcs8' }), { issuer: 'MicroserviciosJWT', audience: 'authorization', algorithm: 'RS256', expiresIn: security.EXPIRACION_MIN + 'm' })
    },
    decode: (token) => {
        let buff = Buffer.from(security.PUBLIC_KEY, 'base64');
        return jwt.verify(token, createPublicKey({ key: buff, format: 'der', type: 'spki' }), { algorithms: ['RS256'] });
    }
}
const CreatedTokenHMAC256 = {
    generar: (usuario) => {
        return jwt.sign({
            usr: usuario[security.PROP_USERNAME],
        }, security.APP_SECRET, { expiresIn: '24h' })
    },
    decode: (token) => {
        return jwt.verify(token, security.APP_SECRET);
    }
}
module.exports.CreatedTokenHMAC256 = CreatedTokenHMAC256;
module.exports.generarTokenJWT = TokenRS256.generar
module.exports.generarTokenScheme = (usuario) => {
    return security.AUTHENTICATION_SCHEME + module.exports.generarTokenJWT(usuario)
}

// Middleware: Autenticación
module.exports.useAuthentication = (req, res, next) => {
    res.locals.isAuthenticated = false;
    let token = ''
    if (!req.headers['authorization']) {
        if (!req.cookies['Authorization']) {
            next();
            return;
        }
        token = req.cookies['Authorization'];
    } else
        token = req.headers['authorization'].substring(security.AUTHENTICATION_SCHEME.length)
    try {
        let decoded = TokenRS256.decode(token);
        res.locals.isAuthenticated = true;
        res.locals.usr = decoded.usr;
        res.locals.name = decoded.name;
        res.locals.roles = decoded.roles;
        res.locals.isInRole = role => res.locals.roles.includes(role)
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            res.set('WWW-Authenticate', 'Bearer realm="MicroserviciosJWT", error="invalid_token", error_description="The access token expired"')
            return next(generateError(`Invalid token: token expired`, 403, { expiredAt: err.expiredAt }))
        }
        return next(generateError('Invalid token', 401))
    }
}

// Middleware: Autorización
module.exports.onlyAuthenticated = (req, res, next) => {
    if (req.method === 'OPTIONS') return next()
    if (!res.locals.isAuthenticated) return next(generateErrorByStatus(401))
    next()
}

module.exports.onlyInRole = (roles) => (req, res, next) => {
    if (req.method === 'OPTIONS') return next()
    if (!res.locals.isAuthenticated) return next(generateErrorByStatus(401))
    if (roles.split(',').some(role => res.locals.isInRole(role))) {
        next()
    } else {
        return next(generateErrorByStatus(403))
    }
}

module.exports.onlySelf = (_req, res, next) => {
    res.locals.onlySelf = true;
    next()
}
module.exports.readOnly = (req, res, next) => (!['GET', 'OPTIONS'].includes(req.method) && !res.locals.isAuthenticated) ? next(generateErrorByStatus(401)) : next()

module.exports.isSelf = (res, id) => !res.locals.onlySelf || !id || id == res.locals.usr

function sendLogin(req, res, element) {
    let token = module.exports.generarTokenScheme(element)
    let payload = {
        success: true,
        token: module.exports.generarTokenScheme(element),
        refresh: module.exports.RefreshTokenHMAC256.generar(element),
        name: element.nombre || element[security.PROP_NAME],
        roles: element.roles,
        expires_in: security.EXPIRACION_MIN * 60
    }
    if (req.query.cookie)
        res.cookie('Authorization', token.substring(security.AUTHENTICATION_SCHEME.length), { maxAge: 3600000 })
    // res.status(200).json(payload)
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

const router = express.Router();
router.post('/', async function (req, res, next) {
    if (!req.body || !req.body.username || !req.body.password) {
        // setTimeout(() => next(generateErrorByStatus(400)), 1000)
        return next(generateErrorByStatus(400))
    }
    let usr = req.body.username
    let pwd = req.body.password
    if (!security.PASSWORD_PATTERN.test(pwd)) {
        // setTimeout(() => next(generateErrorByStatus(400)), 1000)
        return next(generateErrorByStatus(400))
    }
    let list = [
        {
            "idUsuario": "adm@example.com",
            "password": "$2b$10$5i7NYY8y3qmK3bmLmU8uMOHTawhPq7ddD7F6SfOf9ZKz76V8XssM6",
            "nombre": "Administrador",
            "roles": [
                "Usuarios",
                "Administradores"
            ],
            "activo": true
        },
    ]
    let element = list.find(item => item[security.PROP_USERNAME] == usr && item.activo)
    if (element && await bcrypt.compare(pwd, element[security.PROP_PASSWORD])) {
        sendLogin(req, res, element)
    } else {
        res.status(200).json({ success: false })
    }
})
module.exports.api = router