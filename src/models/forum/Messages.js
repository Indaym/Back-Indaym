const waterline = require('waterline');

module.exports = waterline.Collection.extend({
  identity: 'messages',
  connection: 'postgresdb',

  attributes: {
    title: 'string',
    message: 'string',

    topics: {
      model: 'topics',
    },

    user: {
      model: 'user',
    },
  },
});
