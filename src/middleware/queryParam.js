const fieldsIsValid = require('../helpers/authHelper').dataIsValid;
const createRes = require('../helpers').createRes;

const getOrElse = (val, fallback) => {
  return val ? val : fallback;
}

module.exports.orderBy = (req, res, next) => {
  const fileds = fieldsIsValid(req.query, [ 'orderBy' ]);
  if (fileds.errors)
    next();

  req.filterQuery = {
    ...req.filterQuery,
    ...{
      sort: req.query.orderBy,
    }
  };
  next();
}

module.exports.pagination = (req, res, next) => {
  const fileds = fieldsIsValid(req.query, ['limit', 'offset']);
  if (fileds.errors)
    return createRes(res, 403, { status: 'error', message: fileds.message });

  const skip = getOrElse(req.query.offset, 1) * getOrElse(req.query.limite, 1);

  req.filterQuery = {
    ...req.filterQuery,
    ...{
      limit: getOrElse(req.query.limit, 10),
      skip: skip === 1 ? 0 : skip,
    }
  };
  next();
}

module.exports.public = (req, res, next) => {
  req.filterQuery = {
    ...req.filterQuery,
    ...{
      where: {
        published: true,
      },
    },
  };
  next();
}

module.exports.owner = (req, res, next) => {
  req.filterQuery = {
    ...req.filterQuery,
    ...{
      where: {
        owner: req.user.uuid,
      },
    },
  };
  next();
};