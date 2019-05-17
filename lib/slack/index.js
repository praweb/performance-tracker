const SlackClient = require('slack')

const token = process.env.SLACK_TOKEN
const channel = process.env.SLACK_CHANNEL

const postMessage = (text) => {
  SlackClient.chat.postMessage({token, channel, text})
}

const Slack = {
  postMessage
}

module.exports = Slack
