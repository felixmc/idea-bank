let debug = require('debug')('idea:actions').bind(null, '');

class IdeaActions {

  createIdea(idea) {
    debug('dispatching createIdea', idea);
    this.dispatch(idea);
  }

}

export default IdeaActions;
