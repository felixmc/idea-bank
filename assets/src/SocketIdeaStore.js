'use stict';

let debug = require('debug')('idea:sockets').bind(null, '');

let socket = io();


class SocketIdeaStore {

  constructor(Actions1, Actions2) {
    debug('constructing Socket Idea Store');

    // this.Actions = Actions1;
    this.state = {};

    this.bindListeners({
      createIdea: Actions1.createIdea
    });

    socket.on('idea:save:success', Actions2.createIdea);
    // socket.on('idea:receive', function(ideas) {
    //
    // });
  }

  createIdea(idea) {
    debug('create idea', idea);
    socket.emit('idea:save', idea);
  }

}

export default SocketIdeaStore;
