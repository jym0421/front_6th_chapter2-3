import React, { useState, useEffect } from "react"
import { Button, Textarea } from "../../../shared/ui"
import { Comment } from "../../../entities/comment"
import { CommentEditFormData } from "../model/types"

interface CommentEditFormProps {
  comment: Comment
  onSubmit: (data: CommentEditFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export const CommentEditForm: React.FC<CommentEditFormProps> = ({ comment, onSubmit, onCancel, isLoading = false }) => {
  const [body, setBody] = useState("")

  useEffect(() => {
    if (comment) {
      setBody(comment.body)
    }
  }, [comment])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!body.trim()) return

    await onSubmit({ body })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Textarea placeholder="댓글 내용" value={body} onChange={(e) => setBody(e.target.value)} rows={3} required />
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={isLoading}>
          {isLoading ? "수정 중..." : "댓글 수정"}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          취소
        </Button>
      </div>
    </form>
  )
}
