const tokenWorker = require('../workers/auth/token');
const createRes = require('../helpers').createRes;

module.exports.extractToken = (headerName) => (req, res, next) => {
  let payload;

  if (!headerName) {
    payload = tokenWorker.decodeAuthToken(req['Authorization']);
  } else {
    payload = tokenWorker.decodeRefreshToken(req[headerName]);
  }

  if (payload === undefined)
    return createRes(res, 403, { status: 'error', code: 'no data'});
  req.payload = payload;
  next();
}

module.exports.tokenIsValide = (token) => (req, res, next) => {
  try {
    tokenWorker.validateToken(req[token]);    
  } catch (err) {
    return createRes(res, 403);
  }
  next();
}
