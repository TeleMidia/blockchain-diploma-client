var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

//for request test
var fs = require("fs");
var request = require('request');
//

/////////////////////////
var bluebird = require('bluebird')
var mongoose = require('mongoose')
mongoose.Promise = bluebird
mongoose.connect('mongodb://127.0.0.1:27017/bdapp', { useMongoClient: true })
  .then(() => { console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/bdapp`) })
  .catch(() => { console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/bdapp`) })
/////////////////////////

var app = express();

/////////////////////////
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //("Access-Control-Allow-Origin", "http://localhost:4200"); // 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
/////////////////////////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

/////////////////////////
var api = require('./routes/api.route')
app.use('/api', api);
/////////////////////////

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// (function foo(bla){
//   //request test
//   var dest = "../angular-rap-pucrio/src/assets/uploads/Engenharia-2017.2/GT-RAP-Signed.pdf";
//   console.log("arquivo em", dest);
//   console.log(bla);
//   // requestSettings = {
//   //   method: 'POST',
//   //   headers: {
//   //     'content-type': 'multipart/form-data'
//   //   },
//   //   url: "http://150.165.138.252:8050/register",
//   //   timeout: 20000,
//   //   formData: {
//   //     file: fs.createReadStream(dest),
//   //     doc_type: 'document',
//   //     dlt_id: 'ethereum',
//   //     your_number: 'string2',
//   //     client_id: 'string2'
//   //   }
//   // }
//   requestSettings = {
//     method: 'POST',
//     headers: {
//       'content-type': 'multipart/form-data'
//     },
//     url: "http://150.165.138.252:8050/search",
//     timeout: 20000,
//     formData: {
//       "your_number": "string2",
//       "client_id": "string2",
//       "doc_type": "document"
//     }
//   }
//   request(requestSettings, function(error, request, response) {
//     console.log(error,response);
//     if (response=="")
//     {
//       console.log("UPLOADED OK")
//       //change register status
//     }
//     else
//     {
//       // request(searchRequest, function(error, request, response) {
//       //   console.log(response);
//       // });
//       //setTimeout(foo.bind(null, "WORKED"), 10000);

//     }
//     //
//     // console.log(error);
//     // console.log(request);

//   });
  
// })()

module.exports = app;
