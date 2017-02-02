/**
 * Created by nicolas on 19/01/17.
 */

const waterline = require('waterline');

module.exports = waterline.Collection.extend({
  identity: 'news',
  connection: 'postgresdb',

  attributes: {
    title: {
      type: 'string',
      size: 100
    },
    message: 'string',
    publication_date: 'dateTime',
    author: {
      model: 'user'
    }
  }
});