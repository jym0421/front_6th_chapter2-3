import { UserDTO, UserPreviewDTO } from "./dto"

export const usersRequests = {
  // 사용자 목록 조회 (미리보기용)
  getUsers: async (params: { limit: number; select: string }): Promise<{ users: UserPreviewDTO[] }> => {
    const response = await fetch(`/api/users?limit=${params.limit}&select=${params.select}`)
    return response.json()
  },

  // 사용자 상세 정보 조회
  getUserById: async (id: number): Promise<UserDTO> => {
    const response = await fetch(`/api/users/${id}`)
    return response.json()
  },
}
