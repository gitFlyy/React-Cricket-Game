function ScoreboardGrid({ runs, wickets, totalWickets, overs, ballsRemaining }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <div className="border border-slate-400 bg-white p-3">
        <p className="text-sm font-semibold">Runs</p>
        <p className="text-2xl">{runs}</p>
      </div>

      <div className="border border-slate-400 bg-white p-3">
        <p className="text-sm font-semibold">Wickets</p>
        <p className="text-2xl">
          {wickets}/{totalWickets}
        </p>
      </div>

      <div className="border border-slate-400 bg-white p-3">
        <p className="text-sm font-semibold">Overs</p>
        <p className="text-2xl">{overs}</p>
      </div>

      <div className="border border-slate-400 bg-white p-3">
        <p className="text-sm font-semibold">Balls Left</p>
        <p className="text-2xl">{ballsRemaining}</p>
      </div>
    </div>
  )
}

export default ScoreboardGrid
