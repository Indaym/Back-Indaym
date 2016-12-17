/**
 * Created by djavrell on 16/12/16.
 */

const idTopics = (req, res, next, value) => {
  req.topics = req.app.models.Topics.find ({
    sort: 'createAt ASC'
  });
  next();
};

const idMessages = (req, res, next, value) => {
  req.messages = req.app.models.Messages.find ({
    sort: 'createAt ASC'
  });
  next();

};

const idSubForum = (req, res, next, value) => {
  next();
};

module.exports = {
  'id_massage': idMessages,
  'id_sub_forum': idSubForum,
  'id_topics': idTopics,
};
