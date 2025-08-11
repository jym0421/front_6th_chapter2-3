import type { UserPreview } from "../../user/@x/post"

// 프론트엔드 Post Entity 타입 (비즈니스 로직 관점)
export interface Post {
  id: string // 프론트엔드에서는 string으로 처리
  title: string
  body: string
  userId: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  author?: UserPreview
}

export interface PostCreateRequest {
  title: string
  body: string
  userId: string
}

export interface PostUpdateRequest {
  title?: string
  body?: string
}

export interface PostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}
