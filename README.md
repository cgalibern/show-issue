# swagger-sails-basicauth-example

A [Swagger](https://www.npmjs.com/package/swagger) / [Sails](http://sailsjs.org) application
An example of basic auth swagger on swagger & sails security handlers.
It uses swagger security handlers defined into api/swagger/securityHandlers.js
It defines 2 security handlers:
* basicAuthAtDomainUk: with a valid account john, password: john-uk-password
* basicAuthAtDomainFr: with a valid account sarrah, password: sarrah-fr-password

## Examples

  * ```shell curl -i -u john:john-uk-password http://localhost:10010/hello```
  ```shell
HTTP/1.1 200 OK
Hello, stranger authentified on UK !

Extract of : DEBUG=swagger:swagger_security swagger project start
swagger:swagger_security exec +1m
swagger:swagger_security Security check (basicAuthAtDomainUk): allowed +1ms
swagger:swagger_security Request allowed: true +0ms
swagger:swagger_security Security check (basicAuthAtDomainFr): denied +6ms
```

  * ```shell curl -i -u sarrah:sarrah-fr-password http://localhost:10010/hello```
  ```shell
HTTP/1.1 200 OK
Hello, stranger authentified on FR !

Extract of : DEBUG=swagger:swagger_security swagger project start
swagger:swagger_security exec +8s
swagger:swagger_security Security check (basicAuthAtDomainUk): denied +0ms
swagger:swagger_security Security check (basicAuthAtDomainFr): allowed +0ms
swagger:swagger_security Request allowed: true +0ms
```

  * ```shell curl -i -u kevin:badpassword http://localhost:10010/hello```
  ```shell
HTTP/1.1 403 Forbidden
{"message":"{\"message\":\"user password not valid in UK\",\"code\":\"server_error\",\"statusCode\":403}

Extract of : DEBUG=swagger:swagger_security swagger project start
swagger:swagger_security exec +2m
swagger:swagger_security Security check (basicAuthAtDomainUk): denied +0ms
swagger:swagger_security Security check (basicAuthAtDomainFr): denied +0ms
swagger:swagger_security Request allowed: false +0ms
```

  * ```shell curl -i http://localhost:10010/hello```
  ```shell
HTTP/1.1 403 Forbidden
{"message":"{\"message\":\"can not validate on Uk passwords: no basic auth header\",\"code\":\"server_error\",\"statusCode\":403}

Extract of : DEBUG=swagger:swagger_security swagger project start
swagger:swagger_security exec +2m
swagger:swagger_security Security check (basicAuthAtDomainUk): denied +0ms
swagger:swagger_security Security check (basicAuthAtDomainFr): denied +0ms
swagger:swagger_security Request allowed: false +0ms
```

it require patch https://github.com/cgalibern/swagger-sails/commit/119c875484d1ef7abf0ba8d572dfbc7c32638ed9
