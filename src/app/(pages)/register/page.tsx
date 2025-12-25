"use client"
import React, { useState } from 'react'
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from '@/components/ui/card'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import Link from 'next/link'

const formSchema = z.object({
  name:z.string().nonempty("name is required").min(3,"name must be at least 3chars").max(20,"name must be at most 20chars"),
  email:z.email("invalid email").nonempty("email is required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"invalid email"
),
  password:z.string().nonempty("password is required").min(6,"min length is 6 chars").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"weak password"),
  rePassword:z.string().nonempty("repassword is required"),
  phone:z.string().nonempty("phone is required").max(11,"phone must be at most 11")
}).refine((data)=>data.password===data.rePassword,{path:["rePassword"],message:"password and repassword must be tha same"})
type FormFields=z.infer<typeof formSchema>


export default function Register() {
const router=useRouter()
  const [isLoading, setIsLoading] = useState(false)
  let searchParams=useSearchParams()

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:"",
      email: "",
      password:"",
      rePassword:"",
      phone:""
    },
  })

  

  async function onSubmit(values: FormFields) {
      
    
    setIsLoading(true)

    const response=await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup",{
      method:"POST",
      body:JSON.stringify({
        name: values.name,
        email:values.email,
        password:values.password,
        rePassword:values.rePassword,
        phone:values.phone
      }),
      headers:{"content-type":"application/json"}

      
    })
    const data=await response.json()
    

    
    setIsLoading(false)
    if(data.message=="success"){
      toast.success("Account created successfully")
      router.push("/login")
    }
    if(data.message!="success"){
       toast.error(data.message)
    }
  }
  return <>
   <div className="flex flex-col mx-auto justify-center items-center min-h-[75vh]">

    <h1 className='my-3 text-2xl'>Register now</h1>
    <Card className='p-5 w-[90%] lg:w-md'>

    <Form {...form}>
            {searchParams.get("error")&&<h2 className='text-red-400'>{searchParams.get("error")}</h2>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="sulaf@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>rePassword</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button className='w-full cursor-pointer' type="submit">{isLoading&&<Loader2 className='animate-spin'/>}Submit</Button>
          <Link href={"/login"} className='text-blue-400 px-2 underline' >I have account?</Link>
      </form>
    </Form>
    </Card>
  </div>
  </>
}
