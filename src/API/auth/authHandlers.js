/**
 * Created by djavrell on 10/01/17.
 */

const waterline = require('waterline');

const register = (req, res, next) => {
  if (req.body.username === undefined || req.body.password === undefined) {
    return res.status(401).json({status: 'error', code: 'unauthorized'});
  }

  const user = req.body.username;
  const pwd = req.body.password;


  res.status(200).json({ok: "plop"});
  next();
};

const login = (req, res, next) => {
  next();
};

const logout = (req, res, next) => {
  next();
};

const authenticated = (req, res, next) => {
  next();
};

module.exports = {
  login,
  logout,
  authenticated,
  register,
};