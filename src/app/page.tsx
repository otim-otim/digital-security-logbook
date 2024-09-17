'use client'
import VisitorLogs from "@/components/VisitorLogs";
import VisitorLogForm from "@/components/VisitorLogForm";
import CreateNewUser from "@/components/CreateNewUser";
import CreateNewBusiness from "@/components/CreateNewBusiness";
import {  signOut } from "next-auth/react"


import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button} from "@/components/ui/button"

export default function Home() {

  const enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    BUSINESSMANAGER = "BUSINESSMANAGER"
}

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const role =  currentUser?.role
  // console.log('user role', role, role != 'Businessmanager', currentUser)

  function nonBusinessManagerTabs(){
    if(role != 'Businessmanager')
      return (
        <>
        <TabsTrigger value="newUser">Create New User</TabsTrigger>
        <TabsTrigger value="newLog">Log new Visitor</TabsTrigger>
        <TabsTrigger value="busineses">Businesses</TabsTrigger>
        </>
    )
    return (
      <>
      {/* <TabsTrigger value="newLog">Log new Visitor</TabsTrigger> */}
      <TabsTrigger value="newBusiness">Create New Business</TabsTrigger>
      </>
  )
  }
  return (
       
    <div className="w-full md:w-5/6 lg:w-2/3  items-center justify-items-center min-h-screen p-auto pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]  m-auto">
      <main className=" items-center sm:items-start">

      <Button onClick={() => signOut()} variant="outline" size="sm" className="w-24 bg-red-900 text-white mb-4">Sign out</Button>
      <Tabs defaultValue="logs" className="w-full">
      <TabsList className={`grid w-full grid-cols-${ role != Role.BUSINESSMANAGER ? 3 : 2}`}>
        <TabsTrigger value="logs">Logs</TabsTrigger>
        {
          nonBusinessManagerTabs()
        }
      </TabsList>
      <TabsContent value="logs">
        <VisitorLogs  />
      </TabsContent>
      <TabsContent value="newLog">
      <VisitorLogForm  />
      </TabsContent>
      <TabsContent value="newUser">
      <CreateNewUser  />
      </TabsContent>
      <TabsContent value="newBusiness">
      <CreateNewBusiness  />
      </TabsContent>
    </Tabs>

        
        

       
       
      </main>
      
    </div>

   

    
  );
}
