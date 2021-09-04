# Birdie

`birdie` is a module for Deno that aims to evolve existing JavaScript utilities to WebAssembly-powered variants for increased performance. Currently it's in very early stages of development.

## Importing

```ts
import * as birdie from "https://deno.land/x/birdie/mod.ts";

import { transcribe } from "https://deno.land/x/birdie/mod.ts";
```

## Usage

At the moment there is just a single export, `transcribe`, which performs DNA to RNA transcription. It uses WebAssembly and performs ~4x faster than its pure JavaScript counterpart when benchmarked on a 1 million character string.

## Contributing

Any contributions are welcome and much appreciated!
