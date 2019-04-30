const configParser = require('./config_parser')

const InitTest = () => {}

InitTest.prototype.trigger = (config) => {
  if (configParser.fetchConfigInfo(config)()) {
    // Trigger webpage test
    // Trigger PageSpeed 
    // 
    // This is the place to add any future test runs
    // 
  } else {
    // Report error to the user
  }
}

module.exports = InitTest
