import Link from 'next/link'
import React from 'react'
import { Separator } from '../ui/separator'

export default function Footer() {
  return <>
  <Separator className='mt-10'/>
  <div className=' flex justify-center'>
  <div className='  w-[80%] my-14 grid mx-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
     <div className='flex flex-col gap-4'>
        <h2 className='text-3xl'>shop mart</h2>
        <p className='text-muted-foreground'>our one-stop destination for the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.</p>
     </div>
     <div className='flex flex-col gap-4'>
        <h2 className='font-bold'>Shop</h2>
        <Link className='text-muted-foreground' href={"/categories"}>Electronics</Link>
        <Link className='text-muted-foreground' href={"/categories"}>Fashion</Link>
        <Link className='text-muted-foreground' href={"/categories"}>Home & Garden</Link>
        <Link className='text-muted-foreground' href={"/categories"}>Sports</Link>
        <Link className='text-muted-foreground' href={"/categories"}>Deals</Link>
     </div>
     <div className='flex flex-col gap-4'>
        <h2 className='font-bold'>CUSTOMER SERVICE</h2>
        <Link className='text-muted-foreground' href={"/categories"}>Contact Us</Link>
        <Link className='text-muted-foreground' href={"/categories"}>Help Center</Link>
        <Link className='text-muted-foreground' href={"/categories"}>Track Your Order</Link>
        <Link className='text-muted-foreground' href={"/categories"}>Returns & Exchanges</Link>
        <Link className='text-muted-foreground' href={"/categories"}>Size Guide</Link>
     </div>
     <div className='flex flex-col gap-4'>
        <h2 className='font-bold'>ABOUT</h2>
        <Link className='text-muted-foreground' href={"/categories"}>About shopmart</Link>
        <Link className='text-muted-foreground' href={"/categories"}>Careers</Link>
        <Link className='text-muted-foreground' href={"/categories"}>Careers</Link>
        <Link className='text-muted-foreground' href={"/categories"}>Press</Link>
        <Link className='text-muted-foreground' href={"/categories"}>Investor Relations</Link>
        <Link className='text-muted-foreground' href={"/categories"}>Sustainability</Link>
     </div>
     <div className='flex flex-col gap-4'>
        <h2 className='font-bold'>POLICIES</h2>
        <Link className='text-muted-foreground' href={"/categories"}>Privacy Policy</Link>
        <Link className='text-muted-foreground' href={"/categories"}>Terms of Service</Link>
        <Link className='text-muted-foreground' href={"/categories"}>Cookie Policy</Link>
        <Link className='text-muted-foreground' href={"/categories"}>Shipping Policy</Link>
        <Link className='text-muted-foreground' href={"/categories"}>Refund Policy</Link>
     </div>
  </div>
  </div>
  </>
}
