import React from 'react';
import AltContainer from 'alt/AltContainer';
import Immutable from 'immutable';

import { Store, Actions } from './AppCommon';
import IdeaActions from './IdeaActions';
import StoreManager from './StoreManager';
import IdeaBank from './components/IdeaBank.jsx';

let debug = require('debug')('idea:app').bind(null, '');

debug('AppCommon', Store, Actions);


class App {

  constructor(element, state, ProxyStore) {
    debug('constructing IdeaBank with state', state && state.toJS());


    if (ProxyStore) {
      this.manager = new StoreManager(Actions, IdeaActions);

      this.actions = this.manager.proxyActions;
      this.store   = Store;

      this.manager.createProxyStore(ProxyStore);
    } else {
      this.actions = Actions;
      this.store   = Store;
    }

    this.element = element;

    if (state) this.store.setState(state);
  }

  setState(state) {
    debug('settings app state', state.toJS());
    this.store.setState(state);
  }

  render(element) {
    let state = this.store.getState();
    this.element = element || this.element;

    let self = this;

    let appRootElement = (
      <AltContainer
        stores={
          { ideas: self.store }
        }
        actions={
          { IdeaActions: self.actions }
        }>
        <IdeaBank />
      </AltContainer>
    );


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
