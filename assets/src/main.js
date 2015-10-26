'use strict';

import App from '../../react/App';
import LocalCache from '../../react/LocalCache';

import Immutable from 'immutable';

import Debug from 'debug';
Debug.enable('todo:*');

let debug = require('debug')('todo:driver').bind(null, '');


let appElement = document.getElementById('app');

// window.Immutable = Immutable;


let data = Immutable.Map({
  tasks: Immutable.Map({
    '5': {
      id: '5',
      label: 'write readme',
      isComplete: false
    },
    '9': {
      id: '9',
      label: 'react router',
      isComplete: false
    },
    '12': {
      id: '12',
      label: 'isomorphic setup',
      isComplete: false
    },
    '15': {
      id: '15',
      label: 'have fun',
      isComplete: true
    },
    '17': {
      id: '17',
      label: 'cache to localStorage',
      isComplete: false
    }
  }),
  categories: Immutable.Map()
});

let app   = new App(appElement);
let cache = new LocalCache(app.store);

cache.restore();

// let localData = Immutable.fromJS(JSON.parse(localStorage.getItem('TodoStore') || '{}'));

// debug('data', data, data.toJS());
// debug('local', localData, localData.toJS());

// app.loadFromLocalStorage();
// app.registerLocalStorage();
// app.setState(data);

app.render();
