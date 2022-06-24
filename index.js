const express = require('express')
const fs = require('fs')
const app = express()

const port = 8081 
const http = require('http')
const logger=require('./Utils/logger')

var server = http.createServer( app) // develop
server.listen(port, () => {
  console.log(`Listening port: ${port}`)
})
app.get('/', (req, res) => {
    logger.log({
        message: 'Home visited',
        level: 'info'
    })
    res.send({
      status: 200,
      message: 'hello'
    })
      .end()
  })