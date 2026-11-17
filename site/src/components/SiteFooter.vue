<script setup lang="ts">
import { extRepo, guide, repo, version } from '../content'
</script>

<template>
  <footer>
    <div class="wrap row">
      <span>BMEditor {{ version }} is free to use and provided as is.</span>
      <nav aria-label="Project links">
        <a :href="guide()">Guide</a>
        <a :href="`${repo}/blob/master/docs/extensions.md`">Writing extensions</a>
        <a :href="extRepo">Extensions on GitHub</a>
        <a :href="`${repo}/blob/master/docs/terms.md`">Terms of use</a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
footer { border-top: 1px solid var(--line); padding-block: 24px 32px; color: var(--muted); font-size: 14px; }
.row { display: flex; justify-content: space-between; gap: 16px 28px; flex-wrap: wrap; }
nav { display: flex; gap: 18px; flex-wrap: wrap; }
</style>
