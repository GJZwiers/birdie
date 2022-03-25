/* tslint:disable */
/* eslint-disable */
/**
* Reads a file in FASTA format. Returns an array of objects containing IDs, sequences and descriptions.
* @param {Uint8Array} file
* @returns {Array<any>}
*/
export function read_fasta_file(file: Uint8Array): Array<any>;
/**
*/
export class FastaData {
  free(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_fastadata_free: (a: number) => void;
  readonly read_fasta_file: (a: number, b: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
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
