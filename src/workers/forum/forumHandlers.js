const app = require ("waterline");

const getHandler = (req, res, next) => {
  const topics = app.models.Topics.find();

  res.send(topics);
  next();
};

const postHandler = (req, res, next) => {
  app.models.Topics.create();
  next();
};

module.exports = {
  getHandler,
  postHandler
};
