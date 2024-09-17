import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { currentUserData } from "@/lib/serverActions";


export default function UserProvider({children} : {children: React.ReactNode}) {
  const { data: session } = useSession()
  async function getUserData(email: string){
    const userData = await currentUserData(email)
    localhost.set('currentUser', userData)    

  }
  if (session) {
    return (
      <>
      {getUserData(session.user.email)}
        Signed in as {session.user.email} <br />
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