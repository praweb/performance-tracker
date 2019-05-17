const webpageTestRunner = require('./webpage/index')
const pageSpeedScore = require('./webpage/page_speed')
const contextErrorReporter = require('./report/context_errors')

const webpageTest = (context, testURL) => {
  return new Promise((resolve, reject) => {
    webpageTestRunner
    .run(testURL, (message) => {
      // Acknowledge user about the webpage test url
      contextErrorReporter.postMessage(context, testURL, message)
    })
    .then((results) => {
      // Update state with webpage results
      return resolve(results.data)
    }, (error) => {
      // Handle if there is any error in webpage test run
      contextErrorReporter.postMessage(context, testURL, error)
      return reject(error)
    })
  })
}

const pageSpeedTest = (context, testURL) => {
  return new Promise((resolve, reject) => {
    pageSpeedScore
    .getScore(testURL)
    .then(function (results) {
      // Update state with page speed test results
      return resolve(results)
    }, (error) => {
      // Handle if there is any error in running page speed test
      contextErrorReporter.postMessage(context, testURL, error)
      return reject(error)
    })
  })
}

const TestRunner = {
  webpageTest,
  pageSpeedTest
}

module.exports = TestRunner
