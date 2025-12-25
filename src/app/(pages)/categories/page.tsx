
import {CategoryI } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/ui/app-sidebar'
import { SidebarTrigger } from '@/components/ui/sidebar'

export default async function Categories() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories")
  const { data: categories }: { data: CategoryI[] } = await response.json()

  return (
    <>
      <h1 className='text-3xl text-center font-bold mb-5'>Categories</h1>
      <SidebarProvider>
        <div className='flex'>
          <AppSidebar />

          <div className=' p-5'> 
               <div className='flex text-xl my-5 items-center'>
                <p>Show Subcategories:</p>
                <div className='pt-1'>
               <SidebarTrigger className='w-[40px] cursor-pointer' size={'icon-lg'}/>
                </div>
               </div>
            <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
              {categories.map((category) => (
                <Link href={"/categories/" + category._id} key={category._id}>
                  <div className='border-2 flex flex-col items-center justify-center rounded-2xl hover:shadow-xl transition-all ease-in-out duration-200 p-4'>
                    <div className='h-[300px] w-[300px] flex justify-center items-center'>
                      <Image src={category.image} height={150} width={150} alt={category.name} />
                    </div>
                    <p className='font-bold text-2xl mt-4 text-center'>{category.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </>
  )
}
