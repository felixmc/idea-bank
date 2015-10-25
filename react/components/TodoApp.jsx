'use strict';

import React from 'react';
import TodoStore from '../TodoStore';

import Task from './Task.jsx';
import NewTask from './NewTask.jsx';

import Immutable from 'immutable';

let debug = require('debug')('todo:component').bind(null, '');


class TodoApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: TodoStore.getState() };
    debug('initial state', this.state.data.toJS());

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    debug('mounting');
    TodoStore.listen(this.onChange);
  }

  componentWillUnmount() {
    debug('unmounting');
    TodoStore.unlisten(this.onChange);
  }

  onChange(state) {
    debug('state changed', this.state.data.toJS(), state.toJS());
    this.setState({ data: state });
  }

  componentWillUpdate() {
    debug('component will update');
  }

  render() {
    let { data } = this.state;
    debug('rendering with state', data.toJS(), data.get('tasks').toArray());

    // let tasks = data.get('tasks').toArray();

    // debug('tasks', tasks);

    // tasks.forEach(function(task) {
    //   debug('task', task);
      // debug('task:', task.toJS());
      // return(<Task {...task} key={task.id} />);
    // });

    return (
      <div>
        <h2>React Todos</h2>
        <NewTask tasks={data.get('tasks')} />
        <ul className="task-list">
          {data.get('tasks').toList().map(function(task) {
            debug('entry:', task);
            return(<Task {...task} key={task.id} />);
          })}
        </ul>
      </div>
    );
  }

}

export default TodoApp;
