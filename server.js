/**
 * Import
 */
const express = require('express');
const waterline = require('waterline');

const bodyParser = require('body-parser');
const methodOverRide = require('method-override');
const DBconfig = require('./config/waterlineConfig').DBconfig;
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');

const collections = require('./src/models');

/**
 *
 */
const app = express();
const orm = waterline();

/**
 * API imports
 */
const forum = require('./src/API/forum/forum');
const library = require('./src/API/library');
const games = require('./src/API/game/games');
const auth = require('./src/API/auth/auth');

/**
 * middleware import
 */
const middleware = require('./src/middleware');

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
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverRide());
app.use(passport.initialize());
app.use(morgan(middleware.logger()));

/**
 * router loading
 */
app.use('/forum', forum.forumRouter);
app.use('/auth', auth.authRouter);
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
