/**
 * Created by djavrell on 13/10/16.
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const forum = require('../schema/forum/forum.schema');

router.use((req, res, next) => {
    console.log('call forum API');
    next();
});

router.get('/', (req, res) => {
    res.send('welcome to the forum\n');
});

router.post('/', (req, res) => {
    forum.create({name: 'test', description: 'totot toto', read: false});
    console.log(forum.findOne({ name: 'test'}).description);
    res.send(req.params);
});

module.exports = router;
