'use strict'

const initTest = require('./lib/init_test')
const request = require('request')
const path = require('path')
const express = require('express')

module.exports = app => {
  // Just for monitor purpose
  app.log('Performance Track app loaded.')

  const server = app.route()

  server.use(express.json())
  server.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')))
  server.use('/html', express.static(path.join(__dirname, '/app/views')))
  server.use(express.static(path.join(__dirname, '/app/assets')))

  server.get('/encrypt', (_, res) => res.format(
    {
      'text/html': function () {
        res.sendFile(path.join(__dirname, '/app/views/encrypt.html'))
      }
    }
  ))

  server.post('/v1/store', (req, res) => {
    const body = {
      'org': req.body['user[org]'],
      'repo': req.body['user[repo]'],
      'key': req.body['user[key]']
    }
    request.post({
      url: `${process.env.API_URL}/api/v1/encrypt`,
      body: body,
      json: true
    }, (error, res, body) => {
      if (error) {
        console.error('Error in posting body')
        console.error(error)
      } else {
        console.log('posted data')
        // console.log(res)
        console.log(body)
      }
    })
  })

  // Start receiving events
  app.on(`*`, async context => {
    if (context.name === 'deployment_status') {
      // For now we are just fetching the rate limit,
      // but not handling any thing
      fetchRateLimit(context)
      processRequest(context)
    }
  })
}

const processRequest = function (context) {
  const patchAcceptHeader = { accept: 'application/vnd.github.v3.patch' }
  const auth = {
    header: patchAcceptHeader,
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository,
    commit_sha: context.payload.deployment.sha
  }
  context.github.repos.getCommit(auth)
  initTest.trigger(context)
}

const fetchRateLimit = (context) => {
  request({
    url: 'https://api.github.com/rate_limit',
    headers: {
      'User-Agent': context.payload.repository.name
    }
  }, (error, response, body) => {
    if (error) {
      console.error('Error in fetching rate limit:')
      console.error(error)
    } else {
      console.log('Rate limit data .................... ')
      console.log(JSON.parse(body))
    }
  })
}
