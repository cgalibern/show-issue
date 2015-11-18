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
                            { successRedirect: '/',
                              failureRedirect: '/login',
                              successFlash: 'Welcome!',
                              failureFlash: true })(req, res, next);
};

function terminateSession(req, res, next) {
    sails.log.debug("terminateSession...");
    if (req.user) {
        req.logout();
        debug("removed session")
        return res.redirect('/');
    } else {
        debug("no session to remove");
        return res.redirect('/');
    }
};