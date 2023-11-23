const http = require('http');
const production = process.env.NODE_ENV === 'production';

class ApiError extends Error {
    constructor(message) {
        super(message);
        this.name = "ApiError";
    }
}
module.exports.ApiError = ApiError

exports.extractURL = (req) => `${req.protocol}://${req.hostname}:${req.connection.localPort}${req.originalUrl}`
exports.formatLocation = (req, id) => `${req.protocol}://${req.hostname}:${req.connection.localPort}${req.originalUrl}/${id}`
exports.formatError = (req, error, status = 400) => {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError')
        return {
            type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
            status: 400,
            title: 'One or more validation errors occurred.',
            instance: req.originalUrl,
            errors: Object.assign({}, ...error.errors.map(item => ({ [item.path]: item.message })))
        }
    return { type: 'about:blank', status, title: error.message, instance: req.originalUrl }
}
const details = {
    400: { type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1', title: 'Bad Request' },
    401: { type: 'https://datatracker.ietf.org/doc/html/rfc7235#section-3.1 ', title: 'Unauthorized' },
    402: { type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.2', title: 'Payment Required' },
    403: { type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.3', title: 'Forbidden' },
    404: { type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4', title: 'Not Found' },
    405: { type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.5', title: 'Method Not Allowed' },
    406: { type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.6', title: 'Not Acceptable' },
    407: { type: 'https://datatracker.ietf.org/doc/html/rfc7235#section-3.2 ', title: 'Proxy Authentication Required' },
    408: { type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.7', title: 'Request Timeout' },
    409: { type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.8', title: 'Conflict' },
    410: { type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.9', title: 'Gone' },
    411: { type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.10', title: 'Length Required' },
    412: { type: 'https://datatracker.ietf.org/doc/html/rfc7232#section-4.2 ', title: 'Precondition Failed' },
    413: { type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.11', title: 'Request Entity Too Large' },
    414: { type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.12', title: 'Request-URI Too Long' },
    415: { type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.13', title: 'Unsupported Media Type' },
    416: { type: 'https://datatracker.ietf.org/doc/html/rfc7233#section-4.4 ', title: 'Requested Range Not Suitable' },
    417: { type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.14', title: 'Expectation Failed' },
    426: { type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.15', title: 'Upgrade Required' },
    500: { type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.1', title: 'Internal Server Error' },
}
exports.problemDetails = (req, status = 400) => {
    return Object.assign({}, details[status], { status, instance: req.originalUrl })
}
const generateError = (detail, status = 500, errors = undefined, source = undefined) => {
    const title = http.STATUS_CODES[status] || '(desconocido)'
    let error = new ApiError(title)
    error.payload = { type: details[status].type || 'about:blank', title, status, detail }
    if (errors) error.payload.errors = errors
    if (source) error.payload.source = source
    return error
}

module.exports.generateError = generateError
module.exports.generateErrorByStatus = (status = 500) => {
    return generateError(http.STATUS_CODES[status] || '(desconocido)', status)
}
module.exports.generateErrorByError = (error, status = 500) => {
    switch (error.name) {
        case 'dbJSONError':
            return generateError(error.message, error.code)
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            return generateError('One or more validation errors occurred.', 400,
                Object.assign({}, ...error.errors.map(item => ({ [item.path]: item.message }))))
        default:
            return generateError(error.message, error.statusCode || error.status || status, error.errors, production ? null : (error.trace || error.stack), error.name)
    }
}
