var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
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

app.post('/contact', contactController.contactPost);
app.put('/account', userController.ensureAuthenticated, userController.accountPut);
app.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
app.post('/signup', userController.signupPost);
app.post('/login', userController.loginPost);
app.post('/auth/facebook', userController.authFacebook);
app.post('/auth/google', userController.authGoogle);
app.get('/validateToken', userController.getUserInfo);
app.get('/api/user', function(req, res){
  res.setHeader("Content-Type","application/json")
  return res.send([
    {
        "id": 1,
        "name": "Dossier 1",
        "files": [
            {
                "id": 1,
                "name": "Fichier 1",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg",
                "createdBy": 1
            },
            {
                "id": 2,
                "name": "Fichier 2",
                "size": 23456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "text",
                "type": "application/text",
                "createdBy": 1
            },
            {
                "id": 3,
                "name": "Fichier 3",
                "size": 12456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "avi",
                "type": "media/avi",
                "createdBy": 1
            },
            {
                "id": 4,
                "name": "Fichier 4",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg",
                "createdBy": 1
            }
        ],
        "parentFolder": null
    },
    {
        "id": 2,
        "name": "Dossier 2",
        "files": [
            {
                "id": 12,
                "name": "Fichier 12",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 52,
                "name": "Fichier 52",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 35,
                "name": "Fichier 35",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 45,
                "name": "Fichier 45",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            }
        ],
        "parentFolder": 1
    },
    {
        "id": 3,
        "name": "Dossier 3",
        "files": [
            {
                "id": 48,
                "name": "Fichier 48",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 65,
                "name": "Fichier 65",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 49,
                "name": "Fichier 49",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 9,
                "name": "Fichier 9",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            }
        ],
        "parentFolder": 1
    },
    {
        "id": 40,
        "name": "Dossier 40",
        "files": [
            {
                "id": 1,
                "name": "Fichier 1",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 22,
                "name": "Fichier 22",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 133,
                "name": "Fichier 133",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 1,
                "name": "Fichier 1",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            }
        ],
        "parentFolder": 1
    },
    {
        "id": 5,
        "name": "Dossier 5",
        "files": [
            {
                "id": 154877,
                "name": "Fichier 154877",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 6598,
                "name": "Fichier 6598",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 25896,
                "name": "Fichier 25896",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 29753,
                "name": "Fichier 29753",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            }
        ],
        "parentFolder": 1
    },
    {
        "id": 6,
        "name": "Dossier 6",
        "files": [
            {
                "id": 1234872,
                "name": "Fichier 1234872",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 652741,
                "name": "Fichier 652741",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 97846513,
                "name": "Fichier 97846513",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 4567894135,
                "name": "Fichier 4567894135",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            }
        ],
        "parentFolder": 1
    },
    {
        "id": 7,
        "name": "Dossier 7",
        "files": [
            {
                "id": 1,
                "name": "Fichier 1",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 1,
                "name": "Fichier 1",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 1,
                "name": "Fichier 1",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 1,
                "name": "Fichier 1",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            }
        ],
        "parentFolder": 1
    },
    {
        "id": 8,
        "name": "Dossier 8",
        "files": [
            {
                "id": 1,
                "name": "Fichier 1",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 1,
                "name": "Fichier 1",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 1,
                "name": "Fichier 1",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 1,
                "name": "Fichier 1",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            }
        ],
        "parentFolder": 1
    },
    {
        "id": 9,
        "name": "Dossier 9",
        "files": [
            {
                "id": 1,
                "name": "Fichier 1",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 1,
                "name": "Fichier 1",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 1,
                "name": "Fichier 1",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 1,
                "name": "Fichier 1",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            }
        ],
        "parentFolder": 1
    },
    {
        "id": 10,
        "name": "Dossier 10",
        "files": [
            {
                "id": 1,
                "name": "Fichier 1",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 1,
                "name": "Fichier 1",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 1,
                "name": "Fichier 1",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            },
            {
                "id": 1,
                "name": "Fichier 1",
                "size": 123456,
                "createdAt": "07/05/2018 11:52",
                "updatedAt": "08/05/2018 09:03",
                "extension": "jpg",
                "type": "image/jpg"
            }
        ],
        "parentFolder": 1
    }
])

})
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
