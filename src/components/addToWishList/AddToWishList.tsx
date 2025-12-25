"use client"
import { BookmarkIcon, HeartIcon } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'

import { addToWishlistAction } from '@/app/(pages)/wishlist/_action/wishlist.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


export default function AddToWishList(productId:string) {
  const session=useSession()
    const router=useRouter()
   async function addProductToWishlist() {
       if(session.status=="authenticated"){
        const data=await addToWishlistAction(productId)
        data.status=="success"&&toast.success("Product added successfully to wishlist")
      }else{
        router.push("/login")
    }
   }

  return <>
  <button onClick={addProductToWishlist}>
    <HeartIcon/>
    
  </button>
  
  </>
    
}
