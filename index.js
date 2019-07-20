'use strict'

const initTest = require('./lib/init_test')
const request = require('request')

module.exports = app => {
  // Just for monitor purpose
  app.log('Performance Track app loaded.')
  
  // Start receiving events
  app.on(`*`, async context => {
    console.log("************************")
    
    if(context.name == 'deployment_status') {
      // For now we are just fetching the rate limit,
      // but not handling any thing
      fetchRateLimit(context)
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

const fetchRateLimit = (context) => {
  request({
    url: "https://api.github.com/rate_limit",
    headers: {
      'User-Agent': context.payload.repository.name
    }
  }, (error, response, body) => {
    if (error) {
      console.error("Error in fetching rate limit #{error}")
    } else {
      console.log('Rate limit data .................... ')
      console.log(JSON.parse(body))
    }
  })
}
