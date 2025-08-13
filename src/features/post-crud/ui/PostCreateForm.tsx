import React, { useState } from "react"
import { Button, Input, Textarea } from "../../../shared/ui"
import { PostFormData } from "../model/types"

interface PostCreateFormProps {
  onSubmit: (data: PostFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export const PostCreateForm: React.FC<PostCreateFormProps> = ({ onSubmit, onCancel, isLoading = false }) => {
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    body: "",
    userId: "1",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.body.trim()) return

    await onSubmit(formData)
    setFormData({ title: "", body: "", userId: "1" })
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
        rows={10}
        placeholder="내용"
        value={formData.body}
        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
        required
      />
      <Input
        type="number"
        placeholder="사용자 ID"
        value={formData.userId}
        onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
        required
      />
      <div className="flex gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "추가 중..." : "게시물 추가"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          취소
        </Button>
      </div>
    </form>
  )
}
