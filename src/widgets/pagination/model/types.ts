// Pagination Widget의 타입 정의
export interface PaginationState {
  skip: number
  limit: number
  total: number
}

export interface PaginationProps {
  skip: number
  limit: number
  total: number
  onSkipChange: (skip: number) => void
  onLimitChange: (limit: number) => void
}
