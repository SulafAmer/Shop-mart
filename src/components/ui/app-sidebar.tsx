"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SubcategoryI } from "@/interfaces"
import Link from "next/link"
import { useEffect, useState } from "react"


export function AppSidebar() {
    const [allSubcategories, setAllSubcategories] = useState<SubcategoryI[]>([])
  async function getAllSubcategories(){
    const response=await fetch("https://ecommerce.routemisr.com/api/v1/subcategories")
    const { data: subcategories }: { data: SubcategoryI[] } = await response.json()
    setAllSubcategories(subcategories)
 
  }
  
useEffect(() => {
  getAllSubcategories()
}, [])

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="relative top-5">
          <SidebarGroupLabel className="text-3xl mb-3 text-black">Subcategories</SidebarGroupLabel>
          <SidebarGroupContent className="px-4">
            <SidebarMenu>
              {allSubcategories.map((sub) => (
                <SidebarMenuItem key={sub._id}>
                  <SidebarMenuButton asChild>
                    <Link href={sub.name}>
                      <span>{sub.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

