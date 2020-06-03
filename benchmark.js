/* eslint-disable no-console */
'use strict'
const Benchmark = require('benchmark')
const multibase = require('./src')

const names = Object.keys(multibase.names)
const suite = new Benchmark.Suite()
const input = 'Decentralize everything!!'

for (const enc of names) {
  suite.add(enc, () => {
    multibase.encode(enc, Buffer.from(input))
  })
}

suite
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
