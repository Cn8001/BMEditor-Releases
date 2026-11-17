<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { allFeatures } from '../content'
import { href } from '../router'

const shots = computed(() => allFeatures.filter((f) => f.shots?.length).map((f) => ({ ...f.shots![0], feature: f.id, label: f.title })))

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
const cur = ref(0)
const playing = ref(!reduce)
let timer = 0

function show(i: number) {
  cur.value = i
  restart()
}
function restart() {
  clearInterval(timer)
  if (playing.value && shots.value.length > 1) timer = window.setInterval(() => { cur.value = (cur.value + 1) % shots.value.length }, 4500)
}
function toggle() {
  playing.value = !playing.value
  restart()
}

onMounted(restart)
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <figure v-if="shots.length" class="show">
    <a class="frame" :href="href('features', shots[cur].feature)" :aria-label="`${shots[cur].label}: see this feature`">
      <img v-for="(s, i) in shots" :key="s.src" :src="s.src" :alt="i === cur ? s.alt : ''" :class="{ on: i === cur }" width="2560" height="1600" :loading="i === 0 ? 'eager' : 'lazy'">
    </a>
    <figcaption v-if="shots.length > 1">
      <div class="tabs" role="tablist" aria-label="Screens">
        <button v-for="(s, i) in shots" :key="s.src" class="tab" role="tab" :aria-selected="i === cur" @click="show(i)">{{ s.label }}</button>
      </div>
      <button v-if="!reduce" class="btn btn-sm" type="button" :aria-pressed="!playing" @click="toggle">{{ playing ? 'Pause' : 'Play' }}</button>
    </figcaption>
  </figure>
</template>

<style scoped>
.show { margin: 0; display: grid; gap: 10px; min-width: 0; }
.frame { display: grid; border-radius: 12px; overflow: hidden; border: 1px solid var(--line); background: var(--code); box-shadow: 0 30px 60px -30px rgb(0 0 0 / 0.8), 0 0 0 1px rgb(239 227 203 / 0.05); }
.frame img { grid-area: 1 / 1; width: 100%; opacity: 0; transition: opacity .6s ease; }
.frame img.on { opacity: 1; }
figcaption { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-width: 0; }
figcaption .tabs { flex: 1; min-width: 0; border-bottom: 0; }
.tab { font-size: 14px; padding: 6px 10px 8px; }
</style>
