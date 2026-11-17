import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import { readFileSync, readdirSync } from "node:fs";

interface Section {
  title: string;
  items: string[];
}

// RELEASE_NOTES.md is written for each release anyway, so the site takes the
// version and what is new from it instead of keeping its own copy.
function releaseNotes(): { version: string; sections: Section[] } {
  const md = readFileSync("../RELEASE_NOTES.md", "utf8");
  const version = md.match(/^# BMEditor (\S+)/m)?.[1] ?? "";
  const sections: Section[] = [];
  let open = false;
  for (const line of md.split(/\r?\n/)) {
    const head = line.match(/^## (.+)/);
    const item = line.match(/^- (.+)/);
    const cur = sections[sections.length - 1];
    if (head) {
      sections.push({ title: head[1].trim(), items: [] });
      open = false;
    } else if (cur && item) {
      cur.items.push(item[1].trim());
      open = true;
    } else if (cur && open && /^\s+\S/.test(line)) {
      cur.items[cur.items.length - 1] += " " + line.trim();
    } else if (!line.trim()) {
      open = false;
    }
  }
  return { version, sections };
}

function release(): Plugin {
  const id = "virtual:release";
  return {
    name: "bmeditor-release",
    resolveId: (s) => (s === id ? "\0" + id : null),
    // The screenshots are taken by hand, so a feature only shows the ones that exist.
    load: (s) => {
      if (s !== "\0" + id) return null;
      const images = readdirSync("../docs/img").filter((f) => f.endsWith(".png")).map((f) => `img/${f}`);
      return `export default ${JSON.stringify({ ...releaseNotes(), images })}`;
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
