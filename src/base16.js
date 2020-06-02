'use strict'
const { Buffer } = require('buffer')

/** @typedef {import("./types").BaseInterface} BaseInterface */

/**
 * Base 16
 *
 * @internal
 * @param {string} alphabet
 * @returns {BaseInterface}
 */
const base16 = (alphabet) => {
  return {
    encode (input) {
      if (typeof input === 'string') {
        return Buffer.from(input).toString('hex')
      }
      return input.toString('hex')
    },
    decode (input) {
      for (const char of input) {
        if (alphabet.indexOf(char) < 0) {
          throw new Error('invalid base16 character')
        }
      }
      return Buffer.from(input, 'hex')
    }
  }
}

module.exports = base16
