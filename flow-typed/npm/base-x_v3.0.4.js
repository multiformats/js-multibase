// @flow
// flow-typed signature: ca400f8732729fff6ccfd6b85d42d0bb
// flow-typed version: 0.1.0/base-x_v3.0.4/flow_v0.69.0

declare module 'base-x' {
  declare type BaseEngine = {
    encode: (buffer: string | Buffer) => string,
    decode: (string: string) => number[]
  }

  declare type BaseImplementation = (ALPHABET: string) => BaseEngine;

  declare var baseX: BaseImplementation;

  declare export default baseX;
}
