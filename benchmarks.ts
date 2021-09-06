import { transcribe } from "./mods/mod.ts";

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

function makeRandomDNAString(length: number) {
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

const s = makeRandomDNAString(1000000);

const t0 = performance.now();

transcribe(s);

const t1 = performance.now();

const tt0 = performance.now();

javascribe(s);

const tt1 = performance.now();

console.log(t1 - t0);

console.log(tt1 - tt0);
