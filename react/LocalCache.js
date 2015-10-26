'use strict';

import Immutable from 'immutable';

let debug = require('debug')('todo:cache').bind(null, '');


class LocalCache {
  constructor(store) {
    debug('registering localStorage for store:', store.displayName);
    this.store = store;

    this.save = this.save.bind(this);
    this.store.listen(this.save);
  }

  save(state) {
    let saveState = state || this.store.state;
    debug('saving store state to localStorage', saveState.toJS());
    localStorage.setItem(this.store.displayName, JSON.stringify(saveState.toJS()));
  }

  restore() {
    this.store.setState( old => old.merge(Immutable.fromJS(JSON.parse(localStorage.getItem(this.store.displayName) || '{}'))) );
    debug('loading store state from localStorage', this.store.state.toJS());
    return this.store.state;
  }

}

export default LocalCache;
