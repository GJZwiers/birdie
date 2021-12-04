import * as pm from "./pattern_matching/mod.ts";
import { assertEquals } from "./dev_deps.ts";

await pm.initWasm();

Deno.test("shiftAnd algo matches expected result", () => {
  const n = pm.shiftAnd("kit", "kitten");
  assertEquals(n, 0);

  const m = pm.shiftAnd("ten", "kitten");
  assertEquals(m, 3);
});
