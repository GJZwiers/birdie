import init, { transcribe } from "./dna/pkg/dna.js";

// const wasm = await fetch(
//   new URL("./dna/pkg/dna_bg.wasm", import.meta.url).href,
//   {
//     headers: {
//       "content-type": "application/wasm",
//     },
//   },
// );

await init();

export { transcribe };
