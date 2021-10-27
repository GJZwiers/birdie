/* tslint:disable */
/* eslint-disable */
/**
* ShiftAnd algorithm for pattern matching. Patterns may contain at most 64 symbols.
* Complexity: O(n) with text length n.
* @param {string} pattern
* @param {string} text
* @returns {number}
*/
export function shift_and(pattern: string, text: string): number;
/**
* Algorithm of Knuth, Morris and Pratt.
* @param {string} pattern
* @param {string} text
* @returns {Uint32Array}
*/
export function kmp(pattern: string, text: string): Uint32Array;
/**
* Algorithm of Horspool. Window-based, similar to but faster than Boyer-Moore.
* @param {string} pattern
* @param {string} text
* @returns {Uint32Array}
*/
export function horspool(pattern: string, text: string): Uint32Array;
/**
* Backward oracle matching algorithm.
* @param {string} pattern
* @param {string} text
* @returns {Uint32Array}
*/
export function bom(pattern: string, text: string): Uint32Array;
/**
* Backward nondeterministic DAWG matching (BNDM).
* @param {string} pattern
* @param {string} text
* @returns {Uint32Array}
*/
export function bndm(pattern: string, text: string): Uint32Array;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly shift_and: (a: number, b: number, c: number, d: number) => number;
  readonly kmp: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly horspool: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly bom: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly bndm: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
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
