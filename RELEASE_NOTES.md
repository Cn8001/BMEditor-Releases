# BMEditor 0.1.5

## New

- Extension Manager: browse BMEditor's extensions, install, update and
  remove them, or install one from a git repository, a zip or a folder.
- Extensions can add side bar views, Explorer views (such as the C#
  Solution Explorer), panels, settings pages, editor features and editors
  for files that are not text.
- Extensions that need a newer BMEditor are listed but not loaded, and say
  which version they need.
- Images open in an image view, with zoom.
- Files that are not text, such as .exe, open in the Hex Editor extension.
  You can select bytes, read them as text and copy them.
- SVG files open as an image that updates as you edit, with a switch to
  the code.
- XML and SVG syntax highlighting.
- Search files by name in the Explorer (Ctrl+Alt+F). Files ignored by
  .gitignore are listed last.
- Settings has a page for the editor, Claude Code, updates and each
  extension. Extension settings can offer a list of choices.
- Output has a channel for each language server and extension.
- Reload Window, from the top bar or the command palette.
- Ctrl+Shift+H opens Replace in Files.

## Improved

- Search in files is much faster: on a large project it went from over a
  second to well under 100 ms.
- Search skips files ignored by .gitignore, so Unity's Library, Temp and
  obj are no longer searched.
- Search results load as you scroll, with no 2000 line limit. Replace All
  replaces every match.
- Opening another project reloads the window for a clean start.
- Updating an extension that has nothing newer leaves it running.
- Extensions can be updated or removed while they are running.
- BMEditor keeps its data in one folder (%LOCALAPPDATA%\bmeditor on
  Windows, ~/.local/share/bmeditor on Linux). Older folders are moved
  there.
- The side bar is wider by default.
- The window title shows the project name.

## Fixed

- Pasting into the terminal or Claude Code no longer pastes twice.
- Links open in your browser instead of inside the editor.
- Files that are not text open in the right editor instead of showing an
  error.
- Typing quickly in Search no longer leaves old results on screen.
- Connecting to a remote host downloads the right server version.
- Buttons in the Extension Manager wrap instead of going off the edge.
- The selected side bar icon no longer has a line under it.
