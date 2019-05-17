'use strict'

const initTest = require('./lib/init_test')

module.exports = app => {
  // Just for monitor purpose
  app.log('Performance Track app loaded.')

  // Start receiving events
  app.on(`*`, async context => {
    initTest.trigger(context)
  })
}
