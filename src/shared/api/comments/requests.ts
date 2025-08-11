import { CommentDTO, CommentCreateRequestDTO, CommentUpdateRequestDTO, CommentsResponseDTO } from "./dto"

export const commentsRequests = {
  // 게시물별 댓글 조회
  getCommentsByPost: async (postId: number): Promise<CommentsResponseDTO> => {
    const response = await fetch(`/api/comments/post/${postId}`)
    return response.json()
  },

  // 댓글 생성
  createComment: async (data: CommentCreateRequestDTO): Promise<CommentDTO> => {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  // 댓글 수정
  updateComment: async (id: number, data: CommentUpdateRequestDTO): Promise<CommentDTO> => {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  // 댓글 삭제
  deleteComment: async (id: number): Promise<void> => {
    await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    })
  },

  // 댓글 좋아요
  likeComment: async (id: number, likes: number): Promise<CommentDTO> => {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes }),
    })
    return response.json()
  },
}
