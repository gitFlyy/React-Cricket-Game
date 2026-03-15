function GameStatus({ gameOver, battingStyleLabel }) {
  return (
    <div className="mb-4 border border-slate-400 bg-white p-3">
      <p className="font-semibold">Status: {gameOver ? 'Game Over' : 'Playing'}</p>
      <p className="text-sm">Current batting style: {battingStyleLabel}</p>
    </div>
  )
}

export default GameStatus
