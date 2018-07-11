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
	'values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16, $17)',
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

const upsert = async function(org_name, github_id, repo_name, full_name, github_owner_details, collaborators_url, teams_url, created_at, updated_at, git_url, ssh_url, clone_url, language, watchers_count, open_issues_count, license, repolinter_scan){
await pg.query('INSERT INTO githubrepos '+ 
    '(org_name, github_id, repo_name, full_name, github_owner_details, collaborators_url, teams_url, created_at, updated_at, git_url, ssh_url, clone_url, language, watchers_count, open_issues_count, license, repolinter_scan) ' +
    'values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16, $17) ON CONFLICT (repo_name) DO UPDATE SET '+
    'org_name=($1), github_id=($2), full_name=($4), github_owner_details=($5), collaborators_url=($6), teams_url=($7), created_at=($8), updated_at=($9), git_url=($10), ssh_url=($11), clone_url=($12), language=($13), watchers_count=($14), open_issues_count=($15), license=($16), repolinter_scan=($17);',
    [org_name, github_id, repo_name, full_name, github_owner_details, collaborators_url, teams_url, created_at, updated_at, git_url, ssh_url, clone_url, language, watchers_count, open_issues_count, license, repolinter_scan]).catch(error => console.error(error));
}

module.exports = {postData :postData, pg, addOrg, removeOrg, deleteData, upsert};
