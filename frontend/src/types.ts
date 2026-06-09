export type Severity = 'high' | 'medium' | 'low'
export type Grade = 'A' | 'B' | 'C' | 'D' | 'F'

export interface CategoryResult {
  score: number
  max: number
  comment: string
}

export interface WeakSpot {
  area: string
  issue: string
  severity: Severity
  fix: string
}

export interface AnalysisResult {
  overall_score: number
  grade: Grade
  summary: string
  categories: {
    hook: CategoryResult
    structure: CategoryResult
    cta_engagement: CategoryResult
    emotional_resonance: CategoryResult
    hashtags: CategoryResult
    length: CategoryResult
  }
  weak_spots: WeakSpot[]
  rewrite: string
  key_improvements: string[]
}
