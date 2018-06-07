var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var fileUpload = require('express-fileupload');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
mongoose.Promise = Promise

var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var sass = require('node-sass-middleware');
var cors = require('cors');

// Load environment variables from .env file
dotenv.load();

// Models
var User = require('./models/User');

// Controllers
var userController = require('./controllers/user');
var contactController = require('./controllers/contact');
var folderController = require('./controllers/folder');

var app = express();


mongoose.connect(process.env.MONGODB,{
  useMongoClient: true
});
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

app.use(cors());
app.set('port', process.env.PORT || 3000);
app.use(compression());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());

app.use(function(req, res, next) {
  req.isAuthenticated = function() {
    var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return false;
    }
  };

  if (req.isAuthenticated()) {
    var payload = req.isAuthenticated();
    User.findById(payload.sub, function(err, user) {
      req.user = user;
      next();
    });
  } else {
    next();
  }
});

app.use(fileUpload());

app.post('/contact', contactController.contactPost);
app.put('/account', userController.ensureAuthenticated, userController.accountPut);
app.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
app.post('/signup', userController.signupPost);
app.post('/login', userController.loginPost);
app.post('/auth/facebook', userController.authFacebook);
app.post('/auth/google', userController.authGoogle);
app.get('/validateToken', userController.ensureAuthenticated, userController.getUserInfo);

app.get('/folder/', userController.ensureAuthenticated, folderController.getRootFolder)
app.get('/folder/:id', userController.ensureAuthenticated, folderController.getFolder);
app.get('/folder/short/:short', folderController.getFolderShort);
app.get('/file/:id', userController.ensureAuthenticated, folderController.getFile);
app.get('/file/short/:short', folderController.getFileShort);

app.post('/folder', folderController.addFolder);
app.post('/file', folderController.addFile);
app.delete('/folder', folderController.deleteFolder);
app.delete('/file', folderController.deleteFile);
app.put('/folder', userController.ensureAuthenticated, folderController.changeNameFolder);
app.put('/file', userController.ensureAuthenticated, folderController.changeNameFile);
app.put('/folder/folder', userController.ensureAuthenticated, folderController.changeFolderFolder);
app.put('/file/folder', userController.ensureAuthenticated, folderController.changeFolderFile);

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
