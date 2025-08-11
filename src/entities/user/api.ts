import { usersRequests } from "../../shared/api"
import { User, UserPreview } from "./model/types"
import { mapUserDTOToUser, mapUserPreviewDTOToUserPreview } from "./api/mappers"

// User Entity의 비즈니스 로직을 담은 API
export const userApi = {
  // 사용자 목록 조회 (미리보기용)
  getUsers: async (params: { limit: number; select: string }): Promise<UserPreview[]> => {
    const dto = await usersRequests.getUsers(params)
    return dto.users.map(mapUserPreviewDTOToUserPreview)
  },

  // 사용자 상세 정보 조회
  getUserById: async (id: string): Promise<User> => {
    const dto = await usersRequests.getUserById(Number(id))
    return mapUserDTOToUser(dto)
  },
}
