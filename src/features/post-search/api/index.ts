import { postApi } from "../../../entities/post"
import { SearchParams } from "../model/types"

// Post Search Feature의 비즈니스 로직
export const postSearchApi = {
  // 게시물 검색
  searchPosts: async (params: SearchParams) => {
    if (!params.query.trim()) {
      // 검색어가 없으면 일반 목록 조회
      return await postApi.getPosts({ limit: 10, skip: 0 })
    }

    return await postApi.searchPosts(params.query)
  },

  // 태그별 게시물 조회
  getPostsByTag: async (tag: string) => {
    if (!tag || tag === "all") {
      return await postApi.getPosts({ limit: 10, skip: 0 })
    }

    return await postApi.getPostsByTag(tag)
  },
}
