/**
 * Created by nicolas on 24/01/17.
 */

const errorHandler = require('../middleware/errorHandler');
const errorCustom = errorHandler.errorCustom;

const setter = (id, table, field = 'uuid') => {
  return (req, res, next) => {
    if (req.idChecker === undefined)
      req.idChecker = [];
    req.idChecker.push({
      id: id,
      table: table,
      field: field
    });
    next();
  };
};

/**
 * TODO : La présence du next dans le then empêche de chainer la vérification des arguments
 * Les loop de requêtes sql en asynchrone c'est pas ouf
 */

const executor = (req, res, next) => {
  try {
    if (req.idChecker === undefined)
      next();
    else {
      for (let checkerItem of req.idChecker) {
        if (req.params[checkerItem.id] === undefined) {
          throw new errorCustom(404, checkerItem.id + " not found in the url");
        } else {
          if (checkerItem.table === undefined || req.app.models[checkerItem.table] === undefined){
            console.error("Table " + checkerItem.table + " doesn't exist");
            throw new errorCustom(500, "Unknown Error");
          }
          const requestDesc = {};
          requestDesc[checkerItem.field] = req.params[checkerItem.id];
          req.app.models[checkerItem.table].findOne(requestDesc)
            .then((result) => {
              if (result === undefined || result.length === 0) {
                throw new errorCustom(404, checkerItem.id + " '" + req.params[checkerItem.id] + "' doesn't exist");
              } else
                next();
            })
            .catch((err) => {
              errorHandler.errorExecutor(next, err);
            })
        }
      }
    }
  }
  catch (e) {
    errorHandler.errorExecutor(next, e);
  }
};

module.exports = {
  setter,
  executor
};