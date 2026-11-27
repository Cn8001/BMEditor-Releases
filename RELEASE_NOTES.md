# BMEditor 0.1.8

## New

- Claude Code and Copilot CLI show each edit they want to make in the
  editor first, as a diff, new files too. Accept or Ctrl+S lets them make
  it, Reject or closing the tab says no, and you can keep some changes and
  drop others. Settings can leave the edits to the assistant's terminal.
- Claude Code and Copilot CLI now see BMEditor as their IDE: they know the
  file you have open, what you have selected and the problems in it, so you
  no longer have to paste them in.
- Ctrl+click a file the assistant names in its panel to open it at the line
  it changes.
- GitHub Copilot suggestions as you type: Tab takes one, Ctrl+Right its next
  word, Esc dismisses it. Turn them on in Settings, Copilot. Copilot is
  GitHub's software, downloaded only when you ask (about 100 MB), and it
  sends the code you edit to GitHub; sharing usage data with GitHub stays
  off unless you allow it.
- Git: Show Log opens your Git history with its branch graph. Pick one
  commit, or several with Ctrl and Shift, to see every file they changed,
  and open any file as a side-by-side diff.
- Press Tab after git checkout, switch or merge in the terminal to pick a
  branch from a list.
- Ctrl+click a file path in any terminal to open it at its line.
- Go: Ctrl+F12 goes to implementations, Ctrl+T searches the project's
  symbols, Ctrl+Shift+T switches between a file and its test, and
  Shift+Alt+Right grows the selection.
- Go: richer colouring from gopls, marks on the other uses of the symbol
  under the cursor, iferr to complete an error check, Go: Add Import and
  Go: Toggle Compiler Optimization Details.
- Indent guides.
- BMEditor keeps a log and, if it ever closes unexpectedly, the reason, in
  %LOCALAPPDATA%\bmeditor\logs.

## Improved

- Run and Debug start your Go program from its main package instead of the
  open file's package. With several programs, pick one from the arrow
  beside Run; the project remembers it.
- A file opens with the indentation it already has, tabs or spaces, as in
  VS Code.
- Formatting and format on save go through gopls, and Go folds follow it.
- Ask Claude sends a reference to the selected lines instead of pasting
  them.
- The side and bottom panels keep their share of the window as you resize
  it, and start narrower.
- The status bar stays in place: long branch names are shortened, and a
  click on a busy language server shows what it is doing.
- Shift+Enter and Shift+Tab take a completion and replace the rest of the
  word.

## Fixed

- Picking a completion no longer deletes the text after the cursor.
- Completions no longer lag a keystroke behind.
- Suggestions such as `Pipeline{}` are no longer pasted with `${1:...}`
  around them.
- A wrong quick fix from gopls can no longer half-change files outside your
  project.
- go.mod and go.sum are coloured correctly.
- Copying from Copilot CLI reaches the clipboard.
