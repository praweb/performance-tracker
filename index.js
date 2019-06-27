'use strict'

const initTest = require('./lib/init_test')

module.exports = app => {
  // Just for monitor purpose
  app.log('Performance Track app loaded.')

  // Start receiving events
  app.on(`*`, async context => {
    console.log("************************")
    const patchAcceptHeader = { accept: "application/vnd.github.v3.patch"}
    let res = context.github.repos.getCommit({
      header: patchAcceptHeader,
      owner: context.payload.deployment_status.creator,
      repo: context.payload.repository,
      commit_sha: context.payload.deployment.sha
    })
    console.log(res)
    console.log("************************")
    initTest.trigger(context)
  })
}
