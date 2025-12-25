"use client"
import React, { useContext } from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Heart, Loader, ShoppingCartIcon, UserIcon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { cartContext } from '../context/cartContext'
import { signOut, useSession } from 'next-auth/react'


export default function Navbar() {
 const session= useSession()

 
  const{cartData,isLoading}=useContext(cartContext)
  return <>
  <nav className='md:font-semibold md:text-2xl py-3 bg-gray-100 mb-6 sticky top-0 '>
    <div className="container mx-auto">
        <div className="flex items-center justify-evenly md:justify-between">
            <h1 className='text-lg md:text-2xl'><Link href={"/"}>ShopMart</Link></h1>
            <NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem >
      <NavigationMenuLink asChild className='px-0 md:px-2'>
        <Link href="/products">Products</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
     <NavigationMenuItem>
      <NavigationMenuLink asChild className='px-0 md:px-2'>
        <Link href="/brands">Brands</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
     <NavigationMenuItem>
      <NavigationMenuLink asChild className='px-0 md:px-2'>
        <Link href="/categories">Categories</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center md:gap-1">
              {session.status=="authenticated"&&<p>{session.data.user.name}</p>}
              {session.status=="authenticated"&&<Link href={"/wishlist"} className='mx-2' >
                              <Heart /> 
              </Link>}

                <DropdownMenu>
  <DropdownMenuTrigger><UserIcon/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {session.status=="authenticated"?
   <>
    <Link href={"/profile"}><DropdownMenuItem>Profile</DropdownMenuItem></Link>
    <DropdownMenuItem onClick={()=>signOut({
      callbackUrl:"/"
    })}>Logout</DropdownMenuItem>
    <Link href={"/allorders"}><DropdownMenuItem>Your orders</DropdownMenuItem></Link>
    </> :<>
    <Link href={"/login"}><DropdownMenuItem>Login</DropdownMenuItem></Link>
    <Link href={"/register"}><DropdownMenuItem>Register</DropdownMenuItem></Link>
    </>
    

  }
    
    
  </DropdownMenuContent>
            </DropdownMenu>
                {session.status=="authenticated"&&<div className='relative'>
                   <Link href={"/cart"}>
                    <ShoppingCartIcon />
                    <Badge className="h-5 absolute -top-3 -end-2 md:-end-3  min-w-5 rounded-full px-1 font-mono tabular-nums">
                          {isLoading?<Loader className='animate-spin'/>:cartData?.numOfCartItems}
                     </Badge>
                   </Link>
                </div>}
            </div>
        </div>
    </div>
  </nav>
  </>
}
