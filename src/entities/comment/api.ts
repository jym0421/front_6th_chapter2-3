import { commentsRequests } from "../../shared/api"
import { Comment, CommentsResponse, CommentCreateRequest, CommentUpdateRequest } from "./model/types"
import {
  mapCommentsResponseDTOToCommentsResponse,
  mapCommentDTOToComment,
  mapCommentCreateRequestToDTO,
  mapCommentUpdateRequestToDTO,
} from "./api/mappers"

// Comment Entity의 비즈니스 로직을 담은 API
export const commentApi = {
  // 게시물별 댓글 조회
  getCommentsByPost: async (postId: string): Promise<CommentsResponse> => {
    const dto = await commentsRequests.getCommentsByPost(Number(postId))
    return mapCommentsResponseDTOToCommentsResponse(dto)
  },

  // 댓글 생성
  createComment: async (data: CommentCreateRequest): Promise<Comment> => {
    const dtoRequest = mapCommentCreateRequestToDTO(data)
    const dto = await commentsRequests.createComment(dtoRequest)
    return mapCommentDTOToComment(dto)
  },

  // 댓글 수정
  updateComment: async (id: string, data: CommentUpdateRequest): Promise<Comment> => {
    const dtoRequest = mapCommentUpdateRequestToDTO(data)
    const dto = await commentsRequests.updateComment(Number(id), dtoRequest)
    return mapCommentDTOToComment(dto)
  },

  // 댓글 삭제
  deleteComment: async (id: string): Promise<void> => {
    await commentsRequests.deleteComment(Number(id))
  },

  // 댓글 좋아요
  likeComment: async (id: string, likes: number): Promise<Comment> => {
    const dto = await commentsRequests.likeComment(Number(id), likes)
    return mapCommentDTOToComment(dto)
  },
}
