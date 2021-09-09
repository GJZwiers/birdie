export { levenshtein, myers, transcribe } from "./mods/mod.ts";
import { myers } from "./mods/mod.ts";

import { makeRandomDNAString } from "./benchmarks/transcribe.ts";

const a = makeRandomDNAString(32);

const b = makeRandomDNAString(32);

console.log(myers("fast", "faster"));

console.log(myers("kitten", "sitting"));

console.log(myers(a, b)); //"foo".repeat(201)
