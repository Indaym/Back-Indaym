/**
 * Import
 */

// checking arguments
const commander = require('commander');
const databaseConfig = require('./config/waterlineConfig');

function cb(val) {
  if (!val || !databaseConfig[val]) {
    process.emitWarning(`Unkown environment "${val}" set to default "production"`, {
      code: 'ENVIRONMENT CONFIG',
    });
    val = 'production';      
  }
  console.log(databaseConfig[val].connections);
  return val;
}

commander
  .version('0.1.0')
  .option('-c, --config <env>', 'Choose DB config', cb)
  .parse(process.argv);

// main import
const express = require('express');
const waterline = require('waterline');
const passport = require('passport');

// express middlewares
const bodyParser = require('body-parser');
const methodOverRide = require('method-override');
const morgan = require('morgan');
const cors = require('cors');

// Auth
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// configuration files
const config = require('./config/config');
const collections = require('./src/models');
const DBconfig = databaseConfig[commander.config || 'production'];

/**
 * API imports
 */
const forum = require('./src/API/forum/forum');
const library = require('./src/API/library');
const games = require('./src/API/game/games');
const auth = require('./src/API/auth/auth');
const textures = require('./src/API/textures');

/**
 * project middleware import
 */
const middleware = require('./src/middleware');
const lastGuardian = require('./src/helpers/lastGuardian');

/**
 * Init
 */
const app = express();
const orm = waterline();

/**
 * DB models loading
 */
for (let k in collections) {
  if (collections.hasOwnProperty(k)) {
    orm.loadCollection(collections[k]);
  }
}

/**
 * Auth options
 */
const opt = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret.token,
}

// keep it as exemple for the moment
// app.get('/auth', passport.authenticate('jwt', { session: false }), function(req, res) {
//   return res.status(200).json({ status: 'ok'});
// });

/**
 * load of all middleware we need
 */
app.use(morgan(middleware.logger()));
app.use(methodOverRide());  // must be stay here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(middleware.logCall);

/**
 * router loading
 */
app.use('/forum', forum.forumRouter);
app.use('/auth', auth.authRouter);
app.use('/library', library.libraryRouter);
app.use('/games', games.gamesRouter);
app.use('/textures', textures.texturesRouter);

/**
 * Handle errors
 */
app.use(lastGuardian.youShallNotPass);

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

  // passport strategy
  passport.use(new JwtStrategy(opt, (jwt_payload, done) => {
    //TODO: NUKE IT WHEN AUTH IS FINISHED
    console.log(jwt_payload);

    models.collections.user.findOne()
      .where({
        username: jwt_payload.iss,
        password: jwt_payload.pwd,
        email: jwt_payload.email
      })
      .then((user) => {
        if (user === undefined) {
          done(null, false);
        }
        console.log(user);
        done(null, user);
      })
      .catch((err) => {
        console.error(`${err}`);
        done(err, false);
      })
  }));

  app.listen(3000, () => {
    console.log("listen on port 3000");
  });
});