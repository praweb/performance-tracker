const WebPageTest = require('webpagetest')

const wpt = new WebPageTest(process.env.WEBPAGE_URL, process.env.WEBPAGE_KEY)
const testLocation = 'Dulles_Thinkpad'

const run = (testURL, callback) => {
  return new Promise((resolve, reject) => {
    wpt.runTest(testURL, {location: testLocation}, (error, response) => {
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
  const interval = setInterval(() => {
    wpt.getTestResults(response.data.testId, (error, results) => {
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

const Webpage = {
  run
}

module.exports = Webpage
