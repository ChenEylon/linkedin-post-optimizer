import type { WeakSpot } from '../types'

interface WeakSpotsProps {
  spots: WeakSpot[]
}

const severityConfig = {
  high:   { label: 'High',   dot: 'bg-red-500',    badge: 'bg-red-50 text-red-700 border-red-200' },
  medium: { label: 'Medium', dot: 'bg-yellow-500',  badge: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  low:    { label: 'Low',    dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
}

export default function WeakSpots({ spots }: WeakSpotsProps) {
  if (!spots.length) return null

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-slate-800 mb-4">Weak Spots</h2>
      <div className="flex flex-col gap-4">
        {spots.map((spot, i) => {
          const cfg = severityConfig[spot.severity]
          return (
            <div key={i} className="flex gap-3">
              <div className="mt-1.5 flex-shrink-0">
                <span className={`inline-block h-2.5 w-2.5 rounded-full ${cfg.dot}`} />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-slate-800">{spot.area}</span>
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${cfg.badge}`}>
                    {cfg.label}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{spot.issue}</p>
                <p className="text-xs text-blue-600 font-medium">Fix: {spot.fix}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
