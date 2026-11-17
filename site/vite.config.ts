import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import { readFileSync, readdirSync } from "node:fs";

// RELEASE_NOTES.md is written for each release anyway, so the site takes the
// version from its heading instead of keeping its own.
function version(): string {
  return readFileSync("../RELEASE_NOTES.md", "utf8").match(/^# BMEditor (\S+)/m)?.[1] ?? "";
}

// The Extension Manager reads this catalog; publishing an extension updates
// it, so the site shows the same list instead of keeping its own.
const catalogURL = "https://github.com/Cn8001/BMEditorExtensions/releases/download/catalog/catalog.json";

async function catalog(): Promise<unknown[]> {
  const res = await fetch(catalogURL);
  if (!res.ok) throw new Error(`extension catalog: ${res.status} ${res.statusText}`);
  return ((await res.json()) as { extensions: unknown[] }).extensions;
}

function release(): Plugin {
  const id = "virtual:release";
  return {
    name: "bmeditor-release",
    resolveId: (s) => (s === id ? "\0" + id : null),
    // The screenshots are taken by hand, so a feature only shows the ones that exist.
    load: async (s) => {
      if (s !== "\0" + id) return null;
      const images = readdirSync("../docs/img").filter((f) => f.endsWith(".png")).map((f) => `img/${f}`);
      return `export default ${JSON.stringify({ version: version(), images, extensions: await catalog() })}`;
    },
  };
}

export default defineConfig({
  // GitHub Pages serves docs/ under /<repo>/; relative URLs work there and from
  // a local file alike.
  base: "./",
  plugins: [vue(), release()],
  // docs/ also holds the guides and the site's images, which are source files:
  // the site links to them, and `make site` only replaces its index and assets.
  publicDir: false,
  build: { outDir: "../docs", emptyOutDir: false },
});
