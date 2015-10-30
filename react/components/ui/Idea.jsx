'use strict';

import React from 'react';
import cx from 'classnames';

let debug = require('debug')('idea:component:idea').bind(null, '');


let Idea = React.createClass({

  _onDoubleClick() {
    debug('double clicked', this.props);
    // IdeaActions.toggleTask(this.props.id);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    let shouldUpdate = this.props.title !== nextProps.title;
    // debug('should update?', shouldUpdate);
    return shouldUpdate;
  },

  render() {
    debug('rendering idea with state', this.props);

    let classes = cx({
      'idea': true,
      'idea-completed': this.props.isComplete
    });

    return (
      <li onDoubleClick={this._onDoubleClick} className={classes}>{this.props.title}</li>
    );
  }

});

export default Idea;
