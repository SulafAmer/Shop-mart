"use client"
import React, { useEffect, useState } from 'react'
import AddToCart from '@/components/addToCart/AddToCart'
import MyStarIcon from '@/components/myStarIcon/myStarIcon'
import RemoveFromWishlist from '@/components/removeFromWishlist/removeFromWishlist'
import Image from 'next/image'
import Link from 'next/link'
import { ProductI } from '@/interfaces'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getWishlistAction } from './_action/wishlist.action'
import { Loader2 } from 'lucide-react'


export default function Wishlist() {
const [wishlistData, setWishlistData] = useState<ProductI[]>([])
const [isLoading, setIsLoading] = useState(false)


async function getWishList(){
    setIsLoading(true)
    const {data:products}=await getWishlistAction()
    setWishlistData(products)
    setIsLoading(false)
  }
useEffect(() => {
  getWishList()
}, [])
  return <>
  {isLoading?<div className='flex min-h-screen items-center justify-center'>
    <Loader2 className='animate-spin' size={100}/>
    </div>:<>
   <h1 className='mb-4 mt-4 px-3 md:px-0'>Wishlist:</h1>
  <div className='grid grid-cols-2 px-2 md:px-0 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
   {wishlistData?.map((product)=>
    <div key={product.id}>
    <Card className=''>
      <Link href={"/products/"+product.id}>
  <CardHeader>
    <Image alt='' src={product.imageCover} className='w-full' height={300} width={300}/>
    <CardDescription>{product.brand.name}</CardDescription>
    <CardTitle>{product.title.split(" ",2).join(" ")}</CardTitle>
    <CardDescription>{product.category.name}</CardDescription>
  </CardHeader>
  <CardContent>
   <div className='flex'>
    <MyStarIcon/>
    <MyStarIcon/>
    <MyStarIcon/>
    <MyStarIcon/>
    <p>{product.ratingsAverage}</p>
   </div>
   <p className='pt-1'>Price :<span className='font-bold'>{product.price}EGP</span></p>
  </CardContent>
  </Link>
   <CardFooter className=' gap-2 mt-2'>
    <AddToCart productId={product.id}/>
    <RemoveFromWishlist productId={product.id} getWishList={getWishList} setWishlistData={setWishlistData}/>
  </CardFooter>
  
</Card>
  
  </div>
  )}
 </div>
  </>
  }
  
    
  </>
}
