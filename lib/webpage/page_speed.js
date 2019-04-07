const request = require('request')

const PageSpeed = function () {}

const API_KEY = process.env.PAGE_SPEED_API_KEY

PageSpeed.prototype.getScore = (url) => {
  return new Promise((resolve, reject) => {
    // Handle if API key is not set
    if (!API_KEY) {
      return resolve(null)
    }

    const GOOGLE_URL = `https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=${url}&key=${API_KEY}`

    // If key is set
    request(GOOGLE_URL, (error, response, body) => {
      if (error) {
        return reject(error)
      } else {
        return resolve(JSON.parse(body))
      }
    })
  })
}

module.exports = PageSpeed
