import alt from 'alt';

class AltProxy {

  constructor(realActions, ActionsClass) {
    this.realActions = realActions;

    this.Alt = new alt();

    this.proxyActions = this.Alt.createActions(ActionsClass);
  }

  createProxyStore(ProxyStoreClass) {
    return this.Alt.createStore(ProxyStoreClass, 'Proxy' + ProxyStoreClass.displayName, this.proxyActions, this.realActions);
  }

}

export default AltProxy;
