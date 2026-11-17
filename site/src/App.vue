<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { route } from './router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import HomePage from './pages/HomePage.vue'
import FeaturesPage from './pages/FeaturesPage.vue'
import ExtensionsPage from './pages/ExtensionsPage.vue'
import DownloadPage from './pages/DownloadPage.vue'

const pages = { home: HomePage, features: FeaturesPage, extensions: ExtensionsPage, download: DownloadPage }
const titles = { home: '', features: 'Features', extensions: 'Extensions', download: 'Download' }
const current = computed(() => pages[route.value.page])

watchEffect(() => {
  const t = titles[route.value.page]
  document.title = t ? `BMEditor | ${t}` : 'BMEditor'
})
</script>

<template>
  <SiteHeader />
  <main>
    <component :is="current" />
  </main>
  <SiteFooter />
</template>
