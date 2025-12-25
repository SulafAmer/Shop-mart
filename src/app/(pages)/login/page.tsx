"use client"
import React, { useState } from 'react'
import {signIn} from "next-auth/react"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from '@/components/ui/card'
import { useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

const formSchema = z.object({
  email:z.email("invalid email").nonempty("email is required"),
  password:z.string().nonempty("password is required").min(6,"min length is 6 chars")
})
type FormFields=z.infer<typeof formSchema>
export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  let searchParams=useSearchParams()
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })
 
  async function onSubmit(values: FormFields) {
    setIsLoading(true)
    const response=await signIn("credentials",{
      email:values.email,
      password:values.password,
      callbackUrl:"/",
      redirect:true
    })
    setIsLoading(false)
  }
  return <>
  <div className="flex flex-col mx-auto justify-center items-center min-h-[75vh]">

    <h1 className='my-3 text-2xl'>Login now</h1>
    <Card className='p-5 w-[90%] lg:w-md'>

    <Form {...form}>
      {searchParams.get("error")&&<h2 className='text-red-400'>{searchParams.get("error")}</h2>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button className='w-full cursor-pointer' type="submit">{isLoading&&<Loader2 className='animate-spin'/>}Submit</Button>
        <div className='flex justify-between'>
          <Link href={"/forgetpassword"} className='text-red-500 underline' >Forget password?</Link>
          <Link href={"/register"} className='text-blue-400 underline' >Don't have account?</Link>

        </div>
      </form>
    </Form>
    </Card>
  </div>
  </>
}
