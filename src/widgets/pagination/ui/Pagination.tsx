import React from "react"
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
import { PaginationProps } from "../model/types"

export const Pagination: React.FC<PaginationProps> = ({ skip, limit, total, onSkipChange, onLimitChange }) => {
  const currentPage = Math.floor(skip / limit) + 1
  const totalPages = Math.ceil(total / limit)

  const handlePrevious = () => {
    const newSkip = Math.max(0, skip - limit)
    onSkipChange(newSkip)
  }

  const handleNext = () => {
    const newSkip = skip + limit
    if (newSkip < total) {
      onSkipChange(newSkip)
    }
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={(value) => onLimitChange(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          {total > 0 ? `${skip + 1}-${Math.min(skip + limit, total)} / ${total}` : "0 / 0"}
        </span>
        <Button disabled={skip === 0} onClick={handlePrevious}>
          이전
        </Button>
        <span className="text-sm">{totalPages > 0 ? `${currentPage} / ${totalPages}` : "0 / 0"}</span>
        <Button disabled={skip + limit >= total} onClick={handleNext}>
          다음
        </Button>
      </div>
    </div>
  )
}
