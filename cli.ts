import { parse } from "./deps.ts";
import { save } from "./mod.ts";
import { LANGUAGES } from "./src/languages.ts";

const args = parse(Deno.args, {
  string: ["lang", "path"],
  alias: {
    "L": "lang",
    "P": "path",
  },
});

const text = args._.join(" ");
const language = args.lang as keyof typeof LANGUAGES ?? "en-us";
const path = args.path ??
  "./" + text.slice(0, 10).replace(/([^a-z0-9]+)/gi, "-") + ".wav";

if (!Object.hasOwn(LANGUAGES, language)) {
  throw `Invalid language: ${language}`;
}

await save(path, text, {
  language,
});
