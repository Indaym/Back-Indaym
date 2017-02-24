/**
 * Created by djavrell on 04/02/2017.
 */

const dataIsValid = (data) => {
  return data.username === undefined || data.password === undefined || data.email === undefined;
};

const newUser = (data) => {
  return {
    username: data.username,
    password: data.password,
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
    password: pwd,
    email: email,
  };
}

module.exports = {
  dataIsValid,
  newUser,
  extractInfo,
  logFunc,
};
