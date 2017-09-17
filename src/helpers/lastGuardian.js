/**
 * Created by nicolas on 02/02/17.
 */

const gandalf = (err, req, res, next) => {
  res.status(err.code).json(err);
};

module.exports = {
  "youShallNotPass": gandalf
};