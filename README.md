# swagger-sails-basicauth-example
A [Swagger](https://www.npmjs.com/package/swagger) / [Sails](http://sailsjs.org) application
An example of basic auth swagger on swagger & sails security handlers
It uses swagger security handlers defined into api/swagger/securityHandlers.js

It defines 2 security handlers:
  one that always deny access: AlwaysDenyBasicAuth
  and one that always allow access: AlwaysAllowBasicAuth

it require patch https://github.com/cgalibern/swagger-sails/commit/119c875484d1ef7abf0ba8d572dfbc7c32638ed9
