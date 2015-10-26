'use strict';

import alt from './alt';
import TodoActions from './TodoActions';

import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import _ from 'lodash';

let debug = require('debug')('todo:store').bind(null, '');

let emptyState = Immutable.Map({
  categories: Immutable.Map(),
  tasks: Immutable.Map()
});


class TodoStore {

  constructor() {
    debug('constructing Todo Store');

    this.state = emptyState;

    this.exportPublicMethods({
      setState: this.setState,
      getState: function() { return this.state; }
    });

    this.bindListeners({
      createTask:     TodoActions.createTask,
      // createCategory: TodoActions.createCategory,
      toggleTask:     TodoActions.toggleTask
    });
  }

  createTask(task) {
    task.id = (Math.floor(Math.random() * (1000)) + 20).toString();
    task.isComplete = false;

    debug('create task', task);

    this.setState(function(state) {
      let newState = state.update('tasks', tasks => tasks.set(task.id, Immutable.Map(task)));
      debug('create task new state', newState.toJS());
      return newState;
    });
  }

  componentDidUpdate() {
    debug('did update!');
  }

  // createCategory(category) {
  //   debug('create category');
  //   let immCat = Immutable.fromJS(category).set('tasks', Immutable.List());
  //   let newState = this.state.updateIn('categories', categories => categories.set(category.id, immCat));
  //   this.setState( newState );
  // }

  toggleTask(taskId) {
    this.setState(function(state) {
      debug('toggling', taskId, state, state.toJS());

      let newState = state.updateIn(['tasks', taskId], task => {
        debug('toggle task', task);
        if (task) {
          return task.set('isComplete', !task.get('isComplete'))
          // task.isComplete = !task.isComplete;
        }
        return task;
      });

      return newState;
    } );
  }

}

export default alt.createStore(immutable(TodoStore), 'TodoStore');
