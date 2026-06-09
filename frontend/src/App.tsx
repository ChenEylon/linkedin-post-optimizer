import { useState } from 'react'
import { Loader2, BarChart2 } from 'lucide-react'
import { analyzePost } from './api/analyze'
import type { AnalysisResult } from './types'
import PostInput from './components/PostInput'
import FileUpload from './components/FileUpload'
import ScoreCard from './components/ScoreCard'
import CategoryBreakdown from './components/CategoryBreakdown'
import WeakSpots from './components/WeakSpots'
import RewritePanel from './components/RewritePanel'

export default function App() {
  const [postText, setPostText] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  async function handleAnalyze() {
    if (!postText.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await analyzePost(postText, files)
      setResult(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <BarChart2 size={24} className="text-blue-600" />
          <h1 className="text-lg font-bold text-slate-800">LinkedIn Post Optimizer</h1>
          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
            AI-powered
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Input panel */}
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-base font-semibold text-slate-800">Your Post</h2>
              <div className="flex flex-col gap-5">
                <PostInput value={postText} onChange={setPostText} />
                <FileUpload files={files} onChange={setFiles} />
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !postText.trim()}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Post'
                  )}
                </button>
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* Tips */}
            {!result && !loading && (
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  What gets graded
                </h3>
                <ul className="flex flex-col gap-2 text-xs text-slate-600">
                  {[
                    ['Hook (25pts)', 'First 1-2 lines before "see more"'],
                    ['Structure (20pts)', 'White space, line breaks, readability'],
                    ['CTA & Engagement (20pts)', 'Question, reply bait, clear ask'],
                    ['Emotional Resonance (15pts)', 'Story, specificity, vulnerability'],
                    ['Hashtags (10pts)', '3-5 relevant, not spammy'],
                    ['Length (10pts)', 'Ideal: 1,200–1,800 characters'],
                  ].map(([label, desc]) => (
                    <li key={label} className="flex gap-2">
                      <span className="font-medium text-slate-700 w-40 flex-shrink-0">{label}</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Results panel */}
          <div className="flex flex-col gap-5">
            {loading && (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-16 shadow-sm">
                <Loader2 size={36} className="animate-spin text-blue-500 mb-4" />
                <p className="text-sm text-slate-500">Analyzing your post...</p>
                <p className="text-xs text-slate-400 mt-1">This takes 10-20 seconds</p>
              </div>
            )}

            {result && (
              <>
                <ScoreCard score={result.overall_score} grade={result.grade} summary={result.summary} />
                <CategoryBreakdown categories={result.categories} />
                <WeakSpots spots={result.weak_spots} />
                <RewritePanel rewrite={result.rewrite} keyImprovements={result.key_improvements} />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
