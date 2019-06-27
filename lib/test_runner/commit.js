const contextErrorReporter = require('./../report/context_errors')
const urlValidator = require('./../url_validator')

const run = (context, config) => {
  const testURL = context.payload.deployment.payload.web_url
  // See if context is valid
  if (!isValidContext(context)) return contextErrorReporter.invalidContext(context, testURL)

  // See if URL is valid and working
  // @TODO: this might require promise implementation
  if (!urlValidator.isValid(testURL)) return contextErrorReporter.invalidURL(context, testURL)
}

const isValidContext = (context) => {
  return context.name === 'deployment_status' && context.payload.deployment_status.state === 'success'
}

const CommitRunner = {
  run
}

module.exports = CommitRunner
