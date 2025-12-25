import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return <>
  <div className="container text-center h-screen p-5 flex items-center justify-center">
      <div className="flex flex-col justify-center ">
         <h1 className="text-4xl md:text-7xl font-bold" >Welcome to ShopMart</h1>
       <p className="text-gray-500 my-8 text-2xl w-[66%] mx-auto">Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.</p>
       <div className="flex gap-4 justify-center mt-4">
        <Link href={"/products"}><Button className="md:px-9 py-6 text-lg">Shop Now</Button></Link>
        <Link href={"/categories"}><Button className="md:px-9 py-6 text-lg border border-accent-foreground" variant="outline">Browse categories</Button></Link>
        
       </div>
      </div>
  </div>
  </>
}
