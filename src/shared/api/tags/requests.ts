import { Tag } from "../common/dto"

export const tagsRequests = {
  // 태그 목록 조회
  getTags: async (): Promise<Tag[]> => {
    const response = await fetch("/api/posts/tags")
    return response.json()
  },
}
