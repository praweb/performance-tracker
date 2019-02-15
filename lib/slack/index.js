const SlackClient = require('slack')

const token = process.env.SLACK_TOKEN
const channel = process.env.SLACK_CHANNEL

const Slack = function () {}

Slack.prototype.postMessage = (text) => {
  SlackClient.chat.postMessage({token, channel, text})
}

module.exports = Slack
