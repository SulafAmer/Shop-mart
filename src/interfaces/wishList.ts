import { brandI } from "./brand"
import { CategoryI } from "./category"
import { SubcategoryI } from "./subcategory"

export interface WishListI {
  status: string
  count: number
  data: Daum[]
}

export interface Daum {
  sold: number
  images: string[]
  subcategory: SubcategoryI[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: CategoryI
  brand: brandI
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}




