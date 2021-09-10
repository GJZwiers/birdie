import initDna, { transcribe } from "./dna/pkg/dna.js";
import initStringDiff, {
  levenshtein,
  myers,
} from "./levenshtein/pkg/wagner_fischer.js";

function isFileURL(url: URL): boolean {
  return url.protocol === "file:";
}

async function getWebAssembly(
  path: string,
  // deno-lint-ignore no-explicit-any
  initFn: { (input: any): Promise<WebAssembly.Exports> },
) {
  const wasmUrl = new URL(path, import.meta.url);

  if (isFileURL(wasmUrl)) {
    await initFn(Deno.readFile(wasmUrl));
  } else {
    await initFn(fetch(
      wasmUrl.href,
      {
        headers: {
          "content-type": "application/wasm",
        },
      },
    ));
  }
}

getWebAssembly("./dna/pkg/dna_bg.wasm", initDna);
getWebAssembly("./levenshtein/pkg/wagner_fischer_bg.wasm", initStringDiff);

export { levenshtein, myers, transcribe };
