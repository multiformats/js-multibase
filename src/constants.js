'use strict'
const Base = require('./base.js')
const baseX = require('base-x')
const base16 = require('./base16')
const base32 = require('./base32')
const base64 = require('./base64')

/** @typedef {import("./types").BaseNames} BaseNames */
/** @typedef {import("./types").BaseCodes} BaseCodes */
/** @typedef {import("./types").BaseCodesMap} BaseCodesMap */
/** @typedef {import("./types").BaseNamesMap} BaseNamesMap */
/** @typedef {import("./types").BaseConstructor} BaseConstructor */

/**
 * @internal
 * @type {Array<[BaseNames, BaseCodes, BaseConstructor, string]>} - Name, Code, Engine, Alphabet
 */
const bases = [
  ['base2', '0', baseX, '01'],
  ['base8', '7', baseX, '01234567'],
  ['base10', '9', baseX, '0123456789'],
  ['base16', 'f', base16, '0123456789abcdef'],
  ['base32', 'b', base32, 'abcdefghijklmnopqrstuvwxyz234567'],
  ['base32pad', 'c', base32, 'abcdefghijklmnopqrstuvwxyz234567='],
  ['base32hex', 'v', base32, '0123456789abcdefghijklmnopqrstuv'],
  ['base32hexpad', 't', base32, '0123456789abcdefghijklmnopqrstuv='],
  ['base32z', 'h', base32, 'ybndrfg8ejkmcpqxot1uwisza345h769'],
  ['base58flickr', 'Z', baseX, '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'],
  ['base58btc', 'z', baseX, '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'],
  ['base64', 'm', base64, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'],
  ['base64pad', 'M', base64, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='],
  ['base64url', 'u', base64, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'],
  ['base64urlpad', 'U', base64, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=']
]

/** @type {BaseNamesMap} */
const names = bases.reduce((prev, value) => {
  prev[value[0]] = new Base(value[0], value[1], value[2], value[3])
  return prev
}, /** @type {BaseNamesMap} */({}))

/** @type {BaseCodesMap} */
const codes = bases.reduce((prev, tupple) => {
  prev[tupple[1]] = names[tupple[0]]
  return prev
}, /** @type {BaseCodesMap} */({}))

module.exports = {
  names,
  codes
}
