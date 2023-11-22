const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const xmlParser = require('express-xml-bodyparser');
const logger = require('morgan');
const rfs = require('rotating-file-stream')


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(logger('dev'));
app.use(logger('combined', {
  stream: rfs.createStream("file.log", {
    path: path.join(__dirname, 'log'), // directory
    size: "10M", // rotate every 10 MegaBytes written
    interval: "1d", // rotate daily
    compress: "gzip" // compress rotated files
  })
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(xmlParser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/saluda', require('./routes/saludos'));
app.use('/', require('./routes/seguridad'));
app.use('/', require('./routes/upload'));

/*
app.route('/salu*')
  .get((req, res) => {
    res.end('GET: Hola mundo')
  })
  .post((req, res) => {
    res.end('POST: Hola mundo')
  })
  .options((req, res) => {
    res.end('OPTION: Hola mundo')
  })
app.route('/saluda/:id')
  .get((req, res) => {
    res.end(`GET ${req.params.id}: Hola mundo`)
  })
  .put((req, res) => {
    res.end(`PUT ${req.params.id}: Hola mundo`)
  })
  .delete((req, res) => {
    res.end(`DELETE ${req.params.id}: Hola mundo`)
  })
*/


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  if (req.accepts('application/json')) {
    res.status(err.status || 500).json(err)
    return
  }
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
