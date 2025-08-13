import { Post } from "../../../entities/post"
import { UserPreview } from "../../../entities/user"

// Posts Table Widget의 타입 정의
export interface PostsTableProps {
  posts: Post[]
  searchQuery: string
  isLoading: boolean
  onPostDetail: (post: Post) => void
  onPostEdit: (post: Post) => void
  onPostDelete: (id: string) => void
  onUserClick: (user: UserPreview) => void
  onTagClick: (tag: string) => void
}
