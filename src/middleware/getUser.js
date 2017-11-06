const logFunc = require('../helpers').logFunc;
const fieldsIsValid = require('../helpers/authHelper').dataIsValid;
const createRes = require('../helpers').createRes;
const extract = require('../helpers/authHelper').extract;

const getUserRegister = async (req, res, next) => {
  const data = req.body.data;
  const userCollection = req.app.models.user;

  const query = {
    username: data.username,
  }

  userCollection.findOne().where(query)
    .then(user => createRes(res, 403, `user ${user.username} already exist`))
    .catch(err => next());
}

const getUserFromBody = async (req, res, next) => {
  const data = req.body.data;
  const field = {
    iss: data.username,
    pwd: data.password,
    email: data.email,
  }
  const query = extract(true, field);
  const msg = 'username, password or email are wrong';

  return getUser(query, msg, req, res, next);
}

const getUserFromToken = (req, res, next) => {
  const data = req.payload;
  const field = {
    iss: data.iss,
    pwd: data.pwd,
    email: data.email,
  }
  const query = extract(false, field);
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
    .catch(err => createRes(res, 403, { status: 'error', code: errorMessage }));
}

module.exports = {
  getUserRegister,
  getUserFromBody,
  getUserFromToken,
}