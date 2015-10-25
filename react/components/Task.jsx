'use strict';

import React from 'react';
import TodoActions from '../TodoActions';

import cx from 'classnames';

let debug = require('debug')('todo:component:task').bind(null, '');


let Task = React.createClass({

  _onClick() {
    debug('clicked', this.props);
    TodoActions.toggleTask(this.props.id);
  },

  render() {
    debug('rendering task with state', this.props);

    let classes = cx({
      'task': true,
      'task-completed': this.props.isComplete
    });

    return (
      <li onClick={this._onClick} className={classes}>{this.props.label}</li>
    );
  }

});

export default Task;
