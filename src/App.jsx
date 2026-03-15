import { useState } from 'react'
import CommentaryPanel from './components/CommentaryPanel'
import ControlsPanel from './components/ControlsPanel'
import DayNotes from './components/DayNotes'
import FieldPlaceholder from './components/FieldPlaceholder'
import GameStatus from './components/GameStatus'
import MatchSummary from './components/MatchSummary'
import PowerBarPlaceholder from './components/PowerBarPlaceholder'
import ProbabilityTable from './components/ProbabilityTable'
import ScoreboardGrid from './components/ScoreboardGrid'
import {
  COMMENTARY,
  PROBABILITY_TABLES,
  STYLE_LABELS,
  TEST_OUTCOME_SEQUENCES,
  TOTAL_BALLS,
  TOTAL_WICKETS,
} from './constants/gameConfig'
import { formatOvers } from './utils/gameUtils'

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
        <GameStatus gameOver={gameOver} battingStyleLabel={STYLE_LABELS[battingStyle]} />

        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <ScoreboardGrid
              runs={runs}
              wickets={wickets}
              totalWickets={TOTAL_WICKETS}
              overs={formatOvers(ballsBowled)}
              ballsRemaining={ballsRemaining}
            />

            <ControlsPanel
              battingStyle={battingStyle}
              gameOver={gameOver}
              onStyleChange={handleStyleChange}
              onPlayBall={handlePlayBall}
              onRestart={handleRestart}
            />

            <FieldPlaceholder />

            <PowerBarPlaceholder probabilityTable={probabilityTable} />
          </div>

          <aside className="space-y-4">
            <MatchSummary
              lastOutcome={lastOutcome}
              wicketsRemaining={wicketsRemaining}
              ballsRemaining={ballsRemaining}
            />

            <ProbabilityTable probabilityTable={probabilityTable} />

            <CommentaryPanel commentary={commentary} />

            <DayNotes />
          </aside>
        </div>
      </div>
    </main>
  )
}

export default App
