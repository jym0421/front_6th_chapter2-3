import { userApi } from "../../../entities/user"

// User Profile Feature의 비즈니스 로직
export const userProfileApi = {
  // 사용자 상세 정보 조회
  getUserById: async (id: string) => {
    return await userApi.getUserById(id)
  },
}
