import { ProductI } from '@/interfaces'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import MyStarIcon from '@/components/myStarIcon/myStarIcon'
import Link from 'next/link'
import AddToCart from '@/components/addToCart/AddToCart'
import AddToWishList from '@/components/addToWishList/AddToWishList'
export default async function Products() {
  const response=await fetch("https://ecommerce.routemisr.com/api/v1/products")
  const {data:products}:{data:ProductI[]}=await response.json()
 
  
  return <>
  
 <div className='grid px-2 md:px-0 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
   {products.map((product)=>
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
    <AddToWishList productId={product.id}/>
  </CardFooter>
  
</Card>
  
  </div>
  )}
 </div>
  
  </>
}
