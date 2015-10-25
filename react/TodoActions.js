import alt from './alt';

let debug = require('debug')('todo:actions').bind(null, '');

class TodoActions {

  createTask(task) {
    debug('dispatching createTask', task);
    this.dispatch(task);
  }
  
  // createCategory(category) {
  //   debug('dispatching createCategory', category);
  //   this.dispatch(category);
  // }

  toggleTask(taskId) {
    debug('dispatching toggleTask', taskId);
    this.dispatch(taskId);
  }

}

export default alt.createActions(TodoActions);
