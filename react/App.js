'use strict';

import React from 'react';
import Immutable from 'immutable';

import TodoActions from './TodoActions';
import TodoStore from './TodoStore';

import TodoApp from './components/TodoApp.jsx';

let debug = require('debug')('todo:app').bind(null, '');


class App {

  constructor(element, state) {
    debug('constructing Todo App with state', state && state.toJS());

    if (state) TodoStore.setState(state);

    this.element = element;
    this.store   = TodoStore;
  }

  setState(state) {
    debug('settings app state', state.toJS());
    this.store.setState(state);
  }

  render(element) {
    let state = this.store.getState();
    this.element = element || this.element;

    var appRootElement = React.createElement(TodoApp, {
      state: state,
      actions: TodoActions
    });

    // render to DOM
    if (this.element) {
      debug('render to DOM with state', state.toJS());
      React.render(appRootElement, this.element);
      return;
    }

    // render to string
    debug('render to string with state', state.toJS());
    return React.renderToString(appRootElement);
  }

}

export default App;
