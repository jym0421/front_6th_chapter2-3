// 프론트엔드 Comment Entity 타입 (비즈니스 로직 관점)
export interface Comment {
  id: string // 프론트엔드에서는 string으로 처리
  body: string
  postId: string
  likes: number
  user: {
    id: string
    username: string
  }
}

export interface CommentCreateRequest {
  body: string
  postId: string
  userId: string
}

export interface CommentUpdateRequest {
  body: string
}

export interface CommentsResponse {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}
