# deno-gtts

A simple text-to-speech library using the google translate api. It is designed
to be used either as a deno library or as a cli tool.

## Usage

```typescript
import { save } from "https://deno.land/x/gtts/mod.ts";

await save("./demo.wav", "This sentence is being read by a machine");
```

OR

```bash
deno install --allow-write --allow-net -n gtts https://deno.land/x/gtts/cli.ts
gtts "some text to speak"
gtts "some text to speak to a destination" --path="./test.wav"
gtts "text but in a french accent" --lang=fr
gtts "text at a destination but in a french accent" --path="./french.wav" --lang=fr
```

Very loosely inspired by
[this nightmare of a library](https://github.com/lino-levan/better-node-gtts)
