/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const multibase = require('../src')
const constants = require('../src/constants.js')

const unsupportedBases = [
  ['base1']
]

const supportedBases = [
  ['base2', 'yes mani !', '01111001011001010111001100100000011011010110000101101110011010010010000000100001'],
  ['base8', 'yes mani !', '7171312714403326055632220041'],
  ['base10', 'yes mani !', '9573277761329450583662625'],
  ['base16', 'yes mani !', 'f796573206d616e692021'],
  ['base58flickr', 'yes mani !', 'Z7Pznk19XTTzBtx'],
  ['base58btc', 'yes mani !', 'z7paNL19xttacUY'],
  ['base64', '÷ïÿ', 'yw7fDr8O/'],
  ['base64url', '÷ïÿ', 'Yw7fDr8O_']
]

describe('multibase', () => {
  describe('generic', () => {
    it('fails on no args', () => {
      expect(multibase).to.throw(Error)
    })

    it('fails on no buf', () => {
      expect(() => {
        multibase('base1')
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

  for (const elements of supportedBases) {
    const name = elements[0]
    const input = elements[1]
    const output = elements[2]
    const base = constants.names[name]
    describe(name, () => {
      it('adds multibase code to valid encoded buffer, by name', () => {
        const buf = new Buffer(input)
        const encodedBuf = new Buffer(base.encode(buf))
        const multibasedBuf = multibase(base.getName(), encodedBuf)
        expect(multibasedBuf.toString()).to.equal(output)
      })

      it('adds multibase code to valid encoded buffer, by code', () => {
        const buf = new Buffer(input)
        const encodedBuf = new Buffer(base.encode(buf))
        const multibasedBuf = multibase(base.getCode(), encodedBuf)
        expect(multibasedBuf.toString()).to.equal(output)
      })

      it('fails to add multibase code to invalid encoded buffer', () => {
        const nonEncodedBuf = new Buffer('^!@$%!#$%@#y')
        expect(() => {
          multibase(base.getName(), nonEncodedBuf)
        }).to.throw(Error)
      })

      it('isEncoded string', () => {
        const name = multibase.isEncoded(output)
        expect(name).to.equal(base.getName())
      })

      it('isEncoded buffer', () => {
        const multibasedStr = new Buffer(output)
        const name = multibase.isEncoded(multibasedStr)
        expect(name).to.equal(base.getName())
      })
    })
  }
})

describe('multibase.encode ', () => {
  for (const elements of supportedBases) {
    const name = elements[0]
    const input = elements[1]
    const output = elements[2]
    describe(name, () => {
      it('encodes a buffer', () => {
        const buf = new Buffer(input)
        const multibasedBuf = multibase.encode(name, buf)
        expect(multibasedBuf.toString()).to.equal(output)
      })
    })
  }
})

describe('multibase.decode', () => {
  for (const elements of supportedBases) {
    const name = elements[0]
    const input = elements[1]
    const output = elements[2]
    describe(name, () => {
      it('decodes a string', () => {
        const multibasedStr = output
        const buf = multibase.decode(multibasedStr)
        expect(buf).to.eql(new Buffer(input))
      })

      it('decodes a buffer', () => {
        const multibasedBuf = new Buffer(output)
        const buf = multibase.decode(multibasedBuf)
        expect(buf).to.eql(new Buffer(input))
      })
    })
  }
})

for (const elements of unsupportedBases) {
  const name = elements[0]
  describe(name, () => {
    it('fails on non implemented name', () => {
      expect(() => {
        multibase(name, new Buffer('meh'))
      }).to.throw(Error)
    })
  })
}
