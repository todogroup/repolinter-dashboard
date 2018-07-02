const pgPromise = require('pg-promise');
const config = require('./config');

const pgp = pgPromise({});
const pg = connect();

function connect(){
 let configuration = config.config;
 let pg = pgp({
    host: configuration.database.host,
    port: configuration.database.port,
    database: configuration.database.database,
    user: configuration.database.user,
    password: configuration.database.password,
    ssl: configuration.database.ssl,
  })
 return pg;
}

exports.getOrgResult = async (event, context, callback) => {
    const org = event.pathParameters.org_name;
    try {
        const ret = await pg.query('select * from githubrepos where org_name = $1 order by repo_name asc',[org]);
        let response = {
            'statusCode': 200,
            'headers': {
            "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
            "Access-Control-Allow-Origin": "*"
            },
            'body': JSON.stringify({
                data: ret
            }),
            'method':'POST',
        }
        return response;
    }
    catch (err) {
        callback(err, null);
    }
    callback(null, response);
}

exports.getOrgList = async (event, context, callback) => {
    try {
        const ret = await pg.query('select * from githuborgs');
        let response = {
            'statusCode': 200,
            'headers': {
            "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
            "Access-Control-Allow-Origin": "*"
            },
            'body': JSON.stringify({
                data: ret
            }),
            'method':'POST',
        }
        return response;
    }
    catch (err) {
        callback(err, null);
    }
    callback(null, response);
}

exports.getJsonSchema = async (event,context,callback)=>{
 var fs = require('fs');
 try {
    var obj = fs.readFileSync('./jsonSchema/custom.json', 'utf8');
     let response = {
            'statusCode': 200,
            'headers': {
            "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
            "Access-Control-Allow-Origin": "*"
            },
            'body': JSON.stringify({
                data: obj
            }),
            'method':'POST',
        }
        return response;
    }
    catch (err) {
        callback(err, null);
    }
    callback(null, response); 
}

