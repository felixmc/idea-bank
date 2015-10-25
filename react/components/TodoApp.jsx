'use strict';

import React from 'react';
import TodoStore from '../TodoStore';

import Task from './Task.jsx';

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
    debug('rendering with state', data.toJS());

    return (
      <div>
        <h2>React Todos</h2>
        <ul className="task-list">
          {data.get('tasks').toList().map(function(task) {
            debug('entry:', task);
            return(<Task {...task} key={task.id}></Task>);
          })}
        </ul>
      </div>
    );
  }

}

export default TodoApp;
