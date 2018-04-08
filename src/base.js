// @flow

export interface BaseEngine {
  encode(input: string | Buffer): string;
  decode(input: string): Buffer;
}

export type BaseImplementation = (alphabet: string) => BaseEngine

export class Base {
  name: string
  code: string
  implementation: BaseImplementation
  alphabet: string
  engine: BaseEngine | void;

  constructor (
    name: string,
    code: string,
    implementation: '' | BaseImplementation,
    alphabet: string
  ) {
    this.name = name
    this.code = code
    this.alphabet = alphabet
    // TODO: There are 3 possible solutions to resolve the error this causes:
    // 1. Throw in here if there is no implementation
    // 2. Throw when encode or decode are called without an engine present
    // 3. Let encode or decode return undefined;
    if (implementation && alphabet) {
      this.engine = implementation(alphabet)
    }
  }

  encode (stringOrBuffer: string | Buffer) {
    return this.engine.encode(stringOrBuffer)
  }

  decode (string: string) {
    return this.engine.decode(string)
  }

  isImplemented (): boolean {
    return Boolean(this.engine)
  }
}
