// 백엔드 Response DTO 타입들
export interface UserDTO {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  phone: string
  age: number
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
  company: {
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

export interface UserPreviewDTO {
  id: number
  username: string
  image: string
}
