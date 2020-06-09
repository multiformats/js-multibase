/* eslint-env mocha */
'use strict'

const { expect } = require('aegir/utils/chai')
const multibase = require('../src')
const constants = require('../src/constants.js')
const input = 'hello world'
const encoded = [
  ['identity', '\x00hello world'],
  ['base2', '00110100001100101011011000110110001101111001000000111011101101111011100100110110001100100'],
  ['base8', '7320625543306744035667562330620'],
  ['base10', '9126207244316550804821666916'],
  ['base16', 'f68656c6c6f20776f726c64'],
  ['base16upper', 'F68656C6C6F20776F726C64'],
  ['base32', 'bnbswy3dpeb3w64tmmq'],
  ['base32upper', 'BNBSWY3DPEB3W64TMMQ'],
  ['base32hex', 'vd1imor3f41rmusjccg'],
  ['base32hexupper', 'VD1IMOR3F41RMUSJCCG'],
  ['base32pad', 'cnbswy3dpeb3w64tmmq======'],
  ['base32padupper', 'CNBSWY3DPEB3W64TMMQ======'],
  ['base32hexpad', 'td1imor3f41rmusjccg======'],
  ['base32hexpadupper', 'TD1IMOR3F41RMUSJCCG======'],
  ['base32z', 'hpb1sa5dxrb5s6hucco'],
  ['base36', 'kfuvrsivvnfrbjwajo'],
  ['base36upper', 'KFUVRSIVVNFRBJWAJO'],
  ['base58flickr', 'ZrTu1dk6cWsRYjYu'],
  ['base58btc', 'zStV1DL6CwTryKyV'],
  ['base64', 'maGVsbG8gd29ybGQ'],
  ['base64pad', 'MaGVsbG8gd29ybGQ='],
  ['base64url', 'uaGVsbG8gd29ybGQ'],
  ['base64urlpad', 'UaGVsbG8gd29ybGQ=']
]

describe('spec test3', () => {
  for (const [name, output] of encoded) {
    const base = constants.names[name]

    describe(name, () => {
      it('should encode buffer by base name', () => {
        const out = multibase.encode(name, Buffer.from(input))
        expect(out.toString()).to.equal(output)
      })

      it('should encode buffer by base code', () => {
        const out = multibase.encode(base.code, Buffer.from(input))
        expect(out.toString()).to.equal(output)
      })

      it('should decode string', () => {
        const out = multibase.decode(output)
        expect(out.toString()).to.equal(input)
      })
    })
  }
})
