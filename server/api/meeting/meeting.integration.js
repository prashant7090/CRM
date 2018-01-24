'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newMeeting;

describe('Meeting API:', function() {
  describe('GET /api/meetings', function() {
    var meetings;

    beforeEach(function(done) {
      request(app)
        .get('/api/meetings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          meetings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      meetings.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/meetings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/meetings')
        .send({
          name: 'New Meeting',
          info: 'This is the brand new meeting!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newMeeting = res.body;
          done();
        });
    });

    it('should respond with the newly created meeting', function() {
      newMeeting.name.should.equal('New Meeting');
      newMeeting.info.should.equal('This is the brand new meeting!!!');
    });
  });

  describe('GET /api/meetings/:id', function() {
    var meeting;

    beforeEach(function(done) {
      request(app)
        .get(`/api/meetings/${newMeeting._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          meeting = res.body;
          done();
        });
    });

    afterEach(function() {
      meeting = {};
    });

    it('should respond with the requested meeting', function() {
      meeting.name.should.equal('New Meeting');
      meeting.info.should.equal('This is the brand new meeting!!!');
    });
  });

  describe('PUT /api/meetings/:id', function() {
    var updatedMeeting;

    beforeEach(function(done) {
      request(app)
        .put(`/api/meetings/${newMeeting._id}`)
        .send({
          name: 'Updated Meeting',
          info: 'This is the updated meeting!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedMeeting = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMeeting = {};
    });

    it('should respond with the updated meeting', function() {
      updatedMeeting.name.should.equal('Updated Meeting');
      updatedMeeting.info.should.equal('This is the updated meeting!!!');
    });

    it('should respond with the updated meeting on a subsequent GET', function(done) {
      request(app)
        .get(`/api/meetings/${newMeeting._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let meeting = res.body;

          meeting.name.should.equal('Updated Meeting');
          meeting.info.should.equal('This is the updated meeting!!!');

          done();
        });
    });
  });

  describe('PATCH /api/meetings/:id', function() {
    var patchedMeeting;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/meetings/${newMeeting._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Meeting' },
          { op: 'replace', path: '/info', value: 'This is the patched meeting!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedMeeting = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedMeeting = {};
    });

    it('should respond with the patched meeting', function() {
      patchedMeeting.name.should.equal('Patched Meeting');
      patchedMeeting.info.should.equal('This is the patched meeting!!!');
    });
  });

  describe('DELETE /api/meetings/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/meetings/${newMeeting._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when meeting does not exist', function(done) {
      request(app)
        .delete(`/api/meetings/${newMeeting._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
