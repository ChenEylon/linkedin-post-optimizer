import { useState } from 'react'
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react'

interface RewritePanelProps {
  rewrite: string
  keyImprovements: string[]
}

export default function RewritePanel({ rewrite, keyImprovements }: RewritePanelProps) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(rewrite)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-slate-800">Improved Post</h2>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 rounded-lg border border-blue-300 bg-white px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50 transition-colors"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 leading-relaxed bg-white rounded-xl p-4 border border-blue-100">
        {rewrite}
      </pre>

      {keyImprovements.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setExpanded(v => !v)}
            className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {expanded ? 'Hide' : 'Show'} key improvements ({keyImprovements.length})
          </button>
          {expanded && (
            <ul className="mt-2 flex flex-col gap-1.5 pl-3">
              {keyImprovements.map((item, i) => (
                <li key={i} className="flex gap-2 text-xs text-slate-600">
                  <span className="text-blue-400 flex-shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
