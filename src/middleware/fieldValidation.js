const createRes = require('../helpers').createRes;
const fieldsIsValid = require('../helpers/authHelper').dataIsValid;

const validationField = async (req, res, next) => {
  const validation = fieldsIsValid(req.body.data);
  if (validation.error)
    return createRes(res, 403, { status: 'error', code: `${validation.message}` });
  next();
}

module.exports = {
  validationField,
}