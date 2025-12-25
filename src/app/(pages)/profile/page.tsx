"use client"
import { Button } from '@/components/ui/button'
import { AddressesI, AddressI } from '@/interfaces/address'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { addAddressAction, getUserAddressesAction, removeAddressAction } from './_action/profile.Actions'
import { Loader2 } from 'lucide-react'

export default function Profile() {

  const [userAddressesData, setUserAddressesData] = useState<AddressI[]>([])
  const [isLoading, setIsLoading] = useState(false)

      const detailsInput = useRef<HTMLInputElement | null>(null)
      const phoneInput = useRef<HTMLInputElement | null>(null)
      const cityInput = useRef<HTMLInputElement | null>(null)
      const nameInput = useRef<HTMLInputElement | null>(null)



      
      
  
  async function getUserAddresses(){
    setIsLoading(true)
    const{data:addresses}=await getUserAddressesAction()
    setUserAddressesData(addresses)
     setIsLoading(false)
  }

  async function removeAddress(addressId:string){
      const data=await removeAddressAction(addressId)
    if(data.status=="success"){  
        setUserAddressesData(data.data)
        toast.success("Address deleted successfully")
    }



  }
  async function addAddress(){
  const name=nameInput.current?.value
   const details=detailsInput.current?.value
     const city=cityInput.current?.value
      const phone=phoneInput.current?.value

      const data=await addAddressAction(name,details,city,phone)
      
    if(data.status=="success"){
        setUserAddressesData(data.data)
        toast.success("Address added successfully")
    }



  }

  useEffect(() => {
  getUserAddresses()
}, [])

  

  return <>
   <div className="flex items-center mb-5 gap-10 px-5 md:px-0">
   <h1 className=''>Addresses:</h1>
      <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className='w-full text-lg cursor-pointer' variant="outline">Add address</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add address details</DialogTitle>
            <DialogDescription>
             Make sure you entered the correct address
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label >Name</Label>
              <Input ref={nameInput}  id="details"  />
            </div>
            <div className="grid gap-3">
              <Label >details</Label>
              <Input ref={detailsInput}  id="details"  />
            </div>
            <div className="grid gap-3">
              <Label >city</Label>
              <Input ref={cityInput}  id='city' />
            </div>
            <div className="grid gap-3">
              <Label >phone</Label>
              <Input ref={phoneInput}  id='phone'  />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className=' cursor-pointer' variant="outline">Cancel</Button>
            </DialogClose>
            <Button className=' cursor-pointer' type="submit" onClick={()=>addAddress()}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>

   </div>
   {isLoading?<div className='flex min-h-screen items-center justify-center'>
    <Loader2 className='animate-spin' size={100}/>
    </div>:<div className='px-5 md:px-0'>
     {userAddressesData.map((address)=><div key={address._id} className='border-2 my-5 rounded-lg p-4'>
      <p className='my-2'>Name: {address.name}</p>
      <p className='my-2'>Details: {address.details}</p>
      <div className='flex justify-between'>
      <p className='my-2'>Phone: {address.phone}</p>
      <button className='text-red-500 cursor-pointer' onClick={()=>removeAddress(address._id)}>remove</button>
      </div>
      <p className='my-2'>City: {address.city}</p>

    </div>)}
    
   </div>}
   


  
  </>
}
