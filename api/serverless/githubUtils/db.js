const pgPromise = require('pg-promise');
const config = require('./config');

// tslint:disable:variable-name

const pgp = pgPromise({});
const pg = connect();

function connect() {
  let configuration = config.config;
  pg = pgp({
    host: configuration.database.host,
    port: configuration.database.port,
    database: configuration.database.database,
    user: configuration.database.user,
    password: configuration.database.password,
    ssl: configuration.database.ssl,
  });
  return pg;
}

const postData = async function(
  org_name,
  github_id,
  repo_name,
  full_name,
  github_owner_details,
  collaborators_url,
  teams_url,
  updated_at,
  git_url,
  ssh_url,
  clone_url,
  language,
  watchers_count,
  open_issues_count,
  license,
  repolinter_scan
) {
  await pg
    .query(
      'INSERT INTO githubrepos ' +
        '(org_name, github_id, repo_name, full_name, github_owner_details, collaborators_url, teams_url, updated_at, git_url, ssh_url, clone_url, language, watchers_count, open_issues_count, license, repolinter_scan)' +
        'values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)',
      [
        org_name,
        github_id,
        repo_name,
        full_name,
        github_owner_details,
        collaborators_url,
        teams_url,
        updated_at,
        git_url,
        ssh_url,
        clone_url,
        language,
        watchers_count,
        open_issues_count,
        license,
        repolinter_scan,
      ]
    )
    .catch(error => console.error(error));
};

const addOrg = async function(org) {
  await pg.query('INSERT INTO githuborgs (org_name) VALUES ($1)', [org]);
};

const removeOrg = async function(org_name) {
  await pg.query('delete from githuborgs where org_name =($1);', [org_name]);
};

const deleteData = async function(org_name) {
  await pg.query('delete from githubrepos where org_name = ($1);', [org_name]);
};

const upsert = async function(
  org_name,
  github_id,
  repo_name,
  full_name,
  github_owner_details,
  collaborators_url,
  teams_url,
  updated_at,
  git_url,
  ssh_url,
  clone_url,
  language,
  watchers_count,
  open_issues_count,
  license,
  repolinter_scan
) {
  await pg
    .query(
      'INSERT INTO githubrepos ' +
        '(org_name, github_id, repo_name, full_name, github_owner_details, collaborators_url, teams_url, updated_at, git_url, ssh_url, clone_url, language, watchers_count, open_issues_count, license, repolinter_scan) ' +
        'values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) ON CONFLICT (repo_name) DO UPDATE SET ' +
        'org_name=($1), github_id=($2), full_name=($4), github_owner_details=($5), collaborators_url=($6), teams_url=($7), updated_at=($8), git_url=($9), ssh_url=($10), clone_url=($11), language=($12), watchers_count=($13), open_issues_count=($14), license=($15), repolinter_scan=($16);',
      [
        org_name,
        github_id,
        repo_name,
        full_name,
        github_owner_details,
        collaborators_url,
        teams_url,
        updated_at,
        git_url,
        ssh_url,
        clone_url,
        language,
        watchers_count,
        open_issues_count,
        license,
        repolinter_scan,
      ]
    )
    .catch(error => console.error(error));
};

module.exports = {
  postData: postData,
  pg,
  addOrg,
  removeOrg,
  deleteData,
  upsert,
};
