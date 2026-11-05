# Working on another machine

BMEditor can open folders that live somewhere else: in WSL, on a server or a
virtual machine you reach over SSH, on another Windows computer, or inside a
Docker container. The editor stays on your computer, while your terminals,
Go, git, the debugger and Claude Code run on the other machine, right next
to the files. You install nothing there yourself.

## Connecting

1. Choose **Connect to…** under Open Folder in the project menu, click the
   remote button at the left of the status bar, or use **Connect to** on the
   start page. Your WSL distros, the hosts in your SSH config and your
   running containers are already listed.
2. Not in the list? Choose **Add an SSH host** and type it the way you would
   for ssh, like `me@devbox` or `me@devbox:2222`. If you reach it through
   another machine, give that one as the jump host.
3. The first time you connect to an SSH host, say whether it runs Linux or
   Windows. BMEditor remembers.
4. If the host asks for something, such as a password, a key's passphrase, a
   code, or whether to trust it, answer in the small terminal that appears.

The first connection to a machine takes a little longer, because BMEditor
sets itself up there. After that it is quick.

## While connected

- The status bar shows where you are, like **SSH: devbox**. Click it to open
  another folder there or to close the connection.
- **Open Folder** browses the other machine's folders.
- Settings, recent projects and extensions are kept for each machine. The
  first time, your own settings are copied over.
- The tools you use there, like Go, git, docker or Claude Code, need to be
  installed on that machine.

## If the connection drops

BMEditor tells you, and the host in the status bar turns red. Click it and
choose **Reconnect**. Your open tabs stay where they are, unsaved changes
included, and you can save them once you are back.

When you close BMEditor, nothing is left running on the other machine.
