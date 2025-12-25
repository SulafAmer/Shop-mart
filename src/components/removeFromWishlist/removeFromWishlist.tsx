"use client"
import { removeFromWishlistAction } from '@/app/(pages)/wishlist/_action/wishlist.action'
import { ProductI, removeWishlistI,} from '@/interfaces'
import { HeartOffIcon } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'

export default function RemoveFromWishlist({
  productId,
  getWishList,
  setWishlistData
}: {
  productId: string
  getWishList: () => Promise<void>,
  setWishlistData: React.Dispatch<React.SetStateAction<ProductI[]>>
}) {
  async function removeWishlistItem(productId:string){
    const data=await removeFromWishlistAction(productId)
    if(data.status=="success"){
      await getWishList()
      toast.success("product removed successfully")
    }




  }

  return <>
  <button className=' cursor-pointer' onClick={()=>removeWishlistItem(productId)}>

  <HeartOffIcon/>
  </button>
  </>
}
