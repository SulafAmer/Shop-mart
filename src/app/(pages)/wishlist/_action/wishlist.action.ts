"use server"

import { getUserToken } from "@/app/Helpers/getUserToken"
import { ProductI, removeWishlistI } from "@/interfaces"

export async function getWishlistAction(){
       const token=await getUserToken()
   const response=await fetch("https://ecommerce.routemisr.com/api/v1/wishlist",{
       headers:{
             token:String(token),
             "content-type":"application/json"
               }
     })
    const data:{data:ProductI[]}=await response.json()
    return data
}
export async function addToWishlistAction(productId:string){
       const token=await getUserToken()
  const response=await fetch("https://ecommerce.routemisr.com/api/v1/wishlist",{
      method:"POST",
      body:JSON.stringify({productId}),
      headers:{
          token:String(token),
          "content-type":"application/json"
            }
     })
     const data=await response.json()
    return data
}
export async function removeFromWishlistAction(productId:string){
       const token=await getUserToken()
  const response=await fetch("https://ecommerce.routemisr.com/api/v1/wishlist/"+productId,{
      method:"DELETE",
      headers:{
        token:String(token)
      }
    })
    const data:removeWishlistI=await response.json()
    return data
}