/**
 * Created by djavrell on 13/10/16.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subForum = require('./subForum.schema');

const forumSchema = new Schema({
    name: String,
    description: String,
    read: Boolean,
    subForum: [subForum]
});

let forum = mongoose.model('forum', forumSchema);

module.exports = forum;