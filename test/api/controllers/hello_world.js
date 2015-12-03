var should = require('should');
var request = require('supertest');

describe('controllers', function() {

  describe('hello_world', function() {

    describe('GET /person', function() {

      it('should return correct number of Persons', function(done) {
        request(server)
          .get('/person')
          .set('Accept', 'application/json')
          .auth('paul', 'atreide')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            Person.count({}, function (e, nb) {
              if (e)
                throw e;
                res.body.length.should.eql(nb);
            });

            done();
          });
      });

      it('should accept a name parameter', function(done) {

        request(server)
          .get('/person')
          .query({ name: 'toto'})
          .set('Accept', 'application/json')
          .auth('paul', 'atreide')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.be.type('object');
            res.body.length.should.be.above(0);
            res.body[0].should.have.property('name','toto')

            done();
          });
      });

    });

  });

});
