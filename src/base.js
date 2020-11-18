'use strict'

const { encodeText } = require('./util')

/** @typedef {import('./types').CodecFactory} CodecFactory */
/** @typedef {import("./types").BaseNames} BaseNames */
/** @typedef {import("./types").BaseCodes} BaseCodes */

/**
 * Class
 *
 */
class Base {
  /**
   * @param {BaseNames} name
   * @param {BaseCodes} code
   * @param {CodecFactory} factory
   * @param {string} alphabet
   */
  constructor (name, code, factory, alphabet) {
    this.name = name
    this.code = code
    this.codeBuf = encodeText(this.code)
    this.alphabet = alphabet
    this.codec = factory(alphabet)
  }

  /**
   * @param {Uint8Array} buf
   * @returns {string}
   */
  encode (buf) {
    return this.codec.encode(buf)
  }

  /**
   * @param {string} string
   * @returns {Uint8Array}
   */
  decode (string) {
    for (const char of string) {
      if (this.alphabet && this.alphabet.indexOf(char) < 0) {
        throw new Error(`invalid character '${char}' in '${string}'`)
      }
    }
    return this.codec.decode(string)
  }
}

module.exports = Base
