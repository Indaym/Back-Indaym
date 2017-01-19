/**
 * Created by nicolas on 19/01/17.
 */

const waterline = require('waterline');
const base = require('./BaseLibrairieObject');

module.exports = waterline.Collection.extend({
  identity: 'public_object',
  connection: 'postgresdb',
  autoPk: false,

  attributes: {}.extend(base)
});