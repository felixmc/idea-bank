'use strict';

import AltContainer from 'alt/AltContainer';
import React from 'react';
import Immutable from 'immutable';

import Idea from './ui/Idea.jsx';
import NewIdea from './ui/NewIdea.jsx';

let debug = require('debug')('idea:component').bind(null, '');


class IdeaBank extends AltContainer {

  render() {
    let ideas = this.props.ideas.toList();

    debug('rendering with state', ideas.toJS());

    return (
      <div>
        <h2>IdeaBank</h2>
        <NewIdea actions={this.props.IdeaActions} />
        <ul className="idea-list">
          {ideas.sort((a, b) => a.get('date_created') < b.get('date_created') ).map(function(idea) {
            // debug('entry:', idea);
            return(<Idea {...idea.toJS()} key={idea.get('id')} />);
          })}
        </ul>
      </div>
    );
  }

}

export default IdeaBank;
