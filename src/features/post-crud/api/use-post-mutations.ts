import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postApi, postQueryKeys } from "../../../entities/post"
import { PostCreateRequest, PostUpdateRequest } from "../../../entities/post/model/types"

// 게시물 생성 Mutation Hook
export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PostCreateRequest) => postApi.createPost(data),
    onSuccess: () => {
      // 게시물 목록 쿼리들을 무효화하여 새로고침
      queryClient.invalidateQueries({ queryKey: postQueryKeys.invalidateLists() })
      queryClient.invalidateQueries({ queryKey: postQueryKeys.invalidateSearches() })
      queryClient.invalidateQueries({ queryKey: postQueryKeys.invalidateTags() })
    },
    onError: (error) => {
      console.error("게시물 생성 실패:", error)
    },
  })
}

// 게시물 수정 Mutation Hook
export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PostUpdateRequest }) => postApi.updatePost(id, data),
    onSuccess: (updatedPost) => {
      // 관련 쿼리들을 무효화
      queryClient.invalidateQueries({ queryKey: postQueryKeys.invalidateLists() })
      queryClient.invalidateQueries({ queryKey: postQueryKeys.invalidateSearches() })
      queryClient.invalidateQueries({ queryKey: postQueryKeys.invalidateTags() })

      // 개별 게시물 캐시 업데이트
      queryClient.setQueryData([...postQueryKeys.invalidateDetails(), updatedPost.id], updatedPost)
    },
    onError: (error) => {
      console.error("게시물 수정 실패:", error)
    },
  })
}

// 게시물 삭제 Mutation Hook
export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => postApi.deletePost(id),
    onSuccess: (_, deletedId) => {
      // 관련 쿼리들을 무효화
      queryClient.invalidateQueries({ queryKey: postQueryKeys.invalidateLists() })
      queryClient.invalidateQueries({ queryKey: postQueryKeys.invalidateSearches() })
      queryClient.invalidateQueries({ queryKey: postQueryKeys.invalidateTags() })

      // 개별 게시물 캐시에서 제거
      queryClient.removeQueries({
        queryKey: [...postQueryKeys.invalidateDetails(), deletedId],
      })
    },
    onError: (error) => {
      console.error("게시물 삭제 실패:", error)
    },
  })
}
