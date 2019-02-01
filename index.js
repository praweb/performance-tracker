module.exports = app => {
  app.on('issues.opened', async context => {
    // Should be triggering a request to webpage test here
    // After receiving the response we should post it on the github comment
    console.log(context)
    
  })
}
