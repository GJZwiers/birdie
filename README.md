# Birdie

<p align="center">
<img src="./docs/birdie-min.png" width="350">
</p>

[![build](https://github.com/GJZwiers/birdie/actions/workflows/build.yaml/badge.svg)](https://github.com/GJZwiers/birdie/actions/workflows/build.yaml)
![GitHub](https://img.shields.io/github/license/GJZwiers/birdie)

`birdie` is a Deno module for bioinformatical analysis with the aim of evolving
existing JavaScript code to WebAssembly-powered variants with improved
computational performance. At the moment the project is in very early stages of
development and all features are considered unstable and experimental.

## Installation

`birdie` provides modules that can be imported into a JavaScript or Typescript
application with a URL:

```ts
import * as pm from "https://deno.land/x/birdie/pattern_matching/mod.ts";
```

The WebAssembly needs to be initialized before use with the `initWasm` method:

```ts
await pm.initWasm();
```

As of right now, WebAssembly files are not locally cached along with JS/TS files
in Deno, so you must pass `--allow-net=deno.land` in order to successfully run
`birdie`.

## Features

### String Edit Distance

```ts
import * as distance from "https://deno.land/x/birdie/distance/mod.ts";

await distance.initWasm();

const x = "GTCTGCATGCG";
const y = "TTTAGCTAGCG";

// Hamming distance
const hammingDistance = distance.hamming(x, y);
console.log(hammingDistance); // 5n (BigInt)

// Levenshtein distance (Wagner-Fischer Algorithm)
const levenshteinDistance = distance.levenshtein(x, y);
console.log(levenshteinDistance);

// Myers' Algorithm
const myersDistance = distance.myers(x, y);
console.log(myersDistance);
```

### Sequence Analysis

```ts
import * as sequence from "https://deno.land/x/birdie/sequence/mod.ts";

await sequence.initWasm();

const gcRatio = sequence.gcContent("GATATACA");
console.log(gcRatio); // 0.25

const gc3Ratio = sequence.gc3Content("GATATACA");
console.log(gc3Ratio); // 0.67
```

### Pattern Matching

- shift_and

```ts
import * as pm from "https://deno.land/x/birdie/pattern_matching/mod.ts";

await pm.initWasm();

const pattern = "AAAA";
const text = "ACGGCTAGAAAAGGCTAG";

const startPos = pm.shiftAnd(pattern, text);
console.log(startPos); // 8
```

## Contributing

Any contributions are welcome and much appreciated!
