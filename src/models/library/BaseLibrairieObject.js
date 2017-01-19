/**
 * Created by nicolas on 19/01/17.
 */

const uuid = require('node-uuid');

module.exports = {
  uuid: {
    type: 'string',
    primaryKey: true,
    defaultsTo: () => uuid.v4(),
    unique: true,
    index: true,
    uuidv4: true,
  },
  name: 'string',
  object: 'json'
};