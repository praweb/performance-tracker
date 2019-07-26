# performance-tracker

> A GitHub App built with [Probot](https://github.com/probot/probot). This is to track performance of your website while you are still developing it. Install this app and get a webpage test key, you should be all set.

_Note_: For now, we are using the api key from the app. But each api key allows only 200 tests per day. So a plan is made to get the key from the user config file.

### Pre-requisites
1. Code is committed to **Github**.
2. Deploying the code on to any environment, once the PR is opened.
3. Require a **webpage-test** api key.(This will be encoded)

### How this works
1. Once a PR is opened, it is supposed to be deployed to any enviornment. 
2. Deployed url will be read by the tracker and test will be made against it.
3. Once the test is triggered, a comment will be made on the PR with the test url. So you can always go directly to that url.
4. After the test is done, specific metrics will be posted on to the PR. 
5. You can also set budgets for those metrics. For the metrics that have budgets available a comparison will be made.
6. Report will also be posted to Sentry if configured.

### Sample images

_Post about starting the test_

![Report about start of test](https://github.com/praWeb/performance-tracker/blob/master/images/report_test_started.png)

_Report posted after the test_

![Report metrics once test is completed](https://github.com/praWeb/performance-tracker/blob/master/images/report_test_status.png)


### Setting up
1. Create ***performance_tracker_config.yml*** in your ./github folder.
2. Configure it as explained here. 
3. Get a webpage api key from here.
4. Encode it here and add it to the config yml file.

More about possible metrics [here](/)


## Setup

```sh
# Install dependencies
yarn install

# Run the bot 

_Developemnt_
yarn run dev 
```

### Future plans

*For a consumer of this app:*

1. Get a page where we can encode the api key and use it in the config file.
2. Adding PWA metrics to the report.
3. Making this to be available as a npm module.
4. Running scheduled tests. Schedule can be set via config file
5. Running tests against a standard url.
6. Sending reports to email.

*For a developer:*

1. Improve on error logging
2. Introduce background workers to ensure every event is handled
3. Track rate limiting on the events and report to user if they are reaching the limit.



## Contributing

If you have suggestions for how performance-tracker could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2019 Prasanna Gaddam <prasanna.virigineni@gmail.com>
