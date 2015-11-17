/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = sails.config.passport,
    debug = require('debug')('api:AuthController');

module.exports = {
    createSession: createSession,
    terminateSession: terminateSession,
};

function createSession(req, res, next) {
    sails.log.debug("createSession...");
    passport.authenticate('postcred',
        function(err, user, info) {
            if (err) {
                sails.log.error("authenticate err found: %s", err);
                return res.json(500,{message:'internal error'});
            }
            if (!user) {
                debug("postcred authenticate failed: %s", info.message);
                return res.json(403,{message:info.message});
            }
            req.logIn(user, function(err) {
                if (err) {
                    sails.log.error("req.logIn error: %s", err);
                    return res.json(500,{message:'internal error'});
                }
                debug("session created by req.logIn");
            });
            debug("authenticate user found: %s", user.username);
            res.json({message:"session created"});
        })(req, res, next);
};

function terminateSession(req, res, next) {
    sails.log.debug("terminateSession...");
    if (req.user) {
        req.logout();
        debug("removed session")
        return res.redirect('/login');
    } else {
        debug("no session to remove");
        return res.redirect('/login');
    }
};