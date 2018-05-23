var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  parent: [{ type: Schema.Types.ObjectId, ref: 'Folder' }],
}, schemaOptions);

module.exports = mongoose.model('Folder', folderSchema);