import { writeAll } from "./deps.ts";
import { LANGUAGES } from "./src/languages.ts";

const GOOGLE_TTS_URL = "http://translate.google.com/translate_tts";
const headers = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/536.26.17 (KHTML like Gecko) Version/6.0.2 Safari/536.26.17",
};

function tokenize(text: string) {
  return text.split(/¡|!|\(|\)|\[|\]|\¿|\?|\.|\,|\;|\:|\—|\«|\»|\n/).filter(
    (p) => p,
  );
}

/**
 * The options for TTS
 */
export interface SaveOptions {
  language: keyof typeof LANGUAGES;
}

/**
 * Convert text to speech and save to a .wav file
 * @example
 * ```typescript
 * await save("./demo.wav", "hello text to speech", { language: "en-us" });
 * ```
 */
export async function save(
  path: string,
  text: string,
  options?: Partial<SaveOptions>,
) {
  const config: SaveOptions = {
    ...{
      language: "en-us",
    },
    ...options,
  };
  const textParts = tokenize(text);

  try {
    await Deno.remove(path);
  } catch {
    // swallow error
  }

  const file = await Deno.open(path, {
    create: true,
    append: true,
    write: true,
  });

  for (const [i, part] of Object.entries(textParts)) {
    const encodedText = encodeURIComponent(part);
    const args =
      `?ie=UTF-8&tl=${config.language}&q=${encodedText}&total=${textParts.length}&idx=${i}&client=tw-ob&textlen=${encodedText.length}`;
    const url = GOOGLE_TTS_URL + args;

    const req = await fetch(url, {
      headers,
    });
    const buffer = await req.arrayBuffer();
    const data = new Uint8Array(buffer);

    await writeAll(file, data);
  }

  file.close();
}
