/**
 * Created by djavrell on 15/10/16.
 */

const getHandler = (req, res, next) => {
  next();
};

const getIdHandler = (req, res, next) => {
  res.send('sub_forum_id: ' + req.params.sub_forum_id + ' > message_id: ' + req.params.message_id + '\n');
  next();
};

const postHandler = (req, res, next) => {
  next();
};

module.exports = {
  getHandler,
  getIdHandler,
  postHandler
};
