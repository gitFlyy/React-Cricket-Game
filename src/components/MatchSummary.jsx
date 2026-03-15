function MatchSummary({ lastOutcome, wicketsRemaining, ballsRemaining }) {
  return (
    <div className="border border-slate-400 bg-white p-4">
      <h2 className="mb-3 text-xl font-bold">Match Summary</h2>
      <p className="mb-2">Last outcome: {lastOutcome}</p>
      <p className="mb-2">Wickets left: {wicketsRemaining}</p>
      <p>Balls left: {ballsRemaining}</p>
    </div>
  )
}

export default MatchSummary
