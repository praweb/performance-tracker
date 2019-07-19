let config = ''
let configMessage = ''

const parse = (webPageData, pageSpeedData, configValues) => {
  config = configValues
  console.log(config)
  return formatData(webPageData, pageSpeedData)
}
// @TODO: Have to parse the data to print in required format
const formatData = (webPageData, pageSpeedData) => {
  return `
  **Summary** \n
  ${webPageData.summary} \n \n
  ---
  | Metric | Value | Budget |
  | ------ | :-----: | ------: |
  |Tracked Timestamp| ${new Date(webPageData.completed)} | |
  |Latency| ` + evaluateData('latency', webPageData.latency) + `| ${budgetValue('latency')} |
  |TTFB| ` + evaluateData('ttfb', webPageData.average.firstView.TTFB) + `| ${budgetValue('ttfb')} |
  |Dom Elements| ` + evaluateData('domElements', webPageData.average.firstView.domElements) + `| ${budgetValue('domElements')} |
  |First Paint| ` + evaluateData('firstPaint', webPageData.average.firstView.firstPaint) + ` | ${budgetValue('firstPaint')} |
  |Dom Interactive|` + evaluateData('domInteractive', webPageData.average.firstView.domInteractive) + `| ${budgetValue('domInteractive')} |
  |Fully Loaded| ` + evaluateData('fullyLoaded', webPageData.average.firstView.fullyLoaded) + ` | ${budgetValue('fullyLoaded')} |
  |Load Time| ` + evaluateData('loadTime', webPageData.average.firstView.loadTime) + ` | ${budgetValue('loadTime')} |
  |Render| ` + evaluateData('renderTime', webPageData.average.firstView.render) + `| ${budgetValue('renderTime')} |
  |Visual Complete| ` + evaluateData('visualComplete', webPageData.average.firstView.visualComplete) + ` | ${budgetValue('visualComplete')} |
  |Speed Index| ` + evaluateData('speedIndex', webPageData.average.firstView.SpeedIndex) + `| ${budgetValue('speedIndex')} |
  |Speed| ` + evaluateData('speedScore', pageSpeedData.ruleGroups.SPEED.score) + ` | ${budgetValue('speedScore')} |
  ---
  \n\n
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
  } else if (config[key] && config[key] >= value) {
    return `${value} &#x2705;`
  } else {
    return `${value}`
  }
}

const budgetValue = (key) => {
  return config[key] || 'Not set'
}

const ParseData = {
  parse
}

module.exports = ParseData
