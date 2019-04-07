const WebPageTest = require('webpagetest')

const Webpage = function () {}

Webpage.prototype.run = (test_url, callback) => {
  this.wpt = new WebPageTest(process.env.WEBPAGE_URL, process.env.WEBPAGE_KEY)
  return new Promise((resolve, reject) => {
    this.wpt.runTest(test_url, {location: 'Dulles_Thinkpad'}, (error, response) => {
      // If any error, reject it
      if (error) return reject(error)

      // Check for response status
      if (!response.statusCode || response.statusCode !== 200) {
        return reject(response)
      }

      acknowledgeUser(response, callback)

      // Keep checking for data, till you get results
      pollWebpage(response, resolve, reject)
    })
  })
}

function acknowledgeUser (response, callback) {
  callback(`Test is running at: ${response.data.userUrl}`)
}

function pollWebpage (response, resolve, reject) {
  this.wpt = new WebPageTest(process.env.WEBPAGE_URL, process.env.WEBPAGE_KEY)
  const interval = setInterval(() => {
    this.wpt.getTestResults(response.data.testId, (error, results) => {
      // Check for errors
      if (error || results.statusCode >= 300) {
        return reject(error)
      }

      // Check for completion
      if (results.statusCode >= 200 && results.statusCode <= 300) {
        clearInterval(interval)
        return resolve(results)
      }
    })
  }, 15000)
}

module.exports = Webpage
