'use strict';

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
    if (context.name === 'deployment_status' && context.payload.deployment_status.state !== 'success'){
      const issueComment = context.issue({ number: parseIssueId(test_url), body: 'Sorry deployment has been failed' })
      return context.github.issues.createComment(issueComment)
    }

    const test_url = process.env.WEBPAGETEST_TEST_URL || `https://${context.payload.deployment_status.environment}.herokuapp.com`

    // @TODO Ensure link is up and running before starting test

    webpagetest.run(test_url, function (message) {
      acknowledge(context, parseIssueId(test_url), message)
    }).then((testresults) => {
      // @TODO: Have to parse the data to print in required format
      // @TODO: Handle error rejections too
      if (testresults) {
        const message = dataParser.parse(testresults)
        acknowledge(context, parseIssueId(test_url), message)
      }
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
}
