'use strict';

import React from 'react';
// import cx from 'classnames';

let debug = require('debug')('idea:component:new').bind(null, '');


let NewIdea = React.createClass({

  getInitialState() {
    return { newIdea: '' };
  },

  _onChange() {
    // debug('value changed', event.target.value);
    this.setState({ newIdea: event.target.value });
  },

  _onSubmit(e) {
    e.preventDefault();
    debug('submitting', this.state);
    this.props.actions.createIdea({ title: this.state.newIdea });
    this.setState({ newIdea: '' });
  },

  render() {
    return (
      <form className="new-idea" onSubmit={this._onSubmit}>
        <input type="text" placeholder="create new idea" autoFocus="true" value={this.state.newIdea} onChange={this._onChange} />
      </form>
    );
  }

});

export default NewIdea;
