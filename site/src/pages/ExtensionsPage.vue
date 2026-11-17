<script setup lang="ts">
import { ref } from 'vue'
import { extRepo, extensions, installUrl, repo } from '../content'

const copied = ref('')
const failed = ref(false) // without clipboard access, show the link to copy by hand

async function copy(name: string) {
  try {
    await navigator.clipboard.writeText(installUrl(name))
    failed.value = false
  } catch {
    failed.value = true
  }
  copied.value = name
  if (!failed.value) setTimeout(() => { if (copied.value === name) copied.value = '' }, 1600)
}
</script>

<template>
  <section class="page">
    <div class="wrap">
      <div class="page-head">
        <h1>Extensions</h1>
        <p>Other languages and tools come as extensions. Open Extensions in BMEditor (<kbd>Ctrl+Shift+X</kbd>), paste an install link, and reload the window when asked. Update keeps each one current.</p>
      </div>

      <ul class="plain grid">
        <li v-for="x in extensions" :key="x.name" class="card">
          <div class="top">
            <img :src="`img/ext/${x.name}.svg`" alt="" width="40" height="40">
            <div>
              <h2>{{ x.title }}</h2>
              <ul class="plain tags"><li v-for="t in x.tags" :key="t">{{ t }}</li></ul>
            </div>
          </div>
          <p>{{ x.text }}</p>
          <div class="row">
            <button class="btn btn-sm" type="button" :title="installUrl(x.name)" @click="copy(x.name)">{{ copied === x.name ? 'Copied' : 'Copy install link' }}</button>
            <a class="src" :href="`${extRepo}/tree/master/bmeditor-${x.name}`">Source</a>
          </div>
          <code v-if="copied === x.name && failed" class="url">{{ installUrl(x.name) }}</code>
        </li>
        <li class="card write">
          <h2>Write your own</h2>
          <p>An extension can add a language with its highlighting and language server, a debugger, settings, project templates, and panels, views and commands of its own. Install one from a git repository, a folder or a zip.</p>
          <div class="row"><a class="src" :href="`${repo}/blob/master/docs/extensions.md`">Writing extensions</a></div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(255px, 1fr)); gap: 16px; }
@media (max-width: 400px) { .grid { grid-template-columns: minmax(0, 1fr); } }
.card { background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 18px 20px; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.top { display: flex; gap: 14px; align-items: center; }
.top img { width: 40px; height: 40px; flex: none; }
.card h2 { font-size: 20px; letter-spacing: -0.01em; }
.tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
.tags li { font-size: 12px; color: var(--blue); }
.tags li + li::before { content: "/"; margin-right: 6px; color: var(--line); }
.card p { color: var(--muted); font-size: 14px; line-height: 1.55; }
.row { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-top: auto; }
.url { font-size: 12px; color: var(--muted); overflow-wrap: anywhere; user-select: all; }
.src { font-size: 14px; color: var(--cream); }
.write { background: transparent; border-style: dashed; }
.write h2 { color: var(--gold); }
</style>
