/**
 * Created by djavrell on 02/02/2017.
 */

const digest = require('./hash_generator').digest;
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const defaultSecret = config.secret.token;
const username = process.argv[2] || 'user1';
const password = process.argv[3] || 'password1';
const emailDefault = process.argv[5] || 'plop.plip@toto.net';

let hash;
if (process.argv[4] === '0') {
  hash = digest(password);
} else {
  hash = password;
}

const end = '1h';

const newToken = (user = username, pwdHash = hash, email = emailDefault, secret = defaultSecret, endLimit = end) => {
  const data = {
    iss: user,
    pwd: pwdHash,
    email: email
  };

  const opt = {
    expiresIn: endLimit,
  };

  return jwt.sign(data, secret, opt);
};

const displayToken = (token) => {
  console.log(jwt.decode(token));
};

const token = newToken();

console.log(`jwt token => \n\t${token}`);
// console.log(`token content => \n${displayToken(token)}`);

module.exports = {
  newToken,
  displayToken
};
