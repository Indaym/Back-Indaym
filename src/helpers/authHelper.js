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

module.exports = {
  dataIsValid,
  newUser,
};
