import React, { useState, useEffect } from "react"
import { Button, Input, Textarea } from "../../../shared/ui"
import { Post } from "../../../entities/post"
import { PostEditFormData } from "../model/types"

interface PostEditFormProps {
  post: Post
  onSubmit: (data: PostEditFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export const PostEditForm: React.FC<PostEditFormProps> = ({ post, onSubmit, onCancel, isLoading = false }) => {
  const [formData, setFormData] = useState<PostEditFormData>({
    title: "",
    body: "",
  })

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        body: post.body,
      })
    }
  }, [post])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.body.trim()) return

    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="제목"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <Textarea
        rows={15}
        placeholder="내용"
        value={formData.body}
        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
        required
      />
      <div className="flex gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "수정 중..." : "게시물 수정"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          취소
        </Button>
      </div>
    </form>
  )
}
