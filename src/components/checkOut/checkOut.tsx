"use client"
import React, { useContext, useRef } from 'react'
import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cartContext } from '../context/cartContext'
import toast from 'react-hot-toast'
import { cashOrderAction, checkoutSessionAction } from './_action/checkout.Actions'

export default function CheckOut({cartId}:{cartId:string}) {
    const detailsInput = useRef<HTMLInputElement | null>(null)
    const phoneInput = useRef<HTMLInputElement | null>(null)
    const cityInput = useRef<HTMLInputElement | null>(null)
      let{setCartData}=useContext(cartContext)
    
    

 async function checkOutSession(){
     const details=detailsInput.current?.value
      const city=cityInput.current?.value
      const phone=phoneInput.current?.value
      

    const data=await checkoutSessionAction(cartId,details,city,phone)

    
    if(data.status=="success"){
        window.location.href=data.session.url

    }

  }

 async function cashOrder(){
  const details=detailsInput.current?.value
      const city=cityInput.current?.value
      const phone=phoneInput.current?.value
      

    const data=await cashOrderAction(cartId,details,city,phone)

    
        
    if(data.status=="success"){
        setCartData(null)
        toast.success("Order created successfully")

    }


 } 



  return <>
      <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className='w-full text-lg mt-4 cursor-pointer' variant="outline">Proceed to checkout</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add shipping address</DialogTitle>
            <DialogDescription>
             Make sure you entered the correct address
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label >city</Label>
              <Input ref={cityInput}  id='city' />
            </div>
            <div className="grid gap-3">
              <Label >phone</Label>
              <Input ref={phoneInput}  id='phone'  />
            </div>
            <div className="grid gap-3">
              <Label >details</Label>
              <Input ref={detailsInput}  id="details"  />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className=' cursor-pointer' onClick={()=>checkOutSession()}>Visa</Button>
            <Button type="submit" className=' cursor-pointer' onClick={()=>cashOrder()}>Cash</Button>

          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  </>
}
