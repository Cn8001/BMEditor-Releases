# BMEditor 0.1.3

- **New:** An installer for Windows, `bmeditor-windows-amd64-installer.exe`.
  It asks whether BMEditor is only for you, with no administrator rights, or
  for everyone on the computer, and adds a Start menu entry and a `bmeditor`
  command. Remove it from Settings > Apps; your settings stay. The plain exe
  is still there if you would rather not install.
- **New:** `bmeditor .` in a terminal opens that folder, and
  `bmeditor main.go` opens that file. Started without a path, BMEditor opens
  your last project as before.
- **New:** Go on from a machine you are connected to. In a WSL window,
  Connect to… lists that distro's SSH hosts and containers, and an SSH host
  added there is reached with the keys in WSL. On a Windows machine reached
  over SSH, its WSL distros are listed too, so you can work in another
  computer's WSL. Each chain is remembered for next time. See
  [Working on another machine](https://github.com/Cn8001/BMEditor-Releases/blob/master/docs/remote.md).
- **Improved:** An install for everyone updates itself too: Windows asks for
  administrator rights once, and BMEditor starts again on the new version.
- **Improved:** Older copies of what BMEditor sets up on a host are removed
  when a new version arrives, instead of piling up.
- **Fixed:** Hovering the tab bar no longer nudges the tabs.
