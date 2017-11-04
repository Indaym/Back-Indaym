const tokenWorker = require('../workers/auth/token');
const createRes = require('../helpers').createRes;

module.exports.extractToken = (req, res, next) => {
  const payload = tokenWorker.decodeAuthToken(req.Authorization);
  if (payload === undefined)
    return createRes(403, { status: 'error', code: 'no data'});
  req.payload = payload;
  next();
}