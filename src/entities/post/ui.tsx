import React from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Post } from "./model/types"
import { highlightText } from "../../shared/lib/highlight"

interface PostCardProps {
  post: Post
  searchQuery?: string
  onTagClick?: (tag: string) => void
  onAuthorClick?: (author: Post["author"]) => void
}

export const PostCard: React.FC<PostCardProps> = ({ post, searchQuery = "", onTagClick, onAuthorClick }) => {
  return (
    <div className="space-y-2">
      <div className="font-medium">{highlightText(post.title, searchQuery)}</div>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer text-blue-800 bg-blue-100 hover:bg-blue-200"
              onClick={() => onTagClick?.(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {post.author && (
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onAuthorClick?.(post.author)}>
          <img src={post.author.image} alt={post.author.username} className="w-8 h-8 rounded-full" />
          <span>{post.author.username}</span>
        </div>
      )}

      <div className="flex items-center gap-2">
        <ThumbsUp className="w-4 h-4" />
        <span>{post.reactions?.likes || 0}</span>
        <ThumbsDown className="w-4 h-4" />
        <span>{post.reactions?.dislikes || 0}</span>
      </div>
    </div>
  )
}
