import debug from 'debug';
import Immutable from 'immutable';


class LocalCache {
  constructor(store, key = store.displayName) {
    this.debug = debug('localstore:' + key).bind(null, '');
    this.debug('registering localStorage');

    this.store = store;
    this.key   = key;

    this.save = this.save.bind(this);

    this.listen();
  }

  listen() {
    this.debug('attaching listener');
    this.store.listen(this.save);
  }

  unlisten() {
    this.debug('detaching listener');
    this.store.unlisten(this.save);
  }

  save(data) {
    let saveState = data || this.store.state || Immutable.Map();
    let stateStr  = JSON.stringify(saveState.toJS());
    this.debug('saving store state to localStorage', stateStr);
    localStorage.setItem(this.key, stateStr);
  }

  restore() {
    let state = JSON.parse(localStorage.getItem(this.key) || '{}');
    this.store.setState( old => old.merge(Immutable.fromJS(state)) );
    this.debug('loading store state from localStorage', state);
    return this.store.state;
  }
}

export default LocalCache;
