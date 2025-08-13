// Comment CRUD Feature의 타입 정의
export interface CommentFormData {
  body: string
  postId: string
  userId: string
}

export interface CommentEditFormData {
  body: string
}

export interface CommentCrudState {
  isLoading: boolean
  error: string | null
}
