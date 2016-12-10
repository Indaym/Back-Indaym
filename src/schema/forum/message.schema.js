/**
 * Created by djavrell on 13/10/16.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const objectId = mongoose.ObjectId;

const messageSchema = new Schema({
  content: String,
  like: Number,
  unLike: Number
});

module.exports = mongoose.model('message', messageSchema);