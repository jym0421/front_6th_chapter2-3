// 공통 DTO 타입들
export interface Tag {
  slug: string
  name: string
  url: string
}

export interface PaginationParams {
  limit: number
  skip: number
}

export interface SearchParams {
  q: string
}
