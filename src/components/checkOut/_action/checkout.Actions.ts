
"use server"

import { getUserToken } from "@/app/Helpers/getUserToken"

export async function checkoutSessionAction(cartId:string,details:string|undefined,city:string|undefined,phone:string|undefined){
    const shippingAddress={
      details,
      city,
      phone,
      
    }
       const token=await getUserToken()
    const response=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
      method:"POST",
      body:JSON.stringify({shippingAddress}),
      headers:{
        token:String(token),
        "content-type":"application/json"
      }
    })

    const data=await response.json()
    return data
}
export async function cashOrderAction(cartId:string,details:string|undefined,city:string|undefined,phone:string|undefined){
    const shippingAddress={
      details,
      city,
      phone,
      
    }
       const token=await getUserToken()
    const response=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/`+cartId,{
      method:"POST",
      body:JSON.stringify({shippingAddress}),
      headers:{
        token:String(token),
        "content-type":"application/json"
      }
    })

    const data=await response.json()
    return data
}