/**
 * Implementation of the [multibase](https://github.com/multiformats/multibase) specification.
 *
 * @module Multibase
 */
'use strict'

const { Buffer } = require('buffer')
const constants = require('./constants')

/** @typedef {import("./base")} Base */

/**
 * Create a new buffer with the multibase varint+code.
 *
 * @param {string|number} nameOrCode - The multibase name or code number.
 * @param {Buffer} buf - The data to be prefixed with multibase.
 * @returns {Buffer}
 */
function multibase (nameOrCode, buf) {
  if (!buf) {
    throw new Error('requires an encoded buffer')
  }
  const enc = encoding(nameOrCode)
  validEncode(enc.name, buf)
  return Buffer.concat([enc.codeBuf, buf])
}

/**
 * Encode data with the specified base and add the multibase prefix.
 *
 * @param {string|number} nameOrCode - The multibase name or code number.
 * @param {Buffer} buf - The data to be encoded.
 * @returns {Buffer}
 */
function encode (nameOrCode, buf) {
  const enc = encoding(nameOrCode)

  return Buffer.concat([enc.codeBuf, Buffer.from(enc.encode(buf))])
}

/**
 * Takes a buffer or string encoded with multibase header, decodes it and
 * returns the decoded buffer
 *
 * @param {Buffer|string} data
 * @returns {Buffer}
 *
 */
function decode (data) {
  if (Buffer.isBuffer(data)) {
    data = data.toString()
  }
  const enc = encoding(data[0])
  if (enc) {
    return Buffer.from(enc.decode(data.substring(1)))
  }

  throw new Error('Unsupported encoding')
}

/**
 * Is the given data multibase encoded?
 *
 * @param {Buffer|string} data
 * @returns {boolean}
 */
function isEncoded (data) {
  if (Buffer.isBuffer(data)) {
    data = data.toString()
  }

  // Ensure bufOrString is a string
  if (Object.prototype.toString.call(data) !== '[object String]') {
    return false
  }

  try {
    const enc = encoding(data[0])
    return enc.name
  } catch (err) {
    return false
  }
}

/**
 * Validate encoded data
 *
 * @param {string} name
 * @param {Buffer} buf
 * @returns {undefined}
 */
function validEncode (name, buf) {
  const enc = encoding(name)
  enc.decode(buf.toString())
}

/**
 * Get the encoding by name or code
 *
 * @param {string} nameOrCode
 * @returns {Base}
 */
function encoding (nameOrCode) {
  let enc

  if (constants.names[nameOrCode]) {
    enc = constants.names[nameOrCode]
  } else if (constants.codes[nameOrCode]) {
    enc = constants.codes[nameOrCode]
  } else {
    throw new Error(`Unsupported encoding: ${nameOrCode}`)
  }

  return enc
}

/**
 * Get encoding from data
 *
 * @param {string|Buffer} data
 * @returns {Base}
 */
function encodingFromData (data) {
  if (Buffer.isBuffer(data)) {
    data = data.toString()
  }

  return encoding(data[0])
}

exports = module.exports = multibase
exports.encode = encode
exports.decode = decode
exports.isEncoded = isEncoded
exports.encoding = encoding
exports.encodingFromData = encodingFromData
exports.names = Object.freeze(constants.names)
exports.codes = Object.freeze(constants.codes)
