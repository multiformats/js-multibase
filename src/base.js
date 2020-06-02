'use strict'
const { Buffer } = require('buffer')

/** @typedef {import("./types").BaseConstructor} BaseConstructor */
/** @typedef {import("./types").BaseNames} BaseNames */
/** @typedef {import("./types").BaseCodes} BaseCodes */

/**
 * Class to handle base encode/decode
 */
class Base {
  /**
   * Base class
   *
   * @param {BaseCodes | BaseNames} name - base name
   * @param {string} code - base code
   * @param {BaseConstructor} implementation - base engine
   * @param {string} alphabet
   */
  constructor (name, code, implementation, alphabet) {
    this.name = name
    this.code = code
    /** @internal */
    this.codeBuffer = Buffer.from(code)
    this.alphabet = alphabet
    if (implementation && alphabet) {
      this.engine = implementation(alphabet)
    }
  }

  /**
   * Encode value
   *
   * @param {Buffer | Uint8Array} value - Value to encode.
   * @returns {string} Encoded value.
   */
  encode (value) {
    return this.engine.encode(value)
  }

  /**
   * Decode value
   *
   * @param {string} value - Value to decode.
   * @returns {Buffer | Uint8Array} Value decoded.
   */
  decode (value) {
    return this.engine.decode(value)
  }
}

module.exports = Base
