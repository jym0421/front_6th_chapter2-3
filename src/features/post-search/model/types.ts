// Post Search Feature의 타입 정의
export interface SearchState {
  query: string
  isLoading: boolean
  error: string | null
}

export interface SearchFilters {
  tag?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface SearchParams extends SearchFilters {
  query: string
}
