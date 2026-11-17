<script setup lang="ts">
import ShotShowcase from '../components/ShotShowcase.vue'
import { download, version } from '../content'
import { href } from '../router'

const built = [
  { name: 'Claude Code', color: 'var(--cream)' },
  { name: 'Debugger', color: 'var(--red)' },
  { name: 'Docker', color: 'var(--blue)' },
  { name: 'Terminal', color: 'var(--green)' },
  { name: 'Previews', color: 'var(--gold)' },
]
</script>

<template>
  <section class="page">
    <div class="wrap hero">
      <div class="intro">
        <h1>Bare Minimum Editor <span class="paren">(batteries included)</span></h1>
        <p class="lede">BMEditor is a desktop code editor that is ready to work as soon as it opens. Go support is built in, other languages come as extensions, and the layout and shortcuts follow VS Code.</p>
        <ul class="plain built" aria-label="Built in">
          <li v-for="b in built" :key="b.name" :style="{ '--c': b.color }">{{ b.name }}</li>
        </ul>
        <div class="actions">
          <a class="btn btn-primary" :href="download('bmeditor-windows-amd64-installer.exe')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0-5-5m5 5 5-5M4 19h16" /></svg>
            Download for Windows
          </a>
          <a class="btn" :href="href('download')">Linux and other downloads</a>
        </div>
        <p class="meta">Version {{ version }}. Free to use, updates itself.</p>
      </div>
      <ShotShowcase />
    </div>
  </section>
</template>

<style scoped>
.hero { display: grid; grid-template-columns: minmax(0, 380px) minmax(0, 1fr); gap: 48px; align-items: center; }
@media (max-width: 1060px) { .hero { grid-template-columns: minmax(0, 1fr); gap: 36px; } }
.intro { display: grid; gap: 18px; }
h1 { font-size: clamp(38px, 4.2vw, 54px); color: var(--cream); }
.paren { display: block; margin-top: 8px; font-size: 0.42em; font-weight: 500; letter-spacing: 0; color: var(--gold); }
.lede { color: var(--muted); font-size: 17px; }
.built { display: flex; flex-wrap: wrap; gap: 8px; }
.built li { font-size: 13px; font-weight: 500; padding: 4px 11px; border-radius: 999px; color: var(--c); border: 1px solid color-mix(in srgb, var(--c) 45%, transparent); background: color-mix(in srgb, var(--c) 8%, transparent); }
.actions { display: grid; grid-template-columns: minmax(0, 1fr); gap: 10px; max-width: 380px; }
.meta { font-size: 14px; color: var(--muted); }
.meta a { color: var(--cream); }
</style>
