'use strict'

const csv = require('csv-parser')
const fs = require('fs')

let data = []

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

fs.createReadStream('ladec.csv')
  .pipe(csv())
  .on('data', (row) => {
    data.push({ c1: row.c1, c2: row.c2, word: row.stim })
    data = shuffle(data)
  })
  .on('end', () => {
    fs.writeFile('data.json', JSON.stringify(data), (error) => {
    })
  })
