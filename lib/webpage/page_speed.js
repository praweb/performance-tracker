const PageSpeed = function () {}

const PAGE_URL = process.env.WEBPAGETEST_TEST_URL
const API_KEY = process.env.PAGE_SPEED_API_KEY
const GOOGLE_URL = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${PAGE_URL}&key=${API_KEY}`

PageSpeed.prototype.getScore = () => {
  // Handle if API key is not set
  if (!API_KEY) {
    return Promise.resolve(null)
  }

  // If key is set
  fetch(GOOGLE_URL)
    .then(response => { return JSON.parse(response).ruleGroups.SPEED.score })
}

module.exports = PageSpeed