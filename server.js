require('dotenv').config()
const express = require('express')
const http = require('http')
const db = require('./db')
const { initDatabase } = require('./initdb')
const bodyParser = require('body-parser')
var cron = require('node-cron');


const app = express()

const init = async () => {
  
  // Init sqlite database
  await db.connect(process.env.SQLITE_DATABASE_PATH)
  await initDatabase()

  cron.schedule('* * * * *', async() => {
    console.log('running cleanup every minute');
    var response = await db.cleanup();
    console.log(JSON.stringify(response));
  });   
  app.use(express.static('public'))
  app.use(bodyParser.json({ limit: '1mb', extended: true }))

  app.use('/api', require('./api'))

  const server = http.createServer(app)
  server.listen(process.env.SERVER_LISTEN_PORT, process.env.SERVER_LISTEN_ADDRESS, () => {
    console.log(`Server listening on ${process.env.SERVER_LISTEN_ADDRESS}:${process.env.SERVER_LISTEN_PORT}!`)
  })
}

init()
