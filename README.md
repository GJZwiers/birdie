# Birdie

`birdie` is a bioinformatics module for Deno that aims to evolve existing
JavaScript code to WebAssembly-powered variants for increased performance.
Currently it's in very early stages of development and all features are
considered unstable and experimental.

## Features

### String Edit Distance

Import and initialize the WebAssembly module:

```ts
import * as distance from "https://deno.land/x/birdie/mod.ts";

await distance.initWasm();
```

Code using this module will need  permissions to fetch `.wasm` binaries, which requires `--allow-net=deno.land`.

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

## Contributing

Any contributions are welcome and much appreciated!
