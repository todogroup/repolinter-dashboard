require('dotenv').config();

let config = {};
config.database = {
  host: process.env.DB_HOST,
  port: 8200,
  database: 'repoLinter',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  ssl: null,
};

function load() {
  return Promise.resolve(config);
}

module.exports = {
  default: config,
  config: config,
};
