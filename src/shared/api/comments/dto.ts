// 백엔드 Response DTO 타입들
export interface CommentDTO {
  id: number
  body: string
  postId: number
  likes: number
  user: {
    id: number
    username: string
  }
}

export interface CommentCreateRequestDTO {
  body: string
  postId: number
  userId: number
}

export interface CommentUpdateRequestDTO {
  body: string
}

export interface CommentsResponseDTO {
  comments: CommentDTO[]
  total: number
  skip: number
  limit: number
}
