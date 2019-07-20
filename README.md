# performance-tracker

> A GitHub App built with [Probot](https://github.com/probot/probot) that A Probot app

This performance tracker app runs a speed test upon opening a PR on **GITHUB**, and for ever commit after opening a PR. Once the test is done, it will post the report as a comment to PR. You can also set budgets for each metric via **webpack_config.yml** in your code.

More about possible metrics [here](/config_examples/budgets.yml)

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

_Production_
yarn run start
```



## Contributing

If you have suggestions for how performance-tracker could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2019 Prasanna Gaddam <prasanna.virigineni@gmail.com>
