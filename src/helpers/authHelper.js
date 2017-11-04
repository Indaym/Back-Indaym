/**
 * Created by djavrell on 04/02/2017.
 */
const digest = require('../../scripts/hash_generator').digest;

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

const newUser = (data) => {
  return {
    username: data.username,
    password: digest(data.password),
    email: data.email,
  };
};

const logFunc = (err, func) => {
  console.log(err);
  return func;
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
  extract,
  extractInfo,
  extractInfoBrute,
  logFunc,
};
