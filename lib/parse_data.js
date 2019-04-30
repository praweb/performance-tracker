const ParseData = function () {}

let config = ''
let configMessage = ''

ParseData.prototype.parse = (webPageData, pageSpeedData, configValues) => {
  config = configValues
  return formatData(webPageData, pageSpeedData)
}
// @TODO: Have to parse the data to print in required format
const formatData = (webPageData, pageSpeedData) => {
  return `
  **Summary** \n
  ${webPageData.summary} \n \n
  **Tracked Timestamp** ${new Date(webPageData.completed)} \n
  **Latency** ` + evaluateData('latency', webPageData.latency) + ` \n
  TTFB: ${webPageData.average.firstView.TTFB} \n
  Dom Elements: ${webPageData.average.firstView.domElements} \n
  **First Paint** ` + evaluateData('firstPaint', webPageData.average.firstView.firstPaint) + ` \n
  Dom Interactive: ${webPageData.average.firstView.domInteractive} \n
  Fully Loaded: ${webPageData.average.firstView.fullyLoaded} \n
  Load Time: ${webPageData.average.firstView.loadTime} \n
  Render: ${webPageData.average.firstView.render} \n
  Visual Complete: ${webPageData.average.firstView.visualComplete} \n
  **Speed Index** ` + evaluateData('speedIndex', webPageData.average.firstView.SpeedIndex) + `\n
  Speed: ${pageSpeedData.ruleGroups.SPEED.score}\n\n\n
  ${configMessage}
  `
}

const evaluateData = (key, value) => {
  if (config === null) {
    configMessage = '**NOTE** Config file is missing'
    return value
  }
  if (config[key] && config[key] < value) {
    return `${value} &#x1F53B;`
  } else if (config[key] === null) {
    return `${value} _(config for this key is missing)_`
  } else {
    return `${value} &#x2705;`
  }
}

module.exports = ParseData
