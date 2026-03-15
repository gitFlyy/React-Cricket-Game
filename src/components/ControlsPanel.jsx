function ControlsPanel({ battingStyle, gameOver, isBallInProgress, onStyleChange, onPlayBall, onRestart }) {
  function getAggressiveButtonClass() {
    if (battingStyle === 'aggressive') {
      return 'border px-4 py-2 border-red-700 bg-red-600 text-white'
    }

    return 'border px-4 py-2 border-slate-400 bg-slate-100'
  }

  function getDefensiveButtonClass() {
    if (battingStyle === 'defensive') {
      return 'border px-4 py-2 border-blue-700 bg-blue-600 text-white'
    }

    return 'border px-4 py-2 border-slate-400 bg-slate-100'
  }

  return (
    <div className="border border-slate-400 bg-white p-4">
      <h2 className="mb-3 text-xl font-bold">Controls</h2>
      <div className="mb-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onStyleChange('aggressive')}
          disabled={gameOver || isBallInProgress}
          className={getAggressiveButtonClass()}
        >
          Aggressive
        </button>

        <button
          type="button"
          onClick={() => onStyleChange('defensive')}
          disabled={gameOver || isBallInProgress}
          className={getDefensiveButtonClass()}
        >
          Defensive
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onPlayBall}
          disabled={gameOver || isBallInProgress}
          className="border border-slate-400 bg-yellow-300 px-4 py-2 disabled:bg-slate-300"
        >
          {isBallInProgress ? 'Shot Processing...' : 'Play Ball'}
        </button>

        <button
          type="button"
          onClick={onRestart}
          className="border border-slate-400 bg-slate-200 px-4 py-2"
        >
          Restart
        </button>
      </div>
    </div>
  )
}

export default ControlsPanel
