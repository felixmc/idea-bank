'use strict';

var mongoose = require('mongoose');

var config = require('./config.json');
var debug  = require('debug')(config.name + ':server:controller').bind(null, '');

var IdeaModel = require('./models/idea');


module.exports = function(sockio) {

  mongoose.connect('mongodb://localhost/ideas');

  var Idea = IdeaModel(mongoose);


  // socket.io
  sockio.on('connection', function(socket) {
    debug('client connected');

    socket.on('idea:save', function(idea) {
      debug('saving idea', idea);
      Idea.create(idea, function(err, ideaDoc) {
        if (err) {
          debug('error on save:', err);
          socket.emit('idea:save:error', err);
        } else {
          debug('sending new idea', ideaDoc.toJSON());
          socket.emit('idea:save:success', ideaDoc.toJSON());
        }
      });
    });

    socket.on('idea:update', function(idea) {
      debug('updating idea', idea);
      Idea.update(idea.id, { $set: idea }, function(err, ideaDoc) {
        if (err) {
          debug('error on update:', err);
          socket.emit('idea:update:error', err);
        } else {
          debug('sending updated idea', idea);
          socket.emit('idea:update:success', ideaDoc.toJSON());
        }
      });
    });

    socket.on('idea:delete', function(idea) {
      debug('deleting idea', idea);
    });

    socket.on('idea:get:all', function(idea) {

    });

  });

};
