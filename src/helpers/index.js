/**
 * Created by djavrell on 16/12/16.
 */

const root = require('./root').root;
const newRouter = require('./router').newRouter;
const createRes = require('./response').createRes;

const logFunc = (err, func) => {
  console.log(err);
  return func;
};

module.exports = {
  logFunc,
  root,
  newRouter,
  createRes,
};
