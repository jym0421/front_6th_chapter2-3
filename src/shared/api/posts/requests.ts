import { PostDTO, PostCreateRequestDTO, PostUpdateRequestDTO, PostsResponseDTO } from "./dto"

export const postsRequests = {
  // 게시물 목록 조회
  getPosts: async (params: { limit: number; skip: number }): Promise<PostsResponseDTO> => {
    const response = await fetch(`/api/posts?limit=${params.limit}&skip=${params.skip}`)
    return response.json()
  },

  // 게시물 검색
  searchPosts: async (query: string): Promise<PostsResponseDTO> => {
    const response = await fetch(`/api/posts/search?q=${query}`)
    return response.json()
  },

  // 태그별 게시물 조회
  getPostsByTag: async (tag: string): Promise<PostsResponseDTO> => {
    const response = await fetch(`/api/posts/tag/${tag}`)
    return response.json()
  },

  // 게시물 생성
  createPost: async (data: PostCreateRequestDTO): Promise<PostDTO> => {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  // 게시물 수정
  updatePost: async (id: number, data: PostUpdateRequestDTO): Promise<PostDTO> => {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  // 게시물 삭제
  deletePost: async (id: number): Promise<void> => {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
  },
}
