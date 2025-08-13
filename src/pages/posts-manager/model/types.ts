import { Post } from "../../../entities/post"
import { Comment } from "../../../entities/comment"
import { UserPreview } from "../../../entities/user"

// Posts Manager Page의 상태 타입
export interface PostsManagerState {
  // 게시물 관련
  posts: Post[]
  total: number
  skip: number
  limit: number
  isLoading: boolean

  // 검색 및 필터 관련
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: "asc" | "desc"

  // 태그 관련
  tags: Array<{ slug: string; url: string }>

  // 댓글 관련
  comments: Record<string, Comment[]>

  // 모달 상태
  showAddDialog: boolean
  showEditDialog: boolean
  showPostDetailDialog: boolean
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
  showUserModal: boolean

  // 선택된 항목들
  selectedPost: Post | null
  selectedComment: Comment | null
  selectedUser: UserPreview | null
}

// URL 쿼리 파라미터 타입
export interface URLParams {
  skip?: string
  limit?: string
  search?: string
  sortBy?: string
  sortOrder?: string
  tag?: string
}
