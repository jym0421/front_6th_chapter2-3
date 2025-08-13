import { postApi } from "../../../entities/post"
import { postCrudApi } from "../../../features/post-crud"
import { postSearchApi } from "../../../features/post-search"
import { commentCrudApi } from "../../../features/comment-crud"
import { userProfileApi } from "../../../features/user-profile"
import { tagsRequests } from "../../../shared/api"

// Posts Manager Page의 비즈니스 로직
export const postsManagerApi = {
  // 게시물 목록 조회
  getPosts: async (params: { limit: number; skip: number }) => {
    return await postApi.getPosts(params)
  },

  // 게시물 검색
  searchPosts: async (query: string) => {
    return await postSearchApi.searchPosts({ query })
  },

  // 태그별 게시물 조회
  getPostsByTag: async (tag: string) => {
    return await postSearchApi.getPostsByTag(tag)
  },

  // 태그 목록 조회
  getTags: async () => {
    return await tagsRequests.getTags()
  },

  // 게시물 CRUD
  createPost: async (data: { title: string; body: string; userId: string }) => {
    return await postCrudApi.createPost(data)
  },

  updatePost: async (id: string, data: { title: string; body: string }) => {
    return await postCrudApi.updatePost(id, data)
  },

  deletePost: async (id: string) => {
    return await postCrudApi.deletePost(id)
  },

  // 댓글 CRUD
  getCommentsByPost: async (postId: string) => {
    return await commentCrudApi.getCommentsByPost(postId)
  },

  createComment: async (data: { body: string; postId: string; userId: string }) => {
    return await commentCrudApi.createComment(data)
  },

  updateComment: async (id: string, data: { body: string }) => {
    return await commentCrudApi.updateComment(id, data)
  },

  deleteComment: async (id: string) => {
    return await commentCrudApi.deleteComment(id)
  },

  likeComment: async (id: string, currentLikes: number) => {
    return await commentCrudApi.likeComment(id, currentLikes)
  },

  // 사용자 정보 조회
  getUserById: async (id: string) => {
    return await userProfileApi.getUserById(id)
  },
}
