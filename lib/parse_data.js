const ParseData = function () {}

ParseData.prototype.parse = (webPageData, pageSpeedData) => {
  return formatData(webPageData, pageSpeedData)
}
// @TODO: Have to parse the data to print in required format
const formatData = (webPageData, pageSpeedData) => {
  return `
    Summary: ${webPageData.summary} \n 
    Latency: ${webPageData.latency} \n
    Date: ${new Date(webPageData.completed)} \n
    DomElements: ${webPageData.average.firstView.domElements} \n
    DomInteractive: ${webPageData.average.firstView.domInteractive} \n
    FirstPaint: ${webPageData.average.firstView.firstPaint} \n
    FullyLoaded: ${webPageData.average.firstView.fullyLoaded} \n
    Id: ${webPageData.id} \n
    LoadTime: ${webPageData.average.firstView.loadTime} \n
    Render: ${webPageData.average.firstView.render} \n
    SpeedIndex: ${webPageData.average.firstView.SpeedIndex} \n
    TTFB: ${webPageData.average.firstView.TTFB} \n
    VisualComplete: ${webPageData.average.firstView.visualComplete} \n
    Speed: ${pageSpeedData.ruleGroups.SPEED.score}
  `
}

module.exports = ParseData
