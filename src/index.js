// @flow

/**
 * Implementation of the [multibase](https://github.com/multiformats/multibase) specification.
 * @module Multibase
 */
import { constants } from './constants'

multibase.encode = encode
multibase.decode = decode
multibase.isEncoded = isEncoded

const errNotSupported = new Error('Unsupported encoding')

/**
 * Create a new buffer with the multibase varint+code.
 *
 * @param {string|number} nameOrCode - The multibase name or code number.
 * @param {Buffer} buf - The data to be prefixed with multibase.
 * @memberof Multibase
 * @returns {Buffer}
 */
export default function multibase (
  nameOrCode: string | number,
  buf: Buffer
): Buffer {
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
 * @param {string|number} nameOrCode - The multibase name or code number.
 * @param {Buffer} buf - The data to be encoded.
 * @returns {Buffer}
 * @memberof Multibase
 */
function encode (nameOrCode: string | number, buf: Buffer): Buffer {
  const base = getBase(nameOrCode)
  const name = base.name

  return multibase(name, Buffer.from(base.encode(buf)))
}

/**
 *
 * Takes a buffer or string encoded with multibase header
 * decodes it and returns the decoded buffer
 *
 * @param {Buffer|string} bufOrString
 * @returns {Buffer}
 * @memberof Multibase
 *
 */
function decode (bufOrString: Buffer | string): Buffer {
  bufOrString = bufOrString.toString()

  const code = bufOrString.substring(0, 1)
  bufOrString = bufOrString.substring(1, bufOrString.length)

  bufOrString = Buffer.from(bufOrString)

  const base = getBase(code)

  return Buffer.from(base.decode(bufOrString.toString()))
}

/**
 * Is the given data multibase encoded?
 *
 * @param {Buffer|string} bufOrString
 * @returns {string|false} The code number or false.
 * @memberof Multibase
 */
function isEncoded (bufOrString: Buffer | string): string | false {
  bufOrString = bufOrString.toString()

  const code = bufOrString.substring(0, 1)
  try {
    const base = getBase(code)
    return base.name
  } catch (err) {
    return false
  }
}

/**
 * @param {string} name
 * @param {Buffer} buf
 * @private
 * @returns {undefined}
 */
function validEncode (name: string, buf: Buffer): void {
  const base = getBase(name)
  base.decode(buf.toString())
}

function getBase (nameOrCode) {
  let base

  if (constants.names[String(nameOrCode)]) {
    base = constants.names[String(nameOrCode)]
  } else if (constants.codes[String(nameOrCode)]) {
    base = constants.codes[String(nameOrCode)]
  } else {
    throw errNotSupported
  }

  if (!base.isImplemented()) {
    throw new Error('Base ' + nameOrCode + ' is not implemented yet')
  }

  return base
}
