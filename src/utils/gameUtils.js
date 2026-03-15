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
