import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { UserProfile } from "../../../entities/user"
import { User, UserPreview } from "../../../entities/user"
import { userProfileApi } from "../api"

interface UserProfileModalProps {
  user: UserPreview | null
  isOpen: boolean
  onClose: () => void
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, isOpen, onClose }) => {
  const [userDetail, setUserDetail] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user && isOpen) {
      fetchUserDetail(user.id)
    }
  }, [user, isOpen])

  const fetchUserDetail = async (userId: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const userData = await userProfileApi.getUserById(userId)
      setUserDetail(userData)
    } catch (err) {
      setError("사용자 정보를 가져오는데 실패했습니다.")
      console.error("사용자 정보 가져오기 오류:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setUserDetail(null)
    setError(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {isLoading && <div className="text-center">로딩 중...</div>}
          {error && <div className="text-red-500 text-center">{error}</div>}
          {userDetail && <UserProfile user={userDetail} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
