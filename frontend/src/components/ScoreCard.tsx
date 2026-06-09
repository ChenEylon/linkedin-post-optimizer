import type { Grade } from '../types'

interface ScoreCardProps {
  score: number
  grade: Grade
  summary: string
}

const gradeColors: Record<Grade, string> = {
  A: 'text-emerald-600',
  B: 'text-blue-600',
  C: 'text-yellow-600',
  D: 'text-orange-500',
  F: 'text-red-600',
}

const scoreBarColor = (score: number) => {
  if (score >= 90) return 'bg-emerald-500'
  if (score >= 80) return 'bg-blue-500'
  if (score >= 70) return 'bg-yellow-500'
  if (score >= 60) return 'bg-orange-500'
  return 'bg-red-500'
}

export default function ScoreCard({ score, grade, summary }: ScoreCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center">
          <span className={`text-6xl font-bold leading-none ${gradeColors[grade]}`}>{grade}</span>
          <span className="mt-1 text-sm text-slate-500">Grade</span>
        </div>
        <div className="flex-1">
          <div className="flex items-end justify-between mb-2">
            <span className="text-3xl font-bold text-slate-800">{score}</span>
            <span className="text-sm text-slate-400">/ 100</span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${scoreBarColor(score)}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{summary}</p>
    </div>
  )
}
