import { defineStore } from 'pinia'

import { gene, getAliveNum, updateState } from '@/app/alg'
import type { Ceil } from '@/app/types'

let frame = 0

export const useCeilStore = defineStore('ceil', () => {
  const ceils = ref<Ceil[][]>(gene())
  const progenyNum = ref<number>(0)
  const aliveNum = ref<number>(0)
  const isPause = ref<boolean>(false)

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

  function onRestart() {
    ceils.value = gene()
    progenyNum.value = 0
    aliveNum.value = 0
    isPause.value = false
  }

  function togglePlay() {
    isPause.value = !isPause.value
  }

  return {
    ceils,
    progenyNum,
    aliveNum,
    isPause,
    animate,
    onRestart,
    togglePlay,
  }
})

