'use strict'

const initTest = require('./lib/init_test')
const request = require('request')

module.exports = app => {
  // Just for monitor purpose
  app.log('Performance Track app loaded.')
  
 request("https://api.github.com/rate_limit", (error, response, body) => {
    if (error) {
      console.log(error)
    } else {
      return resolve(JSON.parse(body))
    }
  })
  
  // Start receiving events
  app.on(`*`, async context => {
    console.log("************************")
    if(context.name == 'deployment_status') {
      processRequest(context)
    }
    
  })
}

const processRequest = function(context) {
  const patchAcceptHeader = { accept: "application/vnd.github.v3.patch"}
  const auth = {
    header: patchAcceptHeader,
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository,
    commit_sha: context.payload.deployment.sha
  }
  let res = context.github.repos.getCommit(auth)
  console.log("************************")
  initTest.trigger(context)
}
