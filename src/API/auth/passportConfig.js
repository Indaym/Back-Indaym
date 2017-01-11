/**
 * Created by djavrell on 11/01/17.
 */

const passport = require('passport');
const jwt = require('passport-jwt');
const passportSecret = require('../../../config/config').passportSecret;

const opt = {
  jwtFromRequest: jwt.ExtractJwt.fromUrlQueryParameter('token'),
  secretOrKey: passportSecret,
};

const strategy = (jwt_payload, done) => {
  console.log(jwt_payload);
  console.log(jwt_payload.iss);
  done(null, {});
};

passport.use(new jwt.Strategy(opt, strategy));

module.exports = {
  passport,
};
