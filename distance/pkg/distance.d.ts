/* tslint:disable */
/* eslint-disable */
/**
* Calculates the Hamming distance between `a` and `b`.
* @param {string} a
* @param {string} b
* @returns {BigInt}
*/
export function hamming(a: string, b: string): BigInt;
/**
* Calculates the Levenshtein distance between `a` and `b` using
* the Wagner-Fischer algorithm.
* @param {string} a
* @param {string} b
* @returns {number}
*/
export function levenshtein(a: string, b: string): number;
/**
* Calculates the Levenshtein distance between `a` and `b` using
* Myers' Algorithm. Maximum length of a/b is 64 characters or 128 when `is_u128` is true.
* @param {string} a
* @param {string} b
* @param {boolean} is_u128
* @returns {number}
*/
export function myers(a: string, b: string, is_u128: boolean): number;
/**
* Calculates the Levenshtein distance between `a` and `b` using
* Myers' Algorithm. Accepts strings > 128 characters.
* @param {string} a
* @param {string} b
* @param {boolean} is_u128
* @returns {number}
*/
export function myers_long(a: string, b: string, is_u128: boolean): number;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly hamming: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly levenshtein: (a: number, b: number, c: number, d: number) => number;
  readonly myers: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly myers_long: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
