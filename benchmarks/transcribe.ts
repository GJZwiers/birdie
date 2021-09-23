import init, { transcribe } from "../mods/dna/pkg/dna.js";

await init(Deno.readFile("../mods/dna/pkg/dna_bg.wasm"));

export function makeRandomDNAString(length: number): string {
  let result = "";
  const characters = "ACGT";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(
      Math.random() * charactersLength,
    ));
  }
  return result;
}

function javascribe(s: string): string {
  let transcript = "";

  for (const c of s) {
    if (c == "A") {
      transcript += "U";
    } else if (c == "T") {
      transcript += "A";
    } else if (c == "C") {
      transcript += "G";
    } else if (c == "G") {
      transcript += "C";
    }
  }

  return transcript;
}

const a = makeRandomDNAString(10000);

const t0 = performance.now();
transcribe(a);
const t1 = performance.now();

const tt0 = performance.now();
javascribe(a);
const tt1 = performance.now();

console.log("wasm: " + (t1 - t0) + "ms");
console.log("js: " + (tt1 - tt0) + "ms");
