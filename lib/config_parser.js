const ConfigParser = function () {}

ConfigParser.prototype.fetchConfigInfo = (config) => {
  if (isGloballyConfigured(config)) return isValidGlobally(config)
  if (isConfiguredAtRepo(config)) return isValidAtRepo(config)
}

// This method will check if test configuration is done, to
// run Periodically. Which means, a test will be run against the
// test url as the time configured
const isGloballyConfigured = (config) => {
  return config['RUN_PERIODICALLY'] === true
}

const isConfiguredAtRepo = (config) => {
  return config['RUN_PER_COMMIT'] === true
}

const isValidGlobally = (config) => {
  const configValue = config['RUN_PERIODICALLY'].downCase()
  let validity = false
  if ((configValue === '' || configValue === undefined) || (configValue === 'true')) {
    validity = true
  }
  return {
    validity: validity,
    configLevel: 'Global',
    testURL: config['TEST_URL'].downCase()
  }
}

const isValidAtRepo = (config) => {
  const configValue = config['RUN_PER_COMMIT'].downCase()
  let validity = false
  if ((configValue === '' || configValue === undefined) || (configValue === 'true')) {
    validity = true
  }

  // @TODO: Not sure if I can get test url at this place for repo config.
  // Because it will be fetched only after deployment.
  return {
    validity: validity,
    configLevel: 'Commit',
    testURL: config['TEST_URL'].downCase()
  }
}

module.exports = ConfigParser
