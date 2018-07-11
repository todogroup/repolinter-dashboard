const octokit = require('@octokit/rest')();

const db = require('./db');
const repolinter = require('./repolinter-runner');

 octokit.authenticate({
   type: 'oauth',
   token: ''
 });

async function paginateAndInsert (method, org) {
  let response = await method({
  	org: org,
  	per_page: 100,
  })
  let {data} = response
  while (octokit.hasNextPage(response)) {
    response = await octokit.getNextPage(response)
    data = data.concat(response.data)
  }
  for(const element of data) {
    const results = await repolinter.lintRepo(element.clone_url);
    // add all the repos to the repo-database
    await db.postData(element.owner.login, element.id, element.name, element.full_name, element.owner, element.collaborators_url, element.teams_url,
    element.created_at, element.updated_at, element.git_url, element.ssh_url, element.clone_url, element.language, element.watchers_count,
    element.open_issues_count, element.license, JSON.stringify(results));
  }
    // add org to the org-database 
    await db.addOrg(org);
}

exports.addNewOrg = async (event,context)=>{
  process.env.PATH = process.env.LAMBDA_TASK_ROOT + "/bin/usr/bin:" + process.env.PATH;
  process.env.GIT_EXEC_PATH = process.env.LAMBDA_TASK_ROOT + '/bin/usr/libexec/git-core';
  await paginateAndInsert(octokit.repos.getForOrg, event.pathParameters.org);
}

exports.removeExistingOrg = async (event,context)=>{
  await db.deleteData(event.pathParameters.org);
  await db.removeOrg(event.pathParameters.org);
}
 
exports.webhookHandler = async (event, context)=>{
  // setting up the env
  process.env.PATH = process.env.LAMBDA_TASK_ROOT + "/bin/usr/bin:" + process.env.PATH;
  process.env.GIT_EXEC_PATH = process.env.LAMBDA_TASK_ROOT + '/bin/usr/libexec/git-core';
  const eventData = JSON.parse(event.body);
  const element = eventData.repository;
  const results = await repolinter.lintRepo(element.clone_url);
  //insert or update query
  await db.upsert(element.owner.login, element.id, element.name, element.full_name, element.owner, element.collaborators_url, element.teams_url,
    element.created_at, element.updated_at, element.git_url, element.ssh_url, element.clone_url, element.language, element.watchers_count,
    element.open_issues_count, element.license, JSON.stringify(results));
  let response = {
    'statusCode': 200,
  }
  return response;
}
