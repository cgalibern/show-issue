
/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      username: {
          type: 'string',
          required: true,
          unique: true
      },
      // such password must be crypted or moved
      // to external ldap
      password: {
          type: 'string',
          required: true
      },
      toJSON: function() {
        var obj = this.toObject();
        delete obj.password;
        return obj;
      },
  }
};

