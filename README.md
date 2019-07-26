# performance-tracker

> A GitHub App built with [Probot](https://github.com/probot/probot). This is to track performance of your website while you are still developing it. Install this app and get a webpage test key, you should all be set.

### Pre-requisites
1. Code is committed to Github.
2. Deploying the code on to any environment, once the PR is opened.
3. Require a webpage-test key api key.(This will be encoded)

### How this works
1. Once a PR is opened, it is supposed to be deployed to any enviornment. 
2. Deployed url will be read by the tracker and test will be made against it.
3. Once the test is triggered, a comment will be made on the PR with the test url. So you can always go directly to that url.
4. After the test is done, 


This performance tracker app runs a speed test on opening a PR on **GITHUB**, and for ever commit after opening a PR. Once the test is done, it will post the report as a comment to PR. You can also set budgets for each metric via **webpack_config.yml** in your code.

More about possible metrics [here](/)

Features:

1. Webpage Test

2. Light house speed test

3. Report to Sentry


## Setup

```sh
# Install dependencies
yarn install

# Run the bot 

_Developemnt_
yarn run dev 
```



## Contributing

If you have suggestions for how performance-tracker could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2019 Prasanna Gaddam <prasanna.virigineni@gmail.com>
