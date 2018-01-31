const createRes = require('../helpers').createRes;
const fieldsIsValid = require('../helpers/authHelper').dataIsValid;

const validationField = (fileds, data, res, next) => {
  const validation = fieldsIsValid(data, fileds);
  if (validation.error)
    return createRes(res, 400, { status: 'error', message: validation.message });
  next();
}

const bodyValidation = (fileds = []) => (req, res, next) => validationField(fileds, req.body.data, res, next);

const queryValidation = (fileds = []) => (req, res, next) => validationField(fileds, req.query, res, next);

module.exports = {
  bodyValidation,
  queryValidation,
}