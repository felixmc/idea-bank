'use stict';


var Idea = function(mongoose) {

  var IdeaSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
    body: { type: String, default: '' },
    date_created: { type: Date },
    date_updated: { type: Date }
  });

  IdeaSchema.pre('save', function(next) {
    var now = new Date();
    this.date_updated = now;

    if (!this.date_created) {
      this.date_created = now;
    }

    next();
  });

  IdeaSchema.methods.toJSON = function() {
    var obj = this.toObject();
    obj.id  = obj._id;

    delete obj.__v;
    delete obj._id;

    return obj;
  };

  return mongoose.model('Idea', IdeaSchema);
};

module.exports = Idea;
