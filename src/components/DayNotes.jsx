function DayNotes() {
  return (
    <div className="border border-slate-400 bg-white p-4">
      <h2 className="mb-3 text-xl font-bold">Day 2 Notes</h2>
      <ul className="list-inside list-disc space-y-1 text-sm">
        <li>Power bar segments scale with exact probabilities.</li>
        <li>Moving slider determines outcomes with no randomness.</li>
        <li>Play Ball locks slider position and updates match state.</li>
        <li>Aggressive and defensive styles update the bar instantly.</li>
      </ul>
    </div>
  )
}

export default DayNotes
