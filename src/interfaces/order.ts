import { Item } from './cart';
import { ProductI } from "./product"

export interface OrderI {
  shippingAddress: ShippingAddress
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: orderUser
  cartItems: Item[]
  paidAt: string
  createdAt: string
  updatedAt: string
  id: number
  __v: number
}

export interface ShippingAddress {
  details: string
  city: string
  phone: string
}

export interface orderUser {
  _id: string
  name: string
  email: string
  phone: string
}
