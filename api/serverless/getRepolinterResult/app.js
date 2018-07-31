const path = require('path');
const repolinter = require('repolinter');
const uuidv4 = require('uuid-v4');
const rimraf = require('rimraf');
const fs = require('fs');
const git = require('simple-git')();

async function runRepolinter(gitLink, ruleSet) {
  const tmpDir = await path.resolve('/tmp', uuidv4());
  await asyncGitClone(gitLink, tmpDir).catch(error => console.error(error));

  const output = await asyncRunner(tmpDir, ruleSet);
  rimraf(tmpDir, function() {});
  return output;
}

async function asyncRunner(tmpDir, ruleSet) {
  return new Promise(function(resolve, reject) {
    const output = repolinter.lint(tmpDir, [], ruleSet);
    if (output != null) {
      resolve(output);
    } else {
      reject('error');
    }
  });
}

async function asyncGitClone(gitLink, tmpDir) {
  return new Promise(function(resolve, reject) {
    git.clone(gitLink, tmpDir, error => {
      if (!error) {
        resolve();
      } else {
        reject(error);
      }
    });
  });
}

exports.lintRepo = async (event, context, callback) => {
  process.env.PATH =
    process.env.LAMBDA_TASK_ROOT + '/tmp/bin/usr/bin:' + process.env.PATH;
  process.env.GIT_EXEC_PATH =
    process.env.LAMBDA_TASK_ROOT + '/tmp/bin/usr/libexec/git-core';
  const runningConfig = JSON.parse(event.body);
  try {
    const ret = await runRepolinter(
      runningConfig.git_link,
      runningConfig.ruleSet
    );
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Methods':
          'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
        'Access-Control-Allow-Origin': '*',
      },
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
