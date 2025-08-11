import { CommentDTO, CommentsResponseDTO } from "../../../shared/api"
import { Comment, CommentsResponse } from "../model/types"

// DTO를 Entity로 변환하는 mapper 함수들
export function mapCommentDTOToComment(dto: CommentDTO): Comment {
  return {
    id: String(dto.id),
    body: dto.body,
    postId: String(dto.postId),
    likes: dto.likes,
    user: {
      id: String(dto.user.id),
      username: dto.user.username,
    },
  }
}

export function mapCommentsResponseDTOToCommentsResponse(dto: CommentsResponseDTO): CommentsResponse {
  return {
    comments: dto.comments.map(mapCommentDTOToComment),
    total: dto.total,
    skip: dto.skip,
    limit: dto.limit,
  }
}

// Entity를 DTO로 변환하는 mapper 함수들 (생성/수정 시 사용)
export function mapCommentCreateRequestToDTO(request: { body: string; postId: string; userId: string }) {
  return {
    body: request.body,
    postId: Number(request.postId),
    userId: Number(request.userId),
  }
}

export function mapCommentUpdateRequestToDTO(request: { body: string }) {
  return {
    body: request.body,
  }
}
