import { ProductI } from '@/interfaces'
import { Params } from 'next/dist/server/request/params'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import MyStarIcon from '@/components/myStarIcon/myStarIcon'
import ProductSlider from '@/components/productSlider/ProductSlider'
import AddToCart from '@/components/addToCart/AddToCart'
import AddToWishList from '@/components/addToWishList/AddToWishList'


export default async function ProductDetails({params}:{params:Params}) {
    let{productId}=await params

    const response=await fetch("https://ecommerce.routemisr.com/api/v1/products/"+productId)
    const {data:product}:{data:ProductI}=await response.json()
  
  return <>
  <Card className='grid md:grid-cols-2 items-center mt-15 w-3/4 mx-auto'>
  <div className='p-4 ps-10'>
    <ProductSlider images={product.images} altContent={product.title}/>
  </div>
  <div>
     <CardHeader>
    <CardDescription>{product.brand.name}</CardDescription>

    <CardTitle>{product.title}</CardTitle>
    <CardDescription>{product.description}</CardDescription>
  </CardHeader>
  <CardContent>
    <CardDescription>{product.category.name}</CardDescription>
    <div className='flex gap-1'>
        <MyStarIcon/>
        <MyStarIcon/>
        <MyStarIcon/>
        <MyStarIcon/>
        <p>({product.ratingsQuantity})</p>
    </div>
    <div className='mt-3 flex justify-between'>
        <p className='font-bold'>{product.price}EGP</p>
        <p className='font-bold'>Quantity:{product.quantity}</p>

    </div>
    
  </CardContent>
   <CardFooter className=' gap-2 mt-2'>
       <AddToCart productId={product.id}/>
       <AddToWishList productId={product.id}/>
     </CardFooter>
  </div>
</Card>

  </>
}
