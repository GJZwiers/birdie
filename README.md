# Birdie

`birdie` is a bioinformatics module for Deno that aims to evolve existing
JavaScript utilities to WebAssembly-powered variants for increased performance.
Currently it's in very early stages of development and all features are
considered unstable and experimental.

## Features

### String Diff Algorithms

To calculate the Levenshtein edit distance between two strings two options are
available:

- Wagner-Fischer Algorithm

```ts
import { levenshtein } from "https://deno.land/x/birdie/mod.ts";

const distance = levenshtein("kitten", "sitting");
console.log(distance); // 3
```

- Myers' Algorithm

```ts
import { myers } from "https://deno.land/x/birdie/mod.ts";

const distance = myers("kitten", "sitting");
console.log(distance); // 3
```

## Contributing

Any contributions are welcome and much appreciated!
