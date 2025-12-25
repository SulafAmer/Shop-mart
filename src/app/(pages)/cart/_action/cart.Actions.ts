"use server"

import { getUserToken } from "@/app/Helpers/getUserToken"
import { cartResponse } from "@/interfaces"

export async function removeCartItemAction(productId:string){
       const token=await getUserToken()
    const response=await fetch("https://ecommerce.routemisr.com/api/v1/cart/"+productId,{
      method:"DELETE",
      headers:{
        token:String(token)
      }
    })
    const data:cartResponse=await response.json()
    return data
}
export async function updateCartItemAction(productId:string,count:number){
       const token=await getUserToken()
    const response=await fetch("https://ecommerce.routemisr.com/api/v1/cart/"+productId,{
      method:"PUT",
      body:JSON.stringify({count}),
    
      headers:{
        token:String(token),
        "content-type":"application/json"
      }
    })
    const data:cartResponse=await response.json()
    return data
}
export async function clearCartAction(){
       const token=await getUserToken()
    const response=await fetch("https://ecommerce.routemisr.com/api/v1/cart/",{
      method:"DELETE",
      headers:{
        token:String(token)
      }
    })
    const data:cartResponse=await response.json()
    return data
}