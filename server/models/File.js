var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var fileSchema = new mongoose.Schema({
  name: String,
  size: Number,
  extension: String,
  typeDoc: String,
  short: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  link: { type: Schema.Types.ObjectId, ref: 'Folder' }
}, schemaOptions);

module.exports = mongoose.model('File', fileSchema);