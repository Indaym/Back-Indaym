/**
 * Created by djavrell on 04/02/2017.
 */

const jwt = require('jsonwebtoken');
const secret = require('../../../config/config').secret;

const option = {
  expiresIn: '1h'
};

const generateOpt = () => {
  return {
    expiresIn: '1h'
  };
};

const dataFromUser = ({ username, password, email, }) => {
  return {
    iss: username,
    pwd: password,
    email,
  };
};

const generateToken = (data, opt = option) => {
  return jwt.sign(data, secret.token, opt);
};

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret.token);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const decodeLoginToken = (token) => {
  try {
    const verify = jwt.verify(token, secret.token);

    return jwt.decode(token);
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

module.exports = {
  generateToken,
  validateToken,
  decodeLoginToken,
  dataFromUser
};