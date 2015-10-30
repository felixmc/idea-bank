'use strict';

import Immutable from 'immutable';

import App from '../../react/App';
import LocalCache from '../../react/LocalCache';

import SocketIdeaStore from './SocketIdeaStore';

import Debug from 'debug';
Debug.enable('idea:*');

let debug = require('debug')('idea:driver').bind(null, '');


let appElement = document.getElementById('app');

let app   = new App(appElement, Immutable.Map(), SocketIdeaStore);
// let cache = new LocalCache(app.store);
// cache.restore();

app.render();
