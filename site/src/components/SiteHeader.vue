<script setup lang="ts">
import { href, route, type Page } from '../router'
import { guide, repo } from '../content'

const links: { page: Page; label: string }[] = [
  { page: 'home', label: 'Home' },
  { page: 'features', label: 'Features' },
  { page: 'extensions', label: 'Extensions' },
  { page: 'download', label: 'Download' },
]
</script>

<template>
  <header class="head">
    <div class="wrap row">
      <a class="brand" :href="href('home')"><img :src="'img/logo.png'" alt="" width="32" height="32"><span>BMEditor</span></a>
      <nav aria-label="Pages">
        <a v-for="l in links" :key="l.page" :href="href(l.page)" :aria-current="route.page === l.page ? 'page' : undefined">{{ l.label }}</a>
        <a :href="guide()" class="ext">Guide</a>
        <a :href="repo" class="ext">GitHub</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.head { position: sticky; top: 0; z-index: 5; background: rgb(22 21 19 / 0.82); backdrop-filter: blur(10px); border-bottom: 1px solid var(--line); }
.row { height: var(--head-h); display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.brand { display: flex; align-items: center; gap: 10px; text-decoration: none; font: 600 21px/1 var(--f-display); letter-spacing: -0.01em; flex: none; }
.brand img { width: 32px; height: 32px; }
nav { display: flex; gap: 2px; overflow-x: auto; scrollbar-width: none; }
nav::-webkit-scrollbar { display: none; }
nav a { flex: none; text-decoration: none; color: var(--muted); font-size: 15px; padding: 6px 10px; border-radius: 6px; }
nav a:hover { color: var(--ink); background: var(--panel); }
nav a[aria-current="page"] { color: var(--cream); }
@media (max-width: 700px) { .ext { display: none; } nav a { padding: 6px 7px; font-size: 14px; } }
@media (max-width: 480px) { .brand span { display: none; } }
</style>
