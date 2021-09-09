/* tslint:disable */
/* eslint-disable */
/**
 * @param {string} a
 * @param {string} b
 * @returns {number} */
export function levenshtein(a: string, b: string): number;
/**
 * @param {string} a
 * @param {string} b
 * @returns {number} */
export function myers(a: string, b: string): number;
/**
 * @param {string} a
 * @param {string} b
 * @returns {number} */
export function myers_32(a: string, b: string): number;
/**
 * @param {string} b
 * @param {string} a
 * @returns {number} */
export function myers_x(b: string, a: string): number;

export type InitInput =
  | RequestInfo
  | URL
  | Response
  | BufferSource
  | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly levenshtein: (a: number, b: number, c: number, d: number) => number;
  readonly myers: (a: number, b: number) => number;
  readonly myers_32: (a: number, b: number) => number;
  readonly myers_x: (a: number, b: number) => number;
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
