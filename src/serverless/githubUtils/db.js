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

const postData = async function (org_name, github_id, repo_name, full_name, github_owner_details, collaborators_url, teams_url, created_at, updated_at, git_url, ssh_url, clone_url, language, watchers_count, open_issues_count, license, repolinter_scan){
await pg.query('INSERT INTO githubrepos '+ 
	'(org_name, github_id, repo_name, full_name, github_owner_details, collaborators_url, teams_url, created_at, updated_at, git_url, ssh_url, clone_url, language, watchers_count, open_issues_count, license, repolinter_scan)' +
	' values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16, $17)',
	[org_name, github_id, repo_name, full_name, github_owner_details, collaborators_url, teams_url, created_at, updated_at, git_url, ssh_url, clone_url, language, watchers_count, open_issues_count, license, repolinter_scan]).catch(error => console.error(error));
}

const addOrg = async function(org){
await pg.query('INSERT INTO githuborgs (org_name) VALUES ($1)',[org]);
}

const removeOrg = async function(org_name){
await pg.query('delete from githuborgs where org_name =($1);',[org_name]);
}

const deleteData = async function(org_name){
await pg.query('delete from githubrepos where org_name = ($1);',[org_name]);
}

module.exports = {postData :postData, pg, addOrg, removeOrg, deleteData};
