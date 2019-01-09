var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var imageRouter = require('./routes/image');
var menuRouter = require('./routes/menu');
var projectRouter = require('./routes/project');
// var ws = require("./ws") ;
var app = express();

var imageProcessor = require("./routes/imgProcessor.js") ;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use( imageProcessor );
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
	let orginUrl = req.headers.origin ;
	res.header('Access-Control-Allow-Origin', orginUrl);
	res.header('Access-Control-Allow-Methods', "POST, GET, OPTIONS , PUT , DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Credentials','true');
	next() ;
});
app.use('/project', projectRouter);
app.use('/menu', menuRouter);
app.use('/api', imageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send("invalid invoke");
  console.log(err);
});

module.exports = app;
