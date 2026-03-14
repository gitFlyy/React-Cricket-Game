import { useState } from 'react'

const TOTAL_OVERS = 2
const BALLS_PER_OVER = 6
const TOTAL_BALLS = TOTAL_OVERS * BALLS_PER_OVER
const TOTAL_WICKETS = 2

const PROBABILITY_TABLES = {
  aggressive: [
    { outcome: 'W', probability: 0.22, label: 'Wicket' },
    { outcome: '0', probability: 0.08, label: 'Dot Ball' },
    { outcome: '1', probability: 0.16, label: '1 Run' },
    { outcome: '2', probability: 0.14, label: '2 Runs' },
    { outcome: '3', probability: 0.05, label: '3 Runs' },
    { outcome: '4', probability: 0.2, label: 'Four' },
    { outcome: '6', probability: 0.15, label: 'Six' },
  ],
  defensive: [
    { outcome: 'W', probability: 0.08, label: 'Wicket' },
    { outcome: '0', probability: 0.24, label: 'Dot Ball' },
    { outcome: '1', probability: 0.28, label: '1 Run' },
    { outcome: '2', probability: 0.18, label: '2 Runs' },
    { outcome: '3', probability: 0.07, label: '3 Runs' },
    { outcome: '4', probability: 0.1, label: 'Four' },
    { outcome: '6', probability: 0.05, label: 'Six' },
  ],
}

const TEST_OUTCOME_SEQUENCES = {
  aggressive: ['4', 'W', '1', '6', '0', '2', '4', '1', 'W', '6', '0', '2'],
  defensive: ['1', '0', '2', '1', '0', '4', '1', '2', '0', '1', 'W', '1'],
}

const COMMENTARY = {
  W: 'Wicket taken',
  0: 'No run',
  1: 'Single run',
  2: 'Two runs',
  3: 'Three runs',
  4: 'Four',
  6: 'Six',
}

const STYLE_LABELS = {
  aggressive: 'Aggressive',
  defensive: 'Defensive',
}

function formatOvers(ballsBowled) {
  return `${Math.floor(ballsBowled / BALLS_PER_OVER)}.${ballsBowled % BALLS_PER_OVER}`
}

function getPowerBarColorClass(outcome) {
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

function App() {
  const [runs, setRuns] = useState(0)
  const [wickets, setWickets] = useState(0)
  const [ballsBowled, setBallsBowled] = useState(0)
  const [battingStyle, setBattingStyle] = useState('aggressive')
  const [lastOutcome, setLastOutcome] = useState('Not played yet')
  const [commentary, setCommentary] = useState('Choose a style and press Play Ball to test the Day 1 game loop.')
  const [gameOver, setGameOver] = useState(false)

  const ballsRemaining = TOTAL_BALLS - ballsBowled
  const wicketsRemaining = TOTAL_WICKETS - wickets
  const probabilityTable = PROBABILITY_TABLES[battingStyle]

  function handleStyleChange(style) {
    if (gameOver) {
      return
    }

    setBattingStyle(style)
    setCommentary(`${STYLE_LABELS[style]} mode selected. Day 2 will connect this to the live power bar.`)
  }

  function handleRestart() {
    setRuns(0)
    setWickets(0)
    setBallsBowled(0)
    setBattingStyle('aggressive')
    setLastOutcome('Not played yet')
    setCommentary('Match reset. Choose a style and press Play Ball to test the Day 1 game loop.')
    setGameOver(false)
  }

  function handlePlayBall() {
    if (gameOver) {
      return
    }

    const sequence = TEST_OUTCOME_SEQUENCES[battingStyle]
    const outcome = sequence[ballsBowled % sequence.length]
    const nextBallsBowled = ballsBowled + 1
    const nextRuns = outcome === 'W' ? runs : runs + Number(outcome)
    const nextWickets = outcome === 'W' ? wickets + 1 : wickets
    const hasMatchEnded = nextBallsBowled >= TOTAL_BALLS || nextWickets >= TOTAL_WICKETS

    setRuns(nextRuns)
    setWickets(nextWickets)
    setBallsBowled(nextBallsBowled)
    setLastOutcome(outcome === 'W' ? 'Wicket' : `${outcome} ${outcome === '1' ? 'Run' : 'Runs'}`)
    setCommentary(COMMENTARY[outcome])
    setGameOver(hasMatchEnded)

    if (hasMatchEnded) {
      setCommentary(`Game over. Final score: ${nextRuns}/${nextWickets} in ${formatOvers(nextBallsBowled)} overs.`)
    }
  }

  return (
    <main className="min-h-screen bg-green-100 p-4 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold">2D Cricket Web App</h1>

        <div className="mb-4 border border-slate-400 bg-white p-3">
          <p className="font-semibold">Status: {gameOver ? 'Game Over' : 'Playing'}</p>
          <p className="text-sm">Current batting style: {STYLE_LABELS[battingStyle]}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <div className="border border-slate-400 bg-white p-3">
                <p className="text-sm font-semibold">Runs</p>
                <p className="text-2xl">{runs}</p>
              </div>

              <div className="border border-slate-400 bg-white p-3">
                <p className="text-sm font-semibold">Wickets</p>
                <p className="text-2xl">
                  {wickets}/{TOTAL_WICKETS}
                </p>
              </div>

              <div className="border border-slate-400 bg-white p-3">
                <p className="text-sm font-semibold">Overs</p>
                <p className="text-2xl">{formatOvers(ballsBowled)}</p>
              </div>

              <div className="border border-slate-400 bg-white p-3">
                <p className="text-sm font-semibold">Balls Left</p>
                <p className="text-2xl">{ballsRemaining}</p>
              </div>
            </div>

            <div className="border border-slate-400 bg-white p-4">
              <h2 className="mb-3 text-xl font-bold">Controls</h2>
              <div className="mb-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleStyleChange('aggressive')}
                  className={`border px-4 py-2 ${
                    battingStyle === 'aggressive'
                      ? 'border-red-700 bg-red-600 text-white'
                      : 'border-slate-400 bg-slate-100'
                  }`}
                >
                  Aggressive
                </button>

                <button
                  type="button"
                  onClick={() => handleStyleChange('defensive')}
                  className={`border px-4 py-2 ${
                    battingStyle === 'defensive'
                      ? 'border-blue-700 bg-blue-600 text-white'
                      : 'border-slate-400 bg-slate-100'
                  }`}
                >
                  Defensive
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handlePlayBall}
                  disabled={gameOver}
                  className="border border-slate-400 bg-yellow-300 px-4 py-2 disabled:bg-slate-300"
                >
                  Play Ball
                </button>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="border border-slate-400 bg-slate-200 px-4 py-2"
                >
                  Restart
                </button>
              </div>
            </div>

            <div className="border border-slate-400 bg-white p-4">
              <h2 className="mb-3 text-xl font-bold">Field Placeholder</h2>
              
            </div>

            <div className="border border-slate-400 bg-white p-4">
              <h2 className="mb-3 text-xl font-bold">Power Bar Placeholder</h2>
              <div className="overflow-hidden border border-slate-400">
                <div className="flex h-10 w-full text-xs font-bold">
                  {probabilityTable.map((item) => (
                    <div
                      key={item.outcome}
                      style={{ width: `${item.probability * 100}%` }}
                      className={`flex items-center justify-center border-r border-slate-500 ${getPowerBarColorClass(item.outcome)}`}
                    >
                      {item.outcome}
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-700">Slider will be added here on Day 2.</p>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="border border-slate-400 bg-white p-4">
              <h2 className="mb-3 text-xl font-bold">Match Summary</h2>
              <p className="mb-2">Last outcome: {lastOutcome}</p>
              <p className="mb-2">Wickets left: {wicketsRemaining}</p>
              <p>Balls left: {ballsRemaining}</p>
            </div>

            <div className="border border-slate-400 bg-white p-4">
              <h2 className="mb-3 text-xl font-bold">Probability Table</h2>
              <div className="space-y-2 text-sm">
                {probabilityTable.map((item) => (
                  <div key={item.outcome} className="flex justify-between border-b border-slate-200 pb-1">
                    <span>{item.label}</span>
                    <span>{(item.probability * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-slate-400 bg-white p-4">
              <h2 className="mb-3 text-xl font-bold">Commentary</h2>
              <p className="text-sm">{commentary}</p>
            </div>

            <div className="border border-slate-400 bg-white p-4">
              <h2 className="mb-3 text-xl font-bold">Day 1 Notes</h2>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>Scoreboard works</li>
                <li>Styles can be switched</li>
                <li>Restart works</li>
                <li>Power bar is only a preview right now</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default App
