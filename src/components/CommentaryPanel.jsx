function CommentaryPanel({ commentary }) {
  return (
    <div className="border border-slate-400 bg-white p-4">
      <h2 className="mb-3 text-xl font-bold">Commentary</h2>
      <p className="text-sm">{commentary}</p>
    </div>
  )
}

export default CommentaryPanel
