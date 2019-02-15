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

  app.on('issues.opened issues.commented', async context => {
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    return context.github.issues.createComment(issueComment)
  })

  app.on(`*`, async context => {
    webpagetest.run().then((testresults) => {
      // @TODO: Have to parse the data to print in required format
      // @TODO: Handle error rejections too

      if (testresults) {
        const message = dataParser.parse(testresults)
        const issueComment = context.issue({ body: message })
        slackClient.postMessage(message)
        return context.github.issues.createComment(issueComment)
      }
    })
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
