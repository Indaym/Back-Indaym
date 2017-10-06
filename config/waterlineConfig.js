/**
 * Created by djavrell on 05/12/16.
 */

const PGAdapter = require('waterline-postgresql');

/*
 * Default config used for everyone
 */
const defaultConfig = {
  adapters: {},
  connections: {
    postgresdb: {
      adapter: 'postgres',
      pool: {
        min: 2,
        max: 20,
      },
    },
  },
};

/*
 * Stringify of default config to be parse after
 */
const defaultConfigStr = JSON.stringify(defaultConfig);

/*
 * Setup environment 
 * 
 * - Parse stringified defaulConfig to create new object
 * - Set PGAdapter need reference can't be stringified
 * - Set custom connection
 */
function setup(connection) {
  const env = JSON.parse(defaultConfigStr); // Really dirty but need deep copy, any suggestion ?
  env.adapters['postgres'] = PGAdapter;
  env.connections.postgresdb.connection = connection;
  return env;
}

/*
 * Environments
 */

// Production
const production = setup({
  database: 'bnc4cnogpb2rxwd',
  host: 'bnc4cnogpb2rxwd-postgresql.services.clever-cloud.com',
  user: 'uy0rfk0tyaulc9garili',
  password: 'IdTezRfmU1Onx6NhynUf',
  port: 5432,
  ssl: false,
});

// Development / Local docker
const development = setup({
  database: 'main',
  host: 'localhost',
  user: 'indaym',
  password: 'indaym',
  port: 4001,
  ssl: false,
});

/*
 * export of environments
 */
module.exports = {
  production,
  development,
};
