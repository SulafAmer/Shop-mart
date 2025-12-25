import { ProductI, SubcategoryI } from '@/interfaces'
import { Params } from 'next/dist/server/request/params'
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import MyStarIcon from '@/components/myStarIcon/myStarIcon'
import { HeartIcon, ShoppingCartIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductSlider from '@/components/productSlider/ProductSlider'
import AddToCart from '@/components/addToCart/AddToCart'
import Link from 'next/link'
import AddToWishList from '@/components/addToWishList/AddToWishList'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'


export default async function CategoryDetails({params}:{params:Params}) {
    let{categoryId}=await params
 
  const response=await fetch("https://ecommerce.routemisr.com/api/v1/products?category[in]="+categoryId)
  const {data:products}:{data:ProductI[]}=await response.json()

  const secondResponse=await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`)
  const {data:categorySubcategories}:{data:SubcategoryI[]}=await secondResponse.json()

  

  
  

  return <>
          <ScrollArea className="w-full rounded-md border whitespace-nowrap mb-5">
      <div className="flex items-center w-max space-x-4 mx-auto p-4">
        <p className="text-foreground font-bold py-2 text-lg">{products[0]?.category.name} Subcategories:</p>
        {categorySubcategories.map((sub) => (
          <figure key={sub._id} className="shrink-0">
            <figcaption className="text-muted-foreground py-2 text-xs">
              <Link href={""}  className="text-foreground font-semibold">
                {sub.name}
              </Link>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar className=' hidden' orientation="horizontal" />
    </ScrollArea>
    {/* ******************************************************************************************************* */}
   <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
   {products.map((product)=>
    <div key={product._id}>
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
