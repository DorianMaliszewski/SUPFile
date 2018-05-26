var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var File = require('./File');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var folderSchema = new mongoose.Schema({
  name: String,
  size: Number,
  short: String,
  files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
  owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  parent: { type: Schema.Types.ObjectId, ref: 'Folder' },
  subFolder: [{ type: Schema.Types.ObjectId, ref: 'Folder' }],
}, schemaOptions);

folderSchema.methods.populateTree = function () {
  var node = this;
  return this.constructor.find({ parent: this._id }).exec()
    .then(function (arrayOfChildren) {
      return Promise.each(arrayOfChildren, function (child) {
        node.children.push(child);
        child.parent = null;
        return child.populateTree();
      });
    });
}

folderSchema.pre('remove', function (next) {
  // 'this' is the client being removed. Provide callbacks here if you want
  // to be notified of the calls' result.
  File.remove({ link: this._id }).exec();
  folderSchema.remove({ parent: this._id }).exec();
  next();
});

module.exports = mongoose.model('Folder', folderSchema);