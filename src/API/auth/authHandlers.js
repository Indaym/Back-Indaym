/**
 * Created by djavrell on 10/01/17.
 */

const waterline = require('waterline');

const errorHandler = require('../../../src/middleware/errorHandler');
const {
  newUser,
  newToken
} = require('../../helpers/authHelper');

const {
  logFunc,
  createRes
} = require('../../helpers');
const tokenWorker = require('../../workers/auth/token');

const getTokens = (user) => {
  return {
    token: newToken(user),
    refreshToken: newToken(user, ((60 * 60) + (5 * 60))),
  }
}

const register = async (req, res) => {
  const userCollection = req.app.models.user;

  try {
    const createdUser = await userCollection.create(newUser(req.body.data));
    return createRes(res, 202, { status: 'created', code: `user ${createdUser.username} created` });
  } catch (err) {
    return logFunc(err, createRes(res, 400, { status: 'error', code: 'bad request' }));
  }
};

const login = async (req, res) => {
  const userCollection = req.app.models.user;
  const user = req.user;

  try {
    const result = await userCollection.update( { uuid: user.uuid }, { isConnected: true } );
    if (result.length === 0)
      return createRes(403, { status: 'error', code: 'Error while login procedure'});      

    return createRes(res, 200, {
      status: 'ok',
      ...getTokens(tokenWorker.dataFromUser(user)),
      user: {
        username: user.username,
        email: user.email,
      }
    });
  } catch (err) {
    logFunc(err, createRes(res, 500));
  }
};

const logout = async (req, res) => {
  const userCollection = req.app.models.user;

  try {
    const result = await userCollection.update({ uuid: req.user.uuid }, { isConnected: false });
    if (result.length === 0) {
      return createRes(res, 403, { status: 'error', code: 'Error while logout procedure'});    
    }
    return createRes(res, 200);  
  } catch (err) {
    return logFunc(err, createRes(res, 500));
  }
};

const authenticated = (req, res) => {
  return createRes(res, 200, { authenticated: 'yes' });
};

const refresh = (req, res) => {
  return createRes(res, 200, {status: 'ok', ...getTokens(tokenWorker.dataFromUser(req.user))});
};

module.exports = {
  login,
  logout,
  authenticated,
  register,
  refresh,
};
