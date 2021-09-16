function isFileURL(url: URL): boolean {
  return url.protocol === "file:";
}

export async function getWebAssembly(
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

export { default as initWasm, hamming, levenshtein, myers } from "./levenshtein/pkg/levenshtein.js";
