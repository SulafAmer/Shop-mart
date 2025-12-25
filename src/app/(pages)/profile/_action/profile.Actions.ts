"use server"

import { getUserToken } from "@/app/Helpers/getUserToken"
import { AddressesI, AddressI } from "@/interfaces/address"

export async function getUserAddressesAction(){
       const token=await getUserToken()
    const response=await fetch("https://ecommerce.routemisr.com/api/v1/addresses",{
    headers:{
          token:String(token),
          "content-type":"application/json"
            }
  })
    const data:{data:AddressI[]}=await response.json()
    return data
}
export async function removeAddressAction(addressId:string){
       const token=await getUserToken()
    const response=await fetch("https://ecommerce.routemisr.com/api/v1/addresses/"+addressId,{
    method:"DELETE",
    headers:{
          token:String(token),
          "content-type":"application/json"
            }
  })
    const data:AddressesI=await response.json()
    return data
}
export async function addAddressAction(name:string|undefined,details:string|undefined,city:string|undefined,phone:string|undefined){
       const token=await getUserToken()
      const response=await fetch("https://ecommerce.routemisr.com/api/v1/addresses/",{
    method:"POST",
    body:JSON.stringify({
      name:name,
       details:details,
      city:city,
      phone:phone,
    }),
    headers:{
          token:String(token),
          "content-type":"application/json"
            }
  })
    const data:AddressesI=await response.json()
    return data
}