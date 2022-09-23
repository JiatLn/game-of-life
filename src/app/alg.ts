import type { Ceil } from '@/app/types'

export function updateState(grids: Ceil[][]) {
  const width = grids[0].length
  const height = grids.length
  const nextState: Ceil[][] = Array.from({ length: height }, () => [])
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const ceils = getBoundingCeils(grids, grids[i][j])
      const aliveCnt = ceils.filter(ceil => ceil.isAlive).length
      let isAlive = grids[i][j].isAlive
      if (isAlive) {
        isAlive = aliveCnt === 2 || aliveCnt === 3
      }
      else {
        isAlive = aliveCnt === 3
      }
      nextState[i].push({
        row: i,
        col: j,
        isAlive,
      })
    }
  }
  return nextState
}

export function isGameOver(grids: Ceil[][]) {
  for (const row of grids) {
    const hasAlive = row.some(ceil => ceil.isAlive)
    if (hasAlive)
      return false
  }
  return true
}

export function getBoundingCeils(grids: Ceil[][], ceil: Ceil) {
  const ceils: Ceil[] = []
  const width = grids[0].length
  const height = grids.length
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [1, 1], [-1, -1], [-1, 1], [1, -1]]
  for (const [x, y] of directions) {
    const row = ceil.row + y
    const col = ceil.col + x
    if (row < 0 || row >= height || col < 0 || col >= width)
      continue
    ceils.push(grids[row][col])
  }
  return ceils
}
