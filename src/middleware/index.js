const errorHandler = require('./errorHandler');
const fieldValidation = require('./fieldValidation');
const getUser = require('./getUser');
const paramHandler = require('./paramHandler');
const header = require('./header');
const logCall = require('./logCall').logCall;
const token = require('./token');

const trace = (message) => (req, res, next) => {
  console.log(message ? message : 'traceing');
  next();
}

const logger = () => {
  const env = process.env.NODE_ENV || 'dev';

  if (env === 'production') {
    return 'combined';
  }
  return 'dev';
};

module.exports = {
  logCall,
  trace,
  logger,
  errorHandler,
  fieldValidation,
  getUser,
  paramHandler,
  header,
  token,
};
