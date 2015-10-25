'use strict';

import React from 'react';
import TodoActions from '../TodoActions';

// import cx from 'classnames';

let debug = require('debug')('todo:component:new').bind(null, '');


let NewTask = React.createClass({

  getInitialState() {
    return { newTodo: '' };
  },

  _onChange() {
    debug('value changed', event.target.value);
    this.setState({ newTodo: event.target.value });
  },

  _onSubmit(e) {
    e.preventDefault();
    debug('submitting', this.state);
    TodoActions.createTask({ label: this.state.newTodo });
    this.setState({ newTodo: '' });
  },

  render() {
    return (
      <form className="new-task" onSubmit={this._onSubmit}>
        <input type="text" placeholder="create new todo" autoFocus="true" value={this.state.newTodo} onChange={this._onChange} />
      </form>
    );
  }

});

export default NewTask;
