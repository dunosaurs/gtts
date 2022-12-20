import { assert } from "./deps.ts";
import { save } from "./mod.ts";

async function exists(path: string) {
  try {
    await Deno.lstat(path);
    return true;
  } catch {
    return false;
  }
}

Deno.test("saving short text works", async () => {
  await save("./test.wav", "Testing a basic string");
  assert(await exists("./test.wav"));
});

Deno.test("saving long text also works", async () => {
  await save(
    "./long.wav",
    "Testing a very long string. One with multiple periods and, maybe even some commas. The grammar is completely off, but that is part of the fun of the string experience. They will never know how this is set up. No one will read the tests for this module. I hope not at least.",
  );
  assert(await exists("./long.wav"));
});
