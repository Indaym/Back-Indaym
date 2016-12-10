/**
 * Log all the call on the API
 *
 * @param req
 * @param res
 * @param next
 */
const logCall = (req, res, next) => {
  console.log('%s %s', req.method, req.url);
  next();
};

module.exports = {
  logCall
};
