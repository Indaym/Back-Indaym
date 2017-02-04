/**
 * Created by djavrell on 05/12/16.
 */

const PGAdapter = require('waterline-postgresql');

module.exports.DBconfig = {
  adapters: {
    'postgres': PGAdapter,
  },

  connections: {
    postgresdb: {
      adapter: 'postgres',
      connection: {
        database: 'bbejcnfaagdonga',
        host: 'bbejcnfaagdonga-postgresql.services.clever-cloud.com',
        user: 'upjypdj0fiigyabp8wj1',
        password: 'GML9g4bSrk6W52qjfi5J',
        port: 5432,
        ssl: false,
      },
      pool: {
        min: 2,
        max: 20,
      },
    },
  },
};
