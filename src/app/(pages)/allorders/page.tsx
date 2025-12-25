"use client"
import { OrderI } from '@/interfaces/order'
import React, { useEffect, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import { getUserIdAction } from './_action/ordersActions.action'


export default function AllOrders() {
  const [ordersData, setOrdersData] = useState<OrderI[]|null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  async function getUserOrders(){
    setIsLoading(true)
  const userId = await getUserIdAction()

  
    const response=await fetch("https://ecommerce.routemisr.com/api/v1/orders/user/"+userId)
    const orders:OrderI[]=await response.json()
    setOrdersData(orders)
    
    setIsLoading(false)
  }

useEffect(() => {
   getUserOrders()
}, [])

  return <>
  <h2 className='px-7 text-2xl md:text-3xl'>Orders:</h2>
  {isLoading?<div className='flex min-h-screen items-center justify-center'>
    <Loader2 className='animate-spin' size={100}/>
    </div>:<div className=''>
     {ordersData?.map((order)=><div key={order.id} className="border-2 p-5 m-6 rounded-2xl">
   <div className=''>
    <h2 className='text-3xl'>Order #{order.id}</h2>
    <p className='text-muted-foreground p-1'>Order Date: {order.createdAt.split(".",1).join().replace("T",", ")}</p>
    <p className='text-muted-foreground p-1'>Payment: {order.paymentMethodType} {order.isPaid?<span className='text-green-500'>(Paid)</span>:<span className='text-orange-400'>(Unpaid)</span>}</p>
    <p className='text-muted-foreground p-1'>Delivered: {order.isDelivered?<span className='text-green-500'>Yes</span>:<span className='text-orange-400'>No</span>}</p>
    <p className='text-muted-foreground p-1 font-semibold'>Total: <span className='font-bold'>{order.totalOrderPrice} EGP</span></p>
    <h3 className='text-xl font-semibold'>Shipping Address</h3>
    <p className=' p-1'>{order.shippingAddress.details}, {order.shippingAddress.city}</p>
    <p className=' p-1'>Phone: {order.shippingAddress.phone} </p>
    <Popover>
   <PopoverTrigger className='bg-gray-200 py-2 cursor-pointer px-4 font-semibold mt-4 rounded-sm'>View order items</PopoverTrigger>
   <PopoverContent className='w-80 md:w-160 h-90 absolute -top-97 -left-20 md:-top-97'>
    <ScrollArea className="p-5 h-85  md:w-150 rounded-md">
      <div className="">
        <h4 className="mb-4 text-md leading-none font-medium"> Order items</h4>
        <Separator/>
        {order?.cartItems?.map((item) => (
          <React.Fragment key={item._id}>
            <div className='flex my-3  items-center'>
            <div className='h-[100px] w-[100px]'>
              <Image className='rounded-md' alt={item.product.title} src={item.product.imageCover} width={70} height={70}/>
            </div>
            <div className='h-[100px]'>
              <h3 className='my-1 mx-3'>{item.product.title}</h3>
                <p className='flex my-1 ms-3'> Qty: {item.count} | Price: {item.price} EGP </p>
            </div>
          </div>
          <Separator/>
          </React.Fragment>
          
        ))}
      </div>
    </ScrollArea>

  </PopoverContent>
</Popover>
<p className='md:text-end pt-2 text-muted-foreground'>Last updated: {order.updatedAt.split(".",1).join().replace("T",", ")}</p>
   </div>
  </div>)}
  
  </div>}

  </>
}
