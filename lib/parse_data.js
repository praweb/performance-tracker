const ParseData = function () {}

ParseData.prototype.parse = (data) => {
  console.log(data)
  console.log(data.data.runs)
  return formatData(data.data)
}
// @TODO: Have to parse the data to print in required format
const formatData = (data) => {
  return `
    Summary: ${data.summary} \n 
    Latency: ${data.latency} \n
    Date: ${new Date(data.completed)} \n
    DomElements: ${data.average.firstView.domElements} \n
    DomInteractive: ${data.average.firstView.domInteractive} \n
    FirstPaint: ${data.average.firstView.firstPaint} \n
    FullyLoaded: ${data.average.firstView.fullyLoaded} \n
    Id: ${data.id} \n
    LoadTime: ${data.average.firstView.loadTime} \n
    Render: ${data.average.firstView.render} \n
    SpeedIndex: ${data.average.firstView.SpeedIndex} \n
    TTFB: ${data.average.firstView.TTFB} \n
    VisualComplete: ${data.average.firstView.visualComplete}
  `
}

module.exports = ParseData
