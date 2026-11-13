# BMEditor 0.1.5

- **New:** The Extension Manager lists the first-party extensions, with
  Install, Update and Remove. An extension made for a newer BMEditor says
  so instead of installing.
- **New:** Extensions can add views to the side bar and the Explorer, panels,
  settings pages and an editor for files that are not text. The C#
  extension uses them for a Solution Explorer and an assembly graph.
- **New:** Images open in an image view. Other files that are not text, such
  as an .exe, open in the Hex Editor extension, as Bless shows them, where
  bytes can be selected, read as text and copied.
- **New:** An SVG opens as its image, redrawn as you edit it, with its code a
  click away. XML and SVG files are highlighted.
- **New:** The Explorer searches files by name. Files .gitignore leaves out
  are listed after the others, marked.
- **New:** Settings has a page for the editor, Claude, updates and each
  extension. Output has a channel for each language server and extension.
- **Improved:** Search in files is much faster, skips what .gitignore leaves
  out, and loads more results as you scroll instead of stopping at 2000.
  Replace All changes every match. Ctrl+Shift+H opens Replace in Files.
- **Improved:** Opening another project reloads the window, so its tabs,
  language servers and extensions start clean.
- **Fixed:** Pasting into the terminal or Claude Code pastes once.
- **Fixed:** Links open in your browser.
