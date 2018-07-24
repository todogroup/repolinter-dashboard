## Dashboard For Repolinter

Dashboard for RepoLinter is a website to lint open source repositories for common issues. It acts as an UI for [Repolinter](https://github.com/todogroup/repolinter) and provide's organisation management capabilites.

## Quickstart/Development

1. Install [Sam Cli](https://docs.aws.amazon.com/lambda/latest/dg/sam-cli-requirements.html) via `pip install aws-sam-cli`.
2. Clone this repository and cd into the api directory and run `sam local start-api`. This will let you run & test all the lambda functions locally.
3. For running the static website part run `REACT_APP_ENDPOINT = "http://localhost:3000" & npm start`. Note this command may vary depending upon your shell type.
4. Navigate to http://0.0.0.0:3001/ via your preferred browser.
5. Happy linting.

## Environment Variables

The only environment variable is`REACT_APP_ENDPOINT` which gets passed in while building the website part. This env variable is used to supply API endpoint to our static react app.

## Production Setup
Setting up a production server in two easy steps:

1. Deploy your lambda functions using `sam deploy \
   --template-file template.yaml \
   --stack-name <new-stack-name> \
   --capabilities CAPABILITY_IAM`. For more info on deployment using sam click [link](https://docs.aws.amazon.com/lambda/latest/dg/deploying-lambda-apps.html).
2. Deploy the static website with env variable set to your aws Api gateway endpoint for the above lamda functions.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

This library is licensed under the Apache 2.0 License. 