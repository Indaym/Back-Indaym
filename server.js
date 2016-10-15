/**
 * Import section
 */
const config = require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes/routes');

/**
 * Declaration section
 */
const app = express();
const db = mongoose.createConnection(config.uri);


db.on('error', (err) => {
    console.error('connection error' + err);
});

/**
 * Log all the call on the API
 *
 * @param req
 * @param res
 * @param next
 */
const logCall = (req, res, next) => {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
};

app.use(logCall);
app.use('/forum', routes.forumRouter);

app.listen(3000);
