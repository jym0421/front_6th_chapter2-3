import React from "react"
import { ThumbsUp, Edit2, Trash2 } from "lucide-react"
import { Comment } from "./model/types"
import { Button } from "../../shared/ui/button"
import { highlightText } from "../../shared/lib/highlight"

interface CommentItemProps {
  comment: Comment
  searchQuery?: string
  onLike?: (id: string) => void
  onEdit?: (comment: Comment) => void
  onDelete?: (id: string) => void
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment, searchQuery = "", onLike, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user.username}:</span>
        <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={() => onLike?.(comment.id)}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onEdit?.(comment)}>
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete?.(comment.id)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}
