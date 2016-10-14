const config = require('./config/config');
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const routes = require('./src/routes/routes');

let db = mongoose.createConnection(config.uri);
db.on('error', (err) => {
    console.error('connection error' + err);
});

app.use('/forum', routes.forum);

app.get('/', (req, res) => {
    console.log("get on /");
    res.send("hello world!");
});

app.listen(3000, () => {
    console.log("listen on port 3000");
});
