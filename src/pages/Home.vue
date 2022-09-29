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
const isPause = ref<boolean>(false)
let frame = 0
function animate() {
  requestAnimationFrame(() => {
    frame++
    if (!isPause.value && frame >= 30) {
      ceils.value = updateState(ceils.value)
      aliveNum.value = getAliveNum(ceils.value)
      progenyNum.value++
      frame = 0
    }
    animate()
  })
}
animate()

function onRestart() {
  ceils.value = gene()
  progenyNum.value = 0
  aliveNum.value = 0
  isPause.value = false
}

function toGithub() {
  window.open('https://github.com/JiatLn/game-of-life', '_blank')
}
</script>

<template>
  <div h-100vh w-full flex="c col">
    <h3 mb-4 text="30px" font="bold mono" flex="c gap-20px">
      <div><span text="orange">Game</span>Of<span text="green">Life</span></div>
      <div i-carbon-logo-github text="black" cursor-pointer hover="text-orange" @click="toGithub" />
    </h3>
    <div flex="c gap-20px" mb-4>
      <div>
        Progeny: <span font="bold" text="orange">{{ progenyNum }}</span>
      </div>
      <div>
        Alive: <span font="bold" text="green">{{ aliveNum }}</span>
      </div>
    </div>
    <div mb-4 flex="c gap-20px">
      <button btn flex="c gap-4px" @click="isPause = !isPause">
        <div v-show="!isPause" i-ant-design:pause-circle-twotone />
        <div v-show="isPause" i-ant-design:play-circle-twotone />
        <span>{{ !isPause ? 'Pause' : 'Play !' }}</span>
      </button>
      <button btn flex="c gap-4px" @click="onRestart">
        <div i-iconoir:restart />
        <span>Restart</span>
      </button>
    </div>
    <div border="~ gray">
      <div v-for="(row, idx) in ceils" :key="idx" flex="~">
        <div v-for="{ col, isAlive } in row" :key="col" w-14px h-14px flex="c">
          <div w-full h-full border transition="all duration-300ms" :class="isAlive ? 'bg-black' : 'bg-white'" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>
