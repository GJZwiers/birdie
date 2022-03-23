import init, { transcribe as transcribeWASM } from "../dna/pkg/dna.js";
import { makeRandomDNAString } from "./makeRandomDNAString.ts";

await init();

function transcribe(str: string): string {
  let transcript = "";

  for (const char of str) {
    if (char == "A") {
      transcript += "U";
    } else if (char == "T") {
      transcript += "A";
    } else if (char == "C") {
      transcript += "G";
    } else if (char == "G") {
      transcript += "C";
    }
  }

  return transcript;
}

const bases = makeRandomDNAString(10000);

Deno.bench({
  name: "transcribe 10k DNA string JavaScript",
  fn() {
    transcribe(bases);
  },
});

Deno.bench({
  name: "transcribe 10k DNA string WebAssembly",
  fn() {
    transcribeWASM(bases);
  },
});
