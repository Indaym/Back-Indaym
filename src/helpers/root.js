/**
 * Created by djavrell on 16/12/16.
 */

const path = require('path');
const ROOT = path.resolve(__dirname, '../..');

const root = (args) => {
  const ret = path.join.apply(path, [ROOT].concat(args));
  console.log(ret);
};

module.exports = {
  root,
};