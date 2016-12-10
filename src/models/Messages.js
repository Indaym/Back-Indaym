const waterline = require('waterline');

const MessagesCollection = waterline.Collection.extend({
  identity: 'Messages',
  connection: 'postgresdb',
  attribut: {
    'user': 'string',
    'title': 'string',
    'message': 'string',
    owner: {
      via: 'Topics',
    },
  },
});

module.exports = {
  MessagesCollection,
};
