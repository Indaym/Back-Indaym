const createRes = require('../helpers').createRes;
const fieldsIsValid = require('../helpers/authHelper').dataIsValid;

const validationField = (opt = []) => async (req, res, next) => {
  const validation = fieldsIsValid(req.body.data, opt);
  if (validation.error)
    return createRes(res, 403, { status: 'error', message: validation.message });
  next();
}

module.exports = {
  validationField,
}