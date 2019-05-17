const urlValidator = require('./../url_validator')
const contextErrorReporter = require('./../report/context_errors')

const run = (context, config) => {
  const testURL = fetchTestURL(context)

  // See if URL is valid and working
  // @TODO: this might require promise implementation
  if (!urlValidator(testURL)) return contextErrorReporter.invalidURL(context, testURL)

  // Start test
}

// @method formHerokuTestURL
// @param {Object} context
//
// Currently we only support apps deployed on Heroku
const fetchTestURL = (config) => {
  return config['TEST_URL']
}

const PeriodicRunner = {
  run
}

module.exports = PeriodicRunner
