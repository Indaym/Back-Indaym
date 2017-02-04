/**
 * Created by djavrell on 10/01/17.
 */

const waterline = require('waterline');

const errorHandler = require('../../../src/middleware/errorHandler');
const fieldsIsValid = require('../../helpers/authHelper').dataIsValid;
const newUser = require('../../helpers/authHelper').newUser;


const register = (req, res) => {
  const data = req.body.data;
  const userCollection = req.app.models.user;

  if (fieldsIsValid(data)) {
    return res.status(403).json({ status: 'error', code: 'forbidden' });
  }

  userCollection.findOne()
    .where({
      username: data.username
    })
    .then((user) => {
      if (user === undefined) {

        userCollection
          .create(newUser(data))
          .then((user) => {
            return res.status(202).json({ status: 'created', code: `user ${user.username} created` });
          })
          .catch((err) => {
            console.error(err);
            return res.status(400).json({ status: 'error', code: 'bad request' });
          });

      } else {
        return res.status(403).json({ status: 'error', code: `user ${user.username} already exist` });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ status: 'error', code: 'server error' });
    });
};

const login = (req, res) => {
};

const logout = (req, res) => {
};

const authenticated = (req, res) => {
};

module.exports = {
  login,
  logout,
  authenticated,
  register,
};