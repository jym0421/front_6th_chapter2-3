// 백엔드 Response DTO 타입들
export interface PostDTO {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
}

export interface PostCreateRequestDTO {
  title: string
  body: string
  userId: number
}

export interface PostUpdateRequestDTO {
  title?: string
  body?: string
}

export interface PostsResponseDTO {
  posts: PostDTO[]
  total: number
  skip: number
  limit: number
}
