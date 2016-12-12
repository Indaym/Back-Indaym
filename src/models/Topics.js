const waterline = require('waterline');

module.exports = waterline.Collection.extend({
  identity: 'topics',
  connection: 'postgresdb',

  attributes: {
    title: 'string',
    subject: 'string',

    messages: {
      collection: 'messages',
      via: 'parent',
    },

    parent: {
      model: 'forum',
    },
  },
});
