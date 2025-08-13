// Post Filters Widget의 타입 정의
export interface FilterState {
  selectedTag: string
  sortBy: string
  sortOrder: "asc" | "desc"
}

export interface PostFiltersProps {
  tags: Array<{ slug: string; url: string }>
  selectedTag: string
  sortBy: string
  sortOrder: "asc" | "desc"
  onTagChange: (tag: string) => void
  onSortByChange: (sortBy: string) => void
  onSortOrderChange: (sortOrder: "asc" | "desc") => void
}
