/* eslint-env mocha */
'use strict'

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)
const constants = require('../src/constants.js')

describe('constants', () => {
  it('constants indexed by name', () => {
    const names = constants.names
    expect(Object.keys(names).length).to.equal(16)
  })

  it('constants indexed by code', () => {
    const codes = constants.codes
    expect(Object.keys(codes).length).to.equal(16)
  })

  it('names frozen', () => {
    const names = constants.names
    expect(Object.isFrozen(names)).to.be.true()
  })

  it('codes frozen', () => {
    const codes = constants.codes
    expect(Object.isFrozen(codes)).to.be.true()
  })
})
