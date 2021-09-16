// export { levenshtein, myers, hamming, transcribe } from "./mods/mod.ts";
import * as distance from "./mods/mod.ts";

await distance.initWasm(Deno.readFile("./mods/levenshtein/pkg/levenshtein_bg.wasm"));

const x = "GTCTGCATGCG";
const y = "TTTAGCTAGCG";

console.log(distance.hamming(x, y));
