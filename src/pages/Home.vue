<script setup lang="ts">
import { GRID_HEIGHT, GRID_WIDTH, P_ALIVE } from '@/app/variable'
import type { Ceil } from '@/app/types'

const ceils = ref<Ceil[][]>(gene())

function gene(): Ceil[][] {
  return Array.from({ length: GRID_HEIGHT }, (_, row) => Array.from({ length: GRID_WIDTH }, (_, col) => ({
    isAlive: Math.random() < P_ALIVE,
    row,
    col,
  })))
}

let frame = 0
function animate() {
  requestAnimationFrame(() => {
    frame++
    if (frame === 30) {
      ceils.value = gene()
      frame = 0
    }
    animate()
  })
}
animate()
</script>

<template>
  <div h-100vh w-full flex="c col">
    <h3 mb-4 text="30px" font="bold mono">
      Game of Life
    </h3>
    <div border="~ black">
      <div v-for="row in ceils.length" :key="row" flex="~">
        <div v-for="col in ceils[0].length" :key="col" w-14px h-14px flex="c">
          <div v-show="ceils[row - 1][col - 1].isAlive" w-14px h-14px bg="black" />
          <div v-show="!ceils[row - 1][col - 1].isAlive" w-14px h-14px bg="white" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
</style>
