var express = require('express');
var app = express();

var router = require('./routes/index');
var multer = require('multer');
var routes = express.Router();


var multerConfig = multer(
  { 
    dest: './images',
    rename: function (fieldname, filename) {
      console.log(fieldname);
      return filename+Date.now();
    },
    onFileUploadStart: function (file) {
      console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
      console.log(file.fieldname + ' uploaded to  ' + file.path)
    }
  });

app.use(multerConfig);
app.use('/', routes);


var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
};

app.set('port', (process.env.PORT || 8080));
app.use(allowCrossDomain);


router(routes);




app.listen(app.get('port'), function() {
 console.log("app is running at localhost:" + app.get('port'));
});








