import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Plus } from "lucide-react"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../shared/ui"
import { PostsTable } from "../../../widgets/posts-table"
import { Pagination } from "../../../widgets/pagination"
import { PostFilters } from "../../../widgets/post-filters"
import { SearchBar } from "../../../features/post-search"
import { PostCreateForm, PostEditForm } from "../../../features/post-crud"
import { CommentCreateForm, CommentEditForm } from "../../../features/comment-crud"
import { UserProfileModal } from "../../../features/user-profile"
import { highlightText } from "../../../shared/lib"
import { postsManagerApi } from "../api"
import { PostsManagerState } from "../model/types"
import { Post } from "../../../entities/post"
import { Comment } from "../../../entities/comment"
import { UserPreview } from "../../../entities/user"

export const PostsManagerPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 상태 관리
  const [state, setState] = useState<PostsManagerState>({
    posts: [],
    total: 0,
    skip: parseInt(queryParams.get("skip") || "0"),
    limit: parseInt(queryParams.get("limit") || "10"),
    isLoading: false,
    searchQuery: queryParams.get("search") || "",
    selectedTag: queryParams.get("tag") || "",
    sortBy: queryParams.get("sortBy") || "",
    sortOrder: (queryParams.get("sortOrder") as "asc" | "desc") || "asc",
    tags: [],
    comments: {},
    showAddDialog: false,
    showEditDialog: false,
    showPostDetailDialog: false,
    showAddCommentDialog: false,
    showEditCommentDialog: false,
    showUserModal: false,
    selectedPost: null,
    selectedComment: null,
    selectedUser: null,
  })

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()
    if (state.skip) params.set("skip", state.skip.toString())
    if (state.limit) params.set("limit", state.limit.toString())
    if (state.searchQuery) params.set("search", state.searchQuery)
    if (state.sortBy) params.set("sortBy", state.sortBy)
    if (state.sortOrder) params.set("sortOrder", state.sortOrder)
    if (state.selectedTag) params.set("tag", state.selectedTag)
    navigate(`?${params.toString()}`)
  }

  // 게시물 가져오기
  const fetchPosts = async () => {
    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      const data = await postsManagerApi.getPosts({ limit: state.limit, skip: state.skip })
      setState((prev) => ({ ...prev, posts: data.posts, total: data.total }))
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }

  // 태그 가져오기
  const fetchTags = async () => {
    try {
      const tags = await postsManagerApi.getTags()
      setState((prev) => ({ ...prev, tags }))
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  // 게시물 검색
  const handleSearch = async () => {
    if (!state.searchQuery) {
      fetchPosts()
      return
    }
    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      const data = await postsManagerApi.searchPosts(state.searchQuery)
      setState((prev) => ({ ...prev, posts: data.posts, total: data.total }))
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }

  // 태그별 게시물 가져오기
  const handleTagChange = async (tag: string) => {
    setState((prev) => ({ ...prev, selectedTag: tag }))
    if (!tag || tag === "all") {
      fetchPosts()
      return
    }
    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      const data = await postsManagerApi.getPostsByTag(tag)
      setState((prev) => ({ ...prev, posts: data.posts, total: data.total }))
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }

  // 게시물 생성
  const handlePostCreate = async (data: { title: string; body: string; userId: string }) => {
    try {
      const newPost = await postsManagerApi.createPost(data)
      setState((prev) => ({
        ...prev,
        posts: [newPost, ...prev.posts],
        showAddDialog: false,
      }))
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  // 게시물 수정
  const handlePostEdit = async (data: { title: string; body: string }) => {
    if (!state.selectedPost) return
    try {
      const updatedPost = await postsManagerApi.updatePost(state.selectedPost.id, data)
      setState((prev) => ({
        ...prev,
        posts: prev.posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
        showEditDialog: false,
        selectedPost: null,
      }))
    } catch (error) {
      console.error("게시물 수정 오류:", error)
    }
  }

  // 게시물 삭제
  const handlePostDelete = async (id: string) => {
    try {
      await postsManagerApi.deletePost(id)
      setState((prev) => ({
        ...prev,
        posts: prev.posts.filter((post) => post.id !== id),
      }))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  // 게시물 상세 보기
  const handlePostDetail = async (post: Post) => {
    setState((prev) => ({ ...prev, selectedPost: post, showPostDetailDialog: true }))
    if (!state.comments[post.id]) {
      try {
        const commentsData = await postsManagerApi.getCommentsByPost(post.id)
        // API 응답이 배열인지 객체인지 확인하고 적절히 처리
        const comments = Array.isArray(commentsData) ? commentsData : commentsData.comments || []
        setState((prev) => ({
          ...prev,
          comments: { ...prev.comments, [post.id]: comments },
        }))
      } catch (error) {
        console.error("댓글 가져오기 오류:", error)
      }
    }
  }

  // 사용자 클릭
  const handleUserClick = async (user: UserPreview) => {
    try {
      const userData = await postsManagerApi.getUserById(user.id)
      setState((prev) => ({ ...prev, selectedUser: userData, showUserModal: true }))
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  // 댓글 생성
  const handleCommentCreate = async (data: { body: string; postId: string; userId: string }) => {
    try {
      const newComment = await postsManagerApi.createComment(data)
      setState((prev) => ({
        ...prev,
        comments: {
          ...prev.comments,
          [data.postId]: [...(prev.comments[data.postId] || []), newComment],
        },
        showAddCommentDialog: false,
      }))
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  // 댓글 수정
  const handleCommentEdit = async (data: { body: string }) => {
    if (!state.selectedComment) return
    try {
      const updatedComment = await postsManagerApi.updateComment(state.selectedComment.id, data)
      setState((prev) => ({
        ...prev,
        comments: {
          ...prev.comments,
          [updatedComment.postId]: prev.comments[updatedComment.postId].map((comment) =>
            comment.id === updatedComment.id ? updatedComment : comment,
          ),
        },
        showEditCommentDialog: false,
        selectedComment: null,
      }))
    } catch (error) {
      console.error("댓글 수정 오류:", error)
    }
  }

  // 댓글 삭제
  const handleCommentDelete = async (id: string, postId: string) => {
    try {
      await postsManagerApi.deleteComment(id)
      setState((prev) => ({
        ...prev,
        comments: {
          ...prev.comments,
          [postId]: prev.comments[postId].filter((comment) => comment.id !== id),
        },
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  // 댓글 좋아요
  const handleCommentLike = async (id: string, postId: string) => {
    const comment = state.comments[postId]?.find((c) => c.id === id)
    if (!comment) return

    try {
      await postsManagerApi.likeComment(id, comment.likes)
      setState((prev) => ({
        ...prev,
        comments: {
          ...prev.comments,
          [postId]: prev.comments[postId].map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c)),
        },
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  // 초기 데이터 로드
  useEffect(() => {
    fetchTags()
  }, [])

  useEffect(() => {
    if (state.selectedTag) {
      handleTagChange(state.selectedTag)
    } else {
      fetchPosts()
    }
    updateURL()
  }, [state.skip, state.limit, state.sortBy, state.sortOrder])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setState((prev) => ({
      ...prev,
      skip: parseInt(params.get("skip") || "0"),
      limit: parseInt(params.get("limit") || "10"),
      searchQuery: params.get("search") || "",
      sortBy: params.get("sortBy") || "",
      sortOrder: (params.get("sortOrder") as "asc" | "desc") || "asc",
      selectedTag: params.get("tag") || "",
    }))
  }, [location.search])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setState((prev) => ({ ...prev, showAddDialog: true }))}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <SearchBar
              value={state.searchQuery}
              onChange={(value) => setState((prev) => ({ ...prev, searchQuery: value }))}
              onSearch={handleSearch}
            />
            <PostFilters
              tags={state.tags}
              selectedTag={state.selectedTag}
              sortBy={state.sortBy}
              sortOrder={state.sortOrder}
              onTagChange={handleTagChange}
              onSortByChange={(sortBy) => setState((prev) => ({ ...prev, sortBy }))}
              onSortOrderChange={(sortOrder) => setState((prev) => ({ ...prev, sortOrder }))}
            />
          </div>

          {/* 게시물 테이블 */}
          <PostsTable
            posts={state.posts}
            searchQuery={state.searchQuery}
            isLoading={state.isLoading}
            onPostDetail={handlePostDetail}
            onPostEdit={(post) => setState((prev) => ({ ...prev, selectedPost: post, showEditDialog: true }))}
            onPostDelete={handlePostDelete}
            onUserClick={handleUserClick}
            onTagClick={handleTagChange}
          />

          {/* 페이지네이션 */}
          <Pagination
            skip={state.skip}
            limit={state.limit}
            total={state.total}
            onSkipChange={(skip) => setState((prev) => ({ ...prev, skip }))}
            onLimitChange={(limit) => setState((prev) => ({ ...prev, limit }))}
          />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <Dialog
        open={state.showAddDialog}
        onOpenChange={(open) => setState((prev) => ({ ...prev, showAddDialog: open }))}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 게시물 추가</DialogTitle>
          </DialogHeader>
          <PostCreateForm
            onSubmit={handlePostCreate}
            onCancel={() => setState((prev) => ({ ...prev, showAddDialog: false }))}
          />
        </DialogContent>
      </Dialog>

      {/* 게시물 수정 대화상자 */}
      <Dialog
        open={state.showEditDialog}
        onOpenChange={(open) => setState((prev) => ({ ...prev, showEditDialog: open }))}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          {state.selectedPost && (
            <PostEditForm
              post={state.selectedPost}
              onSubmit={handlePostEdit}
              onCancel={() => setState((prev) => ({ ...prev, showEditDialog: false, selectedPost: null }))}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* 게시물 상세 보기 대화상자 */}
      <Dialog
        open={state.showPostDetailDialog}
        onOpenChange={(open) => setState((prev) => ({ ...prev, showPostDetailDialog: open }))}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {state.selectedPost && highlightText(state.selectedPost.title, state.searchQuery)}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {state.selectedPost && (
              <>
                {/* 게시물 내용 */}
                <div className="space-y-2">
                  <p>{highlightText(state.selectedPost.body, state.searchQuery)}</p>
                  <div className="flex flex-wrap gap-1">
                    {state.selectedPost.tags?.map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 댓글 목록 */}
                <div className="space-y-2">
                  <h3 className="font-semibold">댓글</h3>
                  {(state.comments[state.selectedPost.id] || []).map((comment: Comment) => (
                    <div key={comment.id} className="border p-2 rounded">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm">{highlightText(comment.body, state.searchQuery)}</p>
                          <p className="text-xs text-gray-500">좋아요: {comment.likes}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              setState((prev) => ({ ...prev, selectedComment: comment, showEditCommentDialog: true }))
                            }
                          >
                            수정
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCommentDelete(comment.id, state.selectedPost!.id)}
                          >
                            삭제
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCommentLike(comment.id, state.selectedPost!.id)}
                          >
                            좋아요
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 댓글 작성 */}
                <CommentCreateForm postId={state.selectedPost.id} onSubmit={handleCommentCreate} />
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 수정 대화상자 */}
      <Dialog
        open={state.showEditCommentDialog}
        onOpenChange={(open) => setState((prev) => ({ ...prev, showEditCommentDialog: open }))}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          {state.selectedComment && (
            <CommentEditForm
              comment={state.selectedComment}
              onSubmit={handleCommentEdit}
              onCancel={() => setState((prev) => ({ ...prev, showEditCommentDialog: false, selectedComment: null }))}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* 사용자 모달 */}
      <UserProfileModal
        user={state.selectedUser}
        isOpen={state.showUserModal}
        onClose={() => setState((prev) => ({ ...prev, showUserModal: false, selectedUser: null }))}
      />
    </Card>
  )
}
