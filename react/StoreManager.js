'use strict';

import alt from 'alt';
import chromeDebug from 'alt/utils/chromeDebug';


class StoreManager {
  constructor(realStore, realActions, proxyStoreClass, proxyActionsClass) {
    this.realStore   = realStore;
    this.realActions = realActions;

    this.Alt = new alt();
    chromeDebug(this.Alt);

    this.proxyActions = this.Alt.createActions(proxyActionsClass);
    this.proxyStore   = this.Alt.createStore(proxyStoreClass, 'ProxyIdeaStore', this.proxyActions, this.realActions);
  }

}

export default StoreManager;
