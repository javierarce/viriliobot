'use strict'
require('dotenv').config({ path: __dirname + '/.env' })

const fs = require('fs')
const Twit = require('twit')

const TWITTER_CONFIG = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_CONSUMER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_CONSUMER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60*1000
}

const T = new Twit(TWITTER_CONFIG)

const getStatus = (c1, word) => {
  return `When you invent the ${ c1 }, you also invent the ${ word }.`
}

const loadCount = () => {
  return JSON.parse(fs.readFileSync('./count.txt'))
}

const saveCount = (count) => {
  fs.writeFileSync('./count.txt', JSON.stringify(count))
}

const loadData = () => {
  return JSON.parse(fs.readFileSync('./data/data.json'))
}

const tweet = (status, callback) => {
  T.post('statuses/update', { status }, callback)
}

const init = () => {
  let count = loadCount()
  const data = loadData()
  const word = data[count]
  const status = getStatus(word.c1, word.word)

  tweet(status, (error, data, response) => {
    if (!error) {
      console.log(status)
      saveCount(++count)
    } else {
      console.log(error)
    }
  })
}

init()
