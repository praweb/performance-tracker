//@TODO: This file requires refactoring

const invalidContext = (context, testURL) => {
  const issueComment = context.issue({
    body: 'Sorry deployment has been failed',
    issue_number: parseIssueId(testURL)
  })
  return context.github.issues.createComment(issueComment)
}

const invalidURL = (context, testURL) => {
  const issueComment = context.issue({
    issue_number: parseIssueId(testURL),
    body: `Test URL ${testURL} is not working, please verify it.` 
  })
  return context.github.issues.createComment(issueComment)
}

const postMessage = (context, testURL, message) => {
  const issueComment = context.issue({
    issue_number: parseIssueId(testURL),
    body: message
  })
  context.github.issues.createComment(issueComment)
}

const parseIssueId = (url) => {
  return url.match(/pr-([\d]+)/)[1]
}

const ContextErrorReporter = {
  invalidContext,
  invalidURL,
  postMessage
}

module.exports = ContextErrorReporter
