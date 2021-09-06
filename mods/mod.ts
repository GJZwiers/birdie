import init, { transcribe } from "./dna/pkg/dna.js";

const wasm = await Deno.readFile(
  new URL("./dna/pkg/dna_bg.wasm", import.meta.url).href,
);

/** Wrapping the file in a Response object triggers loading with the more efficient `instantiateStreaming`. */
await init(
  new Response(
    wasm,
    {
      headers: {
        "content-type": "application/wasm",
      },
    },
  ),
);

export { transcribe };
