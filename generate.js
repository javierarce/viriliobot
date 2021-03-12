'use strict'

const csv = require('csv-parser')
const fs = require('fs')

let data = []

fs.createReadStream('ladec.csv')
  .pipe(csv())
  .on('data', (row) => {
    data.push({ c1: row.c1, c2: row.c2, word: row.stim })
  })
  .on('end', () => {
    fs.writeFile('data.json', JSON.stringify(data), (error) => {
    })
  })
