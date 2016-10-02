'use strict'

class Base {
    constructor(name, code, alphabet) {
        this.name = name
        this.code = code
        this.alphabet = alphabet
        this.engine = require('base-x')(alphabet)
    }

    getName() {
        return this.name
    }

    getCode() {
        return this.name
    }

    getAlphabet() {
        return this.alphabet
    }

    encode(stringOrBuffer) {
        return this.engine.encode(stringOrBuffer);
    }

    decode(stringOrBuffer) {
        return this.engine.decode(stringOrBuffer);
    }
}

module.exports = {
  Base: Base,
}
