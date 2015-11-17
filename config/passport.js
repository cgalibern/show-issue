var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  BasicStrategy = require('passport-http').BasicStrategy,
  debug = require('debug')('api:passport');

passport.serializeUser(function(user, done) {
    debug('exec serializeUser user: %s => id:%s',user, user.id);
    done(null, user.id);
})

passport.deserializeUser(function(id, done) {
    debug('exec deserializeUser id: %s',id);
    User.findOne({ id: id } , function (err, user) {
      debug('deserializeUser id: %s, found %s',id, user);
      done(err, user);
    });
});

passport.use('basicAuth', new BasicStrategy(
  function(username, password, done) {
    debug("exec basicAuth Strategy: username=%s", username);
    User.findOne({ username: username }, function (err, user) {
      if (err) {
          sails.log.error('findOne error: %s',err);
          return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (password === user.password) {
        var returnUser = {
          username: user.username,
          createdAt: user.createdAt,
          id: user.id
        };
        return done(null, returnUser, { message: 'Logged In Successfully' });
      } else {
        return done(null, false, { message: 'Invalid Password' });
      }
    });
  }
));

passport.use('postcred', new LocalStrategy(
  function(username, password, done) {
    debug("exec postcred Strategy: username=%s", username);
    User.findOne({ username: username }, function (err, user) {
      if (err) {
          sails.log.error('findOne error: %s',err);
          return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (password === user.password) {
        var returnUser = {
          username: user.username,
          createdAt: user.createdAt,
          id: user.id
        };
        return done(null, returnUser, { message: 'Logged In Successfully' });
      } else {
        return done(null, false, { message: 'Invalid Password' });
      }
    });

  }
));


module.exports.passport = passport;
