'use client'
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { currentUserData } from "@/lib/serverActions";


export default function UserProvider({children} : {children: React.ReactNode}) {
  const { data: session } = useSession()
  async function getUserData(email: string){
      const storedUserData = localStorage.getItem('currentUser');
    if(!storedUserData){
        const userData = await currentUserData(email)
        localStorage.setItem('currentUser', JSON.stringify(userData));   

    }

  }
  if (session && session.user) {
    return (
      <>
      
      {getUserData(session.user.email)}
        Signed in as {session.user!.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        {children} 
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}