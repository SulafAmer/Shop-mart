"use client"
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { Loader, ShoppingCartIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { cartContext } from '../context/cartContext'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { addToCartAction } from '@/app/(pages)/products/_action/addToCart.action'

export default function AddToCart({productId}:{productId:string}) {
  let {getCart,setCartData} = useContext(cartContext)
  const [isLoading, setisLoading] = useState(false)
  const session=useSession()
  const router=useRouter()
  async function addProductToCart() {
    if(session.status=="authenticated"){
        setisLoading(true)
        const data=await addToCartAction(productId)
        data.status=="success"&&toast.success("Product added successfully to cart")
        setCartData(data)
        await getCart()
        setisLoading(false)
    }else{
      router.push("/login")
    }
 
        
    }
  return <>
  
    <Button onClick={addProductToCart} className='grow cursor-pointer'>{isLoading?<Loader className='animate-spin'/>:<ShoppingCartIcon/>} Add to cart</Button>
    
    
  </>
}
