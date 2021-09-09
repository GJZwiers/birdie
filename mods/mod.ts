import initDna, { transcribe } from "./dna/pkg/dna.js";
import initStringDiff, {
  levenshtein,
  myers,
} from "./levenshtein/pkg/wagner_fischer.js";

const dna = await fetch(
  new URL("./dna/pkg/dna_bg.wasm", import.meta.url).href,
  {
    headers: {
      "content-type": "application/wasm",
    },
  },
);

await initDna(dna);
// await initDna(Deno.readFile(new URL("./dna/pkg/dna_bg.wasm", import.meta.url)))

const stringDiff = await fetch(
  new URL("./levenshtein/pkg/wagner_fischer_bg.wasm", import.meta.url).href,
  {
    headers: {
      "content-type": "application/wasm",
    },
  },
);

await initStringDiff(stringDiff);
//await initStringDiff(Deno.readFile(new URL("./levenshtein/pkg/wagner_fischer_bg.wasm", import.meta.url)));

export { levenshtein, myers, transcribe };
