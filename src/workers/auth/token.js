/**
 * Created by djavrell on 04/02/2017.
 */

const jwt = require('jsonwebtoken');
const secret = require('../../../config/config').secret;

const option = {
  expiresIn: '1h'
};

const generateOpt = (end = '1h') => {
  return {
    expiresIn: end,
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

const decodeToken = (token, secret) => {
  try {
    const verify = jwt.verify(token, secret);

    return jwt.decode(token);
  } catch (err) {

    console.error(err);
    return undefined;
  }
};

const hasExpired = (token, secret) => {
  try {
    const verify = jwt.verify(token, secret);

    return jwt.decode(token);
  } catch (err) {
    if (err.name == 'TokenExpiredError')
      return err.message;
    return undefined;
  }
};

const tokenHasExpired = (token) => hasExpired(token, secret.token);

const decodeAuthToken = (token) => decodeToken(token, secret.token);

const decodeLoginToken = (token) => decodeToken(token, secret.login);

module.exports = {
  generateToken,
  validateToken,
  decodeLoginToken,
  decodeAuthToken,
  dataFromUser,
  generateOpt,
  tokenHasExpired,
};
