/**
 * Created by djavrell on 13/10/16.
 */

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const forumSchema = require('../schema/forum/forum.schema');

mongoose.connect('mongodb://utxy1eefdmxlzii:Vlgt4N23pK2frbKkbyCT@bttd8eunqn0wbrb-mongodb.services.clever-cloud.com:27017/bttd8eunqn0wbrb');
const forum =  mongoose.model('forum', forumSchema);

router.use((req, res, next) => {
    console.log('call forum API');
    next();
});

router.get('/', (req, res) => {
    res.send('welcome to the forum\n');
});

router.get('/all', (req, res) => {
    res.send(forum.getAll());
});

module.exports = router;
