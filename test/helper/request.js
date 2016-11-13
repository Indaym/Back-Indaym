const request = require('request');

module.exports = (url, logger, callback) => {
  console.log('call function');
  request(url, (error, xhr, response) => {
    logger('request made');
    callback(error, response);
  })
};
