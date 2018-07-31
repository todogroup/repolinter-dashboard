## Dashboard For Repolinter

Dashboard for RepoLinter is a website to lint open source repositories for common issues. It acts as an UI for [Repolinter](https://github.com/todogroup/repolinter) and provide's organisation management capabilities.

## Quickstart/Development

1. Install [Docker](https://www.docker.com).
2. Install [Sam Cli](https://docs.aws.amazon.com/lambda/latest/dg/sam-cli-requirements.html) via `pip install aws-sam-cli`.
3. Clone this repository and cd into the api directory and run `sam local start-api`. This will let you run & test all the lambda functions locally.
4. Run `npm install`.
5. For running the static website part run ``REACT_APP_ENDPOINT="http://localhost:3000"  npm start``. Note this command may vary depending upon your shell type.
6. Navigate to http://0.0.0.0:3001/ via your preferred browser.
7. Happy linting.

## Environment Variables

The only environment variable inside repolinter dashboard frontend is`REACT_APP_ENDPOINT` which gets passed in while building the static website. This env variable is used to link the serveless API endpoint to our static react app.

On the serverless lambda function side. The environment variable for postgres database configuration and github auth token needs to be set up prior to deployment.

Create `.env` file inside `getResults/ & githubUtils/` lambda folders which are inside `api/serverless`. <br />
.env file should look like:

```
 DB_PASSWORD=''
 DB_HOST=''
 DB_USERNAME=''
 GITHUB_TOKEN=''
```

## Binaries

Repolinter Dashboard uses git to clone repositories from web and then scan them locally. Setting up the environment for git binaries inside lambda is already present/handled in the code. You only have include
git binaries inside `./tmp/bin/` folder.

Note: Make sure your usr/ folder includes `usr/libexec/git-core` & `usr/bin:`. Your absolute paths should look like:`./tmp/bin/usr/libexec/git-core`.

## Webhooks

Repolinter Dashboard also provides you the continous intergration feature where with every new changes to the repository it rescan the code and update the database. This can be done both at repository and
organisational level. setup webhooks to `YOUR_SERVERLESS_ENDPOINT\hooks`. For more info on how to setup webhooks refer [webhooks](https://developer.github.com/webhooks/creating/).

## Production Setup

Setting up a production server in two easy steps:

1. Deploy your lambda functions using 
```
sam deploy \
   --template-file template.yaml \
   --stack-name <new-stack-name> \
   --capabilities CAPABILITY_IAM
   ```
   For more info on deployment using sam click [link](https://docs.aws.amazon.com/lambda/latest/dg/deploying-lambda-apps.html).

2. Deploy the static website with env variable set to your Aws Api Gateway endpoint for the above lambda functions.

## Custom Ruleset
You can define your own linting rules. Here's how you create new rules.  
### [Rules](https://github.com/todogroup/repolinter#rules)   
# ![Custom Linter Rules](public/customRuleset.png)


## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

This library is licensed under the Apache 2.0 License. 