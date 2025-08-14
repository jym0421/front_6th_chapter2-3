import { postApi } from "../../../entities/post"
import { PostFormData, PostEditFormData } from "../model/types"

// Post CRUD Feature의 비즈니스 로직
export const postCrudApi = {
  // 게시물 생성
  createPost: async (data: PostFormData) => {
    return await postApi.createPost({
      title: data.title,
      body: data.body,
      userId: data.userId,
    })
  },

  // 게시물 수정
  updatePost: async (id: string, data: PostEditFormData) => {
    return await postApi.updatePost(id, {
      title: data.title,
      body: data.body,
    })
  },

  // 게시물 삭제
  deletePost: async (id: string) => {
    return await postApi.deletePost(id)
  },
}

// React Query Mutation Hooks
export { useCreatePost, useUpdatePost, useDeletePost } from "./use-post-mutations"
