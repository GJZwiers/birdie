import { distance } from "https://deno.land/x/fastest_levenshtein@1.0.10/mod.ts";
import levens from "https://deno.land/x/levenshtein/mod.ts";
import { levenshtein, myers, myers_32 } from "../mods/mod.ts";
import { makeRandomDNAString } from "./transcribe.ts";

import {
  bench,
  runBenchmarks,
} from "https://deno.land/std@0.106.0/testing/bench.ts";

const a = makeRandomDNAString(1024);

const b = makeRandomDNAString(1024);

// const t0 = performance.now();
// for (let i = 0; i < 100; i++) {
//   myers(a, b);
// }
// const t1 = performance.now();

// const d0 = performance.now();
// console.log(distance(a, b));
// const d1 = performance.now();

//console.log("myers(js): " + (d1 - d0) + "ms");
//console.log("myers(wasm): " + (t1 - t0) / 100 + "ms");

bench({
    name: "runs100ForMyersJS",
    runs: 100,
    func(bb): void {
        bb.start();
        distance(a, b);
        bb.stop();
    }
  });

bench({
    name: "runs100ForMyers",
    runs: 100,
    func(bb): void {
        bb.start();
        myers(a, b);
        bb.stop();
    }
  });

runBenchmarks();
