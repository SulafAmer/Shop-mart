"use server"

import { getUserToken } from "@/app/Helpers/getUserToken"
import { cartResponse } from "@/interfaces"

export async function getCartAction(){
       const token=await getUserToken()

       

   const response=await fetch("https://ecommerce.routemisr.com/api/v1/cart",{
               headers:{
                   token:String(token)
               }})
           const data:cartResponse=await response.json()    
        return data
}