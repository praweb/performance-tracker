const request = require('request')

const isValid = (url) => {
  return new Promise((resolve, reject) => {
    request({
      uri: url,
      method: 'GET',
      timeout: 10000
    }, function (error, response, body) {
      if (error) {
        return reject(error)
      } else if (response.statusCode < 200 || response.statusCode > 400) {
        return reject(error)
      } else {
        return resolve(true)
      }
    })
  })
}

const URLValidator = {
  isValid
}

module.exports = URLValidator
