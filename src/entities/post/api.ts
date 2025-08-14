import { postsRequests } from "../../shared/api"
import { userApi } from "../user/@x/post"
import { Post, PostsResponse, PostCreateRequest, PostUpdateRequest } from "./model/types"
import {
  mapPostsResponseDTOToPostsResponse,
  mapPostDTOToPost,
  mapPostCreateRequestToDTO,
  mapPostUpdateRequestToDTO,
} from "./api/mappers"

// Post에 author 정보를 추가하는 헬퍼 함수
const enrichPostWithAuthor = async (post: Post): Promise<Post> => {
  try {
    const users = await userApi.getUsers({ limit: 30, select: "id,username,image" })
    const author = users.find((user) => user.id === post.userId)
    return { ...post, author }
  } catch (error) {
    console.warn("Failed to fetch author info:", error)
    return post
  }
}

const enrichPostsWithAuthors = async (posts: Post[]): Promise<Post[]> => {
  try {
    const users = await userApi.getUsers({ limit: 30, select: "id,username,image" })
    return posts.map((post) => {
      const author = users.find((user) => user.id === post.userId)
      return { ...post, author }
    })
  } catch (error) {
    console.warn("Failed to fetch authors info:", error)
    return posts
  }
}

// Post Entity의 비즈니스 로직을 담은 API
export const postApi = {
  // 게시물 목록 조회
  getPosts: async (params: { limit: number; skip: number }): Promise<PostsResponse> => {
    const dto = await postsRequests.getPosts(params)
    const response = mapPostsResponseDTOToPostsResponse(dto)
    const enrichedPosts = await enrichPostsWithAuthors(response.posts)
    return { ...response, posts: enrichedPosts }
  },

  // 게시물 검색
  searchPosts: async (query: string): Promise<PostsResponse> => {
    const dto = await postsRequests.searchPosts(query)
    const response = mapPostsResponseDTOToPostsResponse(dto)
    const enrichedPosts = await enrichPostsWithAuthors(response.posts)
    return { ...response, posts: enrichedPosts }
  },

  // 태그별 게시물 조회
  getPostsByTag: async (tag: string): Promise<PostsResponse> => {
    const dto = await postsRequests.getPostsByTag(tag)
    const response = mapPostsResponseDTOToPostsResponse(dto)
    const enrichedPosts = await enrichPostsWithAuthors(response.posts)
    return { ...response, posts: enrichedPosts }
  },

  // 게시물 생성
  createPost: async (data: PostCreateRequest): Promise<Post> => {
    const dtoRequest = mapPostCreateRequestToDTO(data)
    const dto = await postsRequests.createPost(dtoRequest)
    const post = mapPostDTOToPost(dto)
    return enrichPostWithAuthor(post)
  },

  // 게시물 수정
  updatePost: async (id: string, data: PostUpdateRequest): Promise<Post> => {
    const dtoRequest = mapPostUpdateRequestToDTO(data)
    const dto = await postsRequests.updatePost(Number(id), dtoRequest)
    const post = mapPostDTOToPost(dto)
    return enrichPostWithAuthor(post)
  },

  // 게시물 삭제
  deletePost: async (id: string): Promise<void> => {
    await postsRequests.deletePost(Number(id))
  },
}

// React Query를 위한 Query Factory export
export { postQueries, postQueryKeys } from "./api/post.queries"
