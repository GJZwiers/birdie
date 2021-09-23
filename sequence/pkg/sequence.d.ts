/* tslint:disable */
/* eslint-disable */
/**
 * Returns the ratio of bases which are guanine (G) or cytosine (C).
 * @param {string} sequence
 * @returns {number} */
export function gc_content(sequence: string): number;
/**
 * Returns the ratio of bases in the 3rd position which are guanine (G) or cytosine (C).
 * @param {string} sequence
 * @returns {number} */
export function gc3_content(sequence: string): number;

export type InitInput =
  | RequestInfo
  | URL
  | Response
  | BufferSource
  | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly gc_content: (a: number, b: number) => number;
  readonly gc3_content: (a: number, b: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
}

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {InitInput | Promise<InitInput>} module_or_path
 *
 * @returns {Promise<InitOutput>} */
export default function init(
  module_or_path?: InitInput | Promise<InitInput>,
): Promise<InitOutput>;
