const { User } = require('../models/user');

// middleware to use on routes to authenticate user first
var authenticate = (req, res, next) => {
  var token = req.header('x-auth');
  // custom method you create in the User model
  User.findbyToken(token).then( (user) => {
    if (!user) {
      return Promise.reject();
    }
    // modify request object to use in app.get('/user/me') route
    req.user = user;
    req.token = token;
    next(); // otherwise 'app.get('/user/me', authenticate, (req, res)'
    // will not work
  }).catch((e) => {
    res.status(401).send(e);
  });
};

module.exports = { authenticate };
