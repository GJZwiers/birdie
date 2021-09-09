# Birdie

`birdie` is a bioinformatics module for Deno that aims to evolve existing
JavaScript utilities to WebAssembly-powered variants for increased performance.
Currently it's in very early stages of development and all features are
considered unstable and experimental.

## Features

### Transcription

```ts
import { transcribe } from "https://deno.land/x/birdie/mod.ts";

const transcript = transcribe("ACGT");
console.log(transcript); > "UGCA";
```

Performs DNA to RNA transcription. It uses WebAssembly and performs ~4x faster
than its pure JavaScript counterpart when benchmarked on a 1 million character
string. However, the current implementation is for demonstrative purposes only
(for example, it does not seek promotor sites to start transcription at).

### String Diff Algorithms

Two options are available to calculate the Levenshtein edit distance for two
strings:

- Wagner-Fischer
- Myers' Algorithm

```ts
import { levenshtein } from "https://deno.land/x/birdie/mod.ts";

const distance = levenshtein("kitten", "sitting");
console.log(distance); // 3
```

```ts
import { myers } from "https://deno.land/x/birdie/mod.ts";

const distance = myers("kitten", "sitting");
console.log(distance); // 3
```

## Contributing

Any contributions are welcome and much appreciated!
