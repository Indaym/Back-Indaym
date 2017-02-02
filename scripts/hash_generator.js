/**
 * Created by djavrell on 02/02/2017.
 */

let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}

const pwd = process.argv[2] || 'unM0tDeP4sse';
const secret = 'abcdef';
const salt = 'Indaym';

const hash = (str) => {
  return crypto
    .createHmac('sha256', secret)
    .update(str)
    .digest('hex')
};

const digest = hash(hash(pwd) + salt);

console.log(digest);