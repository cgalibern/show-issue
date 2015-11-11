// to add more log try the following
// start swagger project using DEBUG=swagger:swagger_security swagger project start
// or sails lift --verbose
var auth = require('basic-auth');
sails.log("loading security hnadlers....");
module.exports = {
    basicAuthAtDomainUk:function (req, authOrSecDef, scopesOrApiKey, cb) {
        var user = auth (req);
        if (user) {
            if ( user.name === "john" && user.pass === "john-uk-password") {
                sails.log.verbose("user %s allowed on Uk", user.name);
                req.userAuthentifiedOn = "UK";
                return cb();
            } else {
                sails.log.verbose("cannot validate user %s on UK", user.name);
                return cb({message:"user password not valid in UK"});
            }
        } else {
            sails.log.verbose("no basic auth header found");
            return cb({message:"can not validate on Uk passwords: no basic auth header"});
        };
    },

    basicAuthAtDomainFr:function (req, authOrSecDef, scopesOrApiKey, cb) {
        var user = auth (req);
        if (user) {
            if ( user.name === "sarrah" && user.pass === "sarrah-fr-password") {
                sails.log.verbose("user %s allowed on Uk", user.name);
                req.userAuthentifiedOn = "FR";
                return cb();
            } else {
                sails.log.verbose("cannot validate user %s on FR", user.name);
                return cb({message:"user password not valid in FR"});
            }
        } else {
            sails.log.verbose("no basic auth header found");
            return cb({message:"can not validate on Fr passwords: no basic auth header"});
        };
    },
};