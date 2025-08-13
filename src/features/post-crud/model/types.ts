// Post CRUD Feature의 타입 정의
export interface PostFormData {
  title: string
  body: string
  userId: string
}

export interface PostEditFormData {
  title: string
  body: string
}

export interface PostCrudState {
  isLoading: boolean
  error: string | null
}
