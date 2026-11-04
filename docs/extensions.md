# Writing BMEditor extensions

An extension is a folder with a `bmext.json` file at its root. A lot can be
done with that file alone: a new language with highlighting and a language
server, a debugger, settings, project templates. When you need more, you add
a backend program, a frontend script, or both.

This guide starts small and adds one piece at a time.

## Your first extension

Make a folder called `lua` with this `bmext.json`:

```json
{
  "name": "lua",
  "displayName": "Lua",
  "version": "0.1.0",
  "description": "Lua files, with lua-language-server.",
  "languages": [
    {
      "id": "lua",
      "label": "Lua",
      "extensions": [".lua"],
      "lineComment": "--",
      "blockComment": ["--[[", "]]"],
      "grammar": "lua",
      "server": { "command": ["lua-language-server"], "install": "brew install lua-language-server" }
    }
  ]
}
```

Install it: open Extensions (Ctrl+Shift+X), click the folder button next to
the install box and pick the `lua` folder. Reload the window when asked.
Open a `.lua` file and you have highlighting, comments with Ctrl+/, and
everything the language server offers: completion, hover, go to definition,
usages, rename, diagnostics, quick fixes and inlay hints.

While you work on it, pick the folder again or press Update in the list to
reinstall, then reload.

### Grammars

`grammar` is one the editor carries: c, cpp, csharp, java, kotlin, scala,
dart, objectivec, rust, python, javascript, typescript, lua, ruby, swift,
cmake, shell, yaml, toml, sql. For another language, leave it out and bring
the highlighting from your frontend script (see `languages[].support` below).

### Language servers

`server.command` is a program on PATH, or one you ship inside the
extension, written `./bin/name`. For a shipped one the editor looks for
`bin/name-GOOS-GOARCH` first (with `.exe` on Windows), then `bin/name`, so
one extension can carry a build for each system:

```
bin/mylsp-windows-amd64.exe
bin/mylsp-linux-amd64
bin/mylsp-darwin-arm64
```

`server.install` is shown to the user when the program is missing.
`server.options` is sent as the server's `initializationOptions`.

## A debugger

Any program that speaks the Debug Adapter Protocol works. This is how the C
extension adds gdb:

```json
"debuggers": [
  {
    "id": "gdb",
    "label": "GDB",
    "languages": ["c"],
    "command": ["gdb", "-i", "dap"],
    "install": "gdb 14 or newer",
    "prepare": ["cc", "-g", "-O0", "-o", "${fileDirname}/${fileBasenameNoExtension}", "${file}"],
    "cleanup": ["${fileDirname}/${fileBasenameNoExtension}"],
    "launch": { "program": "${fileDirname}/${fileBasenameNoExtension}", "cwd": "${fileDirname}" }
  }
]
```

- F5 in a file of one of `languages` starts `command`.
- `prepare` runs before each session, to build what is debugged. If it
  fails, its output is in the Debug Console and the session does not start.
- `cleanup` lists files removed when the session ends. Only a file that
  `prepare` created is removed; one that was there before stays.
- `launch` is the launch request's arguments, whatever your adapter wants.
  The project's run arguments and environment are added to it.
- `transport` is `stdio` (the default) or `tcp`. With `tcp`, write `{port}`
  in `command` and the editor fills in a free port and connects there.

In `prepare`, `cleanup` and `launch` these are filled in:

| Name | Value |
|---|---|
| `${workspaceFolder}` | the open folder |
| `${file}` | the file F5 was pressed in |
| `${fileDirname}` | its folder |
| `${fileBasename}` | its name |
| `${fileBasenameNoExtension}` | its name without the extension |

Breakpoints, conditions, stepping, the call stack, variables, values in the
code and the Debug Console then work as they do for Go.

## Settings

```json
"settings": [
  { "key": "apiKey", "label": "API key", "type": "secret" },
  { "key": "baseUrl", "label": "Base URL", "scope": "both", "default": "http://localhost:8090" },
  { "key": "verbose", "label": "Verbose logs", "type": "boolean" }
]
```

- `type` is `string` (the default), `secret`, `boolean` or `path`.
- `scope` is `global` (Settings, Ctrl+,), `project` (Project Settings) or
  `both`, where the project's value wins.
- A secret never reaches the window: your backend gets it, your frontend
  script only learns whether it is set.

## Project templates

```json
"projectKinds": [
  {
    "kind": "lua",
    "label": "Lua",
    "title": "Lua script",
    "text": "A main.lua to start from.",
    "folder": "hello",
    "detect": ["*.lua"],
    "template": "templates/lua",
    "open": ["main.lua"]
  }
]
```

New Project then offers "Lua". `template` is a folder in your extension,
copied into the new project; `{{name}}` in any file becomes the project's
name. `open` is what opens once it is made, and `detect` tells the editor
an existing folder is this kind.

## A backend program

A backend is a program the editor starts the first time your extension
needs it. Declare it:

```json
"backend": { "command": "bin/lua-host" }
```

It is found like a shipped language server (`bin/lua-host-windows-amd64.exe`
and so on).

### The protocol

The editor and the backend speak JSON-RPC 2.0 over the backend's stdin and
stdout, framed as language servers frame it: a `Content-Length` header, a
blank line, then the JSON.

```
Content-Length: 58\r\n
\r\n
{"jsonrpc":"2.0","id":1,"method":"compile","params":{...}}
```

What the editor sends:

| Message | When | What to do |
|---|---|---|
| `initialize` (request) | first | keep its params, answer `{}` |
| `context` (request or notification) | the folder, the project or the settings changed | keep its params, answer `{}` if it has an id |
| your own methods (requests) | your frontend script calls them | answer with a result or an error |
| `$/cancelRequest` (notification) | the user gave up on a request | stop that request, `params.id` names it |
| `shutdown` (request), `exit` (notification) | the editor closes | answer, then exit |

The params of `initialize` and `context` look like this:

```json
{
  "folder": "/home/me/proj",
  "project": { "dir": "/home/me/proj", "kind": "lua", "settings": { "baseUrl": "http://localhost:9000" } },
  "settings": { "baseUrl": "http://localhost:8090", "apiKey": "..." }
}
```

`project.settings` are your settings for this project and `settings` the
global ones; secrets are included. A project value wins over a global one.

An error is a JSON-RPC error whose `data` the editor shows: `code` as a
short tag, `message`, and optionally `line` and `col` (1-based) to point at
a place in the file the request was about.

```json
{"jsonrpc":"2.0","id":1,"error":{"code":-32000,"message":"unknown column","data":{"code":"BAD_QUERY","message":"unknown column","line":3,"col":7}}}
```

To push something to your frontend, send a notification (a message with a
`method` and no `id`); the script hears it with `api.on(method, ...)`.

Requests can arrive while others run, so answer them in any order.

### A backend in Go

With the `bmext/host` package, the protocol is handled for you:

```go
package main

import (
	"context"
	"encoding/json"

	"github.com/Cn8001/BMEditorExtensions/bmext/host"
)

func main() {
	s := host.New()
	s.Handle("compile", func(ctx context.Context, p json.RawMessage) (any, error) {
		var req struct{ Source string }
		if err := json.Unmarshal(p, &req); err != nil {
			return nil, err
		}
		base := s.Context().Setting("baseUrl") // the project's, else the global one
		return map[string]string{"url": base}, nil
		// or: return nil, &host.Error{Code: "BAD_QUERY", Message: "...", Line: 3, Col: 7}
	})
	host.Run(s)
}
```

Any other language works the same way: read frames from stdin, write them
to stdout, and keep logs on stderr.

## A frontend script

The script runs in the editor's window and can add panels, commands, keys
and a toolbar group, and talk to your backend.

```json
"frontend": { "script": "frontend/index.js", "style": "frontend/style.css" }
```

The script is a classic script (an IIFE, not a module) whose default export
the editor calls once with its API:

```ts
import MyPanel from './MyPanel.vue'

export default function activate(api) {
  api.register({
    panels: [{ id: 'lua-output', label: 'Lua', component: MyPanel }],
    commands: [
      {
        id: 'lua-run',
        label: 'Lua: Run File',
        kbd: 'Ctrl+Alt+R',
        run: async () => {
          const tab = api.ui.activeTab()
          if (!tab) return
          try {
            const out = await api.call('run', { path: tab.path, text: api.session.textOf(tab.id) })
            api.ui.toast('info', 'Ran', String(out))
          } catch (err) {
            api.ui.toastFailure('Run failed', api.ui.failureOf(err))
          }
        },
      },
    ],
  })
}
```

### What the API offers

| | |
|---|---|
| `api.register({...})` | `panels`, `commands`, `toolbar`, `keydown`, `shortcuts`, `languages`, `reset` |
| `api.call(method, params)` | calls your backend; the promise has `cancel()` |
| `api.on(method, fn)` | hears your backend's notifications; returns an unsubscribe |
| `api.settings()` | your settings' values, and which secrets are set |
| `api.session` | `tab`, `textOf`, `stateOf`, `dispatchTo`, `activate`, `goto`, `reconfigureLanguage` |
| `api.ide` | `folder`, `activeId`, `tabs` |
| `api.ui` | `toast`, `toastFailure`, `failureOf`, `setProblems`, `showPanel`, `activeTab`, `openSettings` |
| `api.paths.relativeTo(root, path)` | |
| `api.components.CodeView` | a read-only code view: props `text`, `language` (`sql`, `json`, `plain`) |
| `api.theme.palette` | the editor's colours, to match them |
| `api.base` | the URL prefix of your extension's own files, for images |

In `register`:

- `panels` appear in the bottom panel; `busy()` shows a spinner on the tab.
- `toolbar` is a Vue component in the top bar. It gets a `compact` prop from
  0 to 3 as the window narrows: drop text first, keep the buttons.
- `languages` adds to a language of your manifest: `support(tab)` returns a
  CodeMirror extension (highlighting, completion), and `changed` and
  `closed` are called for its tabs.
- `setProblems(key, problems)` puts your diagnostics in Problems and the
  Explorer.
- `reset` is called when the project closes or another one opens.

### Building it

Vue and CodeMirror are not bundled into your script; it uses the editor's
own copies, so a Vue component or a CodeMirror extension of yours is the
editor's kind. Build with Vite like this:

```js
// vite.config.mjs
import vue from '@vitejs/plugin-vue'

const shared = {
  vue: 'bmeditor.shared.vue',
  '@codemirror/state': 'bmeditor.shared.cmState',
  '@codemirror/view': 'bmeditor.shared.cmView',
  '@codemirror/language': 'bmeditor.shared.cmLanguage',
  '@codemirror/lint': 'bmeditor.shared.cmLint',
  '@codemirror/autocomplete': 'bmeditor.shared.cmAutocomplete',
  '@codemirror/commands': 'bmeditor.shared.cmCommands',
  '@lezer/highlight': 'bmeditor.shared.lezerHighlight',
}

export default {
  plugins: [vue()],
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    outDir: 'dist/frontend',
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: { entry: 'frontend/index.ts', formats: ['iife'], name: 'bmext_lua', fileName: () => 'index.js' },
    rollupOptions: {
      external: Object.keys(shared),
      output: { globals: shared, exports: 'named', assetFileNames: 'style[extname]' },
    },
  },
}
```

`name` must be `bmext_` and your extension's name, with dashes as
underscores. Keep `vue` and the `@codemirror/*` packages in devDependencies
for their types.

## Packaging and sharing

People install an extension from:

| Source | Example |
|---|---|
| a git repository, https or ssh, any server | `github.com/me/bmext-lua`, `git@gitlab.com:me/bmext-lua.git` |
| a tag or branch | `github.com/me/bmext-lua#v0.2.0` |
| a folder | picked with the folder button |
| a .zip, a file or a URL | picked with the .zip button, or `https://example.org/lua-0.2.0.zip` |

A git repository that needs building says how:

```json
"build": { "command": ["make", "dist"], "output": "dist" }
```

After cloning, the editor runs `command` and installs the `output` folder.
Without `build`, the repository itself is the extension. For a .zip, put
`bmext.json` at its root or in a single top folder.

Each install remembers its source, so Update fetches the same one again.
Installed extensions live in `%AppData%\bmeditor\extensions` on Windows and
`~/.config/bmeditor/extensions` on Linux.

## Rules

- `name` is lower-case letters, digits and dashes; it is the install
  folder's name and must be unique.
- Every path in the manifest stays inside the extension; one that points
  outside it is refused.
- Your extension runs with the user's rights. Tell people what it does, and
  keep their secrets in `secret` settings, never in files.

## The whole manifest

| Field | |
|---|---|
| `name`, `displayName`, `version`, `description`, `icon` | who it is; `icon` is an SVG or PNG in the extension |
| `languages[]` | `id`, `label`, `extensions`, `fileNames`, `icon`, `codicon`, `color`, `lineComment`, `blockComment`, `grammar`, `server` |
| `languages[].server` | `command`, `install`, `options` |
| `debuggers[]` | `id`, `label`, `languages`, `command`, `transport`, `install`, `prepare`, `cleanup`, `launch` |
| `settings[]` | `key`, `label`, `type`, `scope`, `default`, `description` |
| `projectKinds[]` | `kind`, `label`, `title`, `text`, `folder`, `detect`, `template`, `open`, `settings` |
| `frontend` | `script`, `style` |
| `backend` | `command` |
| `build` | `command`, `output` |
