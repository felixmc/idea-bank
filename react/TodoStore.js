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
      // createTask:     TodoActions.createTask,
      // createCategory: TodoActions.createCategory,
      toggleTask:     TodoActions.toggleTask
    });
  }

  // createTask(task) {
  //   debug('create task');
  //   let newState = this.state
  //     .updateIn('tasks', tasks => tasks.set(task.id, Immutable.fromJS(task)))
  //     .updateIn('categories',
  //       categories => categories.updateIn(
  //         task.category, category => category.updateIn(
  //           'tasks', tasks => tasks.push( task.id )
  //         )
  //       )
  //     );
  //   this.setState( newState );
  // }
  //
  // createCategory(category) {
  //   debug('create category');
  //   let immCat = Immutable.fromJS(category).set('tasks', Immutable.List());
  //   let newState = this.state.updateIn('categories', categories => categories.set(category.id, immCat));
  //   this.setState( newState );
  // }

  toggleTask(taskId) {
    this.setState(function(old) {
      debug('toggling', taskId, old);

      let newState = old.updateIn(['tasks', taskId + ''], task => {
        if (task) {
          task.isComplete = !task.isComplete;
        }
        return task;
      });

      return newState;
    } );
  }

}

export default alt.createStore(immutable(TodoStore), 'TodoStore');
