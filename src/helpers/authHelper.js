/**
 * Created by djavrell on 04/02/2017.
 */
const digest = require('../../scripts/hash_generator').digest;
const tokenWorker = require('../workers/auth/token');

const dataIsValid = (data) => {
  error = false;
  unok = true;
  pnok = true;
  enok = true;
  
  switch (true) {
    case data.username === undefined:
      error = true;
      unok = false;
      break;
      case data.password === undefined:
      error = true;
      pnok = true;
      break;
    case data.email === undefined:
      error = true;
      enok = true;
      break;
  }
  return {
    error,
    message: `username: ${unok}, password: ${pnok}, email: ${enok}`,
  };
};

const newToken = (payload, opt) => {
  const options = opt ? tokenWorker.generateOpt(opt) : tokenWorker.generateOpt();
  return tokenWorker.generateToken(payload, options);
}

const newUser = (data) => {
  return {
    username: data.username,
    password: digest(data.password),
    email: data.email,
  };
};

const extractInfo = ({iss, pwd, email, }) => {
  return {
    username: iss,
    password: digest(pwd),
    email: email,
  };
}

const extractInfoBrute = ({iss, pwd, email, }) => {
  return {
    username: iss,
    password: pwd,
    email: email,
  };
}

const extract = (needDigest, {iss, pwd, email, }) => {
  return {
    username: iss,
    password: needDigest ? digest(pwd) : pwd,
    email: email,
  };
}

module.exports = {
  dataIsValid,
  newUser,
  newToken,
  extract,
  extractInfo,
  extractInfoBrute,
};
