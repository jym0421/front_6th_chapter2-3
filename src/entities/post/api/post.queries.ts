import { queryOptions, keepPreviousData } from "@tanstack/react-query"
import { postApi } from "../api"
import { Post } from "../model/types"

export const postQueries = {
  // 모든 게시물 관련 쿼리의 기본 키
  all: () => ["posts"] as const,

  // 게시물 목록 관련 쿼리들
  lists: () => [...postQueries.all(), "list"] as const,

  // 페이지네이션된 게시물 목록
  list: (page: number, limit: number) =>
    queryOptions({
      queryKey: [...postQueries.lists(), { page, limit }],
      queryFn: () => postApi.getPosts({ limit, skip: page * limit }),
      placeholderData: keepPreviousData,
      staleTime: 5 * 60 * 1000, // 5분
    }),

  // 검색 관련 쿼리들
  searches: () => [...postQueries.all(), "search"] as const,

  // 게시물 검색
  search: (query: string) =>
    queryOptions({
      queryKey: [...postQueries.searches(), query],
      queryFn: () => postApi.searchPosts(query),
      enabled: !!query && query.length > 0,
      staleTime: 2 * 60 * 1000, // 2분
    }),

  // 태그별 조회 관련 쿼리들
  tags: () => [...postQueries.all(), "tag"] as const,

  // 태그별 게시물 조회
  byTag: (tag: string) =>
    queryOptions({
      queryKey: [...postQueries.tags(), tag],
      queryFn: () => postApi.getPostsByTag(tag),
      enabled: !!tag,
      staleTime: 5 * 60 * 1000, // 5분
    }),

  // 개별 게시물 관련 쿼리들
  details: () => [...postQueries.all(), "detail"] as const,

  // 개별 게시물 조회 (필요시 추가)
  detail: (id: string) =>
    queryOptions({
      queryKey: [...postQueries.details(), id],
      queryFn: async (): Promise<Post> => {
        // 현재 API에 개별 조회가 없으므로, 목록에서 찾는 방식으로 구현
        // 실제로는 별도의 API 엔드포인트가 있어야 합니다
        const response = await postApi.getPosts({ limit: 1000, skip: 0 })
        const post = response.posts.find((p: Post) => p.id === id)
        if (!post) {
          throw new Error(`Post with id ${id} not found`)
        }
        return post
      },
      enabled: !!id,
      staleTime: 10 * 60 * 1000, // 10분
    }),
}

// Query Key 무효화를 위한 헬퍼 함수들
export const postQueryKeys = {
  invalidateAll: () => postQueries.all(),
  invalidateLists: () => postQueries.lists(),
  invalidateSearches: () => postQueries.searches(),
  invalidateTags: () => postQueries.tags(),
  invalidateDetails: () => postQueries.details(),
}
