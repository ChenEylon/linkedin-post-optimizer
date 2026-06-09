interface PostInputProps {
  value: string
  onChange: (v: string) => void
}

export default function PostInput({ value, onChange }: PostInputProps) {
  const charCount = value.length
  const ideal = charCount >= 1200 && charCount <= 1800

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">
        LinkedIn Post Text
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Paste your LinkedIn post here..."
        rows={12}
        className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y shadow-sm"
      />
      <span className={`text-xs self-end ${ideal ? 'text-emerald-600' : 'text-slate-400'}`}>
        {charCount} chars {ideal ? '✓ ideal range' : '(ideal: 1,200–1,800)'}
      </span>
    </div>
  )
}
