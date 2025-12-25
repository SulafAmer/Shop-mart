"use server"

import { getUserToken } from "@/app/Helpers/getUserToken"
import { TokenI } from "@/interfaces/token";
import { jwtDecode } from "jwt-decode";

export async function getUserIdAction(){
       const token=await getUserToken()
       if (!token) {
    throw new Error("No token found")
  }
       const data=jwtDecode<TokenI>(String(token))
    return data.id
}