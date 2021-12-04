import * as distance from "./distance/mod.ts";

import { assertEquals } from "./dev_deps.ts";

await distance.initWasm();

Deno.test("edit distance should meet expectation", () => {
  const hammingDist = distance.levenshtein("foo", "moo");
  assertEquals(hammingDist, 1);
});

Deno.test("edit distance results should be equal between Myers Algorithm and Wagner-Fischer algorithm", () => {
  const myersDistance = distance.myers("kitten", "sitting");

  const wfDistance = distance.levenshtein("kitten", "sitting");
  assertEquals(myersDistance, wfDistance);
});
