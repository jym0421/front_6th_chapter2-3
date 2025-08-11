import { PostDTO, PostsResponseDTO } from "../../../shared/api"
import { Post, PostsResponse } from "../model/types"

// DTO를 Entity로 변환하는 mapper 함수들
export function mapPostDTOToPost(dto: PostDTO): Post {
  return {
    id: String(dto.id),
    title: dto.title,
    body: dto.body,
    userId: String(dto.userId),
    tags: dto.tags,
    reactions: dto.reactions,
  }
}

export function mapPostsResponseDTOToPostsResponse(dto: PostsResponseDTO): PostsResponse {
  return {
    posts: dto.posts.map(mapPostDTOToPost),
    total: dto.total,
    skip: dto.skip,
    limit: dto.limit,
  }
}

// Entity를 DTO로 변환하는 mapper 함수들 (생성/수정 시 사용)
export function mapPostCreateRequestToDTO(request: { title: string; body: string; userId: string }) {
  return {
    title: request.title,
    body: request.body,
    userId: Number(request.userId),
  }
}

export function mapPostUpdateRequestToDTO(request: { title?: string; body?: string }) {
  return {
    title: request.title,
    body: request.body,
  }
}
