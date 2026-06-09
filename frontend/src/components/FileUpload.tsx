import { useRef, useState } from 'react'
import { Paperclip, X } from 'lucide-react'

interface FileUploadProps {
  files: File[]
  onChange: (files: File[]) => void
}

export default function FileUpload({ files, onChange }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  function addFiles(incoming: FileList | null) {
    if (!incoming) return
    const allowed = Array.from(incoming).filter(
      f => f.type.startsWith('image/') || f.type === 'application/pdf'
    )
    onChange([...files, ...allowed])
  }

  function remove(index: number) {
    onChange(files.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">
        Attach Files <span className="font-normal text-slate-400">(carousel PDF, images — optional)</span>
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }}
        className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed p-5 text-sm transition-colors
          ${dragging ? 'border-blue-400 bg-blue-50' : 'border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/50'}`}
      >
        <Paperclip size={16} className="text-slate-400" />
        <span className="text-slate-500">Drop files here or click to browse</span>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,application/pdf"
          className="hidden"
          onChange={e => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <ul className="flex flex-col gap-1">
          {files.map((f, i) => (
            <li key={i} className="flex items-center justify-between rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-700">
              <span className="truncate max-w-[85%]">{f.name}</span>
              <button onClick={() => remove(i)} className="text-slate-400 hover:text-red-500 transition-colors">
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
