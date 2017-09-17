/**
 * Created by djavrell on 16/12/16.
 */

const idTopics = (req, res, next, value) => {
  const topicsModel = req.app.models.Topics;

  topicsModel.findOne()
    .where({ id: value })
    .sort('createdAt ASC')
    .exec((err, topic) => {
      if (err) {
        next(err)
      } else if(message) {
        req.topics = topic;
        next();
      } else {
        next(err('Failed too load a topics'));
      }
    });
  next();
};

const idMessages = (req, res, next, value) => {
  const messagesModel = req.app.models.Messages;

  messagesModel.findOne()
    .where({ id: value })
    .sort('createdAt ASC')
    .exec((err, message) => {
      if (err) {
        next(err)
      } else if(message) {
        req.messages = message;
        next();
      } else {
        next(err('Failed too load a message'));
      }
    });
};

const idSubForum = (req, res, next, value) => {
  next();
};

module.exports = {
  'id_massage': idMessages,
  'id_sub_forum': idSubForum,
  'id_topics': idTopics,
};
