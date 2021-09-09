import { levenshtein, myers } from "../mods/mod.ts";
import levens from "https://deno.land/x/levenshtein/mod.ts";
import { distance } from "https://deno.land/x/fastest_levenshtein@1.0.10/mod.ts";

import { makeRandomDNAString } from "./transcribe.ts";

const a = makeRandomDNAString(2048);

const b = makeRandomDNAString(2048);

const t0 = performance.now();
myers(a, b);
const t1 = performance.now();

const tt0 = performance.now();
distance(a, b);
const tt1 = performance.now();

console.log("wasm: " + (t1 - t0) + "ms"); // 2048 bp: 10.662600000000001ms

console.log("js: " + (tt1 - tt0) + "ms"); // 2048 bp: 14.764299999999999ms
