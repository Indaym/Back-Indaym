const express = require('express');
const waterline = require('waterline');

const bodyParser = require('body-parser');
const methodOverRide = require('method-override');
const DBconfig = require('./config/waterlineConfig').DBconfig;

const forum = require('./src/API/forum/forum');
const collections = require('./src/models');

const app = express();
const orm = waterline();

/**
 * middleware import
 */
const middleware = require('./src/middleware');

/**
 * load each model in waterline
 */
orm.loadCollection(collections.Forum);
orm.loadCollection(collections.Topics);
orm.loadCollection(collections.Messages);

/**
 * load of all middleware we need
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverRide());

app.use(middleware.logCall);

/**
 * router loading
 */
app.use(forum.forum);


/**
 * ORM
 */

orm.initialize(DBconfig, (err, models) => {
  if (err) {
    console.log(err);
    return;
  }

  app.models = models.collections;
  app.connections = models.connections;

  app.listen(3000, () => {
    console.log("listen on port 3000");
  });

});
