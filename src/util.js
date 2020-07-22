// @ts-check
'use strict'

const { Buffer } = require('buffer')

const textDecoder = typeof TextDecoder !== 'undefined'
  ? new TextDecoder()
  : new (require('util').TextDecoder)()

const textEncoder = typeof TextEncoder !== 'undefined'
  ? new TextEncoder()
  : new (require('util').TextEncoder)()

/**
 * @param {ArrayBufferView|ArrayBuffer} bytes
 * @returns {string}
 */
const decodeText = (bytes) => textDecoder.decode(bytes)

/**
 * @param {string} text
 * @returns {Uint8Array}
 */
const encodeText = (text) => textEncoder.encode(text)

/**
 * @param {ArrayBufferView} bytes
 * @returns {Buffer}
 */
const asBuffer = ({ buffer, byteLength, byteOffset }) =>
  Buffer.from(buffer, byteOffset, byteLength)

module.exports = { decodeText, encodeText, asBuffer }
