const getHandler = (req, res, next) => {
  res.send('welcome to the forum\n');
  next();
};

const postHandler = (req, res, next) => {
  res.send(req.params);
  next();
};

module.exports = {
  getHandler,
  postHandler
};
