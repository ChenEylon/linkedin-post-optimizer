import type { AnalysisResult } from '../types'

interface CategoryBreakdownProps {
  categories: AnalysisResult['categories']
}

const LABELS: Record<string, string> = {
  hook: 'Hook',
  structure: 'Structure & Readability',
  cta_engagement: 'CTA & Engagement',
  emotional_resonance: 'Emotional Resonance',
  hashtags: 'Hashtags',
  length: 'Length',
}

function barColor(pct: number) {
  if (pct >= 0.9) return 'bg-emerald-500'
  if (pct >= 0.7) return 'bg-blue-500'
  if (pct >= 0.5) return 'bg-yellow-500'
  return 'bg-red-500'
}

export default function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-slate-800 mb-4">Category Breakdown</h2>
      <div className="flex flex-col gap-4">
        {Object.entries(categories).map(([key, cat]) => {
          const pct = cat.score / cat.max
          return (
            <div key={key}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-slate-700">{LABELS[key] ?? key}</span>
                <span className="text-xs text-slate-500">{cat.score}/{cat.max}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden mb-1">
                <div
                  className={`h-full rounded-full ${barColor(pct)}`}
                  style={{ width: `${pct * 100}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">{cat.comment}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
