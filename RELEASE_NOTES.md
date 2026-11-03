# BMEditor 0.1.0

This is the first release of BMEditor, a desktop IDE that any language can
plug into through extensions, with Go built in, batteries included. It is
small, stays out of the way, and keeps the keys you know from VS Code.

## Writing Go

gopls is built in. You get completion that adds imports for you, hover docs,
go to definition and usages, rename across the project, quick fixes from the
light bulb and inlay hints. Saving runs goimports and gofmt. Run, build, test
and vet are one key away, and their errors open straight in Problems. Above
each test there are run and debug links, and in go.mod one for go mod tidy.

## Debugging

F5 starts Delve. Breakpoints can have conditions or log a message instead of
stopping. When the program stops, the editor jumps to the line and writes
each variable's value next to the code. The Debug Console is the program's
input while it runs and evaluates expressions while it is paused.

Out of the box that is Go, but an extension can bring another debugger,
such as gdb for C, and Project Settings can point F5 at any debugger or
attach to something already running, like QEMU or a gdbserver on a board.

## Claude Code and Docker

Claude Code runs in a panel next to your code. What it changes reloads in the
tabs, each change marked so you can keep it or throw it away. Select some
code and press Ctrl+Alt+K to hand it to Claude with its file and lines. If
you allow it in Settings, Claude can also use the debugger and Docker through
the editor, and you watch it happen.

The Docker panel lists your containers by compose project, with their logs,
a shell inside them, and compose up and down for the project's files.

## Git

BMEditor reads git but does not try to be a git client. Changed lines are
marked beside the line numbers, a click shows the diff against the last
commit, and the branch in the status bar lists every changed file. Merge
conflicts are resolved in place, the VS Code way. For commits and pushes,
keep using GitHub Desktop or the command line.

## And the rest

A real terminal with copy, paste and clickable links. Live previews for
Markdown, HTML pages and OpenAPI specs. A Make menu for your Makefile's
targets. Extensions for other languages, installed from git, a folder or a
zip. Everything is listed in [the guide](docs/guide.md).

## Before you start

You need Go and git. `make` installs gopls and dlv, and the editor offers to
install dlv when it is missing. On Windows, WebView2 has to be present; it
comes with Windows 11.

Two things to know in this release: under WSLg the custom title bar may not
drag or resize well, and Claude's debugger and Docker access are off until
you turn them on in Settings.
