const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const xmlParser = require('express-xml-bodyparser');
const logger = require('morgan');
const rfs = require('rotating-file-stream')
const { formatError, emptyPropertiesToNull } = require('./lib/utils');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

// const helmet = require('helmet')
// app.use(helmet())

//app.use(logger('dev'));
app.use(logger('combined', {
  stream: rfs.createStream("file.log", {
    path: path.join(__dirname, '../log'), // directory
    size: "10M", // rotate every 10 MegaBytes written
    interval: "1d", // rotate daily
    compress: "gzip" // compress rotated files
  })
}))

// Body parse
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(xmlParser());
app.use(cookieParser());
app.use((req, res, next) => {
  req.body = emptyPropertiesToNull(req.body)
  next()
})
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/saluda', require('./routes/saludos'));
app.use('/', require('./routes/upload'));
app.use('/', require('./routes/seguridad.api'));
app.use('/api/actores', require('./routes/actores.api'));
app.use('/api/contactos', require('./routes/contactos.api'));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./routes/openapi-generator').openapiSpecification;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const OpenApiValidator = require('express-openapi-validator');
const validator = require('validator')
app.use(
  OpenApiValidator.middleware({
    apiSpec: swaggerDocument,
    validateRequests: true, // true by default
    // validateResponses: true, // false by default
    ignoreUndocumented: true,
    formats: [
      { name: 'nif', type: 'string', validate: (v) => validator.isIdentityCard(v, 'ES') },
    ]
  })
)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, _next) {
  // set locals, only providing error in development
  if (req.accepts('application/json')) {
    res.status(err.status || 500).json(formatError(req, err, err.status || 500))
    return
  }
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
