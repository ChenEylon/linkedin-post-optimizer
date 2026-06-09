import type { AnalysisResult } from '../types'

export async function analyzePost(text: string, files: File[]): Promise<AnalysisResult> {
  const form = new FormData()
  form.append('post_text', text)
  files.forEach(f => form.append('files', f))

  const res = await fetch('/api/analyze', { method: 'POST', body: form })

  if (!res.ok) {
    const body = await res.json().catch(() => ({ detail: 'Unknown error' }))
    throw new Error(body.detail ?? `Request failed (${res.status})`)
  }

  return res.json()
}
