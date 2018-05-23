var async = require('async');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
const disk = require('diskusage');
var User = require('../models/User');

function generateToken(user) {
  var payload = {
    iss: 'supfile.lan',
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix()
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET);
}

/**
 * Login required middleware
 */
exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

exports.getUserInfo = function(req,res,next) {
  if (req.isAuthenticated()) {
    res.status(200).send({user: req.user})
  }else{
    res.status(200).send({msg: "No user connected"})
  }
}

  /**
   * POST /login
   * Sign in with email and password
   */
  exports.loginPost = function(req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    var errors = req.validationErrors();

    if (errors) {
      return res.status(400).send(errors);
    }
    User.findOne({ email: req.body.email }, function(err, user) {
      if (!user) {
        return res.status(401).send({ msg: 'The email address ' + req.body.email + ' is not associated with any account. ' +
        'Double-check your email address and try again.'
        });
      }
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (!isMatch) {
          return res.status(401).send({ msg: 'Invalid email or password' });
        }
        res.send({ token: generateToken(user), user: user.toJSON() });
      });
    });
  };

/**
 * POST /signup
 */
exports.signupPost = function(req, res, next) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send({errors});
  }
  
  User.findOne({ email: req.body.email }, function(err, user) {
    if (user) {
      return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });
    }
    checkDiskSpace(res).then(
      response => {
        console.log(response + " resultat")
        if(response === true){
          user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });
          user.save(function(err) {
            res.send({ token: generateToken(user), user: user });
          });
        }else{

        }
      }
    )
  });
};


/**
 * PUT /account
 * Update profile information OR change password.
 */
exports.accountPut = function(req, res, next) {
  if ('password' in req.body) {
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirm', 'Passwords must match').equals(req.body.password);
  } else {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });
  }

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  User.findById(req.user.id, function(err, user) {
    if ('password' in req.body) {
      user.password = req.body.password;
    } else {
      user.email = req.body.email;
      user.name = req.body.name;
    }
    user.save(function(err) {
      if ('password' in req.body) {
        res.send({ msg: 'Your password has been changed.' });
      } else if (err && err.code === 11000) {
        res.status(409).send({ msg: 'The email address you have entered is already associated with another account.' });
      } else {
        res.send({ user: user, msg: 'Your profile information has been updated.' });
      }
    });
  });
};

/**
 * DELETE /account
 */
exports.accountDelete = function(req, res, next) {
  User.remove({ _id: req.user.id }, function(err) {
    res.send({ msg: 'Your account has been permanently deleted.' });
  });
};

/**
 * POST /auth/facebook
 * Sign in with Facebook
 */
exports.authFacebook = function(req, res) {
  var profileFields = ['id', 'name', 'email', 'gender', 'location'];
  var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + profileFields.join(',');

  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: process.env.FACEBOOK_SECRET,
    redirect_uri: req.body.redirectUri
  };

  // Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
    if (accessToken.error) {
      return res.status(500).send({ msg: accessToken.error.message });
    }

    // Retrieve user's profile information.
    request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
      if (profile.error) {
        return res.status(500).send({ msg: profile.error.message });
      }

      // Link accounts if user is authenticated.
      if (req.isAuthenticated()) {
        User.findOne({ facebook: profile.id }, function(err, user) {
          if (user) {
            return res.status(409).send({ msg: 'There is already an existing account linked with Facebook that belongs to you.' });
          }
          user = req.user;
          user.name = user.name || profile.name;
          user.gender = user.gender || profile.gender;
          user.picture = user.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          user.facebook = profile.id;
          user.save(function() {
            res.send({ token: generateToken(user), user: user });
          });
        });
      } else {
        // Create a new user account or return an existing one.
        User.findOne({ facebook: profile.id }, function(err, user) {
          if (user) {
            return res.send({ token: generateToken(user), user: user });
          }
          User.findOne({ email: profile.email }, function(err, user) {
            if (user) {
              return res.status(400).send({ msg: user.email + ' is already associated with another account.' })
            }
            checkDiskSpace(res).then(
              response => {
                if (response === true) {
                  user = new User({
                    name: profile.name,
                    email: profile.email,
                    gender: profile.gender,
                    location: profile.location && profile.location.name,
                    picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large',
                    facebook: profile.id
                  });
                  user.save(function(err) {
                    return res.send({ token: generateToken(user), user: user });
                  });
                }
              }
            )
          });
        });
      }
    });
  });
};

/**
 * POST /auth/google
 * Sign in with Google
 */
exports.authGoogle = function(req, res) {
  var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
  var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: process.env.GOOGLE_SECRET,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };

  // Step 1. Exchange authorization code for access token.
  request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
    var accessToken = token.access_token;
    var headers = { Authorization: 'Bearer ' + accessToken };

    // Step 2. Retrieve user's profile information.
    request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
      if (profile.error) {
        return res.status(500).send({ message: profile.error.message });
      }
      // Step 3a. Link accounts if user is authenticated.
      if (req.isAuthenticated()) {
        User.findOne({ google: profile.sub }, function(err, user) {
          if (user) {
            return res.status(409).send({ msg: 'There is already an existing account linked with Google that belongs to you.' });
          }
          user = req.user;
          user.name = user.name || profile.name;
          user.gender = profile.gender;
          user.picture = user.picture || profile.picture.replace('sz=50', 'sz=200');
          user.location = user.location || profile.location;
          user.google = profile.sub;
          user.save(function() {
            res.send({ token: generateToken(user), user: user });
          });
        });
      } else {
        // Step 3b. Create a new user account or return an existing one.
        User.findOne({ google: profile.sub }, function(err, user) {
          if (user) {
            return res.send({ token: generateToken(user), user: user });
          }
          checkDiskSpace(res).then(
            response => {
              if (response === true) {
                user = new User({
                  name: profile.name,
                  email: profile.email,
                  gender: profile.gender,
                  picture: profile.picture.replace('sz=50', 'sz=200'),
                  location: profile.location,
                  google: profile.sub
                });
                user.save(function(err) {
                  res.send({ token: generateToken(user), user: user });
                });     
              }
            }
          )
        });
      }
    });
  });
};

function convertSize(size) {
  let n = 0
  while (n < 3 && size >= 1024) {
    size = size / 1024
    n++
  }
  return size
}

function checkDiskSpace(res){
  try{
    return User.count(null, function (err, count) {
      if (err) {
        res.status(500).send("Internal Server error when accessing the database")
        return false
      }
    }).then(
      count => {
        let info = disk.checkSync(process.env.STORAGE_PATH)
        let total = convertSize(info.total)
        let totalNeed = convertSize((count + 1) * process.env.USER_DEFAULT_STORAGE_SIZE * Math.pow(1024,3))
        if(totalNeed > total){
          res.status(500).send({msg: "No enough space to create a new user"})
          return false
        }
        return true
      }
    )
  }catch(exception){
    console.log(exception);
    res.send({msg: "Internal server error"})
    return false
  }
}