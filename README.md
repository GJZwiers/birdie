# Birdie

<p align="center">
<img src="./docs/birdie.png" width="350">
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
`birdie`, because the WebAssembly needs to be fetched from `deno.land/x`.

## Features

### String Edit Distance

Import and initialize the WebAssembly module:

```ts
import * as distance from "https://deno.land/x/birdie/distance/mod.ts";

await distance.initWasm();
```

- Hamming Distance

```ts
const x = "GTCTGCATGCG";
const y = "TTTAGCTAGCG";

const hammingDistance = distance.hamming(x, y);
console.log(hammingDistance); // 5n (BigInt)
```

- Levenshtein distance (Wagner-Fischer Algorithm)

```ts
const levenshteinDistance = distance.levenshtein("kitten", "sitting");
console.log(levenshteinDistance); // 3
```

- Levenshtein distance (Myers' Algorithm)

```ts
const myersDistance = distance.myers("kitten", "sitting");
console.log(myersDistance); // 3
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
import * as patternMatching from "https://deno.land/x/birdie/pattern_matching/mod.ts";

await patternMatching.initWasm();

const pattern = "AAAA";
const text = "ACGGCTAGAAAAGGCTAG";

const patternStartingPosition = patternMatching.shiftAnd(pattern, text);
console.log(patternStartingPosition); // 8
```

## Contributing

Any contributions are welcome and much appreciated!
