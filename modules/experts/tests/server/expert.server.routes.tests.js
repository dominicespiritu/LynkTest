'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Expert = mongoose.model('Expert'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  expert;

/**
 * Expert routes tests
 */
describe('Expert CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Expert
    user.save(function () {
      expert = {
        name: 'Expert name'
      };

      done();
    });
  });

  it('should be able to save a Expert if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Expert
        agent.post('/api/experts')
          .send(expert)
          .expect(200)
          .end(function (expertSaveErr, expertSaveRes) {
            // Handle Expert save error
            if (expertSaveErr) {
              return done(expertSaveErr);
            }

            // Get a list of Experts
            agent.get('/api/experts')
              .end(function (expertsGetErr, expertsGetRes) {
                // Handle Experts save error
                if (expertsGetErr) {
                  return done(expertsGetErr);
                }

                // Get Experts list
                var experts = expertsGetRes.body;

                // Set assertions
                (experts[0].user._id).should.equal(userId);
                (experts[0].name).should.match('Expert name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Expert if not logged in', function (done) {
    agent.post('/api/experts')
      .send(expert)
      .expect(403)
      .end(function (expertSaveErr, expertSaveRes) {
        // Call the assertion callback
        done(expertSaveErr);
      });
  });

  it('should not be able to save an Expert if no name is provided', function (done) {
    // Invalidate name field
    expert.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Expert
        agent.post('/api/experts')
          .send(expert)
          .expect(400)
          .end(function (expertSaveErr, expertSaveRes) {
            // Set message assertion
            (expertSaveRes.body.message).should.match('Please fill Expert name');

            // Handle Expert save error
            done(expertSaveErr);
          });
      });
  });

  it('should be able to update an Expert if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Expert
        agent.post('/api/experts')
          .send(expert)
          .expect(200)
          .end(function (expertSaveErr, expertSaveRes) {
            // Handle Expert save error
            if (expertSaveErr) {
              return done(expertSaveErr);
            }

            // Update Expert name
            expert.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Expert
            agent.put('/api/experts/' + expertSaveRes.body._id)
              .send(expert)
              .expect(200)
              .end(function (expertUpdateErr, expertUpdateRes) {
                // Handle Expert update error
                if (expertUpdateErr) {
                  return done(expertUpdateErr);
                }

                // Set assertions
                (expertUpdateRes.body._id).should.equal(expertSaveRes.body._id);
                (expertUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Experts if not signed in', function (done) {
    // Create new Expert model instance
    var expertObj = new Expert(expert);

    // Save the expert
    expertObj.save(function () {
      // Request Experts
      request(app).get('/api/experts')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Expert if not signed in', function (done) {
    // Create new Expert model instance
    var expertObj = new Expert(expert);

    // Save the Expert
    expertObj.save(function () {
      request(app).get('/api/experts/' + expertObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', expert.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Expert with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/experts/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Expert is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Expert which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Expert
    request(app).get('/api/experts/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Expert with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Expert if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Expert
        agent.post('/api/experts')
          .send(expert)
          .expect(200)
          .end(function (expertSaveErr, expertSaveRes) {
            // Handle Expert save error
            if (expertSaveErr) {
              return done(expertSaveErr);
            }

            // Delete an existing Expert
            agent.delete('/api/experts/' + expertSaveRes.body._id)
              .send(expert)
              .expect(200)
              .end(function (expertDeleteErr, expertDeleteRes) {
                // Handle expert error error
                if (expertDeleteErr) {
                  return done(expertDeleteErr);
                }

                // Set assertions
                (expertDeleteRes.body._id).should.equal(expertSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Expert if not signed in', function (done) {
    // Set Expert user
    expert.user = user;

    // Create new Expert model instance
    var expertObj = new Expert(expert);

    // Save the Expert
    expertObj.save(function () {
      // Try deleting Expert
      request(app).delete('/api/experts/' + expertObj._id)
        .expect(403)
        .end(function (expertDeleteErr, expertDeleteRes) {
          // Set message assertion
          (expertDeleteRes.body.message).should.match('User is not authorized');

          // Handle Expert error error
          done(expertDeleteErr);
        });

    });
  });

  it('should be able to get a single Expert that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Expert
          agent.post('/api/experts')
            .send(expert)
            .expect(200)
            .end(function (expertSaveErr, expertSaveRes) {
              // Handle Expert save error
              if (expertSaveErr) {
                return done(expertSaveErr);
              }

              // Set assertions on new Expert
              (expertSaveRes.body.name).should.equal(expert.name);
              should.exist(expertSaveRes.body.user);
              should.equal(expertSaveRes.body.user._id, orphanId);

              // force the Expert to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Expert
                    agent.get('/api/experts/' + expertSaveRes.body._id)
                      .expect(200)
                      .end(function (expertInfoErr, expertInfoRes) {
                        // Handle Expert error
                        if (expertInfoErr) {
                          return done(expertInfoErr);
                        }

                        // Set assertions
                        (expertInfoRes.body._id).should.equal(expertSaveRes.body._id);
                        (expertInfoRes.body.name).should.equal(expert.name);
                        should.equal(expertInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Expert.remove().exec(done);
    });
  });
});
