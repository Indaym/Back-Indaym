/**
 * Created by djavrell on 02/02/2017.
 */

const digest = require('./hash_generator').digest;
const jwt = require('jsonwebtoken');

const defaultSecret = 'Indaym';
const username = process.argv[2] || 'user1';
const password = process.argv[3] || 'password1';
const hash = digest(password);
const end = '1h';

const newToken = (user = username, pwdHash = hash, secret = defaultSecret, endLimit = end) => {
  const data = {
    iss: user,
    pwd: pwdHash
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

console.log(token);
console.log(displayToken(token));

module.exports = {
  newToken,
  displayToken
};
