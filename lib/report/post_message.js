const Slack = require('./../lib/slack/index')

const slackClient = new Slack()

const post = (context, issueId, body) => {
  const issueComment = context.issue({ number: issueId, body: body })
  slackClient.postMessage(body)
  return context.github.issues.createComment(issueComment)
}

const PostMessage = {
  post
}

module.exports = PostMessage
