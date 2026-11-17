<script setup lang="ts">
import { computed } from 'vue'
import { download, guide, notes, repo, version } from '../content'
import { href, route } from '../router'

const tab = computed(() => (route.value.sub === 'new' ? 'new' : ''))

const files = [
  { file: 'bmeditor-windows-amd64-installer.exe', title: 'Windows installer', text: 'Installs for you, with no administrator rights, adds a Start menu entry and a bmeditor command, and sets up WebView2 if it is missing.', primary: true },
  { file: 'bmeditor-windows-amd64.exe', title: 'Windows, no install', text: 'The whole program on its own. Keep it wherever you like.' },
  { file: 'bmeditor-linux-amd64.tar.gz', title: 'Linux', text: 'The editor for 64 bit Linux, packed as an archive.' },
]

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const inline = (s: string) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
const colors: Record<string, string> = { New: 'var(--green)', Improved: 'var(--blue)', Fixed: 'var(--gold)' }
</script>

<template>
  <section class="page">
    <div class="wrap">
      <div class="page-head">
        <h1>Download</h1>
        <p>BMEditor {{ version }}. After you install it, it updates itself.</p>
      </div>
      <nav class="tabs" aria-label="Download">
        <a class="tab" :href="href('download')" :aria-selected="tab === ''">Downloads</a>
        <a class="tab" :href="href('download', 'new')" :aria-selected="tab === 'new'">What's new in {{ version }}</a>
      </nav>

      <div class="panel">
        <div v-if="tab === ''" class="split">
          <ul class="plain files">
            <li v-for="f in files" :key="f.file" class="file">
              <div>
                <h2>{{ f.title }}</h2>
                <p>{{ f.text }}</p>
                <code>{{ f.file }}</code>
              </div>
              <a class="btn" :class="{ 'btn-primary': f.primary }" :href="download(f.file)">Download</a>
            </li>
          </ul>
          <div class="side">
            <h2>Before you start</h2>
            <ul>
              <li>For Go work, have Go on your PATH, and git if you want to see changes. BMEditor offers to install the debugger the first time you press <kbd>F5</kbd>.</li>
              <li>Claude Code needs <code>claude</code> installed. On Windows it runs natively, or in WSL if that is where you have it.</li>
              <li>To check a download, compare it with <a :href="download('SHA256SUMS')">SHA256SUMS</a> from the same release.</li>
            </ul>
            <p><a :href="guide('getting-it-running')">Getting it running</a> in the guide, or <a :href="`${repo}/releases`">every release</a>.</p>
          </div>
        </div>

        <div v-else class="notes">
          <section v-for="s in notes" :key="s.title" :style="{ '--c': colors[s.title] ?? 'var(--cream)' }">
            <h2>{{ s.title }}</h2>
            <ul>
              <li v-for="(it, i) in s.items" :key="i" v-html="inline(it)" />
            </ul>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tabs a { text-decoration: none; }
.panel { padding-top: 28px; }
.split { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); gap: 40px; align-items: start; }
@media (max-width: 920px) { .split { grid-template-columns: minmax(0, 1fr); } }
.files { display: grid; gap: 12px; }
.file { display: flex; gap: 20px; align-items: center; justify-content: space-between; background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 18px 20px; }
.file > div { display: grid; gap: 6px; min-width: 0; }
.file h2 { font-size: 20px; letter-spacing: -0.01em; }
.file p { color: var(--muted); font-size: 15px; }
.file code { color: var(--blue); font-size: 12px; overflow-wrap: anywhere; }
@media (max-width: 560px) { .file { flex-direction: column; align-items: stretch; } }
.side { display: grid; gap: 12px; }
.side h2 { font-size: 22px; color: var(--gold); }
.side ul { margin: 0; padding-left: 20px; display: grid; gap: 8px; color: var(--muted); font-size: 15px; }
.side p { color: var(--muted); font-size: 15px; }
.side a { color: var(--cream); }
.notes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 28px; align-items: start; }
@media (max-width: 980px) { .notes { grid-template-columns: minmax(0, 1fr); } }
.notes h2 { font-size: 22px; color: var(--c); margin-bottom: 10px; }
.notes ul { margin: 0; padding-left: 18px; display: grid; gap: 8px; color: var(--muted); font-size: 15px; }
.notes li::marker { color: var(--c); }
.notes :deep(code) { color: var(--ink); }
</style>
