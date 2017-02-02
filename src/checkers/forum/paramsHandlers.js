/**
 * Created by nicolas on 30/01/17.
 */

const urlIdChecker = require('../urlIdChecker');

const idForum = (req, res, next, value) => {
  urlIdChecker(req, res, next, 'idForum', 'forum');
};

const idTopic = (req, res, next, value) => {
  urlIdChecker(req, res, next, 'idTopic', 'topic', (params) => {
    return {
      uuid: req.params.idTopic,
      forum: req.params.idForum
    };
  });
};

const idMessage = (req, res, next, value) => {
  urlIdChecker(req, res, next, 'idMessage', 'message', (params) => {
    return {
      uuid: req.params.idMessage,
      topic: req.params.idTopic
    };
  });
};

module.exports = {
  idForum,
  idMessage,
  idTopic
};