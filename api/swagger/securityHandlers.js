// to add more log try the following
// start swagger project using DEBUG=swagger:swagger_security swagger project start
// or sails lift --verbose
var debug = require('debug')('api:secHandlers'),
    auth = require('basic-auth'),
    passport = sails.config.passport;

module.exports = {
    basicAuthAtDomainFr:basicAuthAtDomainFr,
    basicAuth: basicAuth,
    session: session,
};


function basicAuthAtDomainFr(req, authOrSecDef, scopesOrApiKey, cb) {
    debug('exec basicAuthAtDomainFr secHandler');
    var user = auth (req);
    if (user) {
        if ( user.name === "sarrah" && user.pass === "sarrah-fr-password") {
            debug("user %s allowed on Uk", user.name);
            req.userAuthentifiedOn = "FR";
            return cb();
        } else {
            debug("cannot validate user %s on FR", user.name);
            return cb({message:"user password not valid in FR"});
        }
    } else {
        debug("no basic auth header found");
        return cb({message:"can not validate on Fr passwords: no basic auth header"});
    };
};

function basicAuth(req, resp, next) {
    debug('exec basicAuth secHandlers');
    passport.authenticate('basicAuth', function(err, user, info) {
        if (err) {
            sails.log.error("basicAuth authenticate err: %s", err);
            return next(err);
        }
        if (!user) {
            debug("basicAuth authenticate failed: %s", info.message);
            return next({message:info.message || "no basicAuth info"});
        }
        debug("authenticate user found: %s", user.username);
        return next();
    })(req, resp, next);
};

function session(req, resp, next) {
    debug('exec session secHandlers');
    if (req.user) {
        return next();
    } else {
        return next({message:"no sessions"});
    }
};