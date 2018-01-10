const logFunc = require('../helpers').logFunc;
const fieldsIsValid = require('../helpers/authHelper').dataIsValid;
const createRes = require('../helpers').createRes;
const extract = require('../helpers/authHelper').extract;

const getUserRegister = async (req, res, next) => {
  const data = req.body.data;
  const userCollection = req.app.models.user;

  const query = {
    // username: data.username,
    email: data.email,
  }

  userCollection.findOne().where(query)
    .then(user => createRes(res, 403, `user ${user.username} or ${user.email} already exist`))
    .catch(err => next());
}

const getUserFromBody = async (req, res, next) => {
  const data = req.body.data;
  const field = {
    pwd: data.password,
    email: data.email,
  }
  const query = extract({ username: false }, field);
  const msg = 'password or email are wrong';

  return getUser(query, msg, req, res, next);
}

const getUserFromToken = (req, res, next) => {
  const data = req.payload;
  const field = {
    iss: data.iss,
    pwd: data.pwd,
    email: data.email,
  }
  const query = extract({ digest: false }, field);
  const msg = 'username, password or email are wrong';
  
  return getUser(query, msg, req, res, next);
}

const getUser = (query, errorMessage, req, res, next) => {
  const userCollection = req.app.models.user;

  userCollection.findOne().where(query)
    .then(user => {
      if (user === undefined) throw Error();
      req.user = user;
      next();
    })
    .catch(err => createRes(res, 403, { status: 'error', message: errorMessage }));
}

module.exports = {
  getUserRegister,
  getUserFromBody,
  getUserFromToken,
}