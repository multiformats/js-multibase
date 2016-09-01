/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const multibase = require('../src')
const bs58 = require('bs58')

describe('multibase', () => {
  describe('generic', () => {
    it('fails on no args', () => {
      expect(multibase).to.throw(Error)
    })

    it('fails on no buf', () => {
      expect(() => {
        multibase('base58')
      }).to.throw(Error)
    })

    it('fails on non supported name', () => {
      expect(() => {
        multibase('base1001', new Buffer('meh'))
      }).to.throw(Error)
    })

    it('fails on non supported code', () => {
      expect(() => {
        multibase('6', new Buffer('meh'))
      }).to.throw(Error)
    })
  })

  describe('base58', () => {
    it('adds multibase code to valid encoded buffer, by name', () => {
      const buf = new Buffer('hey')
      const encodedBuf = new Buffer(bs58.encode(buf))
      const multibasedBuf = multibase('base58btc', encodedBuf)
      expect(multibasedBuf.toString()).to.equal('zc4oi')
    })

    it('adds multibase code to valid encoded buffer, by code', () => {
      const buf = new Buffer('hey')
      const encodedBuf = new Buffer(bs58.encode(buf))
      const multibasedBuf = multibase('z', encodedBuf)
      expect(multibasedBuf.toString()).to.equal('zc4oi')
    })

    it('fails to add multibase code to invalid encoded buffer', () => {
      const nonEncodedBuf = new Buffer('^!@$%!#$%@#y')
      expect(() => {
        multibase('base58btc', nonEncodedBuf)
      }).to.throw(Error)
    })

    it('isEncoded string', () => {
      const multibasedStr = 'zc4oi'
      const name = multibase.isEncoded(multibasedStr)
      expect(name).to.equal('base58btc')
    })

    it('isEncoded buffer', () => {
      const multibasedStr = new Buffer('zc4oi')
      const name = multibase.isEncoded(multibasedStr)
      expect(name).to.equal('base58btc')
    })
  })
})

describe('multibase.encode', () => {
  describe('base58', () => {
    it('encodes a buffer', () => {
      const buf = new Buffer('hey')
      const multibasedBuf = multibase.encode('base58btc', buf)
      expect(multibasedBuf.toString()).to.equal('zc4oi')
    })
  })
})

describe('multibase.decode', () => {
  describe('base58', () => {
    it('decodes a string', () => {
      const multibasedStr = 'zc4oi'
      const buf = multibase.decode(multibasedStr)
      expect(buf).to.eql(new Buffer('hey'))
    })

    it('decodes a buffer', () => {
      const multibasedBuf = new Buffer('zc4oi')
      const buf = multibase.decode(multibasedBuf)
      expect(buf).to.eql(new Buffer('hey'))
    })
  })
})
