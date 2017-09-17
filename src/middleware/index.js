const logCall = require('./logCall').logCall;

const logger = () => {
  const env = process.env.NODE_ENV || 'dev';

  if (env === 'production') {
    return 'combined';
  }
  return 'dev';
};

module.exports = {
  logCall,
  logger,
};
