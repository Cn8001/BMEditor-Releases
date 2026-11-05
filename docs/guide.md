# The BMEditor guide

BMEditor is a desktop IDE that any language can plug into through
extensions, with Go built in, batteries included. If you have used VS Code,
most of it will feel familiar within a few minutes: the same keys, the same
panels in the same places. What it adds is a debugger that is set up the
moment you open a project, Claude Code and Docker next to your code, and a
way to bring in other languages without a marketplace.

This guide walks through it in the order you will probably meet things.
Skim the headings and jump to what you need.

## Getting it running

Download `bmeditor-windows-amd64.exe` from the
[Releases](https://github.com/Cn8001/BMEditor-Releases/releases) page and run it.
There is no installer; the exe is the whole program, so you can rename it
and keep it wherever you like.

BMEditor needs WebView2, which Windows 11 already has. On Windows 10 it is
usually there too; if the window stays blank, install the WebView2 Runtime
from Microsoft.

For Go work you need Go itself on your PATH, and git if you want to see
changes. The language server (gopls) and the debugger (dlv) are installed
with `go install`; the editor offers to install dlv the first time you
press F5.

## Your first project

The start page has three ways in:

- **New Project** (Ctrl+Shift+N) makes a folder for you: a Go module with a
  `main.go`, an empty project, or a kind an extension adds. It can also clone
  a git repository as the new project's folder.
- **Open Project** opens a `.bmproj` file.
- **Open Folder** (Ctrl+O) opens any folder. If it has no project file yet,
  one is made for it.

A project is just a `<name>.bmproj` file in the folder's root. It holds the
project's name, its kind and its settings, and it is meant to go into git
with your code, so everyone on the team gets the same run and debug setup.
The tabs you had open are kept separately, in a hidden `.bmeditor` file that
BMEditor adds to `.gitignore` for you.

Recent projects are listed on the start page, and in the project menu at
the top left.

## Finding your way around

The window has the usual parts:

- The **top bar**: the project menu on the left, then Run, Debug, Build,
  Test and Vet, the Make menu when there is a Makefile, and the Claude and
  Docker buttons on the right. It doubles as the title bar: drag its empty
  parts to move the window and double-click to maximise.
- The **Explorer** on the left (Ctrl+B to hide it). It follows whatever tab
  is active, opening folders as needed, so you always see where you are.
- The **editor** in the middle, with tabs above and breadcrumbs under them.
- The **bottom panel** (Ctrl+J): Problems, Output, Terminal and the Debug
  Console.
- The **side panel** on the right, for Claude Code and Docker.
- The **status bar** at the bottom: the git branch, error and warning
  counts, the cursor position, indentation, encoding, line endings and the
  language. Click any of the last four to change it.

When you forget where something is, press **Ctrl+Shift+P**. The command
palette lists every command with its shortcut, and you can type to filter.

## Moving through code

- **Ctrl+P** jumps to any file by typing part of its name or path.
- **Ctrl+Shift+O** jumps to a function or type in the current file.
- **Ctrl+G** goes to a line.
- **Ctrl+Shift+F** searches every file, and can replace across them.
- **F12** or **Ctrl+click** goes to a definition. Pressed on the definition
  itself, it shows where it is used. **Shift+F12** lists the usages directly.

Tabs work as you expect: drag to reorder, middle-click to close, Ctrl+Tab to
switch. With many files open, the tab you switch to always scrolls into
view, and the mouse wheel scrolls the tab strip.

## Writing Go

Open a `.go` file and gopls starts behind the scenes. You get:

- **Completion** that writes the import for you when you pick something
  from another package. Packages you already import come first.
- **Hover** for docs and types, and **Ctrl+Shift+Space** for the parameters
  of the call you are in.
- **Errors and warnings** as you type, underlined in the code, listed in
  Problems, counted in the status bar, and marked on the scrollbar so you can
  spot one far down the file.
- **Rename** (F2) across the whole project.
- **The light bulb** (Ctrl+.) on a line with a problem: the fixes gopls
  offers, plus "Fix with Claude".
- **Inlay hints**, the parameter names and inferred types written into the
  code. Turn them on and off from the palette.

When you save, goimports tidies the imports and gofmt formats the file. You
can turn that off in Settings if you would rather not.

A few Go chores are one command away in the palette: add or remove struct
tags, implement an interface, organize imports, `go mod tidy`, `go get`, and
`go generate` for the current file.

Moving a file or folder in the Explorer by dragging it updates the imports
that pointed at it.

## Running and testing

- **Ctrl+F5** runs the program, **Ctrl+Shift+B** builds it, and Test and Vet
  are in the top bar. Output streams into the Output panel. A
  `file:line:col` error in it is also in Problems, one click from the line.
- **Shift+F5** stops whatever is running.
- **Run with Arguments** asks for the arguments once. To keep them, and to
  set environment variables, open Project Settings (Ctrl+Shift+,), where they
  are saved with the project.

Over every test function there are **run test** and **debug test** links,
and over the file you can run all its tests. In `go.mod` there are links for
`go mod tidy` and adding a dependency.

## Debugging

Press **F5**. For Go, BMEditor starts Delve and runs the package of the file
you are in, from the module root, the same way `make run` would.

Click in the gutter, or press **F9**, to set a breakpoint. Right-click one
to give it a condition (stop only when `i > 10`) or to make it a log point
that prints a message instead of stopping.

When the program stops:

- the editor jumps to the line and centres it. If it stopped inside Go's
  runtime, after a panic for instance, it shows the line of your code that
  led there;
- the value of each variable is written at the end of its line, and
  hovering a name shows its value;
- the **Run and Debug** view on the left has the variables, your watch
  expressions, the call stack and every breakpoint.

Step with **F10** (over), **F11** (into) and **Shift+F11** (out), continue
with **F5**, restart with **Ctrl+Shift+F5**, stop with **Shift+F5**.

The **Debug Console** (Ctrl+Shift+Y) does two jobs. While a Go program
runs, what you type there is the program's input, so a program that reads
from stdin works; Ctrl+D ends the input. While it is paused, it evaluates
expressions in the current frame.

Stuck on a stop? **Debug: Ask Claude about this Stop** hands Claude where
the program is and what its variables hold.

### Debugging something other than Go

Out of the box, F5 debugs Go. Other languages get a debugger from an
extension. A C extension with gdb, for instance, compiles the `.c` file you
are in with debug info, runs it under gdb, and deletes the binary
afterwards.

For anything else, open **Project Settings, Debug (F5)**. Every field you
leave empty keeps the normal behaviour, so fill in only what you need:

| Field | For example |
|---|---|
| Debugger | `gdb-multiarch -i dap`, any program that speaks the Debug Adapter Protocol |
| Mode | Launch the program, or Attach to one already running |
| Attach to | `localhost:1234` |
| Program | `${workspaceFolder}/build/kernel.elf` |
| Build before debugging | `make kernel` |

Attach is how you debug something the editor did not start. QEMU is a good
example: start it with `-s -S` in the terminal, and it waits for a debugger
on port 1234. Set Mode to Attach, Attach to `localhost:1234`, Program to
your ELF file with its symbols, and press F5. A gdbserver on a board works
the same way.

## Git, the light way

BMEditor reads git; it does not try to replace your git client. Commit,
branch, pull and push with GitHub Desktop, the command line, or whatever you
already use. What BMEditor gives you is the view while you code:

- **Change marks** beside the line numbers for added, changed and deleted
  lines. Click one to see the diff against the last commit, where you can
  keep each change or put it back.
- **Show Changes vs HEAD** from the palette does the same for the whole file.
- **The Explorer** colours changed files and the folders above them.
- **The branch in the status bar** is a button: click it for a list of every
  changed file, and pick one to open it on its diff.

### Merge conflicts

When a merge leaves conflicts, the conflicted files are red in the Explorer,
and so is every folder above them, even folded. Open one and each conflict
is laid out the way VS Code does it: your side (current) in olive, the
incoming side in sea-glass, and above it three choices: **Accept Current**,
**Accept Incoming** and **Accept Both**. Pick one, or edit the text yourself.
Once the markers are gone, save, and mark the file as resolved in your git
client.

## The terminal

**Ctrl+\`** opens a terminal in the bottom panel. It is a real one, running
your own shell (PowerShell on Windows), and you can open several.

- **Ctrl+Shift+C** copies, **Ctrl+Shift+V** or a **right-click** pastes.
  Ctrl+C is still the interrupt, as it should be.
- **Ctrl+click** a URL to open it in the browser.

## Claude Code

Press **Ctrl+Shift+C** to open Claude Code in the side panel. It starts in
your project folder, so it sees your code. You need `claude` installed; on
Windows it runs natively, or in WSL if that is where you have it.

When Claude edits a file you have open, the tab reloads with every change
marked, and you keep or reject each one, just like a review.

There are a few ways to hand Claude something:

- Select code and press **Ctrl+Alt+K**, or click the **Ask Claude** button
  that appears beside the selection. The code goes into Claude's prompt with
  its file and line numbers, and waits there for your question.
- **Fix with Claude** in the light bulb, on a line with an error.
- **Ask Claude about this Stop** while debugging.

Claude can also work the editor itself. In Settings, under Claude Code, turn
on **Let Claude Code use the debugger** and **Let Claude Code use Docker**,
then restart Claude in its panel. Claude can then set breakpoints, start and
step a session and read variables, or run docker commands in your project,
and you watch every step happen in the editor. Claude Code still asks your
permission before it uses these tools.

## Docker

**Ctrl+Shift+D** opens Docker in the side panel. Containers are grouped by
their compose project. From there you can start, stop, restart and remove
them, follow their logs, open a shell inside one, run an image, build the
project's Dockerfile, and bring any compose file in the project up or down.
It needs the docker CLI and a running daemon.

## Make

If the project has a Makefile, a **Make** menu appears in the top bar with
its targets. A `## description` comment after a target shows as its
description. A target runs into the Output panel.

## Previews

Three kinds of files can be shown rendered, beside the source or instead of
it. Use the buttons at the top right of the editor, or **Ctrl+Shift+V**:

- **Markdown**, with highlighted code blocks and the folder's images.
  Markdown files open side by side by default.
- **HTML pages**, with their CSS, scripts and images, in a sandbox that keeps
  their scripts away from the editor.
- **OpenAPI and Swagger specs** in YAML or JSON, drawn by Swagger UI. A file
  counts as one as soon as it starts with `openapi:` or `swagger:`.

All three update as you type.

## Extensions

Other languages and tools come as extensions. Open **Extensions**
(Ctrl+Shift+X) and install one from:

- a **git repository** on any server, typed in the box, such as
  `github.com/someone/bmext-lua`, with `#v1.2.0` for a version;
- a **folder** or a **.zip**, picked with the buttons next to the box.

Reload the window when asked, and the extension is live. **Update** fetches
it again from the same place.

An extension can add a language with its highlighting and language server, a
debugger, settings, project templates, and panels and commands of its own.
Extensions are written by other people and run on your machine, so install
the ones you trust.

Want to write one? See [extensions.md](extensions.md).

## Settings

**Settings** (Ctrl+,) are yours, for every project:

| Setting | |
|---|---|
| On save, fix imports and format Go files | goimports and gofmt |
| Tab size, Insert spaces | Go always uses tabs |
| Font size | for the editor and the terminals; Ctrl+= and Ctrl+- zoom too |
| Show the splash at start | |
| Let Claude Code use the debugger / Docker | see Claude Code above |
| Each extension's settings | API keys and the like; secrets stay out of the window |

**Project Settings** (Ctrl+Shift+,) belong to the project and are saved in
its `.bmproj`:

| Field | |
|---|---|
| Name, Kind | |
| Run (F5): program arguments | quotes group words: `--name "Ada Lovelace"` |
| Run (F5): environment | one `KEY=value` per line |
| Debug (F5) | the debugger, mode, attach address, program and build; see Debugging |
| Extensions' project settings | they win over the same setting in Settings |

There is also a JSON view of the whole project file, checked when you save.

Settings, recent projects and extensions live in `%AppData%\bmeditor` on
Windows and `~/.config/bmeditor` on Linux.

## Keys worth learning

| Keys | |
|---|---|
| Ctrl+Shift+P | everything else |
| Ctrl+P | go to file |
| Ctrl+Shift+F | find in files |
| F12 / Shift+F12 | definition / usages |
| F2 | rename |
| Ctrl+. | quick fix |
| Shift+Alt+F | format |
| Ctrl+D | select the next match too |
| Alt+Up / Alt+Down | move the line |
| Ctrl+/ | comment |
| F5 / Shift+F5 | debug / stop |
| F9 | breakpoint |
| F10 / F11 / Shift+F11 | step over / into / out |
| Ctrl+F5 | run |
| Ctrl+Shift+B | build |
| Ctrl+\` | terminal |
| Ctrl+J / Ctrl+B | bottom panel / sidebar |
| Ctrl+Shift+C / Ctrl+Shift+D | Claude / Docker |
| Ctrl+Alt+K | send the selection to Claude |
| Ctrl+, / Ctrl+Shift+, | settings / project settings |

## About and licences

**About**, in the project menu, shows the version and what BMEditor was
built with. Its **Third-party licences** tab lists every package inside
BMEditor, and each opens to its full licence. The terms of use are in
[terms.md](terms.md).
