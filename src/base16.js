// @flow
import type { BaseEngine } from './base'

export function base16 (alphabet: string): BaseEngine {
  return {
    encode (input) {
      if (typeof input === 'string') {
        return Buffer.from(input).toString('hex')
      }
      return input.toString('hex')
    },
    decode (input) {
      for (let char of input) {
        if (alphabet.indexOf(char) < 0) {
          throw new Error('invalid base16 character')
        }
      }
      return Buffer.from(input, 'hex')
    }
  }
}
