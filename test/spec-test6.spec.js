/* eslint-env mocha */
'use strict'

const { expect } = require('aegir/utils/chai')
const multibase = require('../src')
const input = 'hello world'
const encoded = [
  ['base16', 'f68656c6c6f20776F726C64'],
  ['base16upper', 'F68656c6c6f20776F726C64'],
  ['base32', 'bnbswy3dpeB3W64TMMQ'],
  ['base32upper', 'Bnbswy3dpeB3W64TMMQ'],
  ['base32hex', 'vd1imor3f41RMUSJCCG'],
  ['base32hexupper', 'Vd1imor3f41RMUSJCCG'],
  ['base32pad', 'cnbswy3dpeB3W64TMMQ======'],
  ['base32padupper', 'Cnbswy3dpeB3W64TMMQ======'],
  ['base32hexpad', 'td1imor3f41RMUSJCCG======'],
  ['base32hexpadupper', 'Td1imor3f41RMUSJCCG======'],
  ['base36', 'kfUvrsIvVnfRbjWaJo'],
  ['base36upper', 'KfUVrSIVVnFRbJWAJo']
]

describe('spec test6', () => {
  for (const [name, output] of encoded) {
    describe(name, () => {
      it('should decode string', () => {
        const out = multibase.decode(output)
        expect(out.toString()).to.equal(input)
      })
    })
  }
})
