/**
 * Created by djavrell on 02/02/2017.
 */

const digest = require('./hash_generator').digest;
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const defaultSecret = config.secret.login;
const username = process.argv[3] || 'user1';
const password = process.argv[4] || 'password1';
const emailDefault = process.argv[5] || 'email.email@email.com';

let hash;
if (process.argv[2] === '0') {
  hash = digest(password);
} else {
  hash = password;
}

const end = '8h';

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

console.log(`jwt token => \n${token}`);

module.exports = {
  newToken,
  displayToken
};
