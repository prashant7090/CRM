'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var meetingCtrlStub = {
  index: 'meetingCtrl.index',
  show: 'meetingCtrl.show',
  create: 'meetingCtrl.create',
  upsert: 'meetingCtrl.upsert',
  patch: 'meetingCtrl.patch',
  destroy: 'meetingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var meetingIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './meeting.controller': meetingCtrlStub
});

describe('Meeting API Router:', function() {
  it('should return an express router instance', function() {
    meetingIndex.should.equal(routerStub);
  });

  describe('GET /api/meetings', function() {
    it('should route to meeting.controller.index', function() {
      routerStub.get
        .withArgs('/', 'meetingCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/meetings/:id', function() {
    it('should route to meeting.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'meetingCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/meetings', function() {
    it('should route to meeting.controller.create', function() {
      routerStub.post
        .withArgs('/', 'meetingCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/meetings/:id', function() {
    it('should route to meeting.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'meetingCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/meetings/:id', function() {
    it('should route to meeting.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'meetingCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/meetings/:id', function() {
    it('should route to meeting.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'meetingCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
