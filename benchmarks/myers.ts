import { distance } from "https://deno.land/x/fastest_levenshtein@1.0.10/mod.ts";
import { makeRandomDNAString } from "./transcribe.ts";
import {
  bench,
  runBenchmarks,
} from "https://deno.land/std@0.106.0/testing/bench.ts";

import init, {
  levenshtein,
  myers,
} from "../distance/pkg/distance.js";

await init(Deno.readFile("./mods/levenshtein/pkg/distance_bg.wasm"));

// const a = makeRandomDNAString(128);
// const b = makeRandomDNAString(128);

// const t0 = performance.now();
// myers(a, b);
// const t1 = performance.now();

// const d0 = performance.now();
// distance(a, b);
// const d1 = performance.now();

// console.log("myers(js): " + (d1 - d0) + "ms");
// console.log("myers(wasm): " + (t1 - t0) + "ms");

bench({
  name: "runs100ForMyersJS",
  runs: 100,
  func(bb): void {
    bb.start();
    const a = makeRandomDNAString(1024);
    const b = makeRandomDNAString(1024);
    distance(a, b);
    bb.stop();
  },
});

bench({
  name: "runs100ForMyers",
  runs: 100,
  func(bb): void {
    bb.start();
    const a = makeRandomDNAString(1024);
    const b = makeRandomDNAString(1024);
    myers(a, b);
    bb.stop();
  },
});

runBenchmarks();
