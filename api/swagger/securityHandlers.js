// to add more log try the following
// start swagger project using DEBUG=swagger:swagger_security swagger project start
// or sails lift --verbose
module.exports.securityHandlers = {
        AlwaysDenyBasicAuth:function (req, authOrSecDef, scopesOrApiKey, cb) {
            sails.log.verbose("example of always denied: AlwaysDenyBasicAuth");
            cb({message:"cannot be validated using AlwaysDenyBasicAuth"});
        },
        AlwaysAllowBasicAuth:function (req, authOrSecDef, scopesOrApiKey, cb) {
            sails.log.verbose("example of always validated AlwaysAllowBasicAuth");
            cb();
        },
      };