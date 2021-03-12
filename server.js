'use strict'
require('dotenv').config({ path: __dirname + '/.env' })

const fs = require('fs')
const Twit = require('twit')

let count = JSON.parse(fs.readFileSync('./count.txt'))
let data = JSON.parse(fs.readFileSync('./data.json'))

let word = data[count]
let status = `When you invent the ${word.c1}, you also invent the ${word.word}.`

const TWITTER_CONFIG = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_CONSUMER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_CONSUMER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60*1000
}

const T = new Twit(TWITTER_CONFIG)

T.post('statuses/update', { status }, (error, data, response) => {
  if (!error) {
    console.log(status)
    fs.writeFileSync('./count.txt', JSON.stringify(++count))
  } else {
    console.log(error)
  }
})
