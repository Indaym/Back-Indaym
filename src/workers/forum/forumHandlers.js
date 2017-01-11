const app = require ("waterline");

const getHandler = (req, res, next) => {
  const topics = req.topics;

  res.send({topics: topics});
  next();
};

const postHandler = (req, res, next) => {
  console.log('plop');
  // app.models.topics.create();
  res.send({data: 'plop'});
  next();
};

module.exports = {
  getHandler,
  postHandler
};
