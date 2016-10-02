'use strict'

const constants = require('./constants')

exports = module.exports = multibase
exports.encode = encode
exports.decode = decode
exports.isEncoded = isEncoded

const errNotSupported = new Error('Unsupported encoding')

// returns a new buffer with the multibase varint+code`
function multibase (nameOrCode, buf) {
  if (!buf) {
    throw new Error('requires an encoded buffer')
  }
  const base = getBase(nameOrCode)
  const code = base.getCode()
  const codeBuf = new Buffer(code)

  const name = base.getName()
  validEncode(name, buf)
  return Buffer.concat([codeBuf, buf])
}

function encode (nameOrCode, buf) {
  const base = getBase(nameOrCode)
  const name = base.getName()

  return multibase(name, new Buffer(base.encode(buf)))
}

// receives a buffer or string encoded with multibase header
// decodes it and returns an object with the decoded buffer
// and the encoded type { base: <name>, data: <buffer> }
// from @theobat : This is not what the multibase.spec.js test is waiting for.
function decode (bufOrString) {
  console.log(bufOrString)
  if (Buffer.isBuffer(bufOrString)) {
    bufOrString = bufOrString.toString()
  }

  const code = bufOrString.substring(0, 1)
  bufOrString = bufOrString.substring(1, bufOrString.length)

  if (typeof bufOrString === 'string') {
    bufOrString = new Buffer(bufOrString)
  }

  const base = getBase(code)

  const decodeObject = {
    base: base.getName(),
    data: new Buffer(base.decode(bufOrString.toString()))
  }
  return decodeObject.data
}

function isEncoded (bufOrString) {
  if (Buffer.isBuffer(bufOrString)) {
    bufOrString = bufOrString.toString()
  }

  const code = bufOrString.substring(0, 1)
  try {
    const base = getBase(code)
    return base.getName()
  } catch (err) {
    return false
  }
}

function validEncode (name, buf) {
  const base = getBase(name)
  base.decode(buf.toString())
}

function getBase (nameOrCode) {
  let base

  if (constants.names[nameOrCode]) {
    base = constants.names[nameOrCode]
  } else if (constants.codes[nameOrCode]) {
    base = constants.codes[nameOrCode]
  } else {
    throw errNotSupported
  }

  if (!base.isImplemented()) {
    throw new Error('Base ' + nameOrCode + ' is not implemented yet')
  }

  return base
}
