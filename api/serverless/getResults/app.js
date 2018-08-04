const pgPromise = require('pg-promise');
const config = require('./config');

const pg = connect();

const header = {
  'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
  'Access-Control-Allow-Origin': '*',
};

function connect() {
  const pgp = pgPromise({});
  let configuration = config.config;
  return pgp({
    host: configuration.database.host,
    port: configuration.database.port,
    database: configuration.database.database,
    user: configuration.database.user,
    password: configuration.database.password,
    ssl: configuration.database.ssl,
  });
}

exports.getOrgResult = async (event, context, callback) => {
  const org = event.pathParameters.org_name;
  try {
    const ret = await pg.query(
      'select * from githubrepos where org_name = $1 order by repo_name asc',
      [org]
    );
    const response = {
      statusCode: 200,
      headers: header,
      body: JSON.stringify({
        data: ret,
      }),
    };
    return response;
  } catch (err) {
    callback(err, null);
    return;
  }
  callback(null, response);
};

exports.getOrgList = async (event, context, callback) => {
  try {
    const ret = await pg.query('select * from githuborgs');
    const response = {
      statusCode: 200,
      headers: header,
      body: JSON.stringify({
        data: ret,
      }),
    };
    return response;
  } catch (err) {
    callback(err, null);
    return;
  }
  callback(null, response);
};

exports.getJsonSchema = async (event, context, callback) => {
  var fs = require('fs');
  try {
    var obj = fs.readFileSync('./jsonSchema/custom.json', 'utf8');
    const response = {
      statusCode: 200,
      headers: header,
      body: JSON.stringify({
        data: obj,
      }),
    };
    return response;
  } catch (err) {
    callback(err, null);
    return;
  }
  callback(null, response);
};
