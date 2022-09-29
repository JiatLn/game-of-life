<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCeilStore } from '@/store'

const ceilStore = useCeilStore()
const { ceils, progenyNum, aliveNum, isPause } = storeToRefs(ceilStore)

ceilStore.animate()

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
      <button btn flex="c gap-4px" @click="ceilStore.togglePlay">
        <div v-show="!isPause" i-ant-design:pause-circle-twotone />
        <div v-show="isPause" i-ant-design:play-circle-twotone />
        <span>{{ !isPause ? 'Pause' : 'Play !' }}</span>
      </button>
      <button btn flex="c gap-4px" @click="ceilStore.onRestart">
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
