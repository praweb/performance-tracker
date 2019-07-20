const configParser = require('./config_parser')
const periodicRunner = require('./test_runner/periodic')
const commitRunner = require('./test_runner/commit')
const testRunner = require('./test_runner.js')
const dataParser = require('./parse_data')
const contextErrorReporter = require('./report/context_errors')
const yaml = require('js-yaml')

const DEFAULT_PATH = '/'
let config = ''

// NOTE: Since this is a async function,
// you cannot chain this function further.
// Async functions will not have prototypes defined on them
const trigger = async (context) => {
  // Read app configuration
  // Reading config file via get contents, 
  // to ensure that we are reading from the commit branch
  // instead of the default branch
  await context.github.repos.getContents({
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository.name,
    ref: context.payload.deployment.sha,
    path: '.github/webpack_config.yml',
    headers: {}
  })
  .then(result => {
    // content will be base64 encoded
    config = yaml.load(Buffer.from(result.data.content, 'base64').toString())
    const configInfo = configParser.fetchConfigInfo(config)
    if (configInfo.valid) {
      // @TODO See if we can refactor this too classes in a better way
      if (configInfo.configLevel === 'Periodic') periodicRunner.run(context)
      if (configInfo.configLevel === 'Commit') commitRunner.run(context)
  
      // Starting actual test
      let webpageResults = testRunner.webpageTest(context, fetchTestURL(context))
      let pageSpeedResults = testRunner.pageSpeedTest(context, fetchTestURL(context))
  
      // Parse results and post it to github
      Promise.all([webpageResults, pageSpeedResults]).then((values) => {
        const formattedResults = dataParser.parse(values[0], values[1], config)
        contextErrorReporter.postMessage(context, fetchTestURL(context), formattedResults)
      })
    } else {
      // @TODO: Report error to the user
    }
  })
}

// @TODO: this is a duplicate function, repeated in commit runner
const fetchTestURL = (context) => {
  return prepareTestURL(`https://${context.payload.deployment_status.environment}.herokuapp.com`)
}

// @TODO: write a validation for ensuring path is correctly set
// There should be an appending / all the time
const prepareTestURL = (url) => {
  const testPath = config['TEST_PATH'] || DEFAULT_PATH
  return `${url}${testPath}`
}

const InitTest = {
  trigger
}

module.exports = InitTest
