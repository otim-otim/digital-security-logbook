"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useState, useEffect } from "react";
import { IBusiness,  } from "../Types";
import { faker } from '@faker-js/faker';
import moment from 'moment';
import { storeUser} from '../lib/serverActions'
import { Input } from "@/components/ui/input"


const FormSchema = z.object({
  role: z.string(),
  name: z.string({
        required_error: "Reason must be at least 2 characters.",
        invalid_type_error: "Reason must be a string",
      }) ,
email: z.string({
    required_error: "An email is required.",
        invalid_type_error: "A valid email is required.",
}).email()
  


})



export default  function CreateNewUser() {

    const [user, setUser] = useState<IUser>({})

  const { toast } = useToast()

  const enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    BUSINESSMANAGER = "BUSINESSMANAGER"
}

  const roles =  [Role.ADMIN, Role.USER, Role.BUSINESSMANAGER]






useEffect(() => {
  const submitNewUser = async () => {
    await submitLog();
  };

  // Ensure visitor is valid before submitting
  if (user) { 
    submitNewUser();
  }
}, [user]);

  

  async function submitLog() {
    const {status, statusText } = await storeUser(user)


    if (status == 201) {
      form.reset()
      toast({
      title: "Success",
      description: "user successfully created",
    })
    } else {
      console.error("Error submitting log:", statusText);
    }
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) { 


      setUser({
        name: faker.person.fullName(),
        email: data.email,
        role: data.role,
      })

      
    
  }

  return (
    <div className="grid grid-cols-1  m-0 p-2 ">
       
            
        <div className=" p-4  ">

      

      <Card className="w-3/4 m-auto ">
      <CardHeader>
        <CardTitle>Create New User</CardTitle>
        {/* <CardDescription>Log New Vistor</CardDescription> */}
      </CardHeader>
      <CardContent>
        
      
      

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value ?? ''}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select The User Role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {roles.map((role, index) => (
            <SelectItem key={index} value={role}  >
              {role}
            </SelectItem>
          ))}
                  
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>




          )}

          
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Full Names</FormLabel>
              <FormControl>
                <Input placeholder="Names" {...field} value={field.value ?? ''} />
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
              <FormLabel>Gmail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="@gmail.com" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        
        <Button type="submit" className="w-full">Create</Button>
      </form>
    </Form>
    </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
        </div>
        

       
    </div>
  )
}
