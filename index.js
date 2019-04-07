'use strict';

const request = require("request")
const WebpageTest = require('./lib/webpage/index')
const Slack = require('./lib/slack/index')
const DataParser = require('./lib/parse_data')
const PageSpeed = require('./lib/webpage/page_speed')

const webpagetest = new WebpageTest()
const slackClient = new Slack()
const dataParser = new DataParser()
const pageSpeedScore = new PageSpeed()

module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on(`*`, async context => {
    const config = await context.config('webpack_config.yml')
    //@TODO This command should be changed in case of pull request
    let testUrl = ''

    if (context.name === 'deployment_status') {
      testUrl = process.env.WEBPAGETEST_TEST_URL || `https://${context.payload.deployment_status.environment}.herokuapp.com`
    }

    if (context.name === 'deployment_status' && context.payload.deployment_status.state !== 'success') {
      const issueComment = context.issue({ number: parseIssueId(testUrl), body: 'Sorry deployment has been failed' })
      return context.github.issues.createComment(issueComment)
    }

    checkUrlStatus(testUrl)
    .then(() => {
      webpagetest.run(testUrl, (message) => {
        acknowledge(context, parseIssueId(testUrl), message)
      }).then((testresults) => {
        if (testresults) {
          pageSpeedScore.getScore(testUrl).then(function (data) {
            acknowledge(context, parseIssueId(testUrl), dataParser.parse(testresults.data, data, config))
          })
        }
      }, (error) => {
        // Not sure if this works
        acknowledge(context, parseIssueId(testUrl), error)
      })
    }, (error) => {
      return acknowledge(context, parseIssueId(testUrl), `Test URL ${testUrl} is not working.`)
    })
  })

  const parseIssueId = (url) => {
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
