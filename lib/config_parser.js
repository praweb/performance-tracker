const fetchConfigInfo = (config) => {
  if (isGloballyConfigured(config)) return isValidGlobally(config)
  if (isConfiguredAtRepo(config)) return isValidAtRepo(config)

  // Incase of configuration not being done correctly
  return {
    valid: false,
    configLevel: undefined
  }
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
  const configValue = config['RUN_PERIODICALLY'].toString().toLowerCase()
  let valid = false
  if ((configValue === '' || configValue === undefined) || (configValue === 'true')) {
    valid = true
  }
  return {
    valid: valid,
    configLevel: 'Periodic'
  }
}

const isValidAtRepo = (config) => {
  const configValue = config['RUN_PER_COMMIT'].toString().toLowerCase()
  let valid = false
  if ((configValue === '' || configValue === undefined) || (configValue === 'true')) {
    valid = true
  }

  return {
    valid: valid,
    configLevel: 'Commit'
  }
}

const ConfigParser = {
  fetchConfigInfo
}

module.exports = ConfigParser
