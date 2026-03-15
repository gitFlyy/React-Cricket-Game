import { BALLS_PER_OVER } from '../constants/gameConfig'

export function formatOvers(ballsBowled) {
  return `${Math.floor(ballsBowled / BALLS_PER_OVER)}.${ballsBowled % BALLS_PER_OVER}`
}

export function getPowerBarColorClass(outcome) {
  if (outcome === 'W') {
    return 'bg-red-400'
  }

  if (outcome === '4') {
    return 'bg-blue-300'
  }

  if (outcome === '6') {
    return 'bg-yellow-300'
  }

  return 'bg-green-300'
}

export function getOutcomeFromSlider(probabilityTable, sliderPosition) {
  const clampedPosition = Math.min(Math.max(sliderPosition, 0), 1)
  let cumulative = 0

  for (const item of probabilityTable) {
    cumulative += item.probability

    if (clampedPosition <= cumulative) {
      return item.outcome
    }
  }

  return probabilityTable[probabilityTable.length - 1].outcome
}
