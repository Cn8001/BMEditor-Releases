# BMEditor 0.1.6

## New

- The top bar's Run, Debug, Build and Test buttons follow the open
  project. An extension can bring its own for its kind of project, with its
  logo; Go projects keep Go's. A project that no extension handles keeps
  only Debug.
- Right-click a tab for Close, Close Others, Close to the Right, Close
  Saved and Close All, Copy Path and Copy Relative Path, Reveal in Explorer,
  and Reveal in File Explorer.
- Close Others, Close Saved and Close All are in the command palette too.
- Reveal in File Explorer, in the Explorer's right-click menu and on tabs,
  shows the file in Windows Explorer (Finder on macOS, the file manager on
  Linux). It works for projects in WSL too.

## Improved

- When you connect to a remote host, the language servers, extensions,
  terminals and Claude Code running on your computer stop, since the host
  now runs them.
- Claude and Docker are picked from the top bar buttons, so the right panel
  no longer has a tab row of its own.
- The top bar shortens its button labels first as the window narrows, so
  the project name stays readable. Logos keep to the bar's size.
- The start page, the empty editor and the New Project dialog fit narrow
  windows: text wraps and icons shrink instead of running off the edge.

## Fixed

- Reloading the window, opening another project or connecting to a host no
  longer leaves language servers, extensions, terminals, Claude Code or the
  debugger running in the background.
- Disconnecting from a host stops everything the editor started there,
  including Docker logs.
