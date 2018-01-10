/**
 * Created by djavrell on 02/02/2017.
 */

let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}
const config = require('../config/config');

const pwd = process.argv[2] || 'unM0tDeP4sse';
const secret = 'abcdef';
const defaultSalt = config.salt.password;

const hash = (str) => {
  return crypto
    .createHmac('sha256', secret)
    .update(str)
    .digest('hex')
};

const digest = (value = pwd, salt = defaultSalt) => {
  return hash(hash(value) + salt);
};

module.exports = {
  digest
};
