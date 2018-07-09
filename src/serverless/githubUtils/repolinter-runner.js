const path = require('path');
const uuidv4 = require('uuid-v4');
const rimraf = require('rimraf');
const fs = require('fs');
const git = require('simple-git')();
const repolinter = require('repolinter');

async function runRepolinter(git_link, ruleSet){
const tmpDir = await path.resolve('/tmp', uuidv4());
await asyncGitClone(git_link, tmpDir).catch(error => console.error(error));
var output = await asyncRunner(tmpDir,ruleSet);
rimraf(tmpDir, function () {});
return output;
}

async function asyncRunner(tmpDir, ruleSet){
 return new Promise(function(resolve,reject){
 	var output = repolinter.lint(tmpDir, [], ruleSet);
 	if (output != null){
 		resolve(output);
 	}
 	else{
 		reject("error")
 	}
 });
}

async function asyncGitClone(git_link, tmpDir){
return new Promise(function(resolve,reject){
	git.clone(git_link, tmpDir, (error) =>{
		 if (!error){
		 	resolve();
    	}
    	else{
    		reject(error);
    	}     
	});
	})
}
 
lintRepo = async (repo) => {
	const ret = await runRepolinter(repo, null);
	return ret;
}

module.exports = {lintRepo};