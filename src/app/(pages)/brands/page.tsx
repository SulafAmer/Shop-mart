import { brandI } from '@/interfaces'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function Brands() {
   const response=await fetch("https://ecommerce.routemisr.com/api/v1/brands")
     const {data:brands}:{data:brandI[]}=await response.json()

     
    

  return <>
  <h1 className='text-3xl font-bold text-center'>Brands</h1>
  <div className='grid px-2 md:px-0 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5'>
    {brands.map((brand)=><Link key={brand._id} href={"/brands/"+brand._id}>
    <div className='border-2 rounded-2xl p-7 py-8 hover:shadow-xl transition-all ease-in-out duration-200'>
    <Image height={300} width={300} alt={brand.name} src={brand.image} />
    <p className=' font-bold text-2xl text-center'>{brand.name}</p>
   </div>
    </Link>)}
    
   
  </div>
  </>
}
