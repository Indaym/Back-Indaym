/**
 * Created by nicolas on 02/02/17.
 */

const urlIdChecker = require('../urlIdChecker');

const idObject = (req, res, next) => {
  urlIdChecker(req, res, next, 'idObject', 'library_object');
};

module.exports = {
  idObject
};