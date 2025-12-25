"use client"
import { cartResponse } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";
import { getCartAction } from "./_action/getCart.action";

export const cartContext=createContext<{
    cartData:cartResponse|null,
    setCartData:(value:cartResponse|null)=>void,
    isLoading:boolean,
    setIsLoading:(value:boolean)=>void,
    getCart:()=>void
}>({
    cartData:null,
    setCartData:()=>{},
    isLoading:false,
    setIsLoading:()=>{},
    getCart:()=>{}
})

export default function CartContextProvider({children}:{children:ReactNode}) {
    const [cartData, setCartData] = useState<cartResponse|null>(null)
    const [isLoading, setIsLoading] = useState(false)
    async function getCart() {
        setIsLoading(true)
        const data=await getCartAction()
        
        setCartData(data)
        setIsLoading(false)
        
    }
    useEffect(() => {
        getCart()
    }, [])
    
  return <>
  <cartContext.Provider value={{cartData,setCartData,isLoading,setIsLoading,getCart}}>
    {children}
  </cartContext.Provider>
  </>
}
