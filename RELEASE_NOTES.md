# BMEditor 0.1.4

- **New:** Add an SSH host takes an ssh command as you would type it, such
  as `ssh -i ~/.ssh/key -p 2222 -J bastion user@host`. The key is used on
  the machine ssh runs on, so a host added from WSL signs in with the keys
  in WSL.
- **Improved:** Going on from a connected machine is easy to find: click the
  remote indicator in the status bar and choose Connect to…. It lists only
  what that machine can reach; close the connection to get back to this
  computer's own hosts.
- **Changed:** The installer installs for you only, with no administrator
  rights, and its last page can open BMEditor. If you installed 0.1.3 for
  everyone on the computer, remove it from Settings > Apps and install this
  one.
- **Fixed:** Connecting over SSH to a Windows computer, or to a WSL distro on
  one, no longer stops at "Getting the server".
- **Fixed:** BMEditor keeps its data in one folder, instead of one more in
  %APPDATA% for each name its exe had.
