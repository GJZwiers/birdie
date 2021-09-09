import { levenshtein, myers } from "./mods/mod.ts";
import levens from "https://deno.land/x/levenshtein/mod.ts";
import { distance } from "https://deno.land/x/fastest_levenshtein@1.0.10/mod.ts";

function javascribe(s: string): string {
  let transcript = "";

  for (const c of s) {
    if (c == "A") {
      transcript += "U";
    } else if (c == "T") {
      transcript += "A";
    } else if (c == "C") {
      transcript += "G";
    } else if (c == "G") {
      transcript += "C";
    }
  }

  return transcript;
}

function makeRandomDNAString(length: number): string {
  let result = "";
  const characters = "ACGT";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(
      Math.random() * charactersLength,
    ));
  }
  return result;
}

const a = makeRandomDNAString(50000);

const b = makeRandomDNAString(50000);

const t0 = performance.now();
levenshtein(a, b);
const t1 = performance.now();

const tt0 = performance.now();
levens(a, b);
const tt1 = performance.now();

console.log(t1 - t0);
console.log(tt1 - tt0);

// <--- Last few GCs --->
//  0[2732:0000020C0C6CA490]    18739 ms: Mark-sweep (reduce) 1394.9 (1417.2) -> 1394.9 (1417.2) MB, 1481.0 / 0.0 ms  (+ 0.0 ms in 1 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 1487 ms) (average mu = 0.142, current mu = 0[2732:0000020C0C6CA490]    20269 ms: Mark-sweep (reduce) 1397.5 (1419.9) -> 1397.5 (1419.9) MB, 1414.5 / 0.0 ms  (+ 0.0 ms in 1 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 1421 ms) (average mu = 0.110, current mu = 0

// <--- JS stacktrace --->

// #
// # Fatal javascript OOM in Ineffective mark-compacts near heap limit
// #

// <--- Last few GCs --->
// fa[6968:0000021A1C050080]     7393 ms: Mark-sweep 247.6 (266.2) -> 247.6 (282.2) MB, 106.5 / 0.0 ms  (+
// 0.1 ms in 109 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 669 ms) (average mu = 0.878, current mu = 0.878) allocat[6968:0000021A1C050080]    11173 ms: Mark-sweep 983.5 (1023.4) -> 983.5 (1023.4) MB, 430.8 / 0.0 ms  (+ 0.5 ms in 429 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 2866 ms) (average mu = 0.884, current mu = 0.886) allo

// <--- JS stacktrace --->

// #
// # Fatal javascript OOM in invalid table size
// #
