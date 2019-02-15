const ParseData = function () {}

ParseData.prototype.parse = (data) => {
  return `Latency: ${data.data.latency}`
}

module.exports = ParseData
