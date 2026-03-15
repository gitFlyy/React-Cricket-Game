import { getPowerBarColorClass } from '../utils/gameUtils'

function PowerBarPlaceholder({ probabilityTable }) {
  return (
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
  )
}

export default PowerBarPlaceholder
