export interface Restaurant {
  id: string
  name: string
  slug: string
  address: string
  reviews?: Review[]
}

export interface Review {
  id: string
  title: string
  description: string
  rating: number
  user: User
}

export interface User {
  id: number
  name: string
  email: string
} 