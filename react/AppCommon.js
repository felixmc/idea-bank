'use strict';

import alt from 'alt';
import chromeDebug from 'alt/utils/chromeDebug';
import immutable from 'alt/utils/ImmutableUtil';

import IdeaActions from './IdeaActions';
import IdeaStore from './IdeaStore';

export const Alt = new alt();
chromeDebug(Alt);

export const Actions = Alt.createActions(IdeaActions);
export const Store   = Alt.createStore(immutable(IdeaStore), 'IdeaStore', Actions);
