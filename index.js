'use strict'

const initTest = require('./lib/init_test')

module.exports = app => {
  // Just for monitor purpose
  app.log('Performance Track app loaded.')

  // Start receiving events
  app.on(`*`, async context => {
<<<<<<< HEAD
    console.log("************************")
    if(context.name == 'deployment_status') {
      processRequest(context)
    }
    
  })
}

const processRequest = function(context) {
  const patchAcceptHeader = { accept: "application/vnd.github.v3.patch"}
=======
    console.log('************************')
    if (context.name === 'deployment_status') {
      processRequest(context)
    }
  })
}

const processRequest = (context) => {
  const patchAcceptHeader = { accept: 'application/vnd.github.v3.patch' }
>>>>>>> acaa0ab03e3d83fbab810e94cdc08b82b263f884
  const auth = {
    header: patchAcceptHeader,
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository,
    commit_sha: context.payload.deployment.sha
  }
<<<<<<< HEAD
  let res = context.github.repos.getCommit(auth)
  console.log("************************")
=======
  context.github.repos.getCommit(auth)
  console.log('************************')
>>>>>>> acaa0ab03e3d83fbab810e94cdc08b82b263f884
  initTest.trigger(context)
}
