/**
 * Created by nicolas on 24/01/17.
 */

const errorHandler = require('../middleware/errorHandler');
const errorCustom = errorHandler.errorCustom;

module.exports = (req, res, next, id, table, field = 'uuid') => {
  try {
    if (req.params[id] === undefined) {
      throw new errorCustom(404, id + " not found in the url");
    } else {
      if (table === undefined || req.app.models[table] === undefined){
        console.error("Table " + table + " doesn't exist");
        throw new errorCustom(500, "Unknown Error");
      }
      const requestDesc = {};
      requestDesc[field] = req.params[id];
      req.app.models[table].findOne(requestDesc)
        .then((result) => {
          if (result === undefined || result.length === 0) {
            throw new errorCustom(404, id + " '" + req.params[id] + "' doesn't exist");
          } else
            next();
        })
        .catch((err) => {
          errorHandler.errorExecutor(next, err);
        })
    }
  }
  catch (e) {
    errorHandler.errorExecutor(next, e);
  }
};