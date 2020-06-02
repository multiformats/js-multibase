/**
 * - Codes of the supported encodings
 */
export type BaseCodes = "0" | "7" | "9" | "f" | "b" | "c" | "v" | "t" | "h" | "Z" | "z" | "m" | "M" | "u" | "U";

/**
 * - Names of the supported encodings
 */
export type BaseNames = "base64" | "base2" | "base8" | "base10" | "base16" | "base32" | "base32pad" | "base32hex" | "base32hexpad" | "base32z" | "base58flickr" | "base58btc" | "base64pad" | "base64url" | "base64urlpad";

/**
 * Base
 */
export type BaseConstructor = (alphabet: string) => BaseInterface;

/**
 * BaseInterface
 */
export type BaseInterface = {
    /**
     * - Encode input
     */
    encode: (input: Buffer | Uint8Array) => string;
    /**
     * - Decode input
     */
    decode: (input: string) => Buffer | Uint8Array;
};

export type BaseNamesMap = { [K in BaseNames]: import('./base') }
export type BaseCodesMap = { [K in BaseNames]: import('./base') }