import { UserDTO, UserPreviewDTO } from "../../../shared/api"
import { User, UserPreview } from "../model/types"

// DTO를 Entity로 변환하는 mapper 함수들
export function mapUserDTOToUser(dto: UserDTO): User {
  return {
    id: String(dto.id),
    username: dto.username,
    email: dto.email,
    firstName: dto.firstName,
    lastName: dto.lastName,
    gender: dto.gender,
    image: dto.image,
    phone: dto.phone,
    age: dto.age,
    address: dto.address,
    company: dto.company,
  }
}

export function mapUserPreviewDTOToUserPreview(dto: UserPreviewDTO): UserPreview {
  return {
    id: String(dto.id),
    username: dto.username,
    image: dto.image,
  }
}
