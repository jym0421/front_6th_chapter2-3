// 프론트엔드 User Entity 타입 (비즈니스 로직 관점)
export interface User {
  id: string // 프론트엔드에서는 string으로 처리
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  phone: string
  age: number
  address?: {
    address: string
    city: string
    state: string
    stateCode: string
    postalCode: string
    coordinates: {
      lat: number
      lng: number
    }
    country: string
  }
  company?: {
    department: string
    name: string
    title: string
    address: {
      address: string
      city: string
      state: string
      stateCode: string
      postalCode: string
      coordinates: {
        lat: number
        lng: number
      }
      country: string
    }
  }
}

export interface UserPreview {
  id: string
  username: string
  image: string
}
