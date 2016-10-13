/**
 * Created by djavrell on 13/10/16.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const objectId = mongoose.ObjectId;

const forum = new Schema({
    name: String,
    like: Number,
    read: Boolean
});

forum.methods.getAll =  function() {
    return this.model('forum').find({ type: this.type});
};

module.exports = forum;