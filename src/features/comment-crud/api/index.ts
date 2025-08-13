import { commentApi } from "../../../entities/comment"
import { CommentFormData, CommentEditFormData } from "../model/types"

// Comment CRUD Feature의 비즈니스 로직
export const commentCrudApi = {
  // 게시물별 댓글 조회
  getCommentsByPost: async (postId: string) => {
    return await commentApi.getCommentsByPost(postId)
  },

  // 댓글 생성
  createComment: async (data: CommentFormData) => {
    return await commentApi.createComment({
      body: data.body,
      postId: data.postId,
      userId: data.userId,
    })
  },

  // 댓글 수정
  updateComment: async (id: string, data: CommentEditFormData) => {
    return await commentApi.updateComment(id, {
      body: data.body,
    })
  },

  // 댓글 삭제
  deleteComment: async (id: string) => {
    return await commentApi.deleteComment(id)
  },

  // 댓글 좋아요
  likeComment: async (id: string, currentLikes: number) => {
    return await commentApi.likeComment(id, currentLikes + 1)
  },
}
