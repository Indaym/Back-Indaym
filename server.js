const express = require('express');
const waterline = require('waterline');

const bodyParser = require('body-parser');
const methodOverRide = require('method-override');
const DBconfig = require('./config/waterlineConfig').DBconfig;

const collections = require('./src/models');

/**
 * API imports
 */
const forum = require('./src/API/forum/forum');
const library = require('./src/API/library');
const games = require('./src/API/game/games');

/**
 * middleware import
 */
const middleware = require('./src/middleware');

const app = express();
const orm = waterline();

/**
 * load each model in waterline
 */
for (let k in collections) {
  if (collections.hasOwnProperty(k)) {
    orm.loadCollection(collections[k]);
  }
}

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
app.use('/forum', forum.forumRouter);
app.use('/library', library.libraryRouter);
app.use('/games', games.gamesRouter);

/**
 * Handle errors
 */
app.use(function(err, req, res, next) {
  res.status(err.code).json(err);
});

/**
 * ORM
 */
orm.initialize(DBconfig, (err, models) => {
  if (err) {
    console.error(err);
    return;
  }

  app.models = models.collections;
  app.connections = models.connections;

  app.listen(3000, () => {
    console.log("listen on port 3000");
  });

});
