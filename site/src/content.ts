// The site introduces BMEditor; the guides in docs/ explain it, and the
// version and what is new come from RELEASE_NOTES.md at build time.
import release from "virtual:release";

export const repo = "https://github.com/Cn8001/BMEditor-Releases";
export const extRepo = "https://github.com/Cn8001/BMEditorExtensions";
export const version = release.version;
export const notes = release.sections;
export const guide = (anchor = "") => `${repo}/blob/master/docs/guide.md${anchor ? `#${anchor}` : ""}`;
export const download = (file: string) => `${repo}/releases/latest/download/${file}`;

export interface Shot {
  src: string;
  label: string;
  alt: string;
}

export interface Feature {
  id: string;
  title: string;
  body: string[];
  keys?: [string, string][];
  shots?: Shot[];
  link: string;
}

export interface Group {
  title: string;
  features: Feature[];
}

export const groups: Group[] = [
  {
    title: "Write",
    features: [
      {
        id: "go",
        title: "Go, ready to go",
        link: guide("writing-go"),
        body: [
          "gopls starts as soon as you open a .go file: completion that writes the import for you, hover docs, errors as you type, rename across the project and quick fixes.",
          "Saving runs goimports and gofmt. Run, build, test and vet are a key away, with run test and debug test links over every test function.",
        ],
        keys: [["Ctrl+F5", "Run"], ["Ctrl+Shift+B", "Build"], ["F2", "Rename"], ["Ctrl+.", "Quick fix"]],
        shots: [{ src: "img/editor.png", label: "Editor", alt: "BMEditor with a Go file open, the Explorer and the status bar" }],
      },
      {
        id: "claude",
        title: "Claude Code",
        link: guide("claude-code"),
        body: [
          "Claude Code sits in the side panel and starts in your project folder. When it edits a file you have open, every change comes in marked, and you keep or reject each one like a review.",
          "Select code and ask about it, fix an error from the light bulb, or ask about a debugger stop. If you allow it, Claude can also use the debugger and Docker while you watch.",
        ],
        keys: [["Ctrl+Shift+C", "Open Claude Code"], ["Ctrl+Alt+K", "Ask about the selection"]],
        shots: [{ src: "img/claude.png", label: "Review", alt: "Claude Code in the side panel with a proposed change shown as a review" }],
      },
      {
        id: "previews",
        title: "Live previews",
        link: guide("previews"),
        body: [
          "Markdown, HTML pages and OpenAPI or Swagger specs rendered beside the source or instead of it, updating as you type.",
          "HTML runs in a sandbox that keeps its scripts away from the editor; specs are drawn by Swagger UI.",
        ],
        keys: [["Ctrl+Shift+V", "Toggle the preview"]],
        shots: [{ src: "img/preview.png", label: "Preview", alt: "A Markdown or OpenAPI file next to its live preview" }],
      },
    ],
  },
  {
    title: "Run and fix",
    features: [
      {
        id: "debug",
        title: "Debugger",
        link: guide("debugging"),
        body: [
          "F5 starts Delve for Go. Breakpoints can have a condition or log a message instead of stopping, and when the program stops, each variable's value is written at the end of its line.",
          "Other debuggers plug in too: an extension can bring gdb, and Project Settings can attach to something already running, like QEMU.",
        ],
        keys: [["F5", "Debug"], ["F9", "Breakpoint"], ["F10", "Step over"], ["F11", "Step into"]],
        shots: [{ src: "img/debug.png", label: "Debugging", alt: "A Go program stopped at a breakpoint with variable values written in the code" }],
      },
      {
        id: "docker",
        title: "Docker",
        link: guide("docker"),
        body: [
          "Containers grouped by their compose project, next to your code. Start, stop and remove them, follow their logs, open a shell inside one, and bring any compose file up or down.",
        ],
        keys: [["Ctrl+Shift+D", "Open Docker"]],
        shots: [{ src: "img/docker.png", label: "Docker", alt: "The Docker view with containers grouped by compose project" }],
      },
      {
        id: "terminal",
        title: "Terminal and Make",
        link: guide("the-terminal"),
        body: [
          "A real terminal running your own shell, with copy, paste and clickable links, and as many as you like.",
          "If the project has a Makefile, a Make menu lists its targets, with the descriptions from their comments.",
        ],
        keys: [["Ctrl+`", "Terminal"], ["Ctrl+J", "Bottom panel"]],
        shots: [{ src: "img/terminal.png", label: "Terminal", alt: "The integrated terminal running go test" }],
      },
      {
        id: "git",
        title: "Git, to look at",
        link: guide("git-the-light-way"),
        body: [
          "Changed lines in the gutter, diffs, a list of what changed and merge conflicts you resolve right in the file.",
          "Committing is left to your git client, so nothing happens to your history behind your back.",
        ],
        shots: [{ src: "img/git.png", label: "Changes", alt: "Changed lines and a diff of a modified file" }],
      },
    ],
  },
  {
    title: "Anywhere",
    features: [
      {
        id: "remote",
        title: "Other machines",
        link: `${repo}/blob/master/docs/remote.md`,
        body: [
          "Open a folder in WSL, on a server or VM over SSH, on another Windows computer or inside a Docker container, from the same window.",
          "Terminals, Go, git, the debugger and Claude Code run on the other machine, next to the files. You install nothing there yourself.",
        ],
        shots: [{ src: "img/remote.png", label: "Connect", alt: "The dialog listing WSL distros, SSH hosts and running containers to connect to" }],
      },
      {
        id: "palette",
        title: "Feels like home",
        link: guide("keys-worth-learning"),
        body: [
          "The layout and keyboard shortcuts follow VS Code. The command palette has every command with its shortcut, and BMEditor updates itself.",
        ],
        keys: [["Ctrl+Shift+P", "Command palette"], ["Ctrl+P", "Go to file"], ["Ctrl+Shift+X", "Extensions"]],
        shots: [{ src: "img/palette.png", label: "Palette", alt: "The command palette open over the editor, with commands and their shortcuts" }],
      },
    ],
  },
];

for (const f of groups.flatMap((g) => g.features)) f.shots = f.shots?.filter((s) => release.images.includes(s.src));

export const allFeatures = groups.flatMap((g) => g.features);

export interface Extension {
  name: string;
  title: string;
  text: string;
  tags: string[];
}

export const extensions: Extension[] = [
  { name: "web", title: "Web", tags: ["TypeScript", "Vue", "CSS"], text: "JavaScript, TypeScript, CSS, SCSS, Less, HTML, Svelte, Vue and SVG, each with its language server, and an image viewer panel." },
  { name: "csharp", title: "C# for Unity", tags: ["C#", "Unity"], text: "A Solution Explorer, the assembly graph, an Inspector for .asmdef and package.json, Unity's compile errors in Problems, .meta and GUID tools, and Unity message completion." },
  { name: "autocomplete", title: "Autocomplete", tags: ["Local model"], text: "Inline suggestions in every language from a small code model on your machine: llama.cpp with Qwen2.5-Coder, or Ollama. Nothing leaves the machine." },
  { name: "powershell", title: "PowerShell", tags: ["PowerShell", "cmd"], text: "PowerShell Editor Services for completion, PSScriptAnalyzer, formatting and debugging, plus a language server for .bat and .cmd files and F5 to run them." },
  { name: "vim", title: "Vim", tags: ["Keys"], text: "Vim key bindings in every editor tab." },
  { name: "hex", title: "Hex Editor", tags: ["Binary"], text: "Files that are not text in hex: offsets, sixteen bytes a row, the bytes as characters, what a selection reads as, and editing in place." },
  { name: "ascdii", title: "ASCDII Engine", tags: ["Lua", "Games"], text: "Games made with the ASCDII Engine: the project's assets, Lua with the engine's API, Project Settings, a Console, and Play in the game's window or the engine's editor." },
];

export const installUrl = (name: string) => `${extRepo}/releases/download/${name}/latest/${name}.zip`;
