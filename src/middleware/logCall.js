/**
 * Log all the call on the API
 *
 * @param req   => the request object from express
 * @param res   => the response object from express
 * @param next  => callback use by express to call the next middleware
 */
const logCall = (req, res, next) => {
  console.log('%s %s', req.method, req.url);
  next();
};

module.exports = {
  logCall,
};
