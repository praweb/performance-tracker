'use strict';

const request = require("request")
const WebpageTest = require('./lib/webpage/index')
const Slack = require('./lib/slack/index')
const DataParser = require('./lib/parse_data')

const webpagetest = new WebpageTest()
const slackClient = new Slack()
const dataParser = new DataParser()

module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on(`*`, async context => {
    //@TODO This command should be changed in case of pull request
    const testUrl = process.env.WEBPAGETEST_TEST_URL || `https://${context.payload.deployment_status.environment}.herokuapp.com`

    if (context.name === 'deployment_status' && context.payload.deployment_status.state !== 'success') {
      const issueComment = context.issue({ number: parseIssueId(testUrl), body: 'Sorry deployment has been failed' })
      return context.github.issues.createComment(issueComment)
    }
    checkUrlStatus(testUrl).then(function () {
      webpagetest.run(testUrl, function (message) {
        acknowledge(context, parseIssueId(testUrl), message)
      }).then((testresults) => {
        if (testresults) {
          const message = dataParser.parse(testresults)
          acknowledge(context, parseIssueId(testUrl), message)
        }
      }).error((error) => {
        // Not sure if this works
        acknowledge(context, parseIssueId(testUrl), error)
      })
    },function (error) {
      return acknowledge(context, parseIssueId(testUrl), `Test URL ${testUrl} is not working.`)
    })
  })

  const parseIssueId = (url) => {
    console.log(url)
    return url.match(/pr-([\d]+)/)[1]
  }

  const acknowledge = (context, issueId, body) => {
    const issueComment = context.issue({ number: issueId, body: body })
    slackClient.postMessage(body)
    return context.github.issues.createComment(issueComment)
  }

  const checkUrlStatus = (url) => {
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
}
