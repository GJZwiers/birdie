# Birdie - Bioinformatics for Deno

Birdie is a Deno project that provides users with fast WebAssembly code to run
common tasks in bioinformatics on the Web, such as DNA sequence analysis. Birdie
uses Rust in the background and makes use of its excellent
[`bio`](https://docs.rs/bio/0.39.0/bio/index.html) crate, and aims to provide a
straightforward API in Deno as well as high speed computation.

All of Birdie's WebAssembly modules are benchmarked and compared with known
JavaScript implementations where possible, as to deliver performant code that
can be easily integrated with other Web technologies to develop a variety of
bioinformatics applications.

## Contents

1. [Installation](#installation)
2. [Initializing the WebAssembly](#initializing-the-webassembly)
3. [Modules](#modules)

    - [distance](#distance)
    - [pattern_matching](#pattern_matching)
    - [sequence](sequence)

## Installation

Birdie is an ES Module that can be imported into any Deno project. There is a TypeScript entrypoint named `mod.ts` for each of the different WebAssembly modules. For example, to load the `pattern_matching` module you would `import` the URL `"https://deno.land/x/birdie/pattern_matching/mod.ts"` into Deno:

```typescript
import * as patternMatching from "https://deno.land/x/birdie/pattern_matching/mod.ts";
```

For production use, pinpointing a version is recommended: `"https://deno.land/x/birdie@v0.6.0/pattern_matching/mod.ts";`

Importing specific components from a module is also possible, but you must always import the WebAssembly initialization function `initWasm` from the module:

```typescript
import { initWasm, shiftAnd } from "https://deno.land/x/birdie/pattern_matching/mod.ts";
```

## Initializing the WebAssembly

`Birdie` makes use of WebAssembly (WASM) modules. To load and instantiate these modules an initialization function needs to be called, which is exported as `initWasm` by default. It returns a Promise, so it needs to be `await`ed:

```typescript
import * as patternMatching from "https://deno.land/x/birdie/pattern_matching/mod.ts";

await patternMatching.initWasm();
```

After initialization, you can start using any of the exported WASM functions from Deno:

```typescript
import * as patternMatching from "https://deno.land/x/birdie/pattern_matching/mod.ts";

await patternMatching.initWasm();

const pattern = "AAAA";
const text = "ACGGCTAGAAAAGGCTAG";

const pos = patternMatching.shiftAnd(pattern, text);
```

At the moment of writing, Deno does not cache WASM modules locally along with JS/TS modules when `deno cache` or `deno run` is called. This means that Birdie's WASM modules are currently fetched from their location on the Web, which requires you to allow net access to e.g. `deno.land`:

```
deno run --allow-net=deno.land mod.ts
```

If you want to use multiple of Birdie's modules in a single file, you just have to create an alias for at least one of the `import`ed initialization functions, though for clarity it is recommended to alias all in these kinds of scenarios:

```typescript
import { initWasm as initPatternMatching, shiftAnd }  from "https://deno.land/x/birdie/pattern_matching/mod.ts";
import { initWasm as initDistance, myers }  from "https://deno.land/x/birdie/distance/mod.ts";

await initPatternMatching();

await initDistance();
```

## Modules

TBD

### distance

Calculate Levenshtein edit distance using one of several algorithms, including Wagner-Fischer and Myers' Algorithm.

TBD

### pattern_matching

TBD

### sequence

Perform DNA sequence analysis, such as calculating Guanine-Cytosine ratio.

TBD