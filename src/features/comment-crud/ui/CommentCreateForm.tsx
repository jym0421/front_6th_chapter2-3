import React, { useState } from "react"
import { Plus } from "lucide-react"
import { Button, Textarea } from "../../../shared/ui"
import { CommentFormData } from "../model/types"

interface CommentCreateFormProps {
  postId: string
  onSubmit: (data: CommentFormData) => Promise<void>
  isLoading?: boolean
}

export const CommentCreateForm: React.FC<CommentCreateFormProps> = ({ postId, onSubmit, isLoading = false }) => {
  const [body, setBody] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!body.trim()) return

    await onSubmit({
      body,
      postId,
      userId: "1", // 현재는 고정값, 실제로는 로그인한 사용자 ID
    })
    setBody("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Textarea
        placeholder="댓글을 입력하세요..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        required
      />
      <Button type="submit" size="sm" disabled={isLoading || !body.trim()}>
        <Plus className="w-3 h-3 mr-1" />
        {isLoading ? "추가 중..." : "댓글 추가"}
      </Button>
    </form>
  )
}
