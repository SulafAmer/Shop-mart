"use client"
import Loading from '@/app/loading'
import CheckOut from '@/components/checkOut/checkOut'
import { cartContext } from '@/components/context/cartContext'
import { Button } from '@/components/ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { clearCartAction, removeCartItemAction, updateCartItemAction } from './_action/cart.Actions'

export default function Cart() {
  let{cartData,isLoading,getCart,setCartData}=useContext(cartContext)
  const [RemovingId, setRemovingId] = useState<null|string>(null)
  const [updatingId, setupdatingId] = useState<null|string>(null)
  const [isClearing, setIsClearing] = useState(false)


useEffect(() => {
  if (!cartData?.data?.products || cartData.data.products.length === 0) {
    getCart()
  }
}, []) 
  async function removeCartItem(productId:string){
    setRemovingId(productId)
    const data=await removeCartItemAction(productId)
    if(data.status=="success"){
      toast.success("product deleted successfully")
      setCartData(data)
    }
    setRemovingId(null)

  }
  async function updateCartItem(productId:string,count:number){
    setupdatingId(productId)
    const data=await updateCartItemAction(productId,count)
    if(data.status=="success"){
      toast.success("product quantity updated successfully")
      setCartData(data)
    }
    setupdatingId(null)



  }

    async function clearCart(){
    setIsClearing(true)
    const data=await clearCartAction()
    if(data.message=="success"){
      toast.success("product deleted successfully")
      setCartData(null)
    }
    setIsClearing(false)



  }


 
  return <>
 {isLoading||typeof cartData?.data.products[0]?.product=="string"?<Loading/>: cartData?.numOfCartItems!>0?<div className="container mx-auto py-6 px-4">
    <h1 className='text-3xl font-bold tracking-tight'>Shopping cart</h1>
    <p className='text-muted-foreground mt-1'>{cartData?.numOfCartItems}  items in your cart</p>
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start mt-6'>
      {/*items details*/ }
      <div className="lg:col-span-2 space-y-4">
          {cartData?.data?.products?.map((item)=> <div key={item._id} className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card">
            <Image src={item.product.imageCover} height={200} width={200} alt={item.product.title}className='w-24 h-24 rounded-lg object-cover md:h-28' />
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h3 className='font-semibold text-base md:text-lg line-clamp-2'>{item.product.title}</h3>
                  <p className='text-sm text-muted-foreground mt-1'>
                    {item.product.brand.name}
                    {item.product.category.name}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    EGP {item.price}
                  </div>
                </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button aria-label='decrase' disabled={item.count==1} onClick={()=>updateCartItem(item.product.id,item.count-1)} className='size-8 rounded-lg border hover:bg-accent'>-</button>
                     <span className='w-6 text-center font-medium'>{updatingId==item.product.id?<Loader2 className=' animate-spin'/>:item.count}</span>
                    <button aria-label='increase' onClick={()=>updateCartItem(item.product.id,item.count+1)} className='size-8 rounded-lg border hover:bg-accent'>+</button>
                  </div>
                  <button onClick={()=>{removeCartItem(item.product.id)}} aria-label='remove' className='text-sm cursor-pointer flex text-destructive hover:underline items-center'>{RemovingId==item.product.id&&<Loader2 className=' animate-spin'/>}Remove</button>
                </div>
                </div>
                </div>)}
                </div>


                {/*order summary */}
                <div className="lg:col-span-1 sticky top-18">
                  <div className="rounded-xl border p-5 shadow-sm">
                    <h2 className='text-lg font-semibold'>Order summary</h2>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className='text-sm text-muted-foreground'>Subtotal :{cartData?.numOfCartItems}items</span>
                        <span className='font-semibold'>Total cart price :{cartData?.data.totalCartPrice}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className='text-sm text-muted-foreground'>Shipping</span>
                        <span className='text-emerald-600 font-medium'>Free</span>
                      </div>
                    </div>
                    <div className='my-4 border-t'/>
                    <div className='flex items-center justify-between'>
                    <span className='text-base font-semibold'>Total</span>
                    <span className='text-base font-bold'>{cartData?.data.totalCartPrice}EGP</span>
                    </div>
                     <CheckOut cartId={cartData?.cartId!}/>
                     <Link href={"/products"}>
                    <Button className='w-full cursor-pointer text-lg mt-2'>Continue shopping</Button>
                     </Link>

                  </div>
                  <Button variant={"outline"} className='mt-2 ms-auto text-destructive cursor-pointer hover:text-destructive flex' onClick={()=>{clearCart()}}>{isClearing?<Loader2 className='animate-spin'/>:<Trash2/>}Clear cart</Button>

                </div>
              </div>
            </div>:<div className='flex min-h-[75vh] items-center justify-center flex-col'>
              <h2 className='text-2xl my-4'>Your cart is empty..</h2>
              <Link href={"/products"}>
              <Button>Add products to cart</Button>
              </Link>

            </div>
           }
  
  </>
}
