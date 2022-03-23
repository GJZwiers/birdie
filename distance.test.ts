import * as distance from "./distance/mod.ts";

import { assertEquals } from "./dev_deps.ts";

await distance.initWasm();

Deno.test("edit distance should meet expectation", () => {
  const hammingDist = distance.levenshtein("foo", "moo");
  assertEquals(hammingDist, 1);
});

Deno.test("edit distance results should be equal between Myers and Myers long", () => {
  const myersDistance = distance.myers("kitten", "sitting", false);

  const wfDistance = distance.myers_long("kitten", "sitting", false);
  assertEquals(myersDistance, wfDistance);
});
