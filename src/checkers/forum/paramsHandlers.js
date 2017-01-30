/**
 * Created by nicolas on 30/01/17.
 */

const urlIdChecker = require('../urlIdChecker');

const idForum = (req, res, next, value) => {
  if (req.savedParams === undefined)
    req.savedParams = {};
  req.savedParams['idForum'] = req.params.idForum;
  urlIdChecker(req, res, next, 'idForum', 'forum');
};

const idTopic = (req, res, next, value) => {
  if (req.savedParams === undefined)
    req.savedParams = {};
  req.savedParams['idTopic'] = req.params.idTopic;
  urlIdChecker(req, res, next, 'idTopic', 'topic', (params) => {
    return {
      uuid: req.savedParams.idTopic,
      forum: req.savedParams.idForum
    };
  });
};

const idMessage = (req, res, next, value) => {
  if (req.savedParams === undefined)
    req.savedParams = {};
  req.savedParams['idMessage'] = req.params.idMessage;
  urlIdChecker(req, res, next, 'idMessage', 'message', (params) => {
    return {
      uuid: req.savedParams.idMessage,
      topic: req.savedParams.idTopic
    };
  });
};

module.exports = {
  idForum,
  idMessage,
  idTopic
};