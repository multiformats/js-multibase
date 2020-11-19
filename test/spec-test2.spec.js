/* eslint-env mocha */
'use strict'

const { decodeText, encodeText } = require('../src/util')
const { expect } = require('aegir/utils/chai')
const multibase = require('../src')
const constants = require('../src/constants.js')
const input = 'yes mani !'

/**
 * @typedef {import('../src/types').BaseName} BaseName
 */
/** @type {Array<[BaseName, string]>} */
const encoded = [
  ['identity', '\x00yes mani !'],
  ['base2', '001111001011001010111001100100000011011010110000101101110011010010010000000100001'],
  ['base8', '7362625631006654133464440102'],
  ['base10', '9573277761329450583662625'],
  ['base16', 'f796573206d616e692021'],
  ['base16upper', 'F796573206D616E692021'],
  ['base32', 'bpfsxgidnmfxgsibb'],
  ['base32upper', 'BPFSXGIDNMFXGSIBB'],
  ['base32hex', 'vf5in683dc5n6i811'],
  ['base32hexupper', 'VF5IN683DC5N6I811'],
  ['base32pad', 'cpfsxgidnmfxgsibb'],
  ['base32padupper', 'CPFSXGIDNMFXGSIBB'],
  ['base32hexpad', 'tf5in683dc5n6i811'],
  ['base32hexpadupper', 'TF5IN683DC5N6I811'],
  ['base32z', 'hxf1zgedpcfzg1ebb'],
  ['base36', 'k2lcpzo5yikidynfl'],
  ['base36upper', 'K2LCPZO5YIKIDYNFL'],
  ['base58flickr', 'Z7Pznk19XTTzBtx'],
  ['base58btc', 'z7paNL19xttacUY'],
  ['base64', 'meWVzIG1hbmkgIQ'],
  ['base64pad', 'MeWVzIG1hbmkgIQ=='],
  ['base64url', 'ueWVzIG1hbmkgIQ'],
  ['base64urlpad', 'UeWVzIG1hbmkgIQ==']
]

describe('spec test2', () => {
  for (const [name, output] of encoded) {
    const base = constants.names[name]

    describe(name, () => {
      it('should encode buffer by base name', () => {
        const out = multibase.encode(name, encodeText(input))
        expect(decodeText(out)).to.equal(output)
      })

      it('should encode buffer by base code', () => {
        const out = multibase.encode(base.code, encodeText(input))
        expect(decodeText(out)).to.equal(output)
      })

      it('should decode string', () => {
        const out = multibase.decode(output)
        expect(decodeText(out)).to.equal(input)
      })
    })
  }
})
