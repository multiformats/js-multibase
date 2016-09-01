/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const constants = require('../src/constants.js')

describe('constants', () => {
  it('constants indexed by name', () => {
    const names = constants.names
    expect(Object.keys(names).length).to.equal(9)
  })

  it('constants indexed by code', () => {
    const codes = constants.codes
    expect(Object.keys(codes).length).to.equal(9)
  })
})
