/**
 * Implementation of the [multibase](https://github.com/multiformats/multibase) specification.
 *
 * @packageDocumentation
 * @module Multibase
 */
'use strict'

const { Buffer } = require('buffer')
const constants = require('./constants')

/** @typedef {import("./base")} Base */
/** @typedef {import("./types").BaseCodes} BaseCodes */
/** @typedef {import("./types").BaseNames} BaseNames */

/**
 * Create a new buffer with the multibase varint+code.
 *
 * @param {BaseCodes|BaseNames} nameOrCode - The multibase name or code number.
 * @param {Buffer} buf - The data to be prefixed with multibase.
 * @returns {Buffer}
 */
function multibase (nameOrCode, buf) {
  if (!buf) {
    throw new Error('requires an encoded buffer')
  }
  const base = getBase(nameOrCode)
  const codeBuf = Buffer.from(base.code)

  const name = base.name
  validEncode(name, buf)
  return Buffer.concat([codeBuf, buf])
}

/**
 * Encode data with the specified base and add the multibase prefix.
 *
 * @param {BaseCodes|BaseNames} nameOrCode - The multibase name or code number.
 * @param {Buffer} buf - The data to be encoded.
 * @returns {Buffer}
 */
function encode (nameOrCode, buf) {
  const base = getBase(nameOrCode)
  const name = base.name

  return multibase(name, Buffer.from(base.encode(buf)))
}

/**
 * Takes a buffer or string encoded with multibase header, decodes it and
 * returns the decoded buffer
 *
 * @param {Buffer|string} bufOrString
 * @returns {Buffer}
 */
function decode (bufOrString) {
  if (Buffer.isBuffer(bufOrString)) {
    bufOrString = bufOrString.toString()
  }

  const code = /** @type {BaseCodes} */(bufOrString.substring(0, 1))
  bufOrString = bufOrString.substring(1, bufOrString.length)

  if (typeof bufOrString === 'string') {
    bufOrString = Buffer.from(bufOrString)
  }

  const base = getBase(code)
  return Buffer.from(base.decode(bufOrString.toString()))
}

/**
 * Is the given data multibase encoded?
 *
 * @param {Buffer|string} bufOrString
 * @returns {boolean|string}
 */
function isEncoded (bufOrString) {
  if (Buffer.isBuffer(bufOrString)) {
    bufOrString = bufOrString.toString()
  }

  // Ensure bufOrString is a string
  if (Object.prototype.toString.call(bufOrString) !== '[object String]') {
    return false
  }

  const code = /** @type {BaseCodes} */(bufOrString.substring(0, 1))
  try {
    const base = getBase(code)
    return base.name
  } catch (err) {
    return false
  }
}

/**
 * Check if encoding is valid
 *
 * @param {BaseCodes|BaseNames} name
 * @param {Buffer} buf
 * @private
 * @returns {void}
 */
function validEncode (name, buf) {
  const base = getBase(name)
  base.decode(buf.toString())
}

/**
 * Get base to encode/decode without prefix
 *
 * @param {BaseCodes|BaseNames} nameOrCode
 * @returns { Base }
 */
function getBase (nameOrCode) {
  /** @type {Base} */
  let base

  if (constants.names[nameOrCode]) {
    base = constants.names[nameOrCode]
  } else if (constants.codes[nameOrCode]) {
    base = constants.codes[nameOrCode]
  } else {
    throw new Error(`Unsupported encoding: ${nameOrCode}`)
  }

  return base
}

module.exports = multibase

multibase.encode = encode
multibase.decode = decode
multibase.isEncoded = isEncoded
multibase.names = Object.freeze(Object.keys(constants.names))
multibase.codes = Object.freeze(Object.keys(constants.codes))
multibase.getBase = getBase
