import { makeRandomDNAString } from "./makeRandomDNAString.ts";
import { distance as myersJS } from "https://deno.land/x/fastest_levenshtein@1.0.10/mod.ts";
import init, { myers, myers_long } from "../distance/pkg/distance.js";

await init();

const ax = makeRandomDNAString(32);
const bx = makeRandomDNAString(32);

const a = makeRandomDNAString(1024);
const b = makeRandomDNAString(1024);

Deno.bench({
  name: "test bench JavaScript",
  fn: () => {
    myersJS(ax, bx);
  },
});

Deno.bench({
  name: "Myers 32bp string JavaScript",
  fn: () => {
    myersJS(ax, bx);
  },
});

Deno.bench({
  name: "Myers 32bp string WebAssembly",
  fn: () => {
    myers(ax, bx, false);
  },
});

Deno.bench({
  name: "Myers 1024bp string JavaScript",
  fn: () => {
    myersJS(a, b);
  },
});

Deno.bench({
  name: "Myers 1024bp string WebAssembly",
  fn: () => {
    myers_long(a, b, false);
  },
});
