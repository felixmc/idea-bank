'use strict';

import Immutable from 'immutable';

let debug = require('debug')('idea:store').bind(null, '');

let emptyState = Immutable.Map({});


class IdeaStore {

  constructor(Actions) {
    debug('constructing Idea Store');

    this.Actions = Actions;
    this.state = emptyState;

    this.exportPublicMethods({
      setState: this.setState
    });

    this.bindListeners({
      createIdea: this.Actions.createIdea
    });
  }

  createIdea(idea) {
    debug('create idea', idea);

    if (!idea.id) idea.id = Math.floor(Math.random() * 1000);

    this.setState(function(state) {
      let newState = state.set(idea.id, Immutable.Map(idea));
      debug('create idea new state', newState.toJS());
      return newState;
    });
  }

}

export default IdeaStore;
