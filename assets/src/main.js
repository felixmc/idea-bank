'use strict';

import App from '../../react/App';
import Immutable from 'immutable';

import Debug from 'debug';
Debug.enable('todo:*');

let appElement = document.getElementById('app');

var app = new App(appElement, Immutable.Map({
  tasks: Immutable.Map({
    '5': {
      id: 5,
      label: 'write readme',
      isComplete: false
    },
    '9': {
      id: 9,
      label: 'learn react',
      isComplete: false
    },
    '12': {
      id: 12,
      label: 'isomorphic setup',
      isComplete: false
    },
    '15': {
      id: 15,
      label: 'have fun',
      isComplete: true
    }
  }),
  categories: Immutable.Map()
}));

app.render();

// use container to load react app after server side loading events?
