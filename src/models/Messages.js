const waterline = require('waterline');

module.exports = waterline.Collection.extend({
  identity: 'messages',
  connection: 'postgresdb',

  attributes: {
    user: 'string',
    title: 'string',
    message: 'string',

    parent: {
      model: 'topics',
    },
  },
});
