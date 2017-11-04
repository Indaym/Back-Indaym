const logFunc = require('../helpers/authHelper').logFunc;
const createRes = require('../helpers').createRes;

const getHeader = (headerName, func) => (req, res, next) => {
  let header = req.get(headerName);
  if (header === undefined)
    return createRes(res, 400, { status: 'error', code: `${headerName} not found` });
  req[headerName] = (func) ? func(header) : header;
  next();
}

module.exports = {
  getHeader,
}