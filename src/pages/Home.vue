<script setup lang="ts">
import { GRID_HEIGHT, GRID_WIDTH, P_ALIVE } from '@/app/variable'
import type { Ceil } from '@/app/types'
import { getAliveNum, updateState } from '@/app/alg'

const ceils = ref<Ceil[][]>(gene())

function gene(): Ceil[][] {
  return Array.from({ length: GRID_HEIGHT }, (_, row) => Array.from({ length: GRID_WIDTH }, (_, col) => ({
    isAlive: Math.random() < P_ALIVE,
    row,
    col,
  })))
}

const progenyNum = ref<number>(0)
const aliveNum = ref<number>(0)
let frame = 0
function animate() {
  requestAnimationFrame(() => {
    frame++
    if (frame === 30) {
      ceils.value = updateState(ceils.value)
      aliveNum.value = getAliveNum(ceils.value)
      progenyNum.value++
      frame = 0
    }
    animate()
  })
}
animate()

function toGithub() {
  window.open('https://github.com/JiatLn/game-of-life', '_blank')
}
</script>

<template>
  <div h-100vh w-full flex="c col">
    <h3 mb-4 text="30px" font="bold mono" flex="c gap-20px">
      <div><span text="orange">Game</span>Of<span text="green">Life</span></div>
      <div i-carbon-logo-github text="black" @click="toGithub" cursor-pointer hover="text-orange" />
    </h3>
    <div flex="c gap-20px" mb-4>
      <div>
        Progeny: <span font="bold" text="orange">{{ progenyNum }}</span>
      </div>
      <div>
        Alive: <span font="bold" text="green">{{ aliveNum }}</span>
      </div>
    </div>
    <div border="~ gray">
      <div v-for="row in ceils.length" :key="row" flex="~">
        <div v-for="col in ceils[0].length" :key="col" w-14px h-14px flex="c">
          <div v-show="ceils[row - 1][col - 1].isAlive" w-14px h-14px bg="black" />
          <div v-show="!ceils[row - 1][col - 1].isAlive" w-14px h-14px bg="white" border />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>
